
export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <h1>Layout Client</h1>
      {children}
    </>


  );
}
