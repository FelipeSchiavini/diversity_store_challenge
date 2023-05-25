import { HTMLInputTypeAttribute } from 'react'

interface FormInputProps {
  id: string
  type: HTMLInputTypeAttribute
  label: string
}

export const FormInput: React.FC<FormInputProps> = ({ id, type, label }) => {
  return (
    <>
      <label
        htmlFor={id}
        className="flex w-full items-center text-sm text-gray-200 hover:text-gray-100"
      >
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="w-full rounded border-gray-400 bg-gray-700 p-1 pl-3 text-purple-500"
      />
    </>
  )
}
