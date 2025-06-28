import Footer from "@/components/client/share/Footer";
import MyConnect from "@/components/client/share/MyConnect";
import { Navigation } from "@/components/client/share/navigation";
import { QuerySearchClientProvider } from "@/context/query_search_client_context";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <h1>Layout Client</h1> */}
      <QuerySearchClientProvider>
        <Navigation></Navigation>
        {/* <Navbar></Navbar> */}
        {children}
        <Footer />
      </QuerySearchClientProvider>

    </>


  );
}
