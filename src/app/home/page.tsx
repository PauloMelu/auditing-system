
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { signOut } from '../(auth)/actions'
import { joinOrg } from '@/actions/org-actions'
import Link from 'next/link'
import { getUser } from '@/actions/get-user'
import './style.css'
import { UsersTbl } from '@/types/types'

export default async function home() {  

  const user = await getUser()

  //get all organizations that the user is already joined in; data are from OrganizationMembersTbl and OrganizationsTbl for the orgName
  const supabase = await createClient()
  const { data: userOrgs, error } = await supabase.from("OrganizationMembersTbl")
    .select(`
    orgId,
    OrganizationsTbl(
    orgName
    )
  `).eq("userId", user.userId).returns<{orgId: number, OrganizationsTbl: {orgName: string}}[]>()
   
console.log(userOrgs)

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
        <h1>Hello {user.firstName} {user.lastName}.</h1>

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
    </div>
  )
}


