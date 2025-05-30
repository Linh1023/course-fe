import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import LessonClientLayout from "./lesson_client_layout";
import API from "@/api/api";


export default async function  LessonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    

    return (
        <>
            <LessonClientLayout>
                {children}
            </LessonClientLayout>

        </>


    );
}
