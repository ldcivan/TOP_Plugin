import { BotApi, Super, plugin } from '../../model/api/api.js'
export class AlemonGetHelp extends plugin {
    constructor() {
        super(Super({
            /** 功能名称 */
          name: '幻塔帮助',
          /** 功能描述 */
          dsc: '幻塔帮助',
          /** https://oicqjs.github.io/oicq/#events */
          event: 'message',
          /** 优先级，数字越小等级越高 */
          priority: 2500,
            rule: [
                {
                    reg: '^#幻塔(帮助|菜单|help)$',
                    fnc: 'TOPHelp'
                },
                {
                    reg: '^#幻塔管理$',
                    fnc: 'TOPAdmin',
                }
            ]
        }))
    }
    TOPHelp = async (e) => {
        const data = await BotApi.ImgHelp.getboxhelp({ name: 'help', item: {title: '#幻塔帮助',desc: 'For Yunzai-Bot'}})
        if (!data) {
            return
        }
        await e.reply(await BotApi.ImgCache.helpcache({ i: 1, data }))
    }
    TOPAdmin = async (e) => {
        const data = await BotApi.ImgHelp.getboxhelp({ name: 'admin', item: {title: '#幻塔管理',desc: 'For Yunzai-Bot'}})
        if (!data) {
            return
        }
        await e.reply(await BotApi.ImgCache.helpcache({ i: 0, data }))
    }
}