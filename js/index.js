import { getUseDiscProducts, getUsePopyularProducts, 
    getUseProducts,getUseProdByCatId } from "../services/api.js";

import { verifyHeart,baglaUyariyi } from "../utilities/index.js";


getUseProducts().then(info=>{
    show('swiper0',info.products)
})
getUseDiscProducts().then(info=>{
    show('swiper1',info.products,true)
})
getUsePopyularProducts().then(info=>{
    if(info.totalProducts==0){
        getUseProducts(30,9).then(info=>{
            show('swiper2',info.products)
        })
    }else show('swiper2',info.products)
})


function show(id,data,discounted=false){
    const arzular=JSON.parse(localStorage.getItem('arzuBasketi')) || []
    const elem=document.getElementById(id);
    elem.innerHTML='';
    data.map(item=>{
        elem.innerHTML+=`
            <div class="swiper-slide overflow-hidden bg-white rounded-[7px]">
                <div class="relative group w-full h-full flex flex-col  items-center gap-[15px]">
                    <div onclick="indFun(this,${item.id},indexHeartNotColored,indexHeartColored)" class="group/hearts cursor-pointer absolute right-[10px] top-[15px] z-[20]">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                            class="text-[#ff8300] ${arzular.find(elem=>elem==item.id) ? 'hidden group-hover/hearts:block': 'block group-hover/hearts:hidden'}  text-[23px] " height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M349.6 64c-36.4 0-70.7 16.7-93.6 43.9C233.1 80.7 198.8 64 162.4 64 97.9 64 48 114.2 48 179.1c0 79.5 70.7 143.3 177.8 241.7L256 448l30.2-27.2C393.3 322.4 464 258.6 464 179.1 464 114.2 414.1 64 349.6 64zm-80.8 329.3l-4.2 3.9-8.6 7.8-8.6-7.8-4.2-3.9c-50.4-46.3-94-86.3-122.7-122-28-34.7-40.4-63.1-40.4-92.2 0-22.9 8.4-43.9 23.7-59.3 15.2-15.4 36-23.8 58.6-23.8 26.1 0 52 12.2 69.1 32.5l24.5 29.1 24.5-29.1c17.1-20.4 43-32.5 69.1-32.5 22.6 0 43.4 8.4 58.7 23.8 15.3 15.4 23.7 36.5 23.7 59.3 0 29-12.5 57.5-40.4 92.2-28.8 35.7-72.3 75.7-122.8 122z">
                            </path>
                        </svg>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                            class="${arzular.find(elem=>elem==item.id) ? 'block group-hover/hearts:hidden': 'hidden group-hover/hearts:block'} text-[#ff8300] text-[23px]" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z">
                            </path>
                        </svg>
                        <div onclick="event.stopPropagation()"
                             onmouseenter="this.parentElement.classList.remove('group/hearts')"
                             onmouseleave="this.parentElement.classList.add('group/hearts')" 
                             class="fixed opacity-0 scale-0 origin-top transition-all duration-300 ease-in-out top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] min-w-[100px]  z-[9999999999999999999999999999]">

                            <div class="relative">
                                <h1 onclick="baglaUyariyiInd(this)" class="absolute top-[-25px] right-[-25px]">❌</h1>
                                <a href="/pages/detail.htm?id=${item.id}" class="w-full bg-white rounded-[20px] cursor-pointer flex items-center gap-[20px] py-[5px] px-[10px]  shadow-2xl">
                                    <div class="w-[35%] h-full"><img class="w-full aspect-square rounded-[4px]" src="${item.img[0]}" /></div>
                                    <div class="w-[65%] flex flex-col items-center">
                                        <p class="text-[12px]  text-center ">Üzr istəyirik,amma məhsulu Arzular Listinə əlavə etmək üçün girişiniz olmalıdır,şəxsi kabinetiniz yoxdursa giriş səhifəsində yaradıb, saytın bütün imkanlarından yararlana bilərsiniz</p>
                                        <h2 class="text-[12px] text-or text-center">${item.name}</h2>
                                        <h1 class="font-bold text-[23px]">${item.totalPrice.toFixed(2)}</h1>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <img class="cursor-pointer" width="${id=='swiper0'? '180':'112'}" height="${id=='swiper0'? '180':'112'}" src="${item.img[0]}" />
                    <h1 class="text-[#222] text-[10px] font-[600] uppercase cursor-pointer hover:text-or text-center min-h-[30px]">${item.name}</h1>
                    ${discounted?
                        `
                            <div class="flex items-center gap-[10px]">
                                <div
                                    class="yumru transition-all duration-200 ease-linear h-[36px] w-[36px] text-[#4e4e4e] rounded-full bg-[#ffd9c0] grid place-items-center">
                                    <span class=" text-[12px] font-[700]">-${item.discount}%</span>
                                </div>
                                <div class="flex flex-col">
                                    <h2 class="text-[#999] text-[16px] font-[400] line-through">${item.price}₼</h2>
                                    <h1 class="text-[#181818] text-[22px] font-[700]">${item.totalPrice.toFixed(2)}₼</h1>
                                </div>
                            </div>
                        `:`<h1 class="text-[#181818] text-[22px] font-[700]">${item.price}₼</h1>`
                    }
                    <div class="flex flex-col gap-[10px] items-center mb-[20px] mt-auto">
                        <div class="flex items-center gap-[5px]">
                            <i class="fa-solid fa-minus text-or cursor-pointer"></i>
                            <div class="flex items-center">
                                <input id="miqInp" value="1" type="number"
                                    class="text-right h-[26px] p-[9px] w-[39px] text-[12px] text-[#3d3d3d] font-[700] outline-none" />
                                <span class="text-[11px] text-[#000]">Ədəd</span>
                            </div>
                            <i class="fa-solid fa-plus text-or cursor-pointer"></i>
                        </div>
                        <button
                            class="cursor-pointer text-white hover:bg-[#de7200] bg-or px-[21px] h-[31px] rounded-[15px] transition-all duration-200 ease-in font-[600] text-[12px]">Səbətə
                            at</button>
                    </div>

                    ${discounted?'':
                        `
                            <div class="max-yanyana:hidden cursor-pointer absolute top-[20%] transition-all duration-400 ease-in-out opacity-0 translate-y-[-140%] group-hover:opacity-[100%] group-hover:translate-y-0 bg-or h-[30px] w-[30px] rounded-full grid place-items-center">
                                <div onmouseenter="this.querySelector('div').style.opacity='1'" onmouseleave="this.querySelector('div').style.opacity='0'" class=" relative grid place-items-center">
                                    <i class="fa-solid fa-magnifying-glass text-white text-[14px]"></i>
                                    <div class="opacity-0 transition-all pointer-events-none duration-400 ease-in-out absolute top-[-280%] bg-[#000] rounded-[2px] ">
                                        <div class="relative px-[15px] py-[3px] grid place-items-center">
                                            <span class="text-[11px] font-[500] text-nowrap text-white">Sürətli baxış</span>
                                            <span class="absolute top-[45%]">⏷</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                </div>
            </div>
        `
    })
}

let count=0;
swiper2.on('slideChange',function(){
    count++
    const index=swiper2.realIndex
    const id=swiper2.slides[index].id;
    console.log(index);
    if(count>2){     
        getUseProdByCatId(id).then(resp=>{
            show('swiper0',resp.products)
        })
    }
    
})


window.indexHeartColored=(div)=>{
    div.children[0].classList.replace('block','hidden')
    div.children[0].classList.replace('group-hover/hearts:hidden','group-hover/hearts:block')
    div.children[1].classList.replace('group-hover/hearts:block','group-hover/hearts:hidden')
    div.children[1].classList.replace('hidden','block')
}
window.indexHeartNotColored=(div)=>{
    div.children[0].classList.replace('hidden','block')
    div.children[0].classList.replace('group-hover/hearts:block','group-hover/hearts:hidden')
    div.children[1].classList.replace('group-hover/hearts:hidden','group-hover/hearts:block')
    div.children[1].classList.replace('block','hidden')
}


window.baglaUyariyiInd=(xmark)=>{
    baglaUyariyi(xmark)
}
window.indFun=(div,id,funNot,fun)=>{
    verifyHeart(div,id,funNot,fun)
}