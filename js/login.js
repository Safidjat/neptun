import { getUseLogin,getVerifyToken } from "../services/api.js";

const passw=document.getElementById('passw')
const user=document.getElementById('user')
const tok=localStorage.getItem('token')
let say=[0,0]

window.logIn=()=>{
    const passwVal=passw.value.trim();
    const userVal=user.value.trim();
    const reqBody={"login":userVal,"password":passwVal}

    getUseLogin(reqBody).then(resp=>{
        console.log(resp);
        
        const{refresh,token,status}=resp;
        if(token && status && refresh){
            localStorage.setItem('token',token);
            alert('Giriş olundu')
            passw.value='';
            user.value='';
        }else{
            alert(`${resp.errors?.password?._errors[0] ?? resp.error}`)
            getVerifyToken(tok).then(resp=>{
                if(tok && resp.status){
                    alert('Girişin var idi, sehf loginə görə çıxmış oldun sorryyy😛');
                    localStorage.removeItem('token');
                }else return
            })
            // if(localStorage.getItem('token')){
            //     alert('Girişin var idi, sehf loginə görə çıxmış oldun sorryyy😛');
            //     localStorage.removeItem('token');
            // }
        }
    })
}
window.logOut=()=>{
    localStorage.removeItem('token');
    alert('Çıxışınız uğurlu keçdi')
}
window.varmisan=(ind)=>{
    getVerifyToken(tok).then(resp=>{
        if(tok && resp.status){
            if(say[ind]<1) alert('Girişin var,ehtiyac yoxdu')
            say[ind]++
        }else return
    })
    // if(localStorage.getItem('token')){
    //     if(say[ind]<1) alert('Girişin var,ehtiyac yoxdu')
    //     say[ind]++
    // }
    // else return
}