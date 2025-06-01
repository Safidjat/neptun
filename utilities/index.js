export function scrollTop(top,mode=true){
    scrollTo({
        top,
        behavior: mode ?'smooth':'auto'
    })
}
import { arzuBasketi } from "../js/header.js";
// import { mehsulBasketi } from "../js/header.js";
import { basketList,basketUl,umMeb,mehsulCount } from "../js/header.js";
import { getVerifyToken,getUseProdById } from "../services/api.js";
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

export function handleMiqdar(num,div){
    const divChild=div.querySelector('div');
    const inp=divChild.querySelector('input');
    inp.value=+inp.value+num;
    if(inp.value<=0) inp.value=1;
}

export function showBasket(){
    let mehsulBasketi = JSON.parse(localStorage.getItem('mehsulBasketi')) || [];
    mehsulCount.innerHTML=mehsulBasketi.length;
    if(mehsulBasketi.length==0) {basketUl.innerHTML='Səbətinizdə məhsul yoxdur!'; umMeb.innerHTML=0.00;}
    else {
        const promises = mehsulBasketi.map(obj => getUseProdById(obj.id));
        const prices=[]
        Promise.all(promises).then(responses => {
            basketUl.innerHTML='';
            responses.forEach((item,ind,arr) => {
                prices.push(mehsulBasketi.find(elem=>elem.id==item.id).count*item.price)
                basketUl.innerHTML+= `
                    <li class="${ind==arr.length-1? '':'border-b-[1px]'} py-[8px] flex items-center justify-between max-inp:flex-col max-inp:gap-[10px] hover:bg-[#f3f4f6]">
                        <div class="flex items-center gap-[12px] text-gray-500 hover:text-or text-[12px]">
                            <a href="/pages/detail.htm?id=${item.id}" class="w-[48px] h-[48px] rounded-[6px] overflow-hidden"><img src="${item.img[0]}" class="w-full h-full object-cover" alt="" /></a>
                            <a href="/pages/detail.htm?id=${item.id}" class="max-w-[90px]">${item.name}</a>
                        </div>
                        <h3 id="nece" class="text-[12px] text-nowrap">x <span>${mehsulBasketi.find(elem=>elem.id==item.id).count}</span></h3>
                        <div class="flex items-center gap-[10px] text-[12px]">
                            <h2><span>${(mehsulBasketi.find(elem=>elem.id==item.id).count*item.price).toFixed(2)}</span>₼</h2>
                            <i onclick="mehSil(${item.id})" class="fa-solid fa-trash text-gray-500 hover:text-or"></i>
                        </div>
                    </li>
                `;
            });
            umMeb.innerHTML=prices.reduce((sum,pr)=>sum+pr,0).toFixed(2);
        })
    }
    
    console.log('hjggchk');
    
};
export function handleSebet(id,num){
    let mehsulBasketi = JSON.parse(localStorage.getItem('mehsulBasketi')) || [];
    if(mehsulBasketi.length==0 || !mehsulBasketi.find(obj=>obj.id==id)){
         mehsulBasketi.push({
            id,
            count:+num
        })
    }else{
        mehsulBasketi.find(obj=>obj.id==id).count=+num
    }
    console.log(mehsulBasketi);
    localStorage.setItem('mehsulBasketi',JSON.stringify(mehsulBasketi));
    showBasket()
}
