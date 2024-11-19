import { login, signup } from "../actions"
import './style.css'
export default function LoginPage() {
  return (
    <body>
       <div className="wrapper">
        <form >
          <h1>Login</h1>
          <div className="input-box">
            <input className="email" name="email" type="email" placeholder="Email"required />
          </div>
          <div className="input-box">
            <input className="password" name="password" type="password" placeholder="Password"required />
          </div>
          
          <button className="btn" formAction={login}>Log in</button>
       </form>
      <div className="register">
        <p>Don't have an account? <a href="/signup">
        <button className="register-btn" id="signup">Register</button>
        </a>
        </p>
    </div>

    </div>
    </body>
   

  )
}