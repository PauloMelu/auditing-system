
import { EventsTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { isNullOrUndefined } from "util"


export async function getEvents(orgName: string) {
    const supabase = await createClient()
    const { data: events, error} = await supabase.from('EventsTbl')
    .select()
    .eq("orgName", orgName)
    .returns<EventsTbl[]>()
    if(error)
        redirect('/error')
    else
        return events   
}

export async function getEvent(orgName: string, eventName: string) {
    const supabase = await createClient()
    const { data: events, error} = await supabase.from('EventsTbl')
    .select()
    .eq("orgName", orgName)
    .eq("eventName", eventName)
    .returns<EventsTbl[]>()
    .single()

    if(error)
        redirect('/error')
    else
        return events   
}