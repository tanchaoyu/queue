
import axios from 'axios';
axios.interceptors.request.use(function (config) {
    // 在发送请求之前配置headers中的token信息
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;
  })
const baseUrl = "https://arrange.bitworkshop.cn";
const token =sessionStorage.getItem("token");
const Login = (stdnumber:string,password:string) => {
  return new Promise(function(resolve) {
    axios({
        
      url: baseUrl + "/login",
      method: "post",
      params: {
        stuNumber:stdnumber,
        password:password
      },
    }).then(function(res) {
      window.console.log(res);
      resolve(res);
    });
  });
};
const getUserMsg = () =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/getUserMsg",
            method:"get",
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const publishActive = (name:string,num:number,position:string,remarks:string,startTime:string,endTime:string,unit:number) =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/publishActive",
            method:"post",
            params:{
                name:name,
                num:num,
                position:position,
                remarks:remarks,
                startTime:startTime,
                endTime:endTime,
                unit:unit
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const deleteActive = (id:number) =>{
    console.log(token)
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/deleteActive",
            method:"delete",
            params:{
                id:id
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};

const getUnit = () =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/getUnit",
            method:"get",
            params:{
                
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const getAllUnits = () =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/getAllUnits",
            method:"get",
            params:{
                
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
/**
 * 
 * @param unit 由数字和空格组成的字符串，每一个和数字代表一个单位，是这个单位的id，不同的数字用空格分隔
 */
const setUnit = (unit:string) =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/setUnit",
            method:"put",
            params:{
                unit:unit
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const addUnit = (unit:string) =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/addUnit",
            method:"put",
            params:{
                unit:unit
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const getInvitedMsg = (unit:string) =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/getInvitedMsg",
            method:"get",
            params:{
                unit:unit
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const responseInvitation = (state:number,activeId:number) =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/responseInvitation",
            method:"post",
            params:{
                state:state,
                activeId:activeId

            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const getJoinActive = () =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/getJoinActive",
            method:"get",
            params:{
                
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const getPublishedActivesUnsroll = () =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/getPublishedActives0",
            method:"get",
            params:{
                
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const getPublishedActivesSroll = () =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/getPublishedActives1",
            method:"get",
            params:{
                
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
const arrange = (activeId:number) =>{
    return new Promise(function(resolve){
        axios({
            url:baseUrl + "/arrange",
            method:"post",
            params:{
                activeId:activeId
            }
            
        }).then(function(res){
            resolve(res)
        });
    });
};
export  {
    Login,
    getUserMsg,
    publishActive,
    deleteActive,
    getUnit,
    getAllUnits,
    setUnit,
    addUnit,
    getInvitedMsg,
    responseInvitation,
    getJoinActive,
    getPublishedActivesUnsroll,
    getPublishedActivesSroll,
    arrange
}