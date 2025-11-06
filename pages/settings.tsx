import Head from 'next/head'
import Settings from '../components/Settings'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '@/lib/auth/useAuth'

function SettingsPageContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Settings - Nexus Nosh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Manage your Nexus Nosh preferences and settings" />
      </Head>
      <main>
        <Settings userId={user.uid} />
      </main>
    </>
  )
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsPageContent />
    </ProtectedRoute>
  )
}
