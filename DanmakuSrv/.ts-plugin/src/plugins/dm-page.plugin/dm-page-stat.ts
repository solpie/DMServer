import { strapi_, IDoc } from '../../strapi'

let strapi = strapi_
const request = require('request')

const post_data = async (url: string, data: any) => {
  await request(
    {
      url,
      method: 'POST',
      json: true,
      headers: {
        'content-type': 'application/json'
      },
      body: data
    },
    function(error: any, response: any, body: any) {
      if (!error && response.statusCode == 200) {
      }
    }
  )
}
interface Idoc_plugin_conf extends IDoc {
  name: string
  rpc_server_url: string
  stat_from: string
}
export class DouyinStat {
  init = false
  douyin_pk_conf: any = null
  douyin_pages_loaded = {}
  stat_pk: any = {}
  async boot() {
    strapi_.log.info('douyin stat boot')
    const [entry] = (await strapi
      .query('plugin-conf')
      .find({ name: 'douyin-pk' })) as Array<Idoc_plugin_conf>

    if (entry) {
      strapi.log.info('dm service index', entry.name)
      this.init_ws_poll(entry['rpc_server_url'])
      this.douyin_pk_conf = entry
      this.stat_pk = {}

      // strapi.log.info("dm-plugin today", this.today_date);
      // strapi.log.info("strapi.services", strapi.services);
      await this.calc_pk()
    }
  }
  async init_ws_poll(rpc_url: string) {
    if (rpc_url) {
      // i
      if (rpc_url.charAt(rpc_url.length - 1) === '/')
        rpc_url = rpc_url.substr(0, rpc_url.length - 1)
      strapi.log.info('conf server url:', rpc_url)

      // setInterval(async () => {
      // heart polling
      // get active conf
      await request(
        rpc_url + '/srv/dm-plugin/get',
        async (err: any, res: any, body: any) => {
          strapi.log.debug('[ping]', rpc_url + '/srv/dm-plugin/get')
          if (this.douyin_pk_conf) {
            const data = JSON.parse(body)
            await this.update_conf(data)
            await this.compare_stat_upload(data, rpc_url)
          }
        }
      ) // request
      // }, 3000)

      var socket = require('socket.io-client')(rpc_url + '/dm')
      socket.on('connect', function() {
        strapi.log.info('init ws conf', rpc_url)
      })
      socket.on('DM_EVENT_GET_LAST_DM', async (data: any) => {
        if (Number(data['amount']) > 0) {
          let dm_arr = await this.find_lottery_user(data['amount'], 0, [])
          strapi_.log.info('douyinStatSrv dm_arr', dm_arr.length)
          // rpc_url
          await post_data(rpc_url + '/srv/dm-plugin/last-dm/', { dm_arr })
        }
      })
      socket.on('test', function() {
        strapi_.log.info('test ws')
      })
      socket.on('DM_EVENT_NEW_CONF', async (data: any) => {
        // receive new conf
        strapi_.log.info('DM_EVENT_NEW_CONF')
        await this.update_conf(data)
        await this.compare_stat_upload(data, rpc_url)
      })
      socket.on('disconnect', function() {})
    }
  }
  async find_lottery_user(amount: number, start: number, $dm_arr: Array<any>) {
    const find_dm = (page: any, dm_arr: Array<any>) => {
      const { data } = page
      if (data && data['dm_arr'] && data['dm_arr'].length) {
        strapi_.log.info('find_lottery_user concat:', data['dm_arr'].length)
        // return dm_arr.concat(data['dm_arr'])
        for (let i = 0; i < data['dm_arr'].length; i++) {
          const dm = data['dm_arr'][i]
          dm_arr.push(dm)
        }
      }
    }
    let find_from = this.douyin_pk_conf['stat_from']
    let dm_pages = await strapi.query('dm-page').find({
      created_at_gt: find_from,
      _start: start,
      _sort: 'created_at:desc'
    })
    for (let page of dm_pages) {
      if ($dm_arr.length < amount) find_dm(page, $dm_arr)
      else break
    }
    strapi_.log.info('find_lottery_user need:', amount, 'find', $dm_arr.length)
    if (dm_pages.length === 100 && $dm_arr.length < amount) {
      await this.find_lottery_user(amount, start + 100, $dm_arr)
    }
    return $dm_arr
  }
  async update_conf(data: any) {
    strapi.log.info('update active conf')
    if (
      data &&
      this.douyin_pk_conf['conf_updated_at'] !==
        data['option_conf']['conf_updated_at']
    ) {
      if (data['option_conf']) {
        this.douyin_pk_conf['data']['option_arr'] =
          data['option_conf']['option_arr']
      }
      this.douyin_pk_conf['stat_from'] = data['option_conf']['stat_from']
      this.douyin_pk_conf['conf_updated_at'] =
        data['option_conf']['conf_updated_at']
      await strapi
        .query('plugin-conf')
        .update({ id: this.douyin_pk_conf['id'] }, this.douyin_pk_conf)
      strapi.log.info('update active cond', this.douyin_pk_conf['data'])
      this.boot()
    }
  }
  async compare_stat_upload(data: any, url: string) {
    // compare count
    let option_arr = this.douyin_pk_conf['data']['option_arr']
    let remote_option_arr = data['option_conf']['option_arr']
    if (option_arr) {
      let is_new_stat = false

      // strapi.log.info('remote:', remote_option_arr)
      for (let remote_option of remote_option_arr) {
        let query = remote_option['query']
        if (this.stat_pk[query] !== remote_option['count']) {
          is_new_stat = true
          remote_option['count'] = this.stat_pk[query]
        }
      }

      if (is_new_stat) {
        strapi.log.info('new stat', this.stat_pk)
        await post_data(url + '/srv/dm-plugin/stat', {
          option_conf: { option_arr: remote_option_arr }
        })
        // await request(
        //     {
        //         url: url + '/srv/dm-plugin/stat',
        //         method: 'POST',
        //         json: true,
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: { option_conf: { option_arr: remote_option_arr } }
        //     },
        //     function (error: any, response: any, body: any) {
        //         if (!error && response.statusCode == 200) {
        //         }
        //     }
        // )
      }
    }
  }
  async calc_pk(start = 0) {
    const [entry] = (await strapi
      .query('plugin-conf')
      .find({ name: 'douyin-pk' })) as Array<Idoc_plugin_conf>

    if (entry) {
      let find_from = entry['stat_from']
      let dm_pages = await strapi
        .query('dm-page')
        .find({ created_at_gt: find_from, _start: start })
      if (dm_pages.length) {
        strapi.log.info('active conf option_arr')
        for (let option of this.douyin_pk_conf['data']['option_arr']) {
          strapi.log.info('--option', option)
        }
        for (let page of dm_pages) {
          this.calc_page(page)
        }
        // this.stat_pk = stat_pk;
        strapi.log.info(':::stat_from', find_from, 'start', start)
        strapi.log.info(':::dm-pages count:', dm_pages.length)
        strapi.log.info(':::stat_', this.stat_pk)
        // strapi.log.info(":::stat_", this.stat_pk);
        if (dm_pages.length === 100) {
          this.calc_pk(start + 100)
        }
      } else {
        strapi.log.info('stat_pk', 'no dm-page from', find_from)
      }
    }
  }
  async calc_page(page: any) {
    const find_query = function(text: any, pk_conf: any, stat_pk: any) {
      for (let option of pk_conf['data']['option_arr']) {
        const { query } = option
        if (!stat_pk[query]) stat_pk[query] = 0
        if (query && text.includes(query)) {
          stat_pk[query]++
          // strapi.log.info("calc_pk", query, stat_pk[query]);
        }
      }
    }
    const { data } = page
    if (data && data['dm_arr']) {
      for (let dm of data['dm_arr']) {
        //   strapi.log.info("calc_pk", dm);
        const { text } = dm
        find_query(text, this.douyin_pk_conf, this.stat_pk)
      }
    }
  }
}
