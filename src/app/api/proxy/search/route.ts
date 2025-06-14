"use server"
import { FetchServerGetApi } from '@/actions/server/fetch_server_api';

export async function GET(req: Request) {
    const searchParams = new URL(req.url).searchParams;
    const q = searchParams.get('q');
    const api = searchParams.get('api');

    const data = await FetchServerGetApi(api + `?${q}`);
    return new Response(JSON.stringify(data));
}