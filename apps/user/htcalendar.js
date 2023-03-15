import { BotApi, Super, plugin } from '../../model/api/api.js'
import { createRequire } from 'module'
import {segment} from'oicq'
const require = createRequire(import.meta.url)
const puppeteer = require('puppeteer');


export class htcalendar extends plugin {
    constructor() {
        super(Super({
            /** 功能名称 */
          name: '幻塔日历',
          /** 功能描述 */
          dsc: '主动获得幻塔日历',
          /** https://oicqjs.github.io/oicq/#events */
          event: 'message',
          /** 优先级，数字越小等级越高 */
          priority: 2500,
            rule: [
                {
                    reg: '^#幻塔日历$',
                    fnc: 'calendar'
                },
            ]
        }))
    }
    
    async calendar (e) {
        await e.reply("正在拉取……");
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
        await page.goto("https://wiki.biligame.com/ht/%E9%A6%96%E9%A1%B5", {
           timeout: 30 * 1000,
           waitUntil: [
               'load',                       //等待 “load” 事件触发
               'domcontentloaded',  //等待 “domcontentloaded” 事件触发
               'networkidle0',          //在 500ms 内没有任何网络连接
               'networkidle2'           //在 500ms 内网络连接个数不超过 2 个
           ]
        });
        await page.waitForSelector('#time-loading1');
        await page.setViewport({
            width: 5120,
            height: 2600
        });
        
        let body = await page.$$('.BILIBILI-BOX.ht-box1')
        await this.reply(segment.image(await body[2].screenshot({
            
        })))
        await browser.close();
    }
}