import Head from 'next/head'
import LunchApp from '../components/LunchApp'

export default function Home() {
  return (
    <>
      <Head>
        <title>Nexus Nosh Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen p-6">
        <LunchApp />
      </main>
    </>
  )
}
