import { getUseProdBySubId } from "../services/api.js";
import { scrollTop,verifyHeart,categoryHeartNotColored,categoryHeartColored,baglaUyariyi } from "../utilities/index.js";

const filter = document.getElementById('filter');
const agHisse = document.getElementById('agHisse');
// const sol=document.getElementById('sol');
const doldur = document.getElementById('doldur');
const selects = document.getElementById('selects');
const neQeder = document.getElementById('neQeder');

const url = new URLSearchParams(location.search)
const subId = url.get('id');
let limit = url.get('limit') || 12;
const page = url.get('page') || 1;
const data = [];


window.subiAc = function (elem, uzunluq, ozu) {
    const angle = ozu.querySelector('i');
    if (!elem.classList.contains('h-0')) {
        elem.classList.replace(`h-[${uzunluq}px]`, 'h-0')
        angle.classList.remove('rotate-[90deg]')
    }
    else {
        elem.classList.replace('h-0', `h-[${uzunluq}px]`)
        angle.classList.add('rotate-[90deg]')
    }
}

window.filtrAcBagla = function () {
    if (agHisse.classList.contains('max-desk1:translate-x-[-100%]')) {
        filter.classList.remove('hidden')
        setTimeout(function () {
            agHisse.classList.replace('max-desk1:translate-x-[-100%]', 'max-desk1:translate-x-0')
        }, 50)
    }
    else {
        agHisse.classList.replace('max-desk1:translate-x-0', 'max-desk1:translate-x-[-100%]')
        setTimeout(function () {
            filter.classList.add('hidden')
        }, 300)
    }
}
/////////////////////////////////////////////
let pag = false

getUseProdBySubId(limit, subId, page).then(info => {
    data.length = 0;
    data.push(...info.products);
    handlePrice()

    showCards(info.products)
    handlePugination(info.totalPages, limit)
})

window.getir = (lim) => {
    url.set('limit', lim);
    const newUrlStr = url.toString();
    const newHref = location.pathname + '?' + newUrlStr
    history.pushState(null, '', newHref);
    getUseProdBySubId(lim, subId, page).then(info => {
        showCards(info.products)
        handlePugination(info.totalPages, lim)
    })
}
neQeder.value = limit


function showCards(dataMal) {
    const arzular=JSON.parse(localStorage.getItem('arzuBasketi')) || []
    doldur.innerHTML = '';
    dataMal.map(item => {
        doldur.innerHTML += `
            <article class="w-full one1:w-[calc(50%-7.5px)] desk:w-[calc((100%-30px)/3)] uc:w-[calc((100%-45px)/4)]  overflow-hidden rounded-[7px] bg-white">
                <div class="relative group w-full h-full flex flex-col  items-center gap-[15px]">
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
                                <div onclick="catFun(this,${item.id},catHeartNot,catHeart)" onmouseenter="this.querySelector('div').style.opacity='1'" onmouseleave="this.querySelector('div').style.opacity='0'" class="relative cursor-pointer h-[32px] w-[32px] grid place-items-center rounded-full ${arzular.find(elem=>elem==item.id) ? 'bg-or text-white hover:bg-white hover:text-or': 'bg-white text-or hover:bg-[#de7200] hover:text-white'} transition-all duration-200 ease-in">
                                    <i class="fa-regular fa-heart"></i>
                                    <div class="opacity-0  transition-all pointer-events-none duration-400 ease-in-out absolute top-[-100%] bg-[#000] rounded-[2px] ">
                                        <div class="relative z-[99999] px-[15px] py-[3px] grid place-items-center">
                                            <span class="text-[11px] font-[500] text-nowrap text-white">Arzu siyahısına əlavə et</span>
                                            <span class="absolute top-[45%] text-[#000]">⏷</span>
                                        </div>
                                    </div>
                                    <div onclick="event.stopPropagation()"
                                        onmouseenter="this.parentElement.classList.remove('hover:bg-[#de7200]','hover:text-white')"
                                        onmouseleave="this.parentElement.classList.add('hover:bg-[#de7200]','hover:text-white')" 
                                        class="fixed opacity-0 scale-0 origin-top transition-all duration-300 ease-in-out top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] min-w-[100px]  z-[9999999999999999999999999999]">

                                        <div class="relative">
                                            <h1 onclick="baglaUyariyiCat(this)" class="absolute top-[-25px] right-[-25px]">❌</h1>
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
            </article>
        `
    })
}

function handlePugination(pages, lim) {
    $('#pagination').pagination({
        dataSource: Array(pages).fill('').map((_, i) => i + 1),
        pageSize: 1,
        pageNumber:page,
        callback: function (data, pagination) {
            const sehifeNum = data[0]; ``
            console.log(sehifeNum);


            if (pag) {
                scrollTop(doldur.offsetTop - 50)
                getUseProdBySubId(lim, subId, sehifeNum).then(info => {
                    showCards(info.products)
                })
                url.set('page', sehifeNum);
                const newUrlStr = url.toString();
                const newHref = location.pathname + '?' + newUrlStr
                history.pushState(null, '', newHref);
            }
            pag = true
        }
    })
}


function handlePrice() {
    const sort = data.sort((a, b) => a.price - b.price)
    const minMax = [sort[0].price, sort.at(-1).price]

    $('#minPr').html(`${minMax[0]} ₼`)
    $('#maxPr').html(`${minMax[1]} ₼`)

    $("#slider-range").slider({
        range: true,
        min: minMax[0],
        max: minMax[1],
        values: minMax,
        step: 0.01,
        slide: function (event, ui) {
            // console.log(ui);
            // console.log(event);
            $('#minPr').html(`${ui.values[0]} ₼`)
            $('#maxPr').html(`${ui.values[1]} ₼`)

            const yeniData = sort.filter(item => item.price > ui.values[0] && item.price < ui.values[1])
            showCards(yeniData)
        }
    });
}


// window.categoryHeartNotColored=(umDiv)=>{  //?argument olaraq gonderiremse importa cagirdigima ragmen window olmalidi
//     umDiv.classList.remove('bg-or','text-white','hover:bg-white','hover:text-or')
//     umDiv.classList.add('bg-white','text-or', 'hover:bg-[#de7200]', 'hover:text-white')
// }
// window.categoryHeartColored=(umDiv)=>{
//     umDiv.classList.remove('bg-white','text-or', 'hover:bg-[#de7200]', 'hover:text-white')
//     umDiv.classList.add('bg-or','text-white','hover:bg-white','hover:text-or')
// }

window.catFun=(div,id,funNot,fun)=>{
    verifyHeart(div,id,funNot,fun)
}
window.catHeartNot=(div)=>{
    categoryHeartNotColored(div)
}
window.catHeart=(div)=>{
    categoryHeartColored(div)
}
window.baglaUyariyiCat=(xmark)=>{
    baglaUyariyi(xmark)
}
