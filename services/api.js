const BASE_URL='https://neptunbk.vercel.app';

async function getUseCategories(){
    const res=await fetch(`${BASE_URL}/categories`)
    return await res.json()
}

async function getUseProducts(limit=10,page=1){
    const res=await fetch(`${BASE_URL}/products?limit=${limit}&page=${page}`)
    return await res.json()
}

async function getUseDiscProducts(){
    const res=await fetch(`${BASE_URL}/products/discounted`)
    return await res.json()
}

async function getUsePopyularProducts(){
    const res=await fetch(`${BASE_URL}/products/populyar`)
    return await res.json()
}

async function getUseProdBySubId(limit=12,id,page=1){
    const res=await fetch(`${BASE_URL}/products/subcategory/${id}?limit=${limit}&page=${page}`)
    return await res.json()
}

async function getUseProdByCatId(id){
    const res=await fetch(`${BASE_URL}/products/category/${id}?limit=20`)
    return await res.json()
}

async function getUseProdById(id){
    const res=await fetch(`${BASE_URL}/products/${id}`)
    return await res.json()
}

async function getUseProdBySearch(name){
    const res=await fetch(`${BASE_URL}/products/search?name=${name}`)
    return await res.json()
}

async function getUseLogin(reqBody){
    const res=await fetch(`${BASE_URL}/auth/login`,{
        method:'POST',
        body:JSON.stringify(reqBody),
        headers:{'Content-type':'application/json'}
    })
    return await res.json()
}

async function getVerifyToken(tokenin){
    const res=await fetch(`${BASE_URL}/auth/verify-token`,{
        headers:{
            'Authorization': `Bearer ${tokenin}`
        }
    })
    return await res.json()
}

export {
    getUseCategories,getUseProducts,
    getUseDiscProducts,getUsePopyularProducts,
    getUseProdBySubId,getUseProdByCatId,
    getUseProdById,getUseProdBySearch,
    getUseLogin,getVerifyToken
}