import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CurrentAccountProvider } from "@/context/current_account_context";
import { FetchServerGetApiNoRediect } from "@/actions/server/fetch_server_api";
import NextTopLoader from "nextjs-toploader";
import API from "@/api/api";
import { LoadingProvider } from "@/context/loading_context";
import Loading from "@/components/share/loading";
import { Toaster } from "sonner";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await FetchServerGetApiNoRediect(API.ACCOUNT.CURRENT_ACCOUNT);
  let currentAccount: CurrentAccountResponse | null = null
  if (res && res.status === 200) {
    currentAccount = res.result;

  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <CurrentAccountProvider
            currentAccountRes={currentAccount}
          >
            <Loading />
            {children}
          </CurrentAccountProvider>
        </LoadingProvider>



        <NextTopLoader
          color="#FE4444"
          initialPosition={0.08}
          crawlSpeed={50}
          height={3}
          crawl={true}
          easing="ease"
          speed={50}
          zIndex={1600}
          showAtBottom={false}
          showSpinner={false}
        />

        <Toaster richColors />

      </body>
    </html>
  );
}
