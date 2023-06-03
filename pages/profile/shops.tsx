import { StoreInfo } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Shops = () => {

    const [shops, setShops] = useState<StoreInfo[]>()
    const router = useRouter()
    useEffect(() => {

        if (!localStorage.getItem('id')){
            router.push('/profile')            
            return
        }        

        axios.post('/api/account/shops', {id: localStorage.getItem('id')})
        .then((res) => setShops(res.data))

    }, [])

    return (
        <div>
            {shops?.map((shop) => (
                <div>
                    <img className="w-[200px]" src={shop.icon || ""}/>

                    <h1>{shop.displayName}</h1>

                    <h3>{shop.description}</h3>                    

                    <button onClick={() => router.push(`/profile/shop/${shop.name}`)}>Edit</button>
                </div>
            ))}
        </div>
    )
}

export default Shops