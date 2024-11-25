import { getEvents } from "@/actions/get-events"
import { getUser } from "@/actions/get-user"
import { OrganizationsTblType } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Divide } from "lucide-react"
import Member from "./member"
import Auditor from "./auditor"



const Homepage = async ({ params, }: { params: Promise<{ orgName: string }> }) => {

  const orgName = (await params).orgName

  const supabase = await createClient()
  const user = await getUser()

  const { data: { orgId }, error: selectOrgError } = await supabase.from("OrganizationsTbl").select('orgId').eq("orgName", orgName).returns<{ orgId: number }[]>().single()
  console.log("asdasdasdasd ", orgId, orgName)


  const { data: { userType, money }, error } = await supabase.from("OrganizationMembersTbl").select('userType, money')
    .eq("orgId", orgId)
    .eq("userId", user.id).returns<{ userType: string, money: number }[]>().single()
  
  console.log(money, userType)

  const events = await getEvents(orgId)

  console.log(events)

  return (
    <div>
      {userType == "auditor" ? (
        <Auditor orgName={orgName} />
      ) : (
        <Member orgName={orgName} />
      )
      }
    </div>
  )
}

export default Homepage;