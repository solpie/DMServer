import {
  PLUG_GET_dm_page,
  PLUG_POST_dm_page
} from './plugins/dm-page.plugin/dm-page'
//┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
//╎                plugin routes
//╎
//╎
//└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘

const POST_plugins: any = {
  boot: PLUG_POST_dm_page,
  'dm-page': PLUG_POST_dm_page
}
const GET_plugins: any = {
  // /srv/dm-page/get
  'dm-page': PLUG_GET_dm_page
}
//┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
//╎                 strapi handler
//╎
//╎
//└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
module.exports = {
  index: async (ctx: any) => {
    const { plugin_name } = ctx.params
    await handle(GET_plugins, plugin_name, ctx)
  },
  index_post: async (ctx: any) => {
    const { plugin_name } = ctx.params
    await handle(POST_plugins, plugin_name, ctx)
  }
}
//┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
//╎                  handler
//╎
//╎
//└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
const handle = async (plugin_routes: any, plugin_name: string, ctx: any) => {
  const func = plugin_routes[plugin_name]
  if (func) await func(ctx)
  else
    ctx.send({
      msg: 'no plugin',
      plugin_name
    })
}
