import { type } from 'os'
import { Spinner } from './spinner.component'

interface ButtonProps {
  text: string
  isLoading: boolean
  onClick: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  text,
  isLoading,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-block w-full rounded bg-green-500 py-2 font-alt text-sm uppercase leading-none text-gray-900 hover:bg-green-600 disabled:bg-gray-400"
      disabled={disabled}
    >
      {isLoading ? <Spinner /> : <span>{text}</span>}
    </button>
  )
}
