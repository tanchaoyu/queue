import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { Link,useHistory } from 'umi';
import Foot from '@/components/foot/Foot';
import Head from '@/components/head/Head';
import Active from '@/components/active/Active';
import banner from '@/assets/aboutus.png';
import {getUserMsg,getPublishedActivesSroll,getInvitedMsg,getJoinActive,} from '@/http/http'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height:100vh;
  .banner {
    width: 90vw;
    max-width:500px;
    border: 5px solid #d9d9d9;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .endbox{
    min-height:100px;
    width:1px;
    height:30vh;
  }
`;
interface showdata{
  inwhich:string,
  state:number,
  active: string,
      date: string,
      address: string,
      info: string,
      id:number,
      result?:string
}
let userinfo = {
  name:'',
  stdnumber:"",
  unit:''
}
export default () => {
  let joinactive:Array<showdata> = [];
  let modaldata:showdata = {
    inwhich:'',
    state:0,
    active:"",
    date:"",
    address:"",
    info:"",
    id:0,
  };
  const [modalData,setModalData] = useState(modaldata);
  const [visible , setVisible] = useState(false);
  const [joinActive,setJoinActive] = useState(joinactive);
  function info() {
    Modal.info({
      title: '联系信息',
      content: (
        <div>
          <p>QQ:3265644258</p>
        </div>
      ),
      onOk() {},
    });
  }
  useEffect(()=>{
    getUserMsg().then((res:any)=>{
      userinfo.name = res.data.data.userMsg.name;
      userinfo.stdnumber = res.data.data.userMsg.stuNumber;
      userinfo.unit = res.data.data.userMsg.unit;
      getInvitedMsg(userinfo.unit).then((res:any)=>{
        console.log(res);
        if(res.data.data.activesMsg[0]){
          modaldata.inwhich = "join";
          modaldata.active = res.data.data.activesMsg[0].name;
          modaldata.id = res.data.data.activesMsg[0].id;
          modaldata.address = res.data.data.activesMsg[0].position;
          modaldata.info = res.data.data.activesMsg[0].remarks;
          modaldata.state = res.data.data.activesMsg[0].state;
          modaldata.result = res.data.data.activesMsg[0].result;
          modaldata.date = res.data.data.activesMsg[0].startTime+ "至" + res.data.data.activesMsg[0].endTime;
          setModalData(JSON.parse(JSON.stringify(modaldata)));
          setVisible(true);
        }
      })
    })
    getJoinActive().then((res:any)=>{
      for(let i of res.data.data.activeMsg){
        let activeItem:showdata = {
          inwhich:'index',
          state:i.state,
          id:i.id,
          active:i.name,
          date:i.startTime + "至" + i.endTime,
          address:i.position,
          info:i.remarks,
          result:i.result
        }
        joinactive.push(activeItem);
      }
      setJoinActive(JSON.parse(JSON.stringify(joinactive)));
    })
  },[])
  return (
    <Container>
      <Modal visible={visible} footer='' onCancel={()=>setVisible(false)}>
        <Active inwhich={modalData.inwhich} id={modalData.id} date={modalData.date} info={modalData.info} address={modalData.address} active={modalData.active} state={modalData.state}></Active>
      </Modal>
      <Head info="排班"></Head>
      <img src={banner} alt="" className="banner" onClick={()=>{info()}}/>
      <div>
      {joinActive.map(i => (
        <Active
        id={i.id}
        state={i.state}
        inwhich={i.inwhich}
          active={i.active}
          address={i.address}
          date={i.date}
          info={i.info}
          result={i.result}
          key={i.id}
        ></Active>
      ))}
      </div>
      <div className='endbox'></div>
      <Foot name="home" />
    </Container>
  );
};
