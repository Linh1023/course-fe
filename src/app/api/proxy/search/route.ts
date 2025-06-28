"use server"
import { FetchServerGetApi } from '@/actions/server/fetch_server_api';

export async function GET(req: Request) {
    const searchParams = new URL(req.url).searchParams;
    const api = searchParams.get('api');
    searchParams.delete('api');

    const data = await FetchServerGetApi(api + `?${searchParams}`)
    return new Response(JSON.stringify(data));
}