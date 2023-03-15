import { BotApi, Super, plugin } from '../../model/api/api.js'
import { createRequire } from 'module'
import {segment} from'oicq'
import gsCfg from '../../model/gsCfg.js'
import utils from "../../model/mys/utils.js";
const _path = process.cwd();


export class htdictionary extends plugin {
    constructor() {
        super(Super({
            /** 功能名称 */
          name: '幻塔图鉴列表',
          /** 功能描述 */
          dsc: '主动获得幻塔图鉴列表',
          /** https://oicqjs.github.io/oicq/#events */
          event: 'message',
          /** 优先级，数字越小等级越高 */
          priority: 5000,
            rule: [
                {
                    reg: '^#幻塔(.*)列表',
                    fnc: 'dictionary'
                },
            ]
        }))
    }
    
    async dictionary (e) {
        var name = e.msg.replace("#幻塔","");
        name = name.replace("列表","");
        let list = gsCfg.getfileYaml(`${_path}/plugins/TOP-plugin/resources/dictionary/`, 'main')
        await e.reply(`正在拉取${name}下的列表……`);
    	for (let i in list) {
    		let title = i.split("|");
    		for (let j = 0; j < title.length; j++) {
    			if (title[j] == name) {
    				await utils.replyMake(e, [`当前选择【#幻塔${name}列表】`, "请选择:\n" + list[i].join("\n")], 0)
    				return true;
    			}
    		}
    	}
    	return false;
    }
}