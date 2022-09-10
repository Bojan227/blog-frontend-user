import {useState} from "react";
import {Link} from 'react-router-dom'
import { useLogin } from "../hooks/useLogin";


export default function Signup(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e)=> {
        e.preventDefault()

        await login(username, password)

    }
    return (
        <div className="login-container">
            <h1>Welcome</h1>
            <p>Enter your credentials to access your account.</p>
            
            <form onSubmit={handleSubmit} >
                <label htmlFor="username">Username</label>
                <input onChange={(e)=>setUsername(e.target.value)} value={username} />

                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />

                <button >Sign In</button>
            </form>
            <p style={{visibility: `${error ? '' : "hidden"}`, color: 'red', fontWeight: '700'}}  >{error}</p>
            
            <h5><Link to='/'>Create Account</Link></h5>
        </div>
        
    )


}