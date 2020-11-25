import React from 'react';
import styles from './index.less';
import styled from 'styled-components';
import { Link } from 'umi';
import Foot from '@/components/foot/Foot';
import Head from '@/components/head/Head';
import Active from '@/components/active/Active';
import banner from '@/assets/aboutus.png';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  .banner {
    width: 90vw;
    max-width:500px;
    border: 5px solid #d9d9d9;
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;
let queuedata = [
  {
    active: '摆台',
    date: '1月1日第19周 1 2节课',
    address: '一二食堂之间',
    info: '无事发生',
  },
];
export default () => {
  return (
    <Container>
      <Head info="排班"></Head>
      <img src={banner} alt="" className="banner" />
      {queuedata.map(i => (
        <Active
          active={i.active}
          address={i.address}
          date={i.date}
          info={i.info}
          key={i.active}
        ></Active>
      ))}
      <Foot name="home" />
    </Container>
  );
};
