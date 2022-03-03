//NEXT
import Head from 'next/head';

//CSS
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  
  return (
    <>
      <Head>
        <title>MySocialMedia</title>
        <link rel="shortcut icon" href="./icon.svg" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
