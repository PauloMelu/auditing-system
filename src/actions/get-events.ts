
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"


export async function getEvents(orgName: string){
    const supabase = await createClient()
    const { data: events, error} = await supabase.from('EventsTbl').select().eq("orgName", orgName)

    if(error)
        redirect('/error')
    else
        return events   
}