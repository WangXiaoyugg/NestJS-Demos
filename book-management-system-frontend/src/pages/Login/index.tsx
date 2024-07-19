/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message } from 'antd'
import "./index.css";
import { login } from '../../api';

interface LoginUser {
    username: string;
    password: string;
}

async function onFinish(values: LoginUser) {

  try {
      const res = await login(values.username, values.password);
      if (res.status === 201 || res.status === 200)  {
          message.success("登录成功");
          setTimeout(() => {
              window.location.href = "/";
          }, 1000)
      }
  } catch (e: any) {
      message.error(e.response.data.message);
  }

}

export function Login() {
    return (
      <div id="login-container">
          <h1>图书管理系统</h1>
          <Form 
              labelCol={{span: 4}} 
              wrapperCol={{span: 24}}
              colon={false}
              autoComplete='off'
              onFinish={onFinish}
          >
              <Form.Item 
                  label="用户名"
                  name="username"
                  rules={[{required: true, message: "请输入用户名"}]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="密码"
                  name="password"
                  rules={[{required: true, message: "请输入密码"}]}
              >
                  <Input.Password />
              </Form.Item>
              <Form.Item 
                  labelCol={{span: 0}}
                  wrapperCol={{span: 24}}
              >
                  <div className='links'>
                      <a href="/register">没有有账号？去注册</a>
                  </div>
              </Form.Item>

              <Form.Item 
                  labelCol={{span: 0}}
                  wrapperCol={{span: 24}}
              >
                  <Button className="btn" type="primary" htmlType="submit">
                      登录
                  </Button>
              </Form.Item>
          </Form>
      </div>
    )
}