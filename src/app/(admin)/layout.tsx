
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <h1>Layout Admin</h1>
      {children}
    </>
  );
}
