import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { AuthProvider } from '@/lib/auth/useAuth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
