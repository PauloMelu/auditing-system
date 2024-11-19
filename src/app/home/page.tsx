
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { signOut } from '../(auth)/actions'
import { joinOrg } from '@/actions/org-actions'
import Link from 'next/link'
import { getUser } from '@/actions/get-user'


export default async function home() {  

  const user = await getUser()
  
  //get all organizations that the user is already joined in; data are from OrganizationMembersTbl and OrganizationsTbl for the orgName
  const supabase = await createClient()
  const { data: userOrgs, error } = await supabase.from("OrganizationMembersTbl")
    .select(`
    orgId,
    userId,
    userType,
    money,
    OrganizationsTbl(
    orgName,
    orgPassword
    )
  `).eq("userId", user.id)



  return (
    <div>
      <p>Hello {user.user_metadata.firstName} {user.user_metadata.lastName}</p>

      {userOrgs.map(userOrg => (
        <div key = {userOrg.orgId}>
          <Link href={`/organization/${userOrg.OrganizationsTbl.orgName}`}>{userOrg.OrganizationsTbl.orgName}</Link>
        </div>
      ))}

      <br />
      <Link href="/home/create">Create</Link>
      <br />
      <Link href="/home/join">Join</Link>
      <br />
      <button onClick={signOut}>Signout</button>
    </div>
  )
}


