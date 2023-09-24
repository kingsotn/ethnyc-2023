import type { AppProps } from 'next/app'
import '@vercel/examples-ui/globals.css'
// import type { LayoutProps } from '@vercel/examples-ui/layout'
// import { getLayout } from '@vercel/examples-ui'

export default function MyApp({ Component, pageProps }: AppProps) {
  // const Layout = getLayout<LayoutProps>(Component)

  return (
    <div>
      {/* <Layout title="Geolocation" path="edge-middleware/geolocation"> */}
      <Component {...pageProps} />
      {/* </Layout> */}
    </div>
  )
}