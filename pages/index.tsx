import Head from 'next/head'
import Dashboard from '../components/Dashboard'

export default function Home() {
  // For local development, using a demo user ID
  // In production, this would come from Firebase Auth
  const demoUserId = 'demo-user-123';

  return (
    <>
      <Head>
        <title>Nexus Nosh - Smart Dining for Business and Beyond</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Personalized lunch-pairing and restaurant-recommendation experience" />
      </Head>
      <main>
        <Dashboard userId={demoUserId} userName="Derek" />
      </main>
    </>
  )
}
