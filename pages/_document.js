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
          <link async rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
          <link rel="stylesheet" href="/static/fonts/fonts.css" />
        </Head>
        <body>
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
              font-size: 56px !important;
              font-weight: 300;
            }
            h2 {
              font-size: 32px !important;
            }
            h3 {
              margin: 10px 0;
            }
            p {
              font-size: 18px;
              line-height: 26px;
              font-weight: 400;
              color: rgba(255, 239, 223, 0.8);
              margin: 10px 0;
            }
            p.small {
              font-size: 14px;
            }
            p.medium {
              font-size: 15px;
            }
            p.bold {
              font-size: 32px;
              line-height: 44px;
              font-weight: 700;
            }
            p.pink {
              color: #942f51 !important;
            }
            p.gray {
              color: #9B9B9F !important;
            }
            .green-text {
              color: #28a52d;
            }
            .ta-c {
              text-align: center;
            }
            .margin-center {
              margin: auto;
            }
            .mt {
              margin-top: 64px;
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
              font-size: 15px;
              min-width: 300px;
              border-radius: 2px;
              visibility: hidden;
              opacity: 0;
              transition: visibility 0s, opacity .4s linear;
            }
            a[data-tooltip]:hover:after {
              visibility: visible;
              opacity: 1;
            }
            
            .isvg {
              display: inherit;
            }
          `}</style>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
