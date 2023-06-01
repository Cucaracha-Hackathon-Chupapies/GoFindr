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
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
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
    )
}

export default Login