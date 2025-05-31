export function scrollTop(top,mode=true){
    scrollTo({
        top,
        behavior: mode ?'smooth':'auto'
    })
}
import { arzuBasketi } from "../js/header.js";
import { getVerifyToken } from "../services/api.js";
const tok=localStorage.getItem('token')
export function verifyHeart(heart,id,funNotSel,funSel){
    const uyari=heart.children[2];
    getVerifyToken(tok).then(resp=>{
        if(!resp.status){
            uyari.classList.remove('opacity-0','scale-0')
            uyari.classList.add('opacity-[100%]','scale-[100%]')
            setTimeout(()=>{
                uyari.classList.remove('opacity-[100%]','scale-[100%]')
                uyari.classList.add('opacity-0','scale-0')
            },10000)
        }else{
            if(arzuBasketi.find(item=>item==id)){
                arzuBasketi.splice(0, arzuBasketi.length, ...arzuBasketi.filter(item => item !== id));
                localStorage.setItem('arzuBasketi',JSON.stringify(arzuBasketi));
                funNotSel(heart);
                console.log(arzuBasketi);
            }else{
                arzuBasketi.push(id);
                localStorage.setItem('arzuBasketi',JSON.stringify(arzuBasketi));
                funSel(heart);
                console.log(arzuBasketi);
            }
        }
    })
}
export function categoryHeartNotColored(umDiv){ 
    umDiv.classList.remove('bg-or','text-white','hover:bg-white','hover:text-or')
    umDiv.classList.add('bg-white','text-or', 'hover:bg-[#de7200]', 'hover:text-white')
}
export function categoryHeartColored(umDiv){
    umDiv.classList.remove('bg-white','text-or', 'hover:bg-[#de7200]', 'hover:text-white')
    umDiv.classList.add('bg-or','text-white','hover:bg-white','hover:text-or')
}
export function baglaUyariyi(xmark){
    const uyari=xmark.parentElement.parentElement;
    uyari.classList.remove('opacity-[100%]','scale-[100%]')
    uyari.classList.add('opacity-0','scale-0')
}