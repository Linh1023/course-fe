import ProfileClientLayout from "./profile_client_layout";

export default async function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <div className="flex justify-center min-h-screen">
                <ProfileClientLayout>
                   {children}
                </ProfileClientLayout>
            </div>

        </>


    );
}
