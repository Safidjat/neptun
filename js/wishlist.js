import { getVerifyToken,getUseProdById } from "../services/api.js"
import { handleSebet} from "../utilities/index.js";
const list=document.getElementById('list');
let wishler=JSON.parse(localStorage.getItem('arzuBasketi')) || [];
const wishObjects=[];
const basliq=document.getElementById('basliq');

window.verifyLogin=()=>{
    const tokenin=localStorage.getItem('token');
    getVerifyToken(tokenin).then(resp=>{
        console.log(resp);
        
        if(!resp.status){
            let sec=3;
            setTimeout(()=>{
                document.body.innerHTML=`
                    <section class="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
                        <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-40 h-40 dark:text-gray-400">
                                <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                                <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                                <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                                <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                            </svg>
                            <p class="text-3xl">Girişiniz yoxdur!</p>
                            <p id="timer" class="text-3xl text-center">${sec}</p>
                            <a rel="noopener noreferrer" href="/index.htm" class="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Ana səhivəyə qayıt</a>
                        </div>
                    </section>
                `
                startTimer(sec);
            },3000);
            setTimeout(()=>{
                location.href='/auth/login.htm';
            },6000)
        }
    })
}
verifyLogin()

function startTimer(sec) {
    const timerElement = document.getElementById('timer');
    const interval = setInterval(() => {
        sec -= 1;
        if (sec < 0) {
            clearInterval(interval);
        }
        timerElement.innerHTML = sec;
    }, 1000);
}

// window.showWishes=()=>{
//     wishObjects.length=0;
//     list.innerHTML='';
//     wishler.map(id=>{
//         getUseProdById(id).then(resp=>{
//             wishObjects.push(resp);
//         }) 
//     })
//     setTimeout(()=>{
//         wishObjects.map(item=>{
//         list.innerHTML+=`
//                 <a href="/pages/detail.htm?id=${item.id}" class="shadow-sm bg-gray-50 hover:bg-[#f3f4f6] rounded-lg py-[20px] px-[16px] flex items-center gap-[20px]">
//                     <img src="${item.img[0]}" class="w-[80px] h-[80px] rounded-md" alt="" />
//                     <div class="flex items-center justify-between w-full">
//                         <div class="flex flex-col gap-[5px] items-start">
//                             <h2 class="text-[12px] font-[500]">${item.name}</h2>
//                             <h3 class="text-or text-[15px]">${item.price.toFixed(2)} ₼</h3>
//                         </div>
//                         <div class="flex max-one0:flex-col items-center gap-[10px]">
//                             <button onclick="event.stopPropagation()" class="cursor-pointer bg-or hover:bg-orange-500 text-white px-3 py-1 rounded-full">🛒</button>
//                             <button onclick="event.stopPropagation()" class="cursor-pointer bg-white hover:bg-orange-500 text-or hover:text-white px-3 py-1 rounded-full w-[46px] h-[32px] grid place-items-center"><i class="fa-solid fa-trash"></i></button>
//                         </div>
//                     </div>
//                 </a>
//             `
//         })
//     },4000)
    
// }
window.showWishes = () => {
    if(wishler.length==0) {basliq.innerHTML='Arzu siyahınız boşdur'; list.innerHTML = '';}
    else {
        basliq.innerHTML='Arzu siyahısı';

        const promises = wishler.map(id => getUseProdById(id));
        Promise.all(promises).then(responses => {
            wishObjects.length = 0;
            wishObjects.push(...responses);
            
            list.innerHTML = '';
            responses.forEach(item => {
                list.innerHTML += `
                    <a href="/pages/detail.htm?id=${item.id}" class="shadow-sm bg-gray-50 hover:bg-[#f3f4f6] rounded-lg py-[20px] px-[16px] flex items-center gap-[20px]">
                        <img src="${item.img[0]}" class="w-[80px] h-[80px] rounded-md" alt="" />
                        <div class="flex items-center justify-between w-full">
                            <div class="flex flex-col gap-[5px] items-start">
                                <h2 class="text-[12px] font-[500]">${item.name}</h2>
                                <h3 class="text-or text-[15px]">${item.price.toFixed(2)} ₼</h3>
                            </div>
                            <div class="flex max-one0:flex-col items-center gap-[10px]">
                                <button onclick="event.preventDefault();sebeteAt(${item.id},1)" class="cursor-pointer bg-or hover:bg-orange-500 text-white px-3 py-1 rounded-full">🛒</button>
                                <button onclick="event.preventDefault();wishiSil(${item.id})" class="cursor-pointer bg-white hover:bg-orange-500 text-or hover:text-white px-3 py-1 rounded-full w-[46px] h-[32px] grid place-items-center"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </a>
                `;
            });
        })
    }
};
showWishes()

window.wishiSil=(id)=>{
    wishler=wishler.filter(item=>item!=id);
    console.log(wishler);
    localStorage.setItem('arzuBasketi',JSON.stringify(wishler));
    showWishes()
}
window.silAll=()=>{
    wishler.length=0;
    localStorage.setItem('arzuBasketi',JSON.stringify(wishler));
    showWishes();
}

window.sebeteAt=(id,num)=>{
    handleSebet(id,num)
}