import fs from 'node:fs'
import path from 'path'
import YAML from 'yaml'
const PATH_TAML = `${path.resolve()}${path.sep}config${path.sep}config/`
const bot = `${PATH_TAML}bot.yaml`
const group = `${PATH_TAML}group.yaml`
const other = `${PATH_TAML}other.yaml`
const qq = `${PATH_TAML}qq.yaml`
const redis = `${PATH_TAML}redis.yaml`
class ConfigModify {
    gitConfig = (name) => {
        const map = {
            'bot': bot,
            'group': group,
            'other': other,
            'qq': qq,
            'redis': redis
        }
        return YAML.parse(fs.readFileSync(`${map[name]}`, 'utf8'))
    }
    robotConfig = () => {
        //功能配置
        const botData = YAML.parse(fs.readFileSync(`${bot}`, 'utf8'))
        const groupData = YAML.parse(fs.readFileSync(`${group}`, 'utf8'))
        const otherData = YAML.parse(fs.readFileSync(`${other}`, 'utf8'))
        const qqData = YAML.parse(fs.readFileSync(`${qq}`, 'utf8'))
        const redisData = YAML.parse(fs.readFileSync(`${redis}`, 'utf8'))
        console.log([botData, groupData, otherData, qqData, redisData])
        return
    }
    /**
     * 查看所有可关闭的配置
     * @returns 
     */
    allDisable = () => {
        return ['十连', '角色查询', '体力查询', '用户绑定', '抽卡记录', '添加表情', '欢迎新人', '退群通知', '云崽帮助', '角色素材', '今日素材', '养成计算', '米游社公告']
    }
    /**
     * 一键关闭时所有功能 
     */
    deleteAllConfig = () => {
        const data = YAML.parse(fs.readFileSync(`${group}`, 'utf8'))
        const sum = ['十连', '角色查询', '体力查询', '用户绑定', '抽卡记录', '添加表情', '欢迎新人', '退群通知', '云崽帮助', '角色素材', '今日素材', '养成计算', '米游社公告']
        data.default.disable.push(...sum)
        const yamlStr = YAML.stringify(data)
        fs.writeFileSync(group, yamlStr, 'utf8')
        return ['关闭成功']
    }
    openReadconfig = () => {
        const data = YAML.parse(fs.readFileSync(`${group}`, 'utf8'))
        data.default.disable = []
        const yamlStr = YAML.stringify(data)
        fs.writeFileSync(group, yamlStr, 'utf8')
        return '开启成功'

    }
    Readconfighelp = (parameter) => {
        const { name } = parameter
        const data = YAML.parse(fs.readFileSync(`${group}`, 'utf8'))
        const sum = [name]
        data.default.disable.push(...sum)
        const yamlStr = YAML.stringify(data)
        fs.writeFileSync(group, yamlStr, 'utf8')
        return '设置成功'

    }
    openReadconfighelp = (parameter) => {
        const { name } = parameter
        const data = YAML.parse(fs.readFileSync(`${group}`, 'utf8'))
        const sum = []
        data.default.disable.forEach((item) => {
            if (item != name) {
                sum.push(item)
            }
        })
        data.default.disable = sum
        const yamlStr = YAML.stringify(data)
        fs.writeFileSync(group, yamlStr, 'utf8')
        return '设置成功'

    }
    AddMaster = (parameter) => {
        const { mastername } = parameter
        const QQ = Number(mastername)
        const data = YAML.parse(fs.readFileSync(`${other}`, 'utf8'))
        const sum = [QQ]
        data.masterQQ.push(...sum)
        const yamlStr = YAML.stringify(data)
        fs.writeFileSync(other, yamlStr, 'utf8')
        return '添加成功'

    }
    DeleteMaster = (parameter) => {
        const { mastername } = parameter
        const QQ = Number(mastername)
        const data = YAML.parse(fs.readFileSync(`${other}`, 'utf8'))
        const sum = []
        data.masterQQ.forEach((item) => {
            if (item != QQ) {
                sum.push(item)
            }
        })
        data.masterQQ = sum
        const yamlStr = YAML.stringify(data)
        fs.writeFileSync(other, yamlStr, 'utf8')
        return '删除成功'

    }
    OffGroup = () => {
        const data = YAML.parse(fs.readFileSync(`${other}`, 'utf8'))
        data.disablePrivate = true
        const yamlStr = YAML.stringify(data)
        fs.writeFileSync(other, yamlStr, 'utf8')
        return '关闭成功'
    }
    OnGroup = () => {
        const data = YAML.parse(fs.readFileSync(`${other}`, 'utf8'))
        data.disablePrivate = false
        const yamlStr = YAML.stringify(data)
        fs.writeFileSync(other, yamlStr, 'utf8')
        return '开启成功'
    }
}
export default new ConfigModify()