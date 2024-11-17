import { joinOrg } from "@/actions/org-actions";
import { Button } from "@/components/ui/button";


export default async function join() {
  return (
<div>

    <form>
        
        <input id="orgName" name="orgName" type="text" placeholder="org name" required/>
        <input id="orgPassword" name="orgPassword" type="password" placeholder="org password" required/>
        <Button formAction={joinOrg}>Join Org</Button>
    </form>

    </div>
  )
};