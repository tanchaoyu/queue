import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Head from '@/components/head/Head';
import { Form, Input, Button, DatePicker, InputNumber } from 'antd';
import { SettingFilled,EnvironmentOutlined,UserOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  #addform{
      display:flex;
      flex-direction:column;
      align-items:center;
      margin-top:30px;
  }
  .fontitem {
    width: 70vw;
  }
  .numberinput{
      width:100%;
  }
  .form-button{
    margin-top: 50px;
    width: 40vw;
  }
`;
const Teambox = styled.div`
  width: 75vw;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #36cfc9;
  border-radius: 10px;

  p {
    width: 22vw;
    margin: 1vw;
    padding: 1vw;
  }
`;
const Teamitem = styled.div`
  text-align: center;
  border: 1px solid #36cfc9;
  width: 22vw;
  border-radius: 10px;
  margin: 1vw;
  padding: 1vw;
  background: ${props => props.theme.main || 'white'};
`;
const Add = () => {
  let teamData = [
    {
      name: '党政办公室',
      on: true,
    },
    {
      name: '教务处',
      on: true,
    },
    {
      name: '团委',
      on: false,
    },
    {
      name: '学生工作部',
      on: false,
    },
    {
      name: '纪委办公室',
      on: false,
    },
  ];
  const [team, setTeam] = useState(teamData);
  const submit = (data: Array<any>) => {
    let picker: any = 'range-picker';
    const rangeValue = data[picker];
    const values = {
      ...data,
      'range-picker': [
        rangeValue[0].format('YYYY-MM-DD'),
        rangeValue[1].format('YYYY-MM-DD'),
      ],
    };
    console.log('Received values of form: ', values);
    console.log(data);
  };
  return (
    <Container>
      <Head info="排班" />
      <Form
        onFinish={submit}
        name="addform"
        layout="horizontal"
        labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
      >
        <Form.Item
          name="activename"
          className="fontitem"
          rules={[
            {
              required: true,
              message: 'Please set active name!',
            },
          ]}
        >
          <Input placeholder={`活动名称`} />
        </Form.Item>
        <Form.Item
          name="activeaddress"
          className="fontitem"
          rules={[
            {
              required: true,
              message: 'Please set active address!',
            },
          ]}
        >
          <Input placeholder={`活动地点`} />
        </Form.Item>
        <Form.Item
          className="fontitem"
          name="range-picker"
          rules={[
            {
              required: true,
              message: 'Please select time!',
            },
          ]}
        >
          <RangePicker placeholder={['开始时间', '结束时间']} />
        </Form.Item>
        <Form.Item
          name="activeperson"
          className="fontitem"
          rules={[
            {
              required: true,
              message: 'Please set number!',
            },
          ]}
        >
          <InputNumber placeholder={`值班人数`} min={1} max={5} className="numberinput" />
        </Form.Item>
        <Form.Item
          name="activeinfo"
          className="fontitem"
          rules={[
            {
              required: true,
              message: 'Please set number!',
            },
          ]}
        >
          <TextArea placeholder={`备注`} />
        </Form.Item>
        <Teambox>
          <p>所属单位：</p>
          {team.map(i => (
            <Teamitem
              className="teamitem"
              key={i.name}
              onClick={() => {
                i.on = !i.on;
                setTeam(JSON.parse(JSON.stringify(team)));
              }}
              theme={i.on ? { main: '#36cfc9' } : { main: '#ffffff' }}
            >
              {i.name}
            </Teamitem>
          ))}
        </Teambox>
        <Button type="primary" htmlType="submit" className="form-button">
          发送排班邀请
        </Button>
      </Form>
    </Container>
  );
};
export default Add;
