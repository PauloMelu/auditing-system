"use server"

import { createClient } from "@/utils/supabase/server"
import { getOrgMember } from "../org-member-actions/get-org-member"
import { getEvent } from "./get-event"
import { updateOrgMember } from "../org-member-actions/update-org-member"
import { revalidatePath } from "next/cache"



export default async function claimBudget(formData: FormData) {
    
    
    const userId = formData.get('userId') as string
    const orgName = formData.get('orgName') as string
    const budget = parseFloat(formData.get('budget') as string)
    const eventName = formData.get('eventName') as string

    console.log(userId, orgName, budget)

    const data = await getOrgMember(orgName, userId)
    data.money += budget
    
    updateOrgMember(data, orgName, userId)
    berserker(orgName, eventName)

    revalidatePath('/', "layout")
};

async function berserker(orgName: string, eventName: string) {
    const supabase = await createClient()
    const data = await getEvent(orgName, eventName)
    data.budgetTaken = true
    const error = await supabase.from("EventsTbl")
    .update(data)
    .eq("orgName", orgName)
    .eq("eventName", eventName)
}