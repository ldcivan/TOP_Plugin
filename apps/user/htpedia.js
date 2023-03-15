import { BotApi, Super, plugin } from '../../model/api/api.js'
import { createRequire } from 'module'
import {segment} from'oicq'
const require = createRequire(import.meta.url)
const puppeteer = require('puppeteer');


export class htpedia extends plugin {
    constructor() {
        super(Super({
            /** 功能名称 */
          name: '幻塔图鉴',
          /** 功能描述 */
          dsc: '主动获得幻塔图鉴',
          /** https://oicqjs.github.io/oicq/#events */
          event: 'message',
          /** 优先级，数字越小等级越高 */
          priority: 5000,
            rule: [
                {
                    reg: '^#幻塔(.*)图鉴$',
                    fnc: 'pedia'
                },
            ]
        }))
    }
    
    async pedia (e) {
        var keyname = e.msg.replace("#幻塔","");
        keyname = keyname.replace("图鉴","");
        await e.reply(`正在拉取${keyname}的信息……`);
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--single-process'
              ]
        });
        const page = await browser.newPage();
        await page.goto(`https://wiki.biligame.com/ht/${keyname}`, {
           timeout: 30 * 1000,
           waitUntil: [
               'load',                       //等待 “load” 事件触发
               'domcontentloaded',  //等待 “domcontentloaded” 事件触发
               'networkidle0',          //在 500ms 内没有任何网络连接
               'networkidle2'           //在 500ms 内网络连接个数不超过 2 个
           ]
        });
        await page.waitForSelector('.mw-parser-output');
        
        let div_selector_to_remove= ".bui-sns-info.hidden-xs";
        await page.evaluate((sel) => {
            var elements = document.querySelectorAll(sel);
            for(var i=0; i< elements.length; i++){
                elements[i].parentNode.removeChild(elements[i]);
            }
        }, div_selector_to_remove)
        div_selector_to_remove= ".wiki-nav.hidden-xs.wiki-nav-celling";
        await page.evaluate((sel) => {
            var elements = document.querySelectorAll(sel);
            for(var i=0; i< elements.length; i++){
                elements[i].parentNode.removeChild(elements[i]);
            }
        }, div_selector_to_remove)
        
        
        await page.setViewport({
            width: 5120,
            height: 2600
        });
        
        let body = await page.$('.mw-parser-output')
        await this.reply(segment.image(await body.screenshot({
            
        })))
        await browser.close();
    }
}