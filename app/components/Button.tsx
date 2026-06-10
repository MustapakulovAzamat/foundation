
interface ButtonType {
  className?: string,
  children: React.ReactNode,
  type?: "button" | "submit",
  onClick?:() => void
}

export default function Button({
  className, 
  children,
  type,
  onClick
 }: ButtonType) {
  return (
    <button 
      className={`
      bg-blue-500 text-white p-4 rounded-xl ${className ?? ""}
      `}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}