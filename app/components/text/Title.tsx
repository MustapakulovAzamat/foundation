
export default function Title({ children, className }: { 
  children: React.ReactNode,
  className?: string
}) {
  return (
    <h2 className={`${className ?? ""} 
      text-[16px] md:text-xl font-bold
    `}>
      {children}
    </h2>
  )
}