'use server'
import { createClient } from "@/utils/supabase/server";
import { getUser } from "./get-user";
import { getOrgMember } from "./get-org-member";
import { OrganizationMembersTbl } from "@/types/types";
import { isNull } from "util";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function returnMoney(formData: FormData) {
    const user = await getUser()
    const supabase = await createClient()

    const auditorId = formData.get('auditorId') as string
    let amount = parseFloat(formData.get('amount') as string)

    if (Number.isNaN(amount))
        amount = 0

    const orgName = formData.get('orgName') as string


    let auditorData = await getOrgMember(orgName, auditorId)
    let memberData = await getOrgMember(orgName, user.userId)

    if (isNull(auditorData)) {
        auditorData = {
            orgName: null,
            userId: null,
            userType: null,
            money: 0
        }

        memberData = {
            orgName: null,
            userId: null,
            userType: null,
            money: 0
        }
    }

    auditorData.money += amount
    memberData.money -= amount

    console.log(auditorData, memberData)

    update(auditorData, orgName, auditorId)
    update(memberData, orgName, user.userId)

    console.log(amount)
    console.log(auditorId)

    revalidatePath('/', "layout")
}

async function update(data: OrganizationMembersTbl, orgName: string, userId: string) {
    const supabase = await createClient()
    const error = await supabase.from("OrganizationMembersTbl")
        .update(data)
        .eq("orgName", orgName)
        .eq("userId", userId)
}