
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { signOut } from '../(auth)/actions'
import { OrgMemberContext, useOrgMember } from '@/components/orgMember-provider'
import { OrganizationMembersTbl } from '@/types/types'
import { useContext, useEffect, useState } from 'react'
import { joinOrg } from '@/actions/org-actions'
import { revalidatePath } from 'next/cache'
import { log } from 'console'
import Link from 'next/link'
import { getUser } from '@/actions/get-user'


export default async function home() {  

  const {user} = await getUser()
  if (user==null) {
    redirect('/login')
  }

  
  console.log(user)
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

  console.log(userOrgs)

  return (
    <div>
      <p>Hello {user.user_metadata.firstName} {user.user_metadata.lastName}</p>

      {userOrgs.map(userOrg => (
        <div key = {userOrg.orgId}>
          <Link href={`/organization/${userOrg.orgId}`}>{userOrg.OrganizationsTbl.orgName}</Link>
        </div>
      ))}


      <form action="">
        <input id="orgPassword" name="orgPassword" type="text" placeholder="org password" />
        <Button formAction={joinOrg}>Join Org</Button>
      </form>

      <button onClick={signOut}>Signout</button>
    </div>
  )
}


