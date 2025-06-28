import { FetchServerGetApiRange } from '@/actions/server/fetch_server_api';
import API from '@/api/api';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { fileName: string } }) {
    const fileName = params.fileName;


    const range = req.headers.get('range'); // lấy header Range

    const backendRes = await FetchServerGetApiRange(`${API.VIDEO.STREAM}/${fileName}`, range)

    if (!backendRes) {
        return new Response("Không thể lấy video", { status: 500 });
    }

    // Trả lại response dưới dạng streaming
    const headers = new Headers();
    backendRes.headers.forEach((value, key) => headers.set(key, value));


    return new Response(backendRes.body, {
        status: backendRes.status,
        headers,
    });
}
