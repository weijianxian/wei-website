import { NextResponse } from "next/server";
import axios from 'axios';
export const runtime = "edge";

export async function POST(body: Request) {
    try {
        const bodyData = await body.json();

        const response = await axios({
            method: 'post',
            url: 'https://api.lolicon.app/setu/v2',
            data: bodyData,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // axios直接返回解析后的数据
        return NextResponse.json(response.data);
    } catch (err: unknown) {
        console.error(err);
        
        // 处理axios错误
        if (axios.isAxiosError(err)) {
            // 服务器返回了错误状态码
            if (err.response) {
                console.error("API错误响应:", err.response.data);
                return NextResponse.json(
                    {error: err.response.data.error || err.response.data || "发生了未知错误"}, 
                    { status: err.response.status || 500 }
                );
            } 
            // 请求已发出，但没有收到响应
            else if (err.request) {
                console.error("无响应:", err.request);
                return NextResponse.json({ error: "无法连接到API服务" }, { status: 503 });
            }
        }
        
        // 其他错误
        return NextResponse.json({ error: "服务器内部异常" }, { status: 500 });
    }
}