import { Alert, Flex, Spin } from 'antd'
import "./index.css"

const Spinner = () => {
  <Flex gap="small" vertical>
    <Flex gap="small">
      <Spin tip="Loading" size="small">
        <div className="content" />
      </Spin>
      <Spin tip="Loading">
        <div className="content" />
      </Spin>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
  </Flex>
      <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  </Flex>
}

export default Spinner