import ProfileBG from "@/components/Backgrounds/ProfileBG"
import axios from "axios"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const router = useRouter()

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        axios.post('/api/account/login', {username: username, password: password})
        .then((res) => {localStorage.setItem('id', res.data); router.push('/')})

    }, [username, password, router])

    return (
        <div>
            <ProfileBG />
            <div className="relative ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px] flex flex-col items-center">
                <div className="text-[20px] mt-[10px] font-medium">Log In</div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input type={'text'} value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
                    <input type={'password'} value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
                    <button type="submit" className="h-[55px] w-[330px] lg:h-[50px] bg-[#ed7bbe] text-white rounded mt-8">Login</button>
                </form>
                <div className="text-[16px] italic mt-8 lg:mt-4">
                    Not a user yet?
                    <a href="/signup"> Sign up </a>
                </div>
            </div>
            
        </div>
    )
}

export default Login