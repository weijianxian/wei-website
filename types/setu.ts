export enum R18Enum {
  NotR18 = 0, // 非 R18
  R18 = 1, // R18
  Mixed = 2, // 混合（在库中的分类，不等同于作品本身的 R18 标识）
}

export interface SetuParams {
  r18?: R18Enum
  num?: number // 一次返回的结果数量，范围为1到20；在指定关键字或标签的情况下，结果数量可能会不足指定的数量
  uid?: number[] // 返回指定uid作者的作品，最多20个
  keyword?: string // 返回从标题、作者、标签中按指定关键字模糊匹配的结果，大小写不敏感，性能和准度较差且功能单一，建议使用tag代替
  tag?: string[] | string[][] // 返回匹配指定标签的作品，详见下文 [["萝莉", "少女"],["白丝", "黑丝"]] (萝莉 OR 少女) AND (白丝 OR 黑丝)
  size?: string[] // 返回指定图片规格的地址，如 ["small", "medium", "large"]，支持的规格有：original regular small thumb mini
  proxy?: string // 设置图片地址所使用的在线反代服务
  dateAfter?: number // 返回在这个时间及以后上传的作品；时间戳，单位为毫秒
  dateBefore?: number // 返回在这个时间及以前上传的作品；时间戳，单位为毫秒
  dsc?: boolean // 禁用对某些缩写keyword和tag的自动转换
  excludeAI?: boolean // 排除 AI 作品
  aspectRatio?: string // 图片长宽比 允许使用符合该正则形式的字符串对图片长宽比进行筛选 ((gt|gte|lt|lte|eq)[\d.]+){1,2}，顺序不影响，所有长宽比数据均四舍五入到精确到 3 位小数
}

export enum aiTypeEnum {
  Unknown = 0, // 未知（旧画作或字段未更新）
  NotAI = 1, // 不是
  IsAI = 2, // 是
}

export interface SetuResponse {
  error: string
  data: SetuData[]
}

export interface SetuData {
  pid: number // 作品 pid
  p: number // 作品所在页
  uid: number // 作者 uid
  title: string // 作品标题
  author: string // 作者名（入库时，并过滤掉 @及其后内容）
  r18: boolean // 是否 R18（在库中的分类，不等同于作品本身的 R18 标识）
  width: number // 原图宽度 px
  height: number // 原图高度 px
  tags: string[] // 作品标签，包含标签的中文翻译（有的话）
  ext: string // 图片扩展名
  aiType: aiTypeEnum // 是否是 AI 作品，0 未知（旧画作或字段未更新），1 不是，2 是
  uploadDate: number // 作品上传日期；时间戳，单位为毫秒
  urls: {
    [key: string]: string // 包含了所有指定size的图片地址
  }
}

// # size
// 规格	地址
// original 	https://i.pixiv.re/img-original/img/2021/06/14/17/25/59/90551655_p0.jpg
// regular  	https://i.pixiv.re/img-master/img/2021/06/14/17/25/59/90551655_p0_master1200.jpg
// small    	https://i.pixiv.re/c/540x540_70/img-master/img/2021/06/14/17/25/59/90551655_p0_master1200.jpg
// thumb    	https://i.pixiv.re/c/250x250_80_a2/img-master/img/2021/06/14/17/25/59/90551655_p0_square1200.jpg
// mini     	https://i.pixiv.re/c/48x48/img-master/img/2021/06/14/17/25/59/90551655_p0_square1200.jpg

// # proxy
// 占位符        说明                 实际值（以 90551655_p0 为例）
// {{pid}}      作品pid               90551655
// {{p}}        作品所在页             0
// {{uid}}	    作者uid 	            43454954
// {{ext}}	    图片扩展名 (original)  jpg
// {{path}}	    图片地址的相对路径	    根据规格不同而不同
// {{datePath}}	相对路径中的日期部分	  2021/06/14/17/25/59

// # dsc
// API 内部包含极少量规则，会对某些keyword和tag进行转换，使某些不适合搜索的词变得可以按预期进行搜索，它们通常是一些手游或者人物的缩写或简称，例如

// vtb => 虚拟YouTuber|VTuber
// fgo => Fate/GrandOrder|Fate/Grand Order|FateGrandOrder
// pcr => 公主连结|公主连结Re:Dive|プリンセスコネクト
// gbf => 碧蓝幻想
// 舰b => 碧蓝航线|AzurLane
// 舰c => 舰队collection
// 少前 => 少女前线|girlsfrontline
// 将dsc设置为任意真值可以禁用这些转换

// # aspectRatio
// 允许使用符合该正则形式的字符串对图片长宽比进行筛选 ((gt|gte|lt|lte|eq)[\d.]+){1,2}，顺序不影响，所有长宽比数据均四舍五入到精确到 3 位小数
// 竖图(<1) lt1
// 横图(>1) gt1
// 正方形图(=1) eq1
// 约为 16:9 的图(>1.7,<1.8) gt1.7lt1.8
// 基本上就是 16:9 的图(>=1.777,<=1.778) gte1.777lte1.778
