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
          <style global jsx>{`
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
              color: rgba(255, 239, 223, 0.8);
            }
            .ta-c {
              text-align: center;
            }
            .margin-center {
              margin: auto;
            }
            .translate-center {
              margin-left: 50%;
              transform: translateX(-50%);
            }

            a[data-tooltip] {
              position:relative;
              color: #fff;
              text-decoration: none;
            }
            a[data-tooltip]:after {
              content: attr(data-tooltip);
              position: absolute;
              left: 50%;
              top: -6px;
              transform: translateX(-50%) translateY(-100%);
              background: #ffefdf;
              text-align: center;
              color: #05050d;
              padding: 10px 16px;
              font-size: 16px;
              min-width: 300px;
              border-radius: 2px;
              display: none;
            }
            a[data-tooltip]:hover:after {
              display: block;
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
