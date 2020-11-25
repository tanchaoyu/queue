import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Head from '@/components/head/Head';
import Foot from '@/components/foot/Foot';
import Active from '@/components/active/Active';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .userinfo {
    padding: 1vw;
    height: 20vh;
    width: 70vw;
    box-shadow: 0 4px 8px 0 rgba(217, 217, 217, 0.5),
      0 4px 8px 0 rgba(217, 217, 217, 0.5);
    border: 1px solid #bfbfbf;
    border-radius: 5% 5%;
    margin: 10px;
  }
  .bar {
    display: flex;
  }
  .baritem {
    color: #36cfc9;
    margin: 5px;
    border-bottom: 1px #ffffff solid;
  }
  .on {
    color: #36cfc9;
    margin: 5px;
    border-bottom: 1px #36cfc9 solid;
  }
`;
const Baritem = styled.div`
  color: #36cfc9;
  margin: 5px;
  border-bottom: 1px ${props => props.theme} solid;
`;
const mypage = () => {
  const userinfo = {
    name: '张三',
    stdnumber: '201821090000',
    team: ['单位', '单位二', '单位三三'],
  };
  const barlist = [
    {
      name: '排班',
      ename: 'queue',
      on: true,
    },
    {
      name: '发布',
      ename: 'add',
      on: false,
    },
    {
      name: '参与',
      ename: 'join',
      on: false,
    },
  ];
  const textData = [
    {
      active: '摆台',
      date: '1月1日第19周 1 2节课',
      address: '一二食堂之间',
      info: '无事发生',
    },
  ];
  const [inwhich, setIn] = useState('queue');
  const [barList, setBar] = useState(barlist);
  const [showData, setShow] = useState(textData);
  return (
    <Container>
      <Head info="排班"></Head>
      <div className="userinfo">
        <div className={`useritem`}>姓名：{userinfo.name}</div>
        <div className={`useritem`}>学号：{userinfo.stdnumber}</div>
        <div className={`useritem`}>
          单位：{userinfo.team.map(i => i + ' , ')}
        </div>
      </div>
      <div className="bar">
        {barList.map(i => (
          <Baritem
            key={i.name}
            theme={i.on ? `#36cfc9` : `#ffffff`}
            onClick={() => {
              barList.map(i => (i.on = false));
              i.on = true;
              setIn(JSON.parse(JSON.stringify(i.ename)));
              setBar(JSON.parse(JSON.stringify(barList)));
            }}
          >
            {i.name}
          </Baritem>
        ))}
      </div>
      <div className="infolist">
        {showData.map(i => (
          <Active
          inwhich= {inwhich}
            active={i.active}
            address={i.address}
            date={i.date}
            info={i.info}
            key={i.active}
          ></Active>
        ))}
      </div>
      <Foot name="my" />
    </Container>
  );
};
export default mypage;
