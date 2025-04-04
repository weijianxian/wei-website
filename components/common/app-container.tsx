'use client'

export default function AppContainer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="mx-auto w-full p-4 md:w-3/4">{children}</div>
}
