"use server"
import { EventsTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type Props = {}

export default async function createEvent(formData: FormData) {

    const supabase = await createClient()

    const orgName = formData.get('orgName') as string
    const eventName = formData.get('eventName') as string
    const budget = parseFloat(formData.get('budget') as string)
    const data: EventsTbl = {} as EventsTbl
    data.orgName = orgName
    data.eventName = eventName
    data.budget = budget
    console.log(data)

    const {error: insertError} = await supabase.from("EventsTbl").insert(data)
    console.log(insertError)
    if(insertError){
        console.log("Go to error")
        redirect('/error')
    }

    revalidatePath('/', "layout")
};