import '@/styles/globals.css'
import Layout from './layout'
import { CookiesProvider } from 'react-cookie'

export default function App({ Component, pageProps }) {
  return <CookiesProvider><Layout><Component {...pageProps} /></Layout></CookiesProvider>
}
