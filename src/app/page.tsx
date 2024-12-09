
import './style.css'
//hi
//testing
export default function Home() {
  return (
    <div className='wrapper'>
     
        
      
      <div className="logo">
        <h1>BudgeThink</h1>
      </div>

      <div className="Login">
        <a href="/login">
          <button className="btn loginbtn" id="login">Login</button> &nbsp;
        </a>
        <a href="/signup">
          <button className="btn" id="signup">Signup</button>
        </a>
      </div>

    </div>
  );
}
