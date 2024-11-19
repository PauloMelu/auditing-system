import { getUser } from "@/actions/get-user"
import { OrganizationsTblType } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Homepage = async ({ params, }: { params: Promise<{ orgName: string }> }) => {

  const orgName = (await params).orgName

  const supabase = await createClient()
  const user = await getUser()

  const { data: { orgId }, error: selectOrgError } = await supabase.from("OrganizationsTbl").select('orgId').eq("orgName", orgName).single()
  console.log(orgId, orgName)

  const { data: { userType, money }, error } = await supabase.from("OrganizationMembersTbl").select("userType, money")
    .eq("orgId", orgId)
    .eq("userId", user.id).single()

  console.log(money, userType)

  if (userType == "auditor")
    return (
      <div>
        {orgName}
        auditor
      </div>
    )
  else if (userType == "member")
    return (
      <div>
        {orgName}
        member
      </div>
    )
  redirect('/error')
}

export default Homepage;