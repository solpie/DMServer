import { strapi_ } from '../../strapi'
import { DouyinStat } from './dm-page-stat'
const strapi = strapi_
const douyinStatSrv = new DouyinStat()
setTimeout(async () => {
  await douyinStatSrv.boot()
  let dm_arr = await douyinStatSrv.find_lottery_user(100, 0, [])
  strapi_.log.info('douyinStatSrv dm_arr', dm_arr.length)
}, 2000)
export const PLUG_POST_dm_page = async (ctx: any) => {
  // post new dmk_list from airtest
  const { dmk_list } = ctx.request.body as any
  strapi.log.info('PLUG_POST_dm_page', dmk_list.length)

  let new_dm_arr = []
  if (dmk_list && dmk_list.length > 0) {
    strapi.log.info('receive from airtest<==dmk_list:', dmk_list.length)
    for (let dmk of dmk_list) {
      let a = dmk.split('：')
      if (a.length > 1) {
        let username = a.shift()
        let text = a.join('：')
        strapi.log.info(`::${username}: `, text)
        new_dm_arr.push({ username, text })
      }
    }
  }
  let entry: any
  if (new_dm_arr.length) {
    // let timestamp_sec = Math.floor(new Date().getTime() / 1000);
    let new_page = {
      data: { dm_arr: new_dm_arr }
    }
    entry = await strapi.query('dm-page').create(new_page)
    let created_at = entry['created_at'] as any
    strapi.log.info('new dm-page created_at', created_at)
    douyinStatSrv.calc_page(new_page)
    strapi.log.info('stat_pk', douyinStatSrv.stat_pk)
  }
  // Send 200 `ok`
  ctx.send({
    message: 'ok',
    create_count: new_dm_arr.length
  })
}
export const PLUG_POST_update_conf = async (ctx: any) => {
  await douyinStatSrv.boot()
  ctx.send({
    message: 'ok',
    stat: douyinStatSrv.stat_pk,
    conf: douyinStatSrv.douyin_pk_conf['data'] as any
  })
}
export const PLUG_GET_dm_page = async (ctx: any) => {
  strapi.log.info('dm stat start')
  // Send 200 `ok`
  ctx.send({
    message: 'ok',
    stat: douyinStatSrv.stat_pk,
    conf: douyinStatSrv.douyin_pk_conf['data'] as any
  })
}
