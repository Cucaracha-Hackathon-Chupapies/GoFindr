import Uploader from "@/components/ImageUpload/Uploader"
import axios from "axios"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [iconUrl, setIconUrl] = useState<string>()
    const [uploadError, setUploadError] = useState<boolean>(false)
    
    const router = useRouter()

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        axios.post('/api/account/signup', {username: username, password: password, ...(iconUrl ? {icon: iconUrl} : {})})
        .then((res) => {localStorage.setItem('id', res.data); router.push('/')})

    }, [username, password, iconUrl])

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                </label>
                <input type={'text'} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label>
                    Password
                </label>
                <input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label>
                    Icon
                </label>

                {iconUrl && <img src={iconUrl} alt="user image"/>}
                {uploadError && <h1>Error uploading image!</h1>}

                <Uploader setState={setIconUrl} setUploadError={setUploadError}/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Login