
type ContainerProps = {
  className?: string,
  children: React.ReactNode
}

export default function Container({ className, children }: ContainerProps) {
  return (
    <div className={`font-sans min-h-screen w-full max-w-xl mx-auto px-4 sm:px-0 ${className}`}>
      {children}
    </div>
  )
}
