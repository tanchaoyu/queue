import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Head from '@/components/head/Head';
import { useHistory } from 'umi';
import { Form, Input, Button, DatePicker, InputNumber } from 'antd';
import {
  SettingFilled,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getUnit, publishActive } from '@/http/http';
import unit from '../unit/unit';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  #addform {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }
  .fontitem {
    width: 70vw;
  }
  .numberinput {
    width: 100%;
  }
  .form-button {
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
let unitnum: number ;
const Add = () => {
  const [Unit, setUnits] = useState([{ unitId: '', unitName: '', on: false }]);
  const history = useHistory();
  useEffect(() => {
    getUnit().then((res: any) => {
      console.log(res);
      let unitArray = [];
      for (let i of Object.keys(res.data.data.units)) {
        let unititem = {
          unitId: '',
          unitName: '',
          on: false,
        };
        unititem.unitId = i;
        unititem.unitName = res.data.data.units[i];
        unitArray.push(unititem);
      }
      setUnits(unitArray);
    });
  }, []);
  const submit = (data: Array<any>) => {
    let picker: any = 'range-picker';
    const rangeValue = data[picker];
    const values = {
      activeperson: 0,
      activeaddress: '',
      activename:'',
      activeinfo: '',
      ...data,
      'rangepicker': [
        rangeValue[0].format('YYYY-MM-DD'),
        rangeValue[1].format('YYYY-MM-DD'),
      ],
    };
    console.log('Received values of form: ', values);
    console.log(unitnum);
    publishActive(
      values.activename,
      values.activeperson,
      values.activeaddress,
      values.activeinfo,
      rangeValue[0].format('YYYY-MM-DD'),
      rangeValue[1].format('YYYY-MM-DD'),
      unitnum,
    ).then(res => {
      console.log(res);
      history.replace("/index");
    });
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
          <InputNumber
            placeholder={`值班人数`}
            min={1}
            max={5}
            className="numberinput"
          />
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
          {Unit.map(i => (
            <Teamitem
              className="teamitem"
              key={i.unitName}
              onClick={() => {
                for (let j of Unit) {
                  j.on = false;
                }
                i.on = !i.on;
                unitnum = parseInt(i.unitId);
                console.log(unitnum);
                setUnits(JSON.parse(JSON.stringify(Unit)));
              }}
              theme={i.on ? { main: '#36cfc9' } : { main: '#ffffff' }}
            >
              {i.unitName}
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
