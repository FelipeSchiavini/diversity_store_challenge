import { Spinner } from './spinner.component'

interface FormButtonProps {
  text: string
  isLoading: boolean
}

export const FormButton: React.FC<FormButtonProps> = ({ text, isLoading }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="inline-block w-full self-end rounded bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
    >
      {isLoading ? <Spinner /> : <span>{text}</span>}
    </button>
  )
}
