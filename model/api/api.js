/* yunzai */
import plugin from '../../../../lib/plugins/plugin.js'
/* bot */
import { BotApi } from './botapi.js'
/* alemon */
import { AlemonApi } from './alemonapi.js'
export { BotApi, AlemonApi, plugin }
export const Super = ({ name = 'home', dsc = 'home', event = 'message', priority = 400, rule }) => {
    return { name, dsc, event, priority, rule }
}