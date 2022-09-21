import type { AppProps } from "next/app";
import Head from "next/head";
import "bootswatch/dist/pulse/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
