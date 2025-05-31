import { getUseProdById } from "../services/api.js";
import {verifyHeart,categoryHeartNotColored,categoryHeartColored,baglaUyariyi  } from "../utilities/index.js";
let ulduzlar;
let starsArr;
let rengli;
const doldurulacaq=document.getElementById('doldurulacaq');
const url=new URLSearchParams(location.search)
const detailId=url.get('id');
///////////////////////Ulduz Meselesi////////////////////
window.starEnter=(index)=>{
    starsArr
    .filter((_,ind)=>ind<=index)
    .forEach(item=>item.style.fill="#fadb14");
    starsArr
    .filter((_,ind)=>ind>index)
    .forEach(item=>item.style.fill="#bfbfbf");
}
window.starLeave=(index)=>{
    if(typeof(rengli)=='undefined'){
        starsArr
        .forEach(item=>item.style.fill="#bfbfbf");
    }
    else{
        starsArr
        .filter((_,ind)=>ind>rengli)
        .forEach(item=>item.style.fill="#bfbfbf");
        starsArr
        .filter((_,ind)=>ind<=rengli)
        .forEach(item=>item.style.fill="#fadb14");
    }
}
window.starHandle=(index)=>{
    if(index==rengli){
        rengli=undefined
        starsArr.forEach(item=>item.style.fill="#bfbfbf");
    }
    else{
        rengli=index;
        starsArr
        .filter((_,ind)=>ind<=index)
        .forEach(item=>item.style.fill="#fadb14");
        starsArr
        .filter((_,ind)=>ind>index)
        .forEach(item=>item.style.fill="#bfbfbf");
    }
}
////////////////////////Fetch////////////////////////
getUseProdById(detailId).then(resp=>{
    showDetail(resp)
})

function showDetail(detail){
    console.log(detail);
    const arzular=JSON.parse(localStorage.getItem('arzuBasketi')) || []
    doldurulacaq.innerHTML='';
    doldurulacaq.innerHTML+=`
                <div id="ozu" class="flex flex-col desk:flex-row desk:justify-items-start gap-[20px] items-center max-desk:w-full">
                    <div class="max-desk:w-full desk:w-[270px] aspect-square rounded-[20px] overflow-hidden shadow-2xl">
                        <img src="${detail.img[0]}" class="w-full h-full" alt="${detail.subcategory.categoryName}" /></div>
                    <div class="flex flex-col items-start max-desk:items-center gap-[20px]">
                        <div class="flex flex-col items-start max-desk:items-center gap-[10px]">
                            <h1 class="text-xl font-bold">${detail.name}</h1>
                            <div class="flex gap-[10px] items-center">
                                <div id="ulduzlar" class="flex items-center gap-[5px]">
                                    <svg onclick="starHandle(0)" onmouseenter="starEnter(0)" onmouseleave="starLeave(0)" width="20" height="20" class=" cursor-pointer transition-all duration-200 ease-in-out" viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em"
                                        height="1em" fill="#bfbfbf" aria-hidden="true">
                                        <path
                                            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z">
                                        </path>
                                    </svg>
                                    <svg onclick="starHandle(1)" onmouseenter="starEnter(1)" onmouseleave="starLeave(1)" width="20" height="20" class=" cursor-pointer transition-all duration-200 ease-in-out" viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em"
                                        height="1em" fill="#bfbfbf" aria-hidden="true">
                                        <path
                                            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z">
                                        </path>
                                    </svg>
                                    <svg onclick="starHandle(2)" onmouseenter="starEnter(2)" onmouseleave="starLeave(2)" width="20" height="20" class=" cursor-pointer transition-all duration-200 ease-in-out" viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em"
                                        height="1em" fill="#bfbfbf" aria-hidden="true">
                                        <path
                                            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z">
                                        </path>
                                    </svg>
                                    <svg onclick="starHandle(3)" onmouseenter="starEnter(3)" onmouseleave="starLeave(3)" width="20" height="20" class=" cursor-pointer transition-all duration-200 ease-in-out" viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em"
                                        height="1em" fill="#bfbfbf" aria-hidden="true">
                                        <path
                                            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z">
                                        </path>
                                    </svg>
                                    <svg onclick="starHandle(4)" onmouseenter="starEnter(4)" onmouseleave="starLeave(4)" width="20" height="20" class=" cursor-pointer transition-all duration-200 ease-in-out" viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em"
                                        height="1em" fill="#bfbfbf" aria-hidden="true">
                                        <path
                                            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z">
                                        </path>
                                    </svg>
                                </div>
                                <h2 class="text-[#4a5565] text-[14px]">Şərh yaz</h2>
                            </div>
                            <h3 class="text-[#4a5565] text-[14px]">Model: <span class="font-bold">101123</span></h3>
                            <h3 class="text-[#4a5565] text-[14px]">Mövcudluq: ✔</h3>
                        </div>
                        <h1 class="max-desk:text-center text-or text-3xl font-bold">${detail.totalPrice.toFixed(2)} ₼</h1>
                        <div class="flex flex-col items-start max-desk:items-center gap-[10px]">
                            <div class="flex items-center gap-[10px] text-[16px]">
                                <div class="flex items-center gap-[20px]">
                                    <div
                                        class="cursor-pointer rounded-full bg-[#e5e7eb] h-[32px] w-[32px] grid place-items-center">
                                        <span>-</span></div>
                                    <input id="count" value="1" type="number"
                                        class="text-center h-[26px] w-[26px] text-[#3d3d3d] font-[700] outline-none" />
                                    <div
                                        class="cursor-pointer rounded-full bg-[#e5e7eb] h-[32px] w-[32px] grid place-items-center">
                                        <span>+</span></div>
                                </div>
                                <span>Ədəd</span>
                            </div>
                            <div class="flex items-center flex-wrap gap-[10px]">
                                <button onmouseenter="this.querySelector('div').style.opacity='1'"
                                    onmouseleave="this.querySelector('div').style.opacity='0'"
                                    class="relative cursor-pointer text-white hover:bg-[#de7200] bg-or px-[21px] h-[31px] rounded-[15px] transition-all duration-200 ease-in font-[600] text-[12px] text-nowrap">
                                    <span>Səbətə at</span>
                                    <div
                                        class="opacity-0 z-[99999] transition-all pointer-events-none duration-400 ease-in-out absolute top-[-100%] left-0 bg-[#000] rounded-[2px] ">
                                        <div class="relative px-[15px] py-[3px] grid place-items-center">
                                            <span class="text-[11px] font-[500] text-nowrap text-white">Səbətə at</span>
                                            <span class="absolute top-[61%] text-[#000]">⏷</span>
                                        </div>
                                    </div>
                                </button>
                                <div onclick="detFun(this,${detail.id},detHeartNot,detHeart)" onmouseenter="this.querySelector('div').style.opacity='1'"
                                    onmouseleave="this.querySelector('div').style.opacity='0'"
                                    class="relative cursor-pointer h-[32px] w-[32px] grid place-items-center rounded-full ${arzular.find(elem=>elem==detail.id) ? 'bg-or text-white hover:bg-white hover:text-or': 'bg-white text-or hover:bg-[#de7200] hover:text-white'} transition-all duration-200 ease-in">
                                    <i class="fa-regular fa-heart"></i>
                                    <div
                                        class="opacity-0  transition-all pointer-events-none duration-400 ease-in-out absolute top-[-100%] bg-[#000] rounded-[2px] ">
                                        <div class="relative z-[99999] px-[15px] py-[3px] grid place-items-center">
                                            <span class="text-[11px] font-[500] text-nowrap text-white">Arzu siyahısına
                                                əlavə et</span>
                                            <span class="absolute top-[45%] text-[#000]">⏷</span>
                                        </div>
                                    </div>
                                    <div onclick="event.stopPropagation()"
                                        onmouseenter="this.parentElement.classList.remove('hover:bg-[#de7200]','hover:text-white')"
                                        onmouseleave="this.parentElement.classList.add('hover:bg-[#de7200]','hover:text-white')" 
                                        class="fixed opacity-0 scale-0 origin-top transition-all duration-300 ease-in-out top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] min-w-[100px]  z-[9999999999999999999999999999]">

                                        <div class="relative">
                                            <h1 onclick="baglaUyariyiDet(this)" class="absolute top-[-25px] right-[-25px]">❌</h1>
                                            <a href="/pages/detail.htm?id=${detail.id}" class="w-full bg-white rounded-[20px] cursor-pointer flex items-center gap-[20px] py-[5px] px-[10px]  shadow-2xl">
                                                <div class="w-[35%] h-full"><img class="w-full aspect-square rounded-[4px]" src="${detail.img[0]}" /></div>
                                                <div class="w-[65%] flex flex-col items-center">
                                                    <p class="text-[12px]  text-center ">Üzr istəyirik,amma məhsulu Arzular Listinə əlavə etmək üçün girişiniz olmalıdır,şəxsi kabinetiniz yoxdursa giriş səhifəsində yaradıb, saytın bütün imkanlarından yararlana bilərsiniz</p>
                                                    <h2 class="text-[12px] text-or text-center">${detail.name}</h2>
                                                    <h1 class="font-bold text-[23px]">${detail.totalPrice.toFixed(2)}</h1>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div onmouseenter="this.querySelector('div').style.opacity='1'"
                                    onmouseleave="this.querySelector('div').style.opacity='0'"
                                    class="relative cursor-pointer h-[32px] w-[32px] grid place-items-center rounded-[5px] bg-body text-or hover:bg-[#de7200] hover:text-white transition-all duration-200 ease-in">
                                    <i class="fa-solid fa-code-compare"></i>
                                    <div
                                        class="opacity-0 z-[99999] transition-all pointer-events-none duration-400 ease-in-out absolute top-[-100%] bg-[#000] rounded-[2px] ">
                                        <div class="relative px-[15px] py-[3px] grid place-items-center">
                                            <span class="text-[11px] font-[500] text-nowrap text-white">Müqaisə
                                                et</span>
                                            <span class="absolute top-[45%] text-[#000]">⏷</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sekilleri" class="max-desk:self-center flex items-center justify-center gap-[5px] flex-wrap">
                    ${
                        detail.img.length>=2 ? detail.img.map(item=>`<div class="w-[96px] h-[96px] rounded-[10px] overflow-hidden shadow-xl"><img class="w-full h-full" src="${item}" alt="${detail.subcategory.categoryName}" /></div>`).join('')
                                            : Array(2).fill('').map(item=>`<div class="w-[96px] h-[96px] rounded-[10px] overflow-hidden shadow-xl"><img class="w-full h-full" src="${detail.img[0]}" alt="${detail.subcategory.categoryName}" /></div>`).join('')
                    }
                </div>
    `;
    ulduzlar=document.getElementById('ulduzlar');
    starsArr=Array.from(ulduzlar.querySelectorAll('svg'));

}


window.detFun=(div,id,funNot,fun)=>{
    verifyHeart(div,id,funNot,fun)
}
window.detHeartNot=(div)=>{
    categoryHeartNotColored(div)
}
window.detHeart=(div)=>{
    categoryHeartColored(div)
}
window.baglaUyariyiDet=(xmark)=>{
    baglaUyariyi(xmark)
}