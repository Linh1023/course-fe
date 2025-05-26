import Navbar from "@/components/client/share/navbar";
import { Navigation } from "@/components/client/share/navigation";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <h1>Layout Client</h1> */}
      <Navigation></Navigation>
      {/* <Navbar></Navbar> */}
        {children}
     
    </>


  );
}
