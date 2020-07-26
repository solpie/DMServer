"use strict";

/**
 * dm-plugin.js controller
 *
 * @description: A set of functions called "actions" of the `dm-plugin` plugin.
 */

const get_plugin_srv = () => {
  return strapi.services["plugin-conf"];
};

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    strapi.log.info("dm stat start");
    // Send 200 `ok`
    ctx.send({
      message: "ok",
      stat: get_plugin_srv().stat_pk,
      conf:get_plugin_srv().douyin_pk_conf['data']
    });
  },
  POST_update_conf: async (ctx) => {
    await  get_plugin_srv().boot();
  },
  index_POST: async (ctx) => {
    let { dmk_list } = ctx.request.body;
    let new_dm_arr = [];
    if (dmk_list && dmk_list.length > 0) {
      strapi.log.info("receive from airtest<==dmk_list:", dmk_list.length);
      for (let dmk of dmk_list) {
        let a = dmk.split("：");
        if (a.length > 1) {
          let username = a.shift();
          let text = a.join("：");
          strapi.log.info(username, text);
          new_dm_arr.push({ username, text });
        }
      }
    }
    let entry;
    if (new_dm_arr.length) {
      let new_page = {
        data: { dm_arr: new_dm_arr },
        date:  get_plugin_srv().today_date,
      };
      entry = await strapi.query("dm-page").create(new_page);
      get_plugin_srv().calc_page(new_page);
    }
    // Send 200 `ok`
    ctx.send({
      message: "ok",
      create_count: new_dm_arr.length,
    });
  },
};
