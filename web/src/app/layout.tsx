import { ReactNode } from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { Profile } from '@/components/profile.component'
import { SignIn } from '@/components/sign-in.component'
import { Copyright } from '@/components/copyright.component'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'comunikime',
  description: 'Sua loja de diversidades',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen">
          <div className="relative flex flex-col items-center justify-between overflow-hidden bg-[url(../assets/bg-stars.svg)] bg-cover max-sm:px-8 max-sm:py-6 sm:px-28 sm:py-16">
            <div className="w-full">
              {isAuthenticated ? <Profile /> : <SignIn />}
            </div>
            {children}
            <Copyright />
          </div>
        </main>
      </body>
    </html>
  )
}
