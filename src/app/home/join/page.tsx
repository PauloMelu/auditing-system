import { joinOrg } from "@/actions/org-actions";
import { Button } from "@/components/ui/button";
import './style.css'

export default async function join() {
  return (
    <body>
      <div className="wrapper">
        <h1>Join Organization</h1>
        <form>

          <input id="orgName" name="orgName" type="text" placeholder="Organization Name" required />
          <input id="orgPassword" name="orgPassword" type="password" placeholder="Password" required />
          <button className="btn" formAction={joinOrg}>Join Org</button>
        </form>

      </div>
    </body>
  )
};