"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  init: false,
  douyin_pk_conf: null,
  douyin_pages_loaded: {},
  today_date: null,
  stat_pk: {},
  boot: async function () {
    const [entry] = await strapi
      .query("plugin-conf")
      .find({ name: "douyin-pk" });

    if (entry) {
      strapi.log.info("dm service index", entry.name);
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      let month_str, day_str;
      if (month < 10) {
        month_str = "0" + month;
      } else {
        month_str = String(month);
      }
      if (day < 10) {
        day_str = "0" + day;
      } else {
        day_str = String(day);
      }
      this.today_date = `${year}-${month_str}-${day_str}`;
      this.douyin_pk_conf = entry;
      this.stat_pk = {};
      strapi.log.info("dm-plugin today", this.today_date);
      strapi.log.info("strapi.services", strapi.services);
      await this.calc_pk();
    }
  },
  calc_page: async function (page) {
    const find_query = function (text, pk_conf, stat_pk) {
      for (let option of pk_conf["data"]["options"]) {
        const { query } = option;
        if (!stat_pk[query]) stat_pk[query] = 0;
        if (text.includes(query)) {
          stat_pk[query]++;
          strapi.log.info("calc_pk", query, stat_pk[query]);
        }
      }
    };
    const { data } = page;
    if (data && data["dm_arr"])
      for (let dm of data["dm_arr"]) {
        //   strapi.log.info("calc_pk", dm);
        const { text } = dm;
        find_query(text, this.douyin_pk_conf, this.stat_pk);
      }
  },
  calc_pk: async function () {
    const [entry] = await strapi
      .query("plugin-conf")
      .find({ name: "douyin-pk" });

    if (entry) {
      let dm_pages = await strapi
        .query("dm-page")
        .find({ date: this.today_date, date_gt: "2020-07-26T13:48:30.265Z" });
      if (dm_pages.length) {
        for (let page of dm_pages) {
          this.calc_page(page);
        }
        // this.stat_pk = stat_pk;
        strapi.log.info("stat_pk", this.stat_pk);
      }
    }
  },
};
