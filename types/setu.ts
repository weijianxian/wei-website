export enum R18Enum {
    NotR18 = 0, // 非 R18
    R18 = 1,    // R18
    Mixed = 2,  // 混合（在库中的分类，不等同于作品本身的 R18 标识）
}

export interface SetuParams {
    r18?: R18Enum;
    num?: number; // 一次返回的结果数量，范围为1到20；在指定关键字或标签的情况下，结果数量可能会不足指定的数量
    uid?: number[]; // 返回指定uid作者的作品，最多20个
    keyword?: string; // 返回从标题、作者、标签中按指定关键字模糊匹配的结果，大小写不敏感，性能和准度较差且功能单一，建议使用tag代替
    tag?: string[] | string[][]; // 返回匹配指定标签的作品，详见下文 [["萝莉", "少女"],["白丝", "黑丝"]] (萝莉 OR 少女) AND (白丝 OR 黑丝)
    size?: string[]; // 返回指定图片规格的地址，详见下文
    proxy?: string; // 设置图片地址所使用的在线反代服务
    dateAfter?: number; // 返回在这个时间及以后上传的作品；时间戳，单位为毫秒
    dateBefore?: number; // 返回在这个时间及以前上传的作品；时间戳，单位为毫秒
    dsc?: boolean; // 禁用对某些缩写keyword和tag的自动转换
    excludeAI?: boolean; // 排除 AI 作品
    aspectRatio?: string; // 图片长宽比
}

export enum aiTypeEnum {
    Unknown = 0, // 未知（旧画作或字段未更新）
    NotAI = 1,   // 不是
    IsAI = 2,    // 是
};

export interface SetuResponse {
    error?: string; // 错误信息
    data?: SetuData[]; // 色图数组
}
export interface SetuData {
    pid: number; // 作品 pid
    p: number; // 作品所在页
    uid: number; // 作者 uid
    title: string; // 作品标题
    author: string; // 作者名（入库时，并过滤掉 @及其后内容）
    r18: boolean; // 是否 R18（在库中的分类，不等同于作品本身的 R18 标识）
    width: number; // 原图宽度 px
    height: number; // 原图高度 px
    tags: string[]; // 作品标签，包含标签的中文翻译（有的话）
    ext: string; // 图片扩展名
    aiType: aiTypeEnum; // 是否是 AI 作品，0 未知（旧画作或字段未更新），1 不是，2 是
    uploadDate: number; // 作品上传日期；时间戳，单位为毫秒
    urls: {
        [key: string]: string; // 包含了所有指定size的图片地址
    };
}
