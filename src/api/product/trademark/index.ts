//品牌管理模块的接口
import request from '@/utils/request' //导入自己封装的axios

//引入ts类型
import type { TradeMarkResponseData } from './type'

//品牌管理模块的接口地址
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

//获取已有品牌的接口的方法
//携带参数: page: 获取第几页, 默认第一页
//limit: 获取几个已有品牌的数组
export const reqHasTrademark = (page: number, limit: number): Promise<any> => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}
