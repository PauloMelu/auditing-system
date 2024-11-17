import { getUser } from "@/actions/get-user"
import { createClient } from "@/utils/supabase/server"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Homepage = async ({
    params,
  }: {
    params: Promise<{ orgId: number }>
  }) => {
    const orgId = (await params).orgId
    
    const supabase = await createClient()
    const user = await getUser()
    const {data: orgData, error: selectOrgError} = await supabase.from("OrganizationsTbl").select().eq("orgId", orgId).single()
    console.log(orgData)

    //ausdavsjhd

    return(
        <div>
            {orgData.orgName}
        </div>
    )
}
 
export default Homepage;