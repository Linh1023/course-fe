import ProfileClientLayout from "./profile_client_layout";

export default async function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <div className="min-h-screen md:flex md:justify-center">
  <ProfileClientLayout>
    {children}
  </ProfileClientLayout>
</div>


        </>


    );
}
