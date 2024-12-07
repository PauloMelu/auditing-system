"use server"

import { ReceiptsTbl } from "@/types/types"
import { getReceipt } from "./get-receipts"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { getOrgMember } from "../org-member-actions/get-org-member"
import { updateOrgMember } from "../org-member-actions/update-org-member"

export async function verifyReceipt(formData: FormData) {
    const receiptId = parseInt(formData.get('receiptId') as string)
    const receipt = await getReceipt(receiptId)
    
    //subtract amount of receipt to the money of uploader
    const orgName = formData.get('orgName') as string
    const userId = formData.get('userId') as string
    console.log(orgName, userId)
    const data = await getOrgMember(orgName, userId)
    console.log("test", data)
    data.money -= receipt.amount
    updateOrgMember(data, orgName, userId)

    //verify receipt
    receipt.verified = true
    update(receipt, receiptId)

    revalidatePath('/', "layout")
};

async function update(data: ReceiptsTbl, receiptId: number) {
    const supabase = await createClient()
    const { data: receipt, error } = await supabase.from("ReceiptsTbl")
        .update(data)
        .eq("id", receiptId)
}