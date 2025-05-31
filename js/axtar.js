import { getUseProdBySearch } from "../services/api.js";
import {verifyHeart,categoryHeartNotColored,categoryHeartColored,baglaUyariyi  } from "../utilities/index.js";

const butunSecenekler=document.getElementById('butunSecenekler');
const url=new URLSearchParams(location.search);
const name=url.get('name');

function getAll(name){
    getUseProdBySearch(name).then(resp=>{
        const arzular=JSON.parse(localStorage.getItem('arzuBasketi')) || []
        butunSecenekler.innerHTML='';
        resp.products.map(item=>{
            butunSecenekler.innerHTML+=`
                <div class="w-full one1:w-[calc(50%-15px)] desk:w-[calc((100%-60px)/3)] uc:w-[calc((100%-90px)/4)]  " >
                    <div class="relative w-full group flex flex-col  items-center gap-[15px] overflow-hidden rounded-[7px] bg-white">
                        <a href="/pages/detail.htm?id=${item.id}" class="h-[55%]"><img class="aspect-[1/1] h-full w-full cursor-pointer" src="${item.img}" alt="" /></a>
                        <div class="flex flex-col  items-center gap-[15px]">
                            <a href="/pages/detail.htm?id=${item.id}" class="text-[#222] text-[10px] font-[600] uppercase cursor-pointer hover:text-or text-center min-h-[30px]">${item.name}</a>
                            <h1 class="text-[#181818] text-[22px] font-[700]">${item.price}₼</h1>
                            <div class="flex flex-col gap-[10px] items-center mb-[20px] mt-auto">
                                <div class="flex items-center gap-[5px] ">
                                    <i class="fa-solid fa-minus text-or cursor-pointer"></i>
                                    <div class="flex items-center">
                                        <input id="miqInp" value="1" type="number"
                                            class="text-right h-[26px] p-[9px] w-[39px] text-[12px] text-[#3d3d3d] font-[700] outline-none" />
                                        <span class="text-[11px] text-[#000]">Ədəd</span>
                                    </div>
                                    <i class="fa-solid fa-plus text-or cursor-pointer"></i>
                                </div>
                                <div class="flex items-center justify-center flex-wrap gap-[10px]">
                                    <button onmouseenter="this.querySelector('div').style.opacity='1'" onmouseleave="this.querySelector('div').style.opacity='0'" class="relative cursor-pointer text-white hover:bg-[#de7200] bg-or px-[21px] h-[31px] rounded-[15px] transition-all duration-200 ease-in font-[600] text-[12px] text-nowrap">
                                        <span>Səbətə at</span>
                                        <div class="opacity-0 z-[99999] transition-all pointer-events-none duration-400 ease-in-out absolute top-[-100%] left-0 bg-[#000] rounded-[2px] ">
                                            <div class="relative px-[15px] py-[3px] grid place-items-center">
                                                <span class="text-[11px] font-[500] text-nowrap text-white">Səbətə at</span>
                                                <span class="absolute top-[61%] text-[#000]">⏷</span>
                                            </div>
                                        </div>
                                    </button>
                                    <div onclick="axtFun(this,${item.id},axtHeartNot,axtHeart)" onmouseenter="this.querySelector('div').style.opacity='1'" onmouseleave="this.querySelector('div').style.opacity='0'" class="relative cursor-pointer h-[32px] w-[32px] grid place-items-center rounded-full ${arzular.find(elem=>elem==item.id) ? 'bg-or text-white hover:bg-white hover:text-or': 'bg-white text-or hover:bg-[#de7200] hover:text-white'} transition-all duration-200 ease-in">
                                        <i class="fa-regular fa-heart"></i>
                                        <div class="opacity-0  transition-all pointer-events-none duration-400 ease-in-out absolute top-[-100%] bg-[#000] rounded-[2px] ">
                                            <div class="relative z-[99999] px-[15px] py-[3px] grid place-items-center">
                                                <span class="text-[11px] font-[500] text-nowrap text-white">Arzu siyahısına əlavə et</span>
                                                <span class="absolute top-[45%] text-[#000]">⏷</span>
                                            </div>
                                        </div>
                                        <div id="axtarFixed" onclick="event.stopPropagation()"
                                            onmouseenter="this.parentElement.classList.remove('hover:bg-[#de7200]','hover:text-white')"
                                            onmouseleave="this.parentElement.classList.add('hover:bg-[#de7200]','hover:text-white')" 
                                            class="fixed opacity-0 scale-0 origin-top transition-all duration-300 ease-in-out top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] min-w-[100px]  z-[9999999999999999999999999999]">

                                            <div class="relative">
                                                <h1 onclick="baglaUyariyiAxt(this)" class="absolute top-[-25px] right-[-25px]">❌</h1>
                                                <a href="/pages/detail.htm?id=${item.id}" class="w-full bg-white rounded-[20px] cursor-pointer flex items-center gap-[20px] py-[5px] px-[10px]  shadow-2xl">
                                                    <div class="w-[35%] h-full"><img class="w-full aspect-square rounded-[4px]" src="${item.img}" /></div>
                                                    <div class="w-[65%] flex flex-col items-center">
                                                        <p class="text-[12px]  text-center ">Üzr istəyirik,amma məhsulu Arzular Listinə əlavə etmək üçün girişiniz olmalıdır,şəxsi kabinetiniz yoxdursa giriş səhifəsində yaradıb, saytın bütün imkanlarından yararlana bilərsiniz</p>
                                                        <h2 class="text-[12px] text-or text-center">${item.name}</h2>
                                                        <h1 class="font-bold text-[23px]">${item.totalPrice.toFixed(2)}</h1>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div onmouseenter="this.querySelector('div').style.opacity='1'" onmouseleave="this.querySelector('div').style.opacity='0'" class="relative cursor-pointer h-[32px] w-[32px] grid place-items-center rounded-[5px] bg-white text-or hover:bg-[#de7200] hover:text-white transition-all duration-200 ease-in">
                                        <i class="fa-solid fa-code-compare"></i>
                                        <div class="opacity-0 z-[99999] transition-all pointer-events-none duration-400 ease-in-out absolute top-[-100%] bg-[#000] rounded-[2px] ">
                                            <div class="relative px-[15px] py-[3px] grid place-items-center">
                                                <span class="text-[11px] font-[500] text-nowrap text-white">Müqaisə et</span>
                                                <span class="absolute top-[45%] text-[#000]">⏷</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cursor-pointer absolute top-[20%] transition-all duration-400 ease-in-out opacity-0 translate-y-[-140%] group-hover:opacity-[100%] group-hover:translate-y-0 bg-or h-[30px] w-[30px] rounded-full grid place-items-center">
                            <div onmouseenter="this.querySelector('div').style.opacity='1'" onmouseleave="this.querySelector('div').style.opacity='0'" class=" relative grid place-items-center">
                                <i class="fa-solid fa-eye text-white text-[12px]"></i>
                                <div class="opacity-0 z-[99999] transition-all pointer-events-none duration-400 ease-in-out absolute top-[-280%] bg-[#000] rounded-[2px] ">
                                    <div class="relative px-[15px] py-[3px] grid place-items-center">
                                        <span class="text-[11px] font-[500] text-nowrap text-white">Sürətli baxış</span>
                                        <span class="absolute top-[45%]">⏷</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
    })
}
getAll(name)

window.axtFun=(div,id,funNot,fun)=>{
    verifyHeart(div,id,funNot,fun)
}
window.axtHeartNot=(div)=>{
    categoryHeartNotColored(div)
}
window.axtHeart=(div)=>{
    categoryHeartColored(div)
}
window.baglaUyariyiAxt=(xmark)=>{
    baglaUyariyi(xmark)
}