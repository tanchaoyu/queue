import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
const Container = styled.div`
  width: 90vw;
  height: 26vh;
  min-height: 30px;
  padding: 2px;
  box-shadow: 0 4px 8px 0 rgba(217, 217, 217, 0.5),
    0 4px 8px 0 rgba(217, 217, 217, 0.5);
  .btnctn {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
`;
const Active = (props: any) => {
  console.log(props);
  return (
    <Container>
      <div className="info">活动：{props.active}</div>
      <div className="info">时间：{props.date}</div>
      <div className="info">地点：{props.address}</div>
      <div className="info">备注：{props.info}</div>
      <Buttonctn inwhich={props.inwhich}></Buttonctn>
    </Container>
  );
};
const Buttonctn = (props: any) => {
  console.log(props);
  if (props.inwhich == 'join') {
    return (
      <div className="btnctn">
        <Button type="primary">同意</Button>
        <Button type="primary">拒绝</Button>
      </div>
    );
  } else if (props.inwhich == 'add') {
    return (
      <div className="btnctn">
        <Button type="primary">一键排班</Button>
        <Button type="primary">删除活动</Button>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
};
export default Active;
