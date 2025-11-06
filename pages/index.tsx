import Head from 'next/head'
import Dashboard from '../components/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '@/lib/auth/useAuth'

function HomeContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Nexus Nosh - Smart Dining for Business and Beyond</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Personalized lunch-pairing and restaurant-recommendation experience" />
      </Head>
      <main>
        <Dashboard userId={user.uid} userName={user.displayName || user.email?.split('@')[0] || 'User'} />
      </main>
    </>
  )
}

export default function Home() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  )
}
