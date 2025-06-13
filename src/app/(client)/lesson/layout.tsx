import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import LessonClientLayout from "./lesson_client_layout";
import API from "@/api/api";
import { SubmittedClientProvider } from "@/context/submitted_client_context";


export default async function LessonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <>
            <SubmittedClientProvider>
                <LessonClientLayout>
                    {children}
                </LessonClientLayout>
            </SubmittedClientProvider>


        </>


    );
}
