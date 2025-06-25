import { FetchServerGetApiRange, FetchServerGetApiRangeNoToken } from '@/actions/server/fetch_server_api';
import API from '@/api/api';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { fileName: string } }) {
    const fileName = params.fileName;

  console.log("fileName >>> ", fileName);
    const range = req.headers.get('range'); // lấy header Range

    const backendRes = await FetchServerGetApiRangeNoToken(`${API.VIDEO.TRAILER}/${fileName}`, range)

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
