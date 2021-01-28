import React, { useState,useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { getAllUnits, setUnit } from '@/http/http';
import {useHistory} from 'umi';
import { Button } from 'antd';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    width:75vw;
    margin-top:30px;
    margin-bottom:30px;
    font-size:6vw;
    font-weight:600;
    color:#36cfc9;
  }
  .button{
    margin:4vw;
  }
`;
const Teambox = styled.div`
  width: 75vw;
  margin:4vw;
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
const unit = () => {
  const history = useHistory();
  const [Unit, setUnits] = useState([{ unitId: '', unitName: '', on: false }]);
  const setUnitData = function(){
    let UnitData = '';
    for(let i of Unit){
      if(i.on){
        UnitData += i.unitId+" ";
      }
    }
    setUnit(UnitData).then(res=>{
      console.log(res);
      history.replace("/index");
    })
  }
  /**
   * useEffect第二个参数传空数组只执行一次，也可在数组里存内容，表示当内容发现变化时会重新执行
   */
  useEffect(()=>{
    getAllUnits().then((res: any) => {
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
  },[])
  
  return (
    <Container>
      <div className="title">
        快选择自己所属的单位吧
      </div>
      <Teambox>
        <p>所属单位：</p>
        {Unit.map(i => (
          <Teamitem
            className="teamitem"
            key={i.unitName}
            onClick={() => {
              i.on = !i.on;
              setUnits(JSON.parse(JSON.stringify(Unit)));
            }}
            theme={i.on ? { main: '#36cfc9' } : { main: '#ffffff' }}
          >
            {i.unitName}
          </Teamitem>
        ))}
      </Teambox>
      <Button type="primary" htmlType="submit" className="button" onClick={setUnitData}>
          确定
        </Button>
    </Container>
  );
};
export default unit;
