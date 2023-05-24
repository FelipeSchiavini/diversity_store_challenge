import Image from 'next/image'
import Logo from '../assets/logo.png'
import { LoginFormComponent } from './login-form.component'

export const Login = () => {
  return (
    <div className="items-center space-y-5">
      <Image src={Logo} alt="Logo comunikime" width={200} className="m-auto" />
      <div className="max-w-[420px] space-y-1">
        <h1 className="text-3xl font-bold leading-tight text-gray-50">
          Faça seu Login
        </h1>
      </div>
      <LoginFormComponent />
    </div>
  )
}
