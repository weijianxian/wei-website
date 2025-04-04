import { AppContainer, TabBar } from '@/components/common'

export const metadata = {
  title: '事已至此，看色图先',
}

export default function SetuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TabBar title="Setu" />
      <AppContainer>{children}</AppContainer>
    </>
  )
}
