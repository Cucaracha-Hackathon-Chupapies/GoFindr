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

    }, [username, password])

    return (
        <div>
            <ProfileBG />
            <div className="relative ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px] flex flex-col items-center">
                <div className="text-[20px] mt-[10px] font-medium">Log In</div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <label>
                        Username
                    </label>
                    <input type={'text'} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label>
                        Password
                    </label>
                    <input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                </form>
            </div>
            
        </div>
    )
}

export default Login