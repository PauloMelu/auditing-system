import { OrganizationMembersTbl } from "@/types/types"
import EventAuditor from "./event-auditor"
import EventMember from "./event-member"
import { getUser } from "@/actions/get-user"
import { createClient } from "@/utils/supabase/server"
import { getOrgMember } from "@/actions/get-org-member"


export default async function Event({ params, }: { params: Promise<{ orgName: string, eventName: string }> }) {


    const eventName = (await params).eventName.replace("%20", " ")
    console.log(eventName)
//pede ifunction to vvv
    const orgName = (await params).orgName

    const supabase = await createClient()
    const user = await getUser()

    //get orgmember data of user
    const orgMember = await getOrgMember(orgName, user.userId)
    console.log(orgMember)
//'till here

    return (
        <div>
            
            {orgMember.userType == "auditor" ? (
                <EventAuditor />
            ) : (
                <EventMember orgMember={orgMember} eventName={eventName}/>
            )
            }
        </div>
    )
};