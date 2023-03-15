import { BotApi, AlemonApi, plugin, Super } from '../../model/api/api.js'
/*数据激活：当间接编译到data/indexjs的时候此方法可删除*/
AlemonApi.DataIndex.start()
export class AlemonAdminConfig extends plugin {
    constructor() {
        super(Super({
            /** 功能名称 */
          name: '幻塔配置',
          /** 功能描述 */
          dsc: '幻塔配置',
          /** https://oicqjs.github.io/oicq/#events */
          event: 'message',
          /** 优先级，数字越小等级越高 */
          priority: 2500,
            rule: [
                {
                    reg: '^#幻塔配置更改.*',
                    fnc: 'TOPConfigUpdata',
                },
                {
                    reg: '^#幻塔配置',
                    fnc: 'TOPConfigShow',
                },
                {
                    reg: '^#幻塔重置配置',
                    fnc: 'TOPConfigre',
                }
            ]
        }))
    }
    TOPConfigUpdata = async (e) => {
        if (!e.isMaster) {
            return
        }
        const [name, size] = e.msg.replace('#柠檬配置更改', '').split('\*')
        /*配置文件方法,右键方法转定义后自行编写*/
        e.reply(AlemonApi.DefsetData.updataConfig({ name, size }))
        return
    }
    TOPConfigShow = async (e) => {
        if (!e.isMaster) {
            return
        }
        const isreply = await e.reply(await BotApi.ImgIndex.showPuppeteer({
            path: 'defset', name: 'defset', data:
                await AlemonApi.DefsetData.getConfig({
                    app: 'parameter',
                    name: 'cooling'
                })
        }))
        await BotApi.User.surveySet({ e, isreply })
        return
    }
    TOPConfigre = async (e) => {
        if (!e.isMaster) {
            return
        }
        AlemonApi.CreateData.moveConfig({ choice: 'updata' })
        e.reply('重置完成')
        return
    }
}