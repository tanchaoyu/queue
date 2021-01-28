import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';
import { Login, getUserMsg } from '@/http/http';
/*
  styled-components传参数需要直接在目标样式元素上，子元素上传参数会提示无目标属性
  或许可用ThemeProvider解决
*/
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logintitle {
    margin: 20px;
    margin-top: 60px;
    font-size: 24px;
    color: #36cfc9;
    font-weight: 600;
  }
  .login-form {
    width: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ant-form-item {
    width: 100%;
  }
  .login-form-button {
    margin-top: 50px;
    width: 20vw;
  }
`;

export default () => {
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let stdnumber = values.username;
    let password = values.password;
    Login(stdnumber, password).then((res: any) => {
      console.log(res);
      if (res.data.code == 200) {
        sessionStorage.setItem('token', res.data.data.token);
        if (res.data.data.firstLogin == "true") {
          history.push('/unit');
        } else {
          history.replace('/index');
        }
      }
      else{
        alert("账号或密码错误");
      }
    });
  };
  return (
    <Container>
      <div className="logintitle">登录</div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="学号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form>
    </Container>
  );
};
