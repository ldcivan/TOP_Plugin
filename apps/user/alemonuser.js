import { BotApi, Super, plugin } from '../../model/api/api.js'
export class AlemonUser extends plugin {
    constructor() {
        super(Super({
            /** 功能名称 */
          name: '幻塔备用接口',
          /** 功能描述 */
          dsc: '备用',
          /** https://oicqjs.github.io/oicq/#events */
          event: 'message',
          /** 优先级，数字越小等级越高 */
          priority: 2500,
            rule: [
                {
                    reg: '^#柠檬信息$',
                    fnc: 'alemonMsg'
                },
            ]
        }))
    }
    alemonMsg = async (e) => {
        const isreply = await e.reply('待更新')
        await BotApi.User.surveySet({ e, isreply })
        return
    }
}