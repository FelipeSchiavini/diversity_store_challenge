import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useToast = () => {
  const successToast = (message: string) => {
    toast.success(message)
  }

  const errorToast = (message: string) => {
    toast.error(message)
  }

  return {
    successToast,
    errorToast,
    Toast,
  }
}

export default useToast

const Toast = () => {
  return (
    <ToastContainer
      style={{ left: '50%', transform: 'translate(-50%, -50%)', top: '50px' }}
    />
  )
}
