import { login, signup } from "../actions"
import './style.css'
export default function SignupPage() {
  return (
   <body>
    
    <div className="wrapper">
     <form>
      <h1>SignUp</h1>
      <div className="input-box">
      <input className="email" name="email" type="email" placeholder="Email" required />
      </div>
      
      <div className="input-box">
      <input className="password" name="password" type="password" placeholder="Password" required />
      </div>
           
      <div className="input-box">
      <input className="firstName" name="firstName" type="text" placeholder="FirstName"required/>
      </div>
           
      <div className="input-box">
      <input className="lastName" name="lastName" type="text" placeholder="LastName" required/>
      </div>
           
      <div className="input-box">
      <input className="studentNumber" name="studentNumber" type="text" placeholder="StudentNumber"required/>
      </div>
           
      <button className="btn" formAction={signup}>Sign up</button>
    </form>

   </div>
   </body>
  )
}