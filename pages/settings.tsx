import Head from 'next/head'
import Settings from '../components/Settings'

export default function SettingsPage() {
  const demoUserId = 'demo-user-123';

  return (
    <>
      <Head>
        <title>Settings - Nexus Nosh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Manage your Nexus Nosh preferences and settings" />
      </Head>
      <main>
        <Settings userId={demoUserId} />
      </main>
    </>
  )
}
