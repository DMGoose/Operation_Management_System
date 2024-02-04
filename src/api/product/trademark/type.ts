//定义品牌的ts类型

export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

//已有的品牌的数据类型(就是每条数据里的类型)
export interface TradeMark{
    id?: number;  //已有的品牌是有id 的, 后面加的没有(因为是数据库自己加的id), 所以这里打?, 表示可有可无
    tmName: string;
    logoUrl: string;
}

//包含全部品牌数据的ts类型
export type Records = TradeMark[];

//获取的已有的全部品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData{
    data:{
        records: Records;
        total: number;
        size:number;
        current: number;
        searchCount: boolean;
        pages: number;

    }
}