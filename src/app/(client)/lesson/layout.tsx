import LessonClientLayout from "./lesson_client_layout";

export default async function LessonLayout({
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
