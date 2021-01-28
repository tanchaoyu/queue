import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link,useHistory } from 'umi';
import backpng from "@/assets/back.png"
const Container = styled.div`
    width:100vw;
    display:flex;
    align-items:center;
    height:8vh;
    min-height:50px;
    background:#36cfc9;
    img{
        width:30px;
        height:30px;
    }
    div{
        color:#fafafa;
        font-size:24px;
    }
`
const Head = (props:any)=>{
    const history = useHistory();
    const back = ()=>{
        history.goBack()
    }
    return(
        <Container onClick={back}>
            <img src={backpng} alt=""/>
            <div>{props.info}</div>
        </Container>
    )
}
export default Head;