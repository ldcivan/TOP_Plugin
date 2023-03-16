import { BotApi, plugin, Super } from '../../model/api/api.js'
import {exec} from "child_process";
/**自带更新，替换为自己的插件名即可使用*/


export class AlemonAdminAction extends plugin {
    constructor() {
        super(Super({
	@@ -13,17 +16,67 @@ export class AlemonAdminAction extends plugin {
          priority: 2500,
            rule: [
                {
                    reg: '^#幻塔(强制)?更新$',
                    fnc: 'TOPUpdata'
                }
            ]
        }))
    }


    async TOPUpdata(e) {
        const _path = process.cwd();
        if (e.isMaster) {
        	let isForce = e.msg.includes("强制");
        	let command = "git  pull";
        	if (isForce) {
        		command = "git  checkout . && git  pull";
        		e.reply("正在执行强制更新操作，请稍等");
        	} else {
        		e.reply("正在执行更新操作，请稍等");
        	}
        	exec(command, {
        		cwd: `${_path}/plugins/TOP-plugin/`
        	}, function(error, stdout, stderr) {
        		//console.log(stdout);
        		if (/Already up[ -]to[ -]date/.test(stdout)||stdout.includes("最新")) {
        			e.reply("目前已经是最新版幻塔TOP插件了~");
        			return true;
        		}
        		if (error) {
        			e.reply("幻塔TOP插件更新失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。");
        			return true;
        		}
        		e.reply("幻塔TOP插件更新成功，尝试重新启动Yunzai以应用更新...");
        		timer && clearTimeout(timer);
        		redis.set("TOP:restart-msg", JSON.stringify({
        			msg: "重启成功，新版幻塔TOP插件已经生效",
        			qq: e.user_id
        		}), {
        			EX: 30
        		});
        		timer = setTimeout(function() {
        			let command = `npm run start`;
        			if (process.argv[1].includes("pm2")) {
        				command = `npm run restart`;
        			}
        			exec(command, function(error, stdout, stderr) {
        				if (error) {
        					e.reply("自动重启失败，请手动重启以应用新版幻塔TOP插件。\nError code: " + error.code + "\n" +
        						error.stack + "\n");
        					Bot.logger.error('重启失败\n${error.stack}');
        					return true;
        				} else if (stdout) {
        					Bot.logger.mark("重启成功，运行已转为后台，查看日志请用命令：npm run log");
        					Bot.logger.mark("停止后台运行命令：npm stop");
        					process.exit();
        				}
        			})
        		}, 1000);

        	});
        	return true;
    	}
    	else await e.reply("你不是主人，无权使用该命令")
    }
}
