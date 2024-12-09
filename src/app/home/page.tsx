
import { createClient } from '@/utils/supabase/server'
import { signOut } from '../(auth)/actions'
import { joinOrg } from '@/actions/org-actions'
import Link from 'next/link'
import { getUser } from '@/actions/get-user'
import './style.css'
import { OrganizationMembersTbl, UsersTbl } from '@/types/types'

export default async function home() {
  const user = await getUser()

  //get all organizations that the user is already joined in
  const supabase = await createClient()
  const { data: userOrgs, error } = await supabase.from("OrganizationMembersTbl")
    .select()
    .eq("userId", user.userId)
    .returns<OrganizationMembersTbl[]>()

  //sort alphabetically
  userOrgs.sort((a, b) => a.orgName.localeCompare(b.orgName))

  return (
    <div>
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
          <div className='orgs' key={userOrg.orgName}>
            <div className='cards'>
              <Link href={`/home/${userOrg.orgName}`}>
                {userOrg.orgName}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


