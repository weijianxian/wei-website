export interface HttpResponse<T> {
  code: HttpCode
  message: string
  data: T
}

export enum HttpCode {
  SUCCESS = 10000, //正常

  SERVER_ERROR = 20000, // 服务端出现异常
  SERVER_PARAM_ERROR = 20001, // 请求参数错误
  SERVER_TOO_MANY = 20002, // 请求过于频繁
}
