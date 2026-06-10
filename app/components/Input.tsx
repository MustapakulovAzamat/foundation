
interface InputType {
  className?: string | null,
  type: string,
  value: string,
  placeholder: string,
  onChange?:(e: React.FormEvent) => void
}

export default function Input({
  className, 
  type,
  value,
  placeholder,
  onChange
 }: InputType) {
  return (
  <input 
    className={`${className ?? ""}
      border-gray-300 border p-3 rounded-xl
    `}
    type={type} 
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
  )
}