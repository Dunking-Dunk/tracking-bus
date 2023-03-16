import "./login.scss"
import React, {useState} from "react"
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/')
  }

  return (
    <div className="login__container">
      <img src='adminLogin.jpeg' className="login__image"/>
      <div className="login__form__container">
        <h1>Login</h1>
        <input type='email' placeholder="email" onChange={(e) => {
          setEmail(e.target.value)
        }} value={email} />
        <input type='password' placeholder="password"  onChange={(e) => {
          setPassword(e.target.value)
        }} value={password} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Login