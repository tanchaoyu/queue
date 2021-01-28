import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'umi';
import home from '@/assets/home.png';
import onhome from '@/assets/onhome.png';
import add from '@/assets/add.png';
import my from '@/assets/my.png';
import onmy from '@/assets/onmy.png';
const Container = styled.div`
  width: 100vw;
  height: 10vh;
  position: fixed;
  z-index: 99;
  top: 90vh;
  display: flex;
  justify-content:space-around;
  align-items: center;
  background:#f5f5f5;
  .item{
    width:20vw;
    margin:1vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    img{
      width:30px;
      height:30px;
    }
  }
`;
const footer = (props: any) => {
  const footerData = [
    {
      name: '首页',
      img: props.name == 'home' ? onhome : home,
      to: '/index',
    },
    {
      name: '排班',
      img: add,
      to: '/add',
    },
    {
      name: '我的',
      img: props.name == 'my' ? onmy : my,
      to: '/my',
    },
  ];
  return (
    <Container>
      {footerData.map(i => (
        <Link to={i.to} key={i.name}>
          <div className="item" >
            <img src={i.img} alt="" />
            <div>{i.name}</div>
          </div>
        </Link>
      ))}
    </Container>
  );
};
export default footer;
