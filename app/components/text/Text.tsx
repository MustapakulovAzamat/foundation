
export default function Text({ children, className }: { 
  children: React.ReactNode,
  className?: string
}) {
  return (
    <span className={`${className ?? ""} 
      text-xs md:text-xl
    `}>
      {children}
    </span>
  )
}