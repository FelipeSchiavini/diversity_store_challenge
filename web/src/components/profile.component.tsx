import { getUser } from '@/lib/auth'
import Image from 'next/image'

export const Profile = () => {
  const { login } = getUser()

  return (
    <div className="flex items-center gap-3 text-left ">
      <Image
        src={'https://i.pravatar.cc/40'}
        width={40}
        height={40}
        alt=""
        className="h10 w-10 rounded-full"
      />
      <p className="max-w-[140px] text-sm leading-snug">
        Hello {login}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Sign Out
        </a>
      </p>
    </div>
  )
}
