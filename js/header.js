import { getUseCategories, getUseProdBySearch } from "../services/api.js"

const clsOutsd=document.getElementById('clsOutsd')
const fix=document.getElementById('btns')
const headerinMaini=document.getElementById('headerinMaini')
const kateqoriSwiperi=document.getElementById('kateqoriSwiperi')
const aside=document.querySelector('aside')
const kateq=document.getElementById('kateq')
const perde=document.getElementById('perde')
const ucanSidebar=document.getElementById('ucanSidebar')
const hidscr=document.getElementById('hidscr')
const sw1=document.getElementById('sw1')
const searchInp=document.getElementById('searchInp')
const secenekler=document.getElementById('secenekler')
const uleler=Array.from(document.querySelectorAll('.uleler'));
const data=[];
let arzuBasketi = JSON.parse(localStorage.getItem('arzuBasketi')) || [];
export{arzuBasketi}

let flag=false;
$('#hideShow').click(function(){
    flag=!flag;
    $('#dahaCox').slideToggle(1000, ()=>{
        $(this).text(flag ? 'Bağla' : 'Daha cox')
        
    })
})

$(window).resize(isDesktop)
$(window).resize(topPosition)
isDesktop()

function isDesktop() {
    if($(window).width() >= 770) $('#dahaCox').css({display: 'flex'})
    else flag? $('#dahaCox').css({display: 'block'}) :  $('#dahaCox').css({display: 'none'})

    if($(window).width() >= 990) fix.classList.replace('translate-x-0','translate-x-[-100%]')
}

let sts=false;
window.xetdeQal=function (rel){
    const abs=rel.querySelector('ul');
    sts=!sts;
    if(sts){
        abs.classList.replace('opacity-0','opacity-[100%]')
        abs.classList.replace('translate-y-[10%]','translate-y-0')
        abs.classList.replace('pointer-events-none','pointer-events-auto')
    }
    else{
        abs.classList.replace('opacity-[100%]','opacity-0')
        abs.classList.replace('translate-y-0','translate-y-[10%]')
        abs.classList.replace('pointer-events-auto','pointer-events-none')
    }
    document.onclick=closeOutside
}

function closeOutside(e){
    const abs=clsOutsd.querySelector('ul');
    if(!clsOutsd.contains(e.target)){
        sts=false
        abs.classList.replace('opacity-[100%]','opacity-0')
        abs.classList.replace('translate-y-0','translate-y-[10%]')
        abs.classList.replace('pointer-events-auto','pointer-events-none')  
    }
    if(!kateq.contains(e.target)) {
        perde.classList.remove('h-0','h-[640px]');
        perde.classList.add('h-0');
        if(!perde.classList.contains('overflow-hidden')) perde.classList.add('overflow-hidden')
    }
}


window.etrafli=function(ind,btn){
    hamisiniBagla(ind,btn);
    if(uleler[ind].classList.contains('h-auto','opacity-[100%]')){
        uleler[ind].classList.replace('h-auto','h-0')
        uleler[ind].classList.replace('opacity-[100%]','opacity-0')
        btn.querySelector('span').innerHTML='+';
        btn.classList.replace('bg-[#ffc178]','bg-or')
    }
    else{
        uleler[ind].classList.replace('h-0','h-auto')
        uleler[ind].classList.replace('opacity-0','opacity-[100%]')
        btn.querySelector('span').innerHTML='-';
        btn.classList.replace('bg-or','bg-[#ffc178]')
    }
}
function hamisiniBagla(ind,btn){
    const btns=Array.from(fix.querySelectorAll('button'))
    btns.filter(item=>item!=btn).forEach(item=>{
        item.querySelector('span').innerHTML='+';
        item.classList.replace('bg-[#ffc178]','bg-or')
    })
    uleler.filter((item,i) => i!=ind).forEach(item=>{
        item.classList.remove('h-auto','opacity-[100%]')
        item.classList.add('h-0','opacity-0');
    })
    
}
function lapHamsiniBagla(){
    const btns=Array.from(fix.querySelectorAll('button'))
    btns.forEach(item=>{
        item.querySelector('span').innerHTML='+';
        item.classList.replace('bg-[#ffc178]','bg-or')
    })
    uleler.forEach(item=>{
        item.classList.remove('h-auto','opacity-[100%]')
        item.classList.add('h-0','opacity-0');
    })
}

window.acBagla=function(){
    if(fix.classList.contains('translate-x-0')){
        fix.classList.replace('translate-x-0','translate-x-[-100%]')
        lapHamsiniBagla()
    }
    else {
        fix.classList.replace('translate-x-[-100%]','translate-x-0')
        ucanSidebar.classList.replace('translate-x-0','translate-x-[-100%]')
    }
}

window.asideSticky=function(){
    let filter=document.getElementById('filter')
    const selects=document.getElementById('selects');

    let y;
    if(kateqoriSwiperi && sw1){
        if($(window).width() >= 770) y=kateqoriSwiperi.offsetTop;
        else y=sw1.offsetTop;
    }
    else{
        if(filter && $(window).width() >= 990) y=filter.offsetTop+filter.offsetHeight
        else if(selects && $(window).width() < 990) y=selects.offsetTop+selects.offsetHeight
    }
    

    if(scrollY>y){
        aside.classList.add("stick")
        aside.classList.add('opacity-[100%]')
        aside.classList.remove('opacity-0')

        kateq.classList.add('cursor-pointer')
        document.getElementById('varYox').classList.remove('hidden')
        kateq.onclick=indir
    }
    else if((headerinMaini && scrollY<y && scrollY>headerinMaini.offsetTop ) ||( (($(window).width() >= 990? (filter && scrollY<y && scrollY>filter.offsetTop):(selects && scrollY<y && scrollY>selects.offsetTop))|| ($(window).width() < 990? (selects && scrollY<y && scrollY>selects.offsetTop):(selects && scrollY<y && scrollY>selects.offsetTop)))) ){
        aside.classList.remove('opacity-[100%]')
        aside.classList.add('opacity-0')
        aside.classList.remove("stick")

        if(!filter){
            kateq.classList.remove('cursor-pointer')
            document.getElementById('varYox').classList.add('hidden')
            kateq.onclick=null 
        }

        if(!ucanSidebar.classList.contains('translate-x-[-100%]')) ucanSidebar.classList.replace('translate-x-0','translate-x-[-100%]')
    }
    else{
        aside.classList.remove('opacity-0')
        aside.classList.add('opacity-[100%]')
    }
    topPosition()
}
onscroll=asideSticky

window.indir=function(){
    let h;
    // if(headerinMaini) h=headerinMaini.querySelector('ul').offsetHeight
     h=640

    if (perde.classList.contains('h-0')) {
        perde.classList.replace('h-0','h-[640px]');
        if(perde.classList.contains('overflow-hidden')) perde.classList.remove('overflow-hidden')
    } else {
        perde.classList.replace('h-[640px]','h-0');
        if(!perde.classList.contains('overflow-hidden')) perde.classList.add('overflow-hidden')
    }
    document.onclick=closeOutside  
}

function topPosition(){
    ucanSidebar.style.top=`${aside.offsetHeight+aside.offsetTop}px`;
}
topPosition()

window.acBagla2=function(){
    if(ucanSidebar.classList.contains('translate-x-[-100%]')) ucanSidebar.classList.replace('translate-x-[-100%]','translate-x-0')
    else ucanSidebar.classList.replace('translate-x-0','translate-x-[-100%]')
}

///////////////////////////////////////////////////////
const imgs=new Array(16).fill('').map((_,ind)=>`${ind}.svg`)
console.log(imgs);


getUseCategories().then(res=>{
    data.length=0;
    data.push(...res)
    show()
})

function show(){
    const ulemiz=headerinMaini? headerinMaini.querySelector('ul') : ''
    // const ulemizPerde=perde.querySelector('ul');

    if(ulemiz){
        ulemiz.innerHTML='';
        data.map((item,ind)=>{
            ulemiz.innerHTML+=`
                ${ind==data.length-1 ?
                    `
                        <li class="h-[40px] px-[15px] bg-or cursor-pointer">
                            <div class="flex items-center gap-[15px] w-full h-full text-white">
                                <img src="/img/${imgs[ind]}" />
                                <p class="font-[700] text-[11px]">${item.categoryName}</p>
                            </div>
                        </li>
                    `:
                    `
                        <li class="group relative w-full h-[40px] px-[15px] hover:bg-[#fed9be] border-x border-x-[#e6e6e6] overflow-hidden hover:overflow-visible flex items-center justify-between">
                            ${
                                item.subcategory.length>0 ? 
                                `
                                    <div class="absolute left-[100%] top-0 z-[90] border-[#e1e1e1] border transition-all duration-200 ease-linear h-0 group-hover:h-[200px] w-[200px] bg-white shadow-hovSh">
                                        <div class="border-l border-l-or h-full overflow-y-scroll">
                                            ${item.subcategory.map(item=>{
                                                return `<a href="/pages/category.htm?id=${item.id}" class="h-[40px] pl-[30px] flex items-center hover:text-or text-[#222] text-[11px]"><span>${item.categoryName}</span></a>`
                                            }).join('')}
                                        </div>
                                    </div>
                                ` :
                                ''
                            }
                            <div class="border-b border-b-[#e1e1e1] flex items-center gap-[15px] w-full h-full text-[#222]">
                                <img src="/img/${imgs[ind]}" />
                                <p class="font-[700] text-[11px]">${item.categoryName}</p>
                            </div>
                            ${item.subcategory.length>0 ? `<i class="fa-solid fa-angle-right font-[400] text-[11px] text-[#222] justify-self-end"></i>`:''}
                        </li>
                            `
                }
                
            `
        })
    }


    perde.innerHTML='';
    data.map((item,ind)=>{
        perde.innerHTML+=`
            ${ind==data.length-1 ?
                `
                    <li class="h-[40px] px-[15px] bg-or cursor-pointer">
                        <div class="flex items-center gap-[15px] w-full h-full text-white">
                            <img src="/img/${imgs[ind]}" />
                            <p class="font-[700] text-[11px]">${item.categoryName}</p>
                        </div>
                    </li>
                `:
                `
                    <li class="group relative w-full h-[40px] px-[15px] hover:bg-[#fed9be] border-x border-x-[#e6e6e6] overflow-hidden hover:overflow-visible flex items-center justify-between">
                        ${
                            item.subcategory.length>0 ? 
                            `
                                <div class="absolute left-[100%] top-0 z-[90] border-[#e1e1e1] border transition-all duration-200 ease-linear h-0 group-hover:h-[200px] w-[200px] bg-white shadow-hovSh">
                                    <div class="border-l border-l-or h-full overflow-y-scroll">
                                        ${item.subcategory.map(item=>{
                                            return `<a href="/pages/category.htm?id=${item.id}" class="h-[40px] pl-[30px] flex items-center hover:text-or text-[#222] text-[11px]"><span>${item.categoryName}</span></a>`
                                        }).join('')}
                                    </div>
                                </div>
                            ` :
                            ''
                        }
                        <div class="border-b border-b-[#e1e1e1] flex items-center gap-[15px] w-full h-full text-[#222]">
                            <img src="/img/${imgs[ind]}" />
                            <p class="font-[700] text-[11px]">${item.categoryName}</p>
                        </div>
                        ${item.subcategory.length>0 ? `<i class="fa-solid fa-angle-right font-[400] text-[11px] text-[#222] justify-self-end"></i>`:''}
                    </li>
                        `
            }
            
        `
    })


    hidscr.innerHTML='';
    data.map((item,ind)=>{
        hidscr.innerHTML+=`
            ${ind==data.length-1 ?
                `
                    <li class="bg-or cursor-pointer">
                        <div class="flex items-center py-[4px] gap-[15px] w-full h-full text-white">
                            <img src="/img/${imgs[ind]}" />
                            <p class="font-[500] text-[13px] uppercase">${item.categoryName}</p>
                        </div>
                    </li>
                `:
                `
                    <li class="w-full hover:bg-[#fed9be] overflow-hidden hover:overflow-visible ">
                        <div class="border-b py-[4px] border-b-[#e1e1e1] flex items-center gap-[15px] w-full h-full text-[#222]">
                            <img src="/img/${imgs[ind]}" />
                            <p class="font-[500] text-[13px] uppercase">${item.categoryName}</p>
                        </div>
                    </li>
                `
            }
        `
    })
}


/////////////////AxtarPanel///////////////////////////////
function showList() {
    secenekler.classList.remove('opacity-0', 'scale-0');
    secenekler.classList.add('opacity-[100%]', 'scale-[100%]');
}

function hideList() {
    secenekler.classList.remove('opacity-[100%]', 'scale-[100%]');
    secenekler.classList.add('opacity-0', 'scale-0');
}

window.axtar=()=>{
    let text=searchInp.value;
    if(text.trim().length>=2){
        showList();
        getUseProdBySearch(text).then(resp=>{
            secenekler.innerHTML='';
            resp.products.slice(0,5).map((item,ind)=>{
                secenekler.innerHTML+=`
                <a href="/pages/detail.htm?id=${item.id}" class="hover:bg-[#f3f4f6] ${ind>0 ? 'border-t-1 border-t-[#6a7282]':''} w-full bg-white cursor-pointer flex items-center gap-[20px] py-[5px] px-[10px]">
                    <div class="w-[35%] h-full"><img class="w-full aspect-square rounded-[4px]" src="${item.img[0]}" alt="${item.category.categoryName}" /></div>
                    <div class="w-[65%] flex flex-col items-start">
                        <h2 class="text-[12px]">${item.category.categoryName} - ${item.name}</h2>
                        <h1 class="font-bold text-[23px]">${item.totalPrice}</h1>
                    </div>
                </a>
                `
            })
        })
    }
    else hideList()
    console.log(text.trim().length);
}
window.searchInp.onblur=()=> hideList()
window.searchInp.onfocus=()=>{
    if(searchInp.value.trim().length>=2) axtar()
} 

window.hamisinaYonlendir=(e)=>{
    console.log(e);
    if((e.keyCode==13||!e.keyCode) && searchInp.value.trim().length>=2){
        return location.href=`/pages/axtar.htm?name=${searchInp.value}`;
    }
}
