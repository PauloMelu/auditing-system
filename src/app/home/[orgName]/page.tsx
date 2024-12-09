
import { getUser } from "@/actions/get-user"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Divide } from "lucide-react"
import OrgMember from "./org-member"
import OrgAuditor from "./org-auditor"
import { getOrgMember } from "@/actions/org-member-actions/get-org-member"



const organization = async ({ params, }: { params: Promise<{ orgName: string }> }) => {

  const orgName = (await params).orgName

  const supabase = await createClient()
  const user = await getUser()

  //get orgmember data of user
  const orgMember = await getOrgMember(orgName, user.userId)
  console.log(orgMember)

  return (
    <div>
      {orgMember.userType == "auditor" ? (
        <OrgAuditor orgMember={orgMember} />
      ) : (
        <OrgMember orgMember={orgMember} />
      )
      }
    </div>
  )
}

export default organization;