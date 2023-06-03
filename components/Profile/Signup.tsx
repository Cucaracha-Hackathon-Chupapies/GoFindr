import ProfileBG from "@/components/Backgrounds/ProfileBG"
import axios from "axios"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"


const SignUp = ({ setSignFlag }: { setSignFlag: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    
    const router = useRouter()

    const handleSubmit = useCallback((e: any) => {

        e.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (!username || !password){
            setError("Username and/or password missing!")
            return
        }

        axios.post('/api/account/signup', {username: username, password: password})
        .then((res) => {localStorage.setItem('id', res.data); router.push('/')})
        .catch(() => setError("User already exists!"))

    }, [username, password, confirmPassword, router])

    return (
        <div>
            <ProfileBG />
            <div className="relative ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[20px] flex flex-col items-center">
                <div className="text-[20px] mt-[10px] font-medium">Sign Up</div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input type={'text'} value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
                    <input type={'password'} value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
                    <input type={'password'} value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
                    {error && <p className="error-message"> {error} </p>}
                    <button type="submit" className="h-[55px] w-[330px] lg:h-[50px] bg-[#ed7bbe] text-white rounded mt-8">Sign Up</button>
                </form>
                <div className="text-[16px] italic mt-8 lg:mt-4 flex">
                    Already a user?
                    <button className="text-pink-500 ml-[5px] text-[16px] italic" onClick={() => setSignFlag(false)}> Log in </button>
                </div>
            </div>
            
        </div>
    )
}

export default SignUp