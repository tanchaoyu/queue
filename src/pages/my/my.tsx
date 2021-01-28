import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import styled, { ThemeProvider } from 'styled-components';
import Head from '@/components/head/Head';
import Foot from '@/components/foot/Foot';
import Active from '@/components/active/Active';
import add from '@/assets/add.png';
import {
  getUserMsg,
  getUnit,
  getJoinActive,
  getPublishedActivesUnsroll,
  getPublishedActivesSroll,
} from '@/http/http';
/**
 * style-start
 */
const Container = styled.div`
  width: 100vw;
  height:100vh;
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
  .endbox{
    min-height:100px;
    width:1px;
    height:30vh;
  }
  .addpng{
    width:20px;
    height:20px;
  }
  .reunit{
    color: #36cfc9;
    margin: 0 auto;
  }
  
`;
const Baritem = styled.div`
  color: #36cfc9;
  margin: 5px;
  border-bottom: 1px ${props => props.theme} solid;
  
`;
/**
 * style-end
 */
interface userinfo {
  name: string;
  stdnumber: string;
  team: Array<string>;
}
interface showdata{
  active: string,
      date: string,
      address: string,
      info: string,
      id:number,
      state:number,
      result?:string,
}
const mypage = () => {
  /**
   * 无法在ts对象中声明属性的类型，赋值失败，改用接口实现
   */
  let userinfo: userinfo = {
    name: '',
    stdnumber: '',
    team: [],
  };
  let joinactive:Array<showdata> = [];
  let unsrollactive:Array<showdata> = [];
  let srollactive:Array<showdata> = [];
  const [userInfo, setUserInfo] = useState(userinfo);
  const [joinActive, setJoinActive] = useState(joinactive);
  const [unsrollActive,setUnsrollActive] = useState(unsrollactive);
  const [srollActive,setSrollActive] = useState(srollactive);
  const history = useHistory();
  const toUnit = ()=>{
    history.replace("/unit");
  }
  useEffect(() => {
    let user: userinfo = {
      name: '',
      stdnumber: '',
      team: [],
    };
    getUserMsg().then((res: any) => {
      user.name = res.data.data.userMsg.name;
      user.stdnumber = res.data.data.userMsg.stuNumber;
      getUnit().then((res: any) => {
        for (let i of Object.keys(res.data.data.units)) {
          user.team.push(res.data.data.units[i]);
        }
        setUserInfo(user);
      });
    });
  }, []);
  useEffect(()=>{
    getJoinActive().then((res:any)=>{
      console.log(res);
      for(let i of res.data.data.activeMsg){
        let activeItem:showdata = {
          id:i.id,
          active:i.name,
          date:i.startTime + "至" + i.endTime,
          address:i.position,
          result:i.result,
          state:i.state,
          info:i.remarks
        }
        joinactive.push(activeItem);
      }
      setJoinActive(joinactive);
      
    });
    getPublishedActivesUnsroll().then((res:any)=>{
      
      for(let i of res.data.data.activesMsg){
        let activeItem:showdata = {
          id:i.id,
          active:i.name,
          date:i.startTime + "至" + i.endTime,
          address:i.position,
          state:i.state,
          info:'',
          result:i.result
        }
        unsrollactive.push(activeItem);
      }
      unsrollactive.reverse();
      setUnsrollActive(unsrollactive);
    });
    getPublishedActivesSroll().then((res:any)=>{
      console.log(res);
      for(let i of res.data.data.actives1){
        
        let activeItem:showdata = {
          id:i.id,
          active:i.name,
          date:i.startTime + "至" + i.endTime,
          address:i.position,
          result:i.result,
          state:i.state,
          info:i.remarks
        }
        srollactive.push(activeItem);
      }
      srollactive.reverse();
      setSrollActive(srollactive);
      setShow(srollActive);
    })
  },[])
  const barlist = [
    {
      name: '排班情况',
      ename: 'queue',
      on: true,
    },
    {
      name: '我的发布',
      ename: 'add',
      on: false,
    },
    {
      name: '我参与的',
      ename: 'join',
      on: false,
    },
  ];
  const textData:Array<showdata> = [
  ];
  const [inwhich, setIn] = useState('queue');
  const [barList, setBar] = useState(barlist);
  const [showData, setShow] = useState(textData);
  return (
    <Container>
      <Head info="排班"></Head>
      <div className="userinfo">
        <div className={`useritem`}>姓名：{userInfo.name}</div>
        <div className={`useritem`}>学号：{userInfo.stdnumber}</div>
        <div className={`useritem`}>
          单位：{userInfo.team.map(i => i + '  ')}
          <p onClick={toUnit} className={`reunit`}>重新选择</p>
          {/* <img src={add} alt="" className='addpng' onClick={toUnit}/>  */}
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
              if(i.ename=='add'){
                setShow(unsrollActive);
              }
              else if(i.ename=='join'){
                setShow(joinActive);
              }
              else if(i.ename=='queue'){
                setShow(srollActive);
              }
            }}
          >
            {i.name}
          </Baritem>
        ))}
      </div>
      <div className="infolist">
        {showData.map(i => (
          <Active
            inwhich={inwhich}
            active={i.active}
            address={i.address}
            date={i.date}
            info={i.info}
            result={i.result}
            id={i.id}
            state={i.state}
            key={i.id}
          ></Active>
        ))}
      </div>
      <div className='endbox'></div>
      <Foot name="my" />
    </Container>
  );
};
export default mypage;
