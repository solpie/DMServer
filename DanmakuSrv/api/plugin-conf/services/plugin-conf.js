"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
const request = require("request")
module.exports = {
  init: false,
  douyin_pk_conf: null,
  douyin_pages_loaded: {},
  today_date: null,
  stat_pk: {},
  update_conf: async function (data) {
    let _this = this
    // return
    // strapi.log.info('update active cond', _this.douyin_pk_conf)
    if (data && _this.douyin_pk_conf['conf_updated_at'] !== data['option_conf']['conf_updated_at']) {
      if (data['option_conf']) {
        _this.douyin_pk_conf['data']['option_arr'] = data['option_conf']['option_arr']
      }
      _this.douyin_pk_conf['stat_from'] = data['option_conf']['stat_from']
      _this.douyin_pk_conf['conf_updated_at'] = data['option_conf']['conf_updated_at']
      await strapi.query("plugin-conf").update({ id: _this.douyin_pk_conf['id'] }, _this.douyin_pk_conf)
      strapi.log.info('update active cond', _this.douyin_pk_conf['data'])
      _this.boot()
    }
  },
  compare_stat_upload: async function (data, url) {
    // compare count
    let _this = this
    let option_arr = _this.douyin_pk_conf['data']['option_arr']
    let remote_option_arr = data['option_conf']['option_arr']
    if (option_arr) {
      let is_new_stat = false


      // strapi.log.info('remote:', remote_option_arr)
      for (let remote_option of remote_option_arr) {
        let query = remote_option['query']
        if (_this.stat_pk[query] !== remote_option['count']) {
          is_new_stat = true;
          remote_option['count'] = _this.stat_pk[query]
        }
      }


      if (is_new_stat) {
        strapi.log.info('new stat', _this.stat_pk)

        await request({
          url: url + '/srv/dm-plugin/stat',
          method: "POST",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: { option_conf: { option_arr: remote_option_arr } }
        }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
          }
        });


      }

    }
  },

  init_ws: async function (url) {
    if (url) {
      // i
      if (url.charAt(url.length - 1) === '/')
        url = url.substr(start, length)
      strapi.log.info('conf server url:', url)
      let _this = this
      setInterval(async function () {
        // heart polling
        // get active conf
        await request(url + '/srv/dm-plugin/get', async function (err, res, body) {
          // strapi.log.info('get conf', url,body)
          if (_this.douyin_pk_conf) {
            const data = JSON.parse(body)
            await _this.update_conf(data)
            await _this.compare_stat_upload(data, url)
          }
        })// request
      }, 3000)

      // var socket = require('socket.io-client')(url);
      // socket.on('connect', function(){
      //   strapi.log.info('init ws conf', url)
      // });
      // socket.on('event', function(data){});
      // socket.on('disconnect', function(){});
    }
  },
  boot: async function () {
    const [entry] = await strapi
      .query("plugin-conf")
      .find({ name: "douyin-pk" });

    if (entry) {
      strapi.log.info("dm service index", entry.name);
      this.init_ws(entry['rpc_server_url'])
      this.douyin_pk_conf = entry;
      this.stat_pk = {};
      this.today_date = (new Date()).toISOString()

      // strapi.log.info("dm-plugin today", this.today_date);
      // strapi.log.info("strapi.services", strapi.services);
      await this.calc_pk();
    }
  },
  calc_page: async function (page) {
    const find_query = function (text, pk_conf, stat_pk) {
      for (let option of pk_conf["data"]["option_arr"]) {
        const { query } = option;
        if (!stat_pk[query]) stat_pk[query] = 0;
        if (text.includes(query)) {
          stat_pk[query]++;
          // strapi.log.info("calc_pk", query, stat_pk[query]);
        }
      }

    };
    const { data } = page;
    if (data && data["dm_arr"]) {
      for (let dm of data["dm_arr"]) {
        //   strapi.log.info("calc_pk", dm);
        const { text } = dm;
        find_query(text, this.douyin_pk_conf, this.stat_pk);
      }
    }

  },
  calc_pk: async function (start=0) {
    const [entry] = await strapi
      .query("plugin-conf")
      .find({ name: "douyin-pk" });

    if (entry) {
      let find_from = entry['stat_from']
      let dm_pages = await strapi
        .query("dm-page")
        .find({ created_at_gt: find_from ,_start:start});
      if (dm_pages.length) {
        strapi.log.info("option_arr", this.douyin_pk_conf["data"]["option_arr"]);

        for (let page of dm_pages) {
          this.calc_page(page);
        }
        // this.stat_pk = stat_pk;
        strapi.log.info(":::stat_from", find_from,'start',start);
        strapi.log.info(":::dm-pages count:", dm_pages.length);
        strapi.log.info(":::stat_", this.stat_pk);
        // strapi.log.info(":::stat_", this.stat_pk);
        if(dm_pages.length===100)
        {
          this.calc_pk(start+100)
        }
      }
      else {
        strapi.log.info("stat_pk", 'no dm-page from', find_from);
      }
    }
  },
};
