import { strapi_, IDoc } from '../../strapi'

let strapi = strapi_
const request = require('request')
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
      this.init_ws(entry['rpc_server_url'])
      this.douyin_pk_conf = entry
      this.stat_pk = {}

      // strapi.log.info("dm-plugin today", this.today_date);
      // strapi.log.info("strapi.services", strapi.services);
      await this.calc_pk()
    }
  }
  async init_ws(url: string) {
    if (url) {
      // i
      if (url.charAt(url.length - 1) === '/')
        url = url.substr(0, url.length - 1)
      strapi.log.info('conf server url:', url)
      setInterval(async () => {
        // heart polling
        // get active conf
        await request(
          url + '/srv/dm-plugin/get',
          async (err: any, res: any, body: any) => {
            strapi.log.debug('[ping]', url + '/srv/dm-plugin/get')
            if (this.douyin_pk_conf) {
              const data = JSON.parse(body)
              await this.update_conf(data)
              await this.compare_stat_upload(data, url)
            }
          }
        ) // request
      }, 3000)

      // var socket = require('socket.io-client')(url);
      // socket.on('connect', function(){
      //   strapi.log.info('init ws conf', url)
      // });
      // socket.on('event', function(data){});
      // socket.on('disconnect', function(){});
    }
  }
  async update_conf(data: any) {
    // strapi.log.info('update active cond', _this.douyin_pk_conf)
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
        await request(
          {
            url: url + '/srv/dm-plugin/stat',
            method: 'POST',
            json: true,
            headers: {
              'content-type': 'application/json'
            },
            body: { option_conf: { option_arr: remote_option_arr } }
          },
          function(error: any, response: any, body: any) {
            if (!error && response.statusCode == 200) {
            }
          }
        )
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
