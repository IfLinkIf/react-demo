import './index.scss'
import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import logo from '@/assets/images/logo192.png'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'


const imgStyle = {
 width: 100, margin: "20px auto"
}
function Login () {
 const { loginStore } = useStore()
 const navigate = useNavigate()

 const onFinish = async (values) => {
  const data = { mobile: values.username, code: values.password }
  message.loading('登录中...')
  const result = await loginStore.logIn(data)
  message.destroy()
  if (result !== 'OK') {
   message.error(result)
  } else {
   message.success('登录成功')
   navigate('/', { replace: true })
  }
 }
 return (
  <div className='login'>
   <Card className='card' >
    <div style={{ textAlign: "center" }}>
     <img src={logo} alt="logo" style={imgStyle} />
    </div>
    <Form
     name="basic"
     labelCol={{
      span: 4,
     }}
     initialValues={{
      remember: true,
      username: '13811111111'
     }}
     onFinish={onFinish}
     // onFinishFailed={onFinishFailed}
     autoComplete="off"
     validateTrigger={['onBlur', 'onChange']}
    >
     <Form.Item
      //label="登录名"
      name="username"
      rules={[
       {
        required: true,
        phone: true,
        message: 'Please input your username!',
       },
      ]}
     >
      <Input placeholder='请输入用户名' />
     </Form.Item>

     <Form.Item
      //label="密码"
      name="password"
      rules={[
       {
        required: true,
        len: 6,
        message: 'Please input your password!',
       },
      ]}
     >
      <Input.Password placeholder='请输入密码' />
     </Form.Item>
     <div style={{ textAlign: "left" }}>
      <Form.Item
       name="remember"
       valuePropName="checked"

      >
       <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
      </Form.Item>

      <Form.Item>
       <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
        登 录
       </Button>
      </Form.Item>
     </div>
    </Form>
   </Card>
  </div >
 )
}

export default Login