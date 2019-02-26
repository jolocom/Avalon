import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            async
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css"
          />
          <link rel="stylesheet" href="/static/fonts/fonts.css" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color="#942f51"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <title>Welcome to Avalon</title>

          <style>{`
            html {
              color: #ffefdf;
              font-size: 12px;
              font-family: TTCommons;
              height: 100%;
              width: 100%;
              overflow: hidden;
            }
            body {
              height: 100%;
              padding: 0;
              overflow: auto;
              margin: 0;
            }
            * {
              box-sizing: border-box;
            }
            h1 {
              font-size: 4.67rem;
              line-height: 4.67rem;
              font-weight: 400;
              margin: 3.58rem 0;
            }
            h2 {
              font-size: 2.67rem !important;
            }
            h3 {
              margin: 10px 0;
              font-size: 1.67rem;
            }
            h4 {
              font-size: 1.5rem;
              margin: 3.33rem 0 2rem;
            }
            h5 {
              font-size: 1.17rem;
              color: rgba(5,5,13,0.40);
              text-decoration: underline;
              margin: 0;
            }
            p {
              font-size: 1.5rem;
              line-height: 2.17rem;
              font-weight: 400;
              color: rgba(255, 239, 223, 0.8);
              margin: 3.33rem 0;
            }
            p.small {
              font-size: 14px;
            }
            p.medium {
              font-size: 15px;
            }
            p.big {
              font-size: 2.67rem;
              line-height: 3.67rem
            }
            p.pink {
              color: #942f51 !important;
            }
            p.gray {
              color: rgba(5,5,13,0.60) !important;
            }
            .success-text {
              color: #28A52D;
              font-size: 1.5rem;
              line-height: 1.42rem;
            }
            .ta-c {
              text-align: center;
            }
            .margin-center {
              margin: auto;
            }
            .mt-1 {
              margin-top: 1rem;
            }
            .mt-5 {
              margin-top: 5rem;
            }
            .mt-2 {
              margin-top: 2rem;
            }
            .translate-center {
              margin-left: 50%;
              transform: translateX(-50%);
            }
            .qrCode {
              width: 16.67rem;
              height: 16.67rem;
            }

            *[data-tooltip] {
              position:relative;
            }
            *[data-tooltip]:after {
              content: attr(data-tooltip);
              position: absolute;
              left: 50%;
              top: -6px;
              transform: translateX(-50%) translateY(-100%);
              background: #ffefdf;
              text-align: center;
              color: #05050d;
              padding: 10px 16px;
              font-size: 15px;
              min-width: 300px;
              border-radius: 2px;
              visibility: hidden;
              opacity: 0;
              transition: visibility 0s, opacity .4s linear;
            }
            *[data-tooltip]:hover:after {
              visibility: visible;
              opacity: 1;
            }
            
            .isvg {
              display: inherit;
            }
            .AvalonLogo {
              height: 3.33rem;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
