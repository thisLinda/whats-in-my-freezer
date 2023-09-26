import { ConfigProvider, Layout } from "antd"
import AppHeader from "../Header"
import AppContent from "../Content"
import AppFooter from "../Footer"

const { Header, Content, Footer } = Layout

export default function ComponentLayout() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Lato"
        }
      }}
    >
      <Layout>
        <Header>
          <AppHeader />
        </Header>
        <Content className="content" style={{marginTop: 30}}>
          <AppContent />
        </Content>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}
