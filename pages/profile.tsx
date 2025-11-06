import Head from 'next/head'
import Profile from '../components/Profile'

export default function ProfilePage() {
  // For local development, using a demo user ID
  // In production, this would come from Firebase Auth
  const demoUserId = 'demo-user-123';

  return (
    <>
      <Head>
        <title>Profile - Nexus Nosh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Your Nexus Nosh profile and preferences" />
      </Head>
      <main>
        <Profile userId={demoUserId} />
      </main>
    </>
  )
}
