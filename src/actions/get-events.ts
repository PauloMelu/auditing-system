
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"


export async function getEvents(orgId: number){
    const supabase = await createClient()
    const { data: events, error} = await supabase.from('EventsTbl').select().eq("orgId", orgId)
    console.log(error)
    if(error)
        redirect('/error')
    else
        return events   
}