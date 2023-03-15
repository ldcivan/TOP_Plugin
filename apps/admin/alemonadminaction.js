import { BotApi, plugin, Super } from '../../model/api/api.js'
/**自带更新，替换为自己的插件名即可使用*/
export class AlemonAdminAction extends plugin {
    constructor() {
        super(Super({
            /** 功能名称 */
          name: '幻塔更新',
          /** 功能描述 */
          dsc: '幻塔更新',
          /** https://oicqjs.github.io/oicq/#events */
          event: 'message',
          /** 优先级，数字越小等级越高 */
          priority: 2500,
            rule: [
                {
                    reg: '^#幻塔更新$',
                    fnc: 'TOPUpdata'
                }
            ]
        }))
    }
    TOPUpdata = async (e) => {
        if (!e.isMaster) {
            return
        }
        await BotApi.Exec.execStart({ cmd: 'git  pull', e })
        return
    }
}