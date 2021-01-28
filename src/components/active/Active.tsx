import React, { useState } from 'react';
import { Link,useHistory } from 'umi';
import styled from 'styled-components';
import { Button } from 'antd';
import {responseInvitation,deleteActive,arrange} from '@/http/http';
const Container = styled.div`
margin-top:2px;
  width: 90vw;
  min-height: 50px;
  padding: 2px;
  box-shadow: 0 4px 8px 0 rgba(217, 217, 217, 0.5),
    0 4px 8px 0 rgba(217, 217, 217, 0.5);
  .btnctn {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom:20px;
  }
`;
interface showdata{
    state:number,
    inwhich:string,
    active: string,
        date: string,
        address: string,
        info: string,
        id:number,
        result?:string
  }
const Active = (props: showdata) => {
  
    console.log(props)
    let resultarr;
    if(props.inwhich=="add"||props.inwhich=="join"||props.inwhich=="index"){
       resultarr = props.result?.split("\n");
    }
    else{
       resultarr = props.result?.slice(1,-1).split(",");
    }
  return (
    <Container>
      <div className="info">活动：{props.active}</div>
      <div className="info">时间：{props.date}</div>
      <div className="info">地点：{props.address}</div>
      <div className="info">备注：{props.info}</div>
      <div className='info'>结果：{resultarr?.map(i=>(
          <div key={i}>{i}</div>
      ))}</div>
      <Buttonctn props={props}></Buttonctn>
    </Container>
  );
};
const Buttonctn = (props: any) => {
  const [prop,setProp] = useState(props);
    const history = useHistory()
    const refuse = ()=>{
        responseInvitation(10,prop.props.id).then((res:any)=>{
            console.log(res);
            let newProp = JSON.parse(JSON.stringify(prop));
            newProp.props.state = 10;
            setProp(newProp);
        })
    };
    const accept = ()=>{
        console.log(prop);
        responseInvitation(11,prop.props.id).then((res:any)=>{
            console.log(res);
            let newProp = JSON.parse(JSON.stringify(prop));
            newProp.props.state = 11;
            setProp(newProp);
        })
    }
    const deleActive = ()=>{
        deleteActive(prop.props.id).then((res:any)=>{
            console.log(res);
            alert('删除');
            history.replace('/index');
        })
    }
    const arr = ()=>{
        arrange(prop.props.id).then((res:any)=>{
            console.log(res);
            alert('已排班');
            history.replace('/index');
        })
    }
  if (prop.props.inwhich == 'join') {
    if(prop.props.state==10){
      return (
        <div className="btnctn">
          已拒绝
        </div>
      );
    }
    else if(prop.props.state==11){
      return (
        <div className="btnctn">
          已同意
        </div>
      );
    }
    else {
      return (
        <div className="btnctn">
          <Button type="primary" onClick={ ()=>accept() }>同意</Button>
          <Button type="primary" onClick={ ()=>refuse()}>拒绝</Button>
        </div>
      );
    }
    
  } else if (prop.props.inwhich == 'add') {
    return (
      <div className="btnctn">
        <Button type="primary" onClick={()=>arr()}>一键排班</Button>
        <Button type="primary" onClick={()=>deleActive()}>删除活动</Button>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
};
export default Active;
