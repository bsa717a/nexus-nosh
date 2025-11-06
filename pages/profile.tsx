import Head from 'next/head'
import Profile from '../components/Profile'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '@/lib/auth/useAuth'

function ProfilePageContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Profile - Nexus Nosh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Your Nexus Nosh profile and preferences" />
      </Head>
      <main>
        <Profile userId={user.uid} />
      </main>
    </>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  )
}
