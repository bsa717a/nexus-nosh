import Head from 'next/head'
import Login from '../components/Login'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Nexus Nosh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Sign in to Nexus Nosh" />
      </Head>
      <Login />
    </>
  )
}

