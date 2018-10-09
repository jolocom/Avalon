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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
          <link rel="stylesheet" href="/static/fonts/fonts.css" />
          <link rel="stylesheet" href="/static/css/scroll-effects.css" />
          <style>{`
            html {
              color: #ffefdf;
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
              -webkit-overflow-scrolling: touch;
            }
            * {
              box-sizing: border-box;
            }
            h1 {
              font-weight: 700;
              font-size: 56px;
            }
            p {
              font-size: 20px;
            }
            .ta-c {
              text-align: center;
            }
            .margin-center {
              margin: auto;
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
