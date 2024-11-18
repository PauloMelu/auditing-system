
import Image from "next/image";
import { signOut } from "./(auth)/actions";
import { Button } from "@/components/ui/button";
import { joinOrg } from "@/actions/org-actions";
import Link from "next/link";
import './style.css'
//hi
//testing
export default function Home() {
  return (
    <body>
      <nav className="nav">

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
      </nav>
    </body>

  );
}
