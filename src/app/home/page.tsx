
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
  console.log("test", user, "asdasd")

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
    <div>
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
        <h1>Hello {user.firstName} {user.lastName}.</h1>

      {userOrgs.map(userOrg => (
      <div className='orgs'>
        <div className='cards'>
          <div key = {userOrg.orgId}>
            <Link href={`/organization/${userOrg.OrganizationsTbl.orgName}`}>{userOrg.OrganizationsTbl.orgName}</Link>
          </div>
        </div>
      </div>
      ))}
    </div>
    </div>
  )
}


