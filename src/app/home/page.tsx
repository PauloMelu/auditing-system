
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
      <nav className='nav'>
        <div className='create'>
          <a href="/home/create">
            <button className='btn'>Create</button>&nbsp;
          </a>
          <a href="/home/join">
            <button className='btn'>Join</button>&nbsp;
          </a>
          <button onClick={signOut} className='btn'>Signout</button>
        </div>
      </nav>
      
      <div className='hello'>
        <h1>Hello {user.user_metadata.firstName} {user.user_metadata.lastName}.</h1>

      {userOrgs.map(userOrg => (
      <div className='orgs' key={userOrg.orgId}>
        <div className='cards'>
            <Link href={`/organization/${userOrg.orgId}`}>
            {userOrg.OrganizationsTbl.orgName}
            </Link>
        </div>
      </div>
      ))}
    </div>
    </body>
  )
}


