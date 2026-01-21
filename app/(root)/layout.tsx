import React from 'react'
import {redirect} from "next/navigation"
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers'
import { AuthProvider } from "@/contexts/AuthContext";

const layout = async ({children} : {children : React.ReactNode}) => {
  const session = await auth.api.getSession( { headers : await headers() } );
  if(!session?.user) redirect('sign-in');

  console.log("session:", session);

  return (
    <main className='min-h-screen text-gray-400'>
      <div>
      <AuthProvider session={session}> 
        {children}
      </AuthProvider>
      </div>
    </main>
  )
}

export default layout