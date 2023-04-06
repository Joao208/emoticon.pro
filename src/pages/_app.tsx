import "dist/main.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { NextSeo } from "next-seo";

const poppins = Poppins<"--font-poppins">({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <main className={`${poppins.variable} font-sans`}>
        <Component {...pageProps} />
        <ToastContainer />
        <NextSeo
          title="Search any emoji with natural language | emoticon.pro"
          description="Search any emoji with natural language. Find the perfect emoji for your next project."
          canonical="https://www.emoticon.pro"
          openGraph={{
            url: "https://emoticon.pro",
            title: "Search any emoji with natural language | emoticon.pro",
            description:
              "Search any emoji with natural language. Find the perfect emoji for your next project.",
            images: [
              {
                url: "/og-image-01.png",
                width: 1728,
                height: 1117,
                alt: "The home page",
                type: "image/png",
              },
            ],
            siteName: "emoticon.pro",
          }}
          twitter={{
            cardType: "summary_large_image",
          }}
        />
      </main>
    </>
  );
}
