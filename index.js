import { BotApi } from './model/api/api.js';
/*对插件指定路径的js进行exprot*/
const apps = await BotApi.toIndex({ indexName: 'apps' });
export { apps }; 