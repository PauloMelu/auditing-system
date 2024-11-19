
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { signOut } from '../(auth)/actions'
import { joinOrg } from '@/actions/org-actions'
import Link from 'next/link'
import { getUser } from '@/actions/get-user'
import './style.css'

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
    <body>
      <div className='side-bar'>
        <div className='create-cont'>
          <ul>
            <li><Link href="/home/create">Create</Link></li>
            <li><Link href="/home/join">Join</Link></li>
            <li><button onClick={signOut}>Signout</button></li>
          </ul>
        </div>
      </div>

      <div className='hello'>
        <h1>Hello {user.user_metadata.firstName} {user.user_metadata.lastName}.</h1>

      {userOrgs.map(userOrg => (
      <div className='orgs'>
        <div className='cards'>
          <div key = {userOrg.orgId}>
            <Link href={`/organization/${userOrg.orgId}`}>{userOrg.OrganizationsTbl.orgName}</Link>
          </div>
        </div>
      </div>
      ))}
    </div>
    </body>
  )
}


