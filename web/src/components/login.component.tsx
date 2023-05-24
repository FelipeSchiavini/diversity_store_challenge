import Image from 'next/image'
import Logo from '../assets/logo.png'
import { LoginFormComponent } from './login-form.component'

export const Login = () => {
  return (
    <div className="w-full items-center space-y-5 max-sm:w-full sm:max-w-sm">
      <Image src={Logo} alt="Logo comunikime" width={200} className="m-auto" />
      <h1 className="text-3xl font-bold leading-tight text-gray-50">
        Faça seu Login
      </h1>
      <LoginFormComponent />
    </div>
  )
}
