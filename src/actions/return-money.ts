'use server'
import { createClient } from "@/utils/supabase/server";
import { getUser } from "./get-user";
import { getOrgMember } from "./org-member-actions/get-org-member";
import { OrganizationMembersTbl } from "@/types/types";
import { isNull } from "util";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { updateOrgMember } from "./org-member-actions/update-org-member";


export async function returnMoney(formData: FormData) {
    const user = await getUser()
    const supabase = await createClient()

    const receiverId = formData.get('receiverId') as string
    let amount = parseFloat(formData.get('amount') as string)

    if (Number.isNaN(amount))
        amount = 0

    const orgName = formData.get('orgName') as string


    let receiverData = await getOrgMember(orgName, receiverId)
    let senderData = await getOrgMember(orgName, user.userId)

    console.log("receiver and sender: ", receiverData, senderData)

    if (isNull(receiverData)) {
        receiverData = {
            orgName: null,
            userId: null,
            userType: null,
            money: 0
        }

        senderData = {
            orgName: null,
            userId: null,
            userType: null,
            money: 0
        }
    }

    receiverData.money += amount
    senderData.money -= amount

    console.log("receiver and sender: ", receiverData, senderData)

    updateOrgMember(receiverData, orgName, receiverId)
    updateOrgMember(senderData, orgName, user.userId)

    console.log(amount)
    console.log(receiverId)

    revalidatePath('/', "layout")
}

