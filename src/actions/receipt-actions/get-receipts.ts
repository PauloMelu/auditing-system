import { ReceiptsTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { Database } from "lucide-react"



export async function getReceipts(orgName: string, eventName: string, userId?: string, verified?: boolean) {
    const data = {
        userId: userId,
        orgName: orgName,
        eventName: eventName
    }

    if (verified) {
        return getVerified(data)
    } else if (verified == false) {
        return getUnverified(data)
    } else {
        return getAll(data)
    }
};

export async function getReceipt(receiptId: number) {
    const supabase = await createClient()
    const { data: receipt, error } = await supabase.from("ReceiptsTbl")
        .select()
        .eq("id", receiptId)
        .returns<ReceiptsTbl[]>()
        .single()

    return receipt

}


async function getVerified(data: {userId: string, orgName: string, eventName: string}) {
    const supabase = await createClient()
    const { data: receipts, error } = await supabase.from("ReceiptsTbl")
        .select()
        .eq("userId", data.userId)
        .eq("orgName", data.orgName)
        .eq("eventName", data.eventName)
        .eq("verified", "TRUE")
        .returns<ReceiptsTbl[]>()

    return receipts
}

async function getUnverified(data: {userId: string, orgName: string, eventName: string}) {
    const supabase = await createClient()
    const { data: receipts, error } = await supabase.from("ReceiptsTbl")
        .select()
        .eq("userId", data.userId)
        .eq("orgName", data.orgName)
        .eq("eventName", data.eventName)
        .eq("verified", false)
        .returns<ReceiptsTbl[]>()

    return receipts
}

async function getAll(data: {userId: string, orgName: string, eventName: string}) {
    const supabase = await createClient()
    const { data: receipts, error } = await supabase.from("ReceiptsTbl")
        .select()
        .eq("orgName", data.orgName)
        .eq("eventName", data.eventName)
        .returns<ReceiptsTbl[]>()

    return receipts
}