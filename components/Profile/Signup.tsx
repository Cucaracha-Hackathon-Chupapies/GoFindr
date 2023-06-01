import ProfileBG from "@/components/Backgrounds/ProfileBG"
import Uploader from "@/components/ImageUpload/Uploader"
import axios from "axios"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"


const SignUp = ({ setSignFlag }: { setSignFlag: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [iconUrl, setIconUrl] = useState<string>()
    const [uploadError, setUploadError] = useState<boolean>(false)
    
    const router = useRouter()

    const handleSubmit = useCallback((e: any) => {
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        e.preventDefault()

        axios.post('/api/account/signup', {username: username, password: password, ...(iconUrl ? {icon: iconUrl} : {})})
        .then((res) => {localStorage.setItem('id', res.data); router.push('/')})

    }, [username, password, confirmPassword, iconUrl])

    return (
        <div>
            <ProfileBG />
            <div className="relative ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px] flex flex-col items-center">
                <div className="text-[20px] mt-[10px] font-medium">Sign Up</div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8 lg:mt-4">
                    <input type={'text'} value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
                    <input type={'password'} value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
                    <input type={'password'} value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
                    {error && <p className="error-message"> {error} </p>}
                    {/* <label>
                        Icon
                    </label>

                    {iconUrl && <img src={iconUrl} alt="user image"/>}
                    {uploadError && <h1>Error uploading image!</h1>}

                    <Uploader setState={setIconUrl} setUploadError={setUploadError}/> */}

                    <button type="submit" className="h-[55px] w-[330px] lg:h-[50px] bg-[#ed7bbe] text-white rounded mt-8">Sign Up</button>
                </form>
                <div className="text-[16px] italic mt-8 lg:mt-4">
                    Already a user?
                    <button className="text-pink-500 ml-[5px] text-[16px] italic" onClick={() => setSignFlag(false)}> Log in </button>
                </div>
            </div>
            
        </div>
    )
}

export default SignUp