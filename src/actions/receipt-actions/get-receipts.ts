import { ReceiptsTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"

type Props = {}

export default async function GetReceipts(userId: string, orgName: string, eventName: string, verified?: boolean) {

    const data = {
        userId: userId,
        orgName: orgName,
        eventName: eventName
    }

    if(verified)
        return getVerified(data)
    else if(!verified)
        return getUnverified(data)
    else
        return getAll()
};

async function getVerified(data: any) {
    const supabase = await createClient()
    const {data: receipts, error} = await supabase.from("ReceiptsTbl")
    .select()
    .eq("userId", data.userId)
    .eq("orgName", data.orgName)
    .eq("eventName", data.eventName)
    .eq("verified", "TRUE")
    .returns<ReceiptsTbl[]>()

    return receipts
}

async function getUnverified(data: any) {
    const supabase = await createClient()
    const {data: receipts, error} = await supabase.from("ReceiptsTbl")
    .select()
    .eq("userId", data.userId)
    .eq("orgName", data.orgName)
    .eq("eventName", data.eventName)
    .eq("verified", false)
    .returns<ReceiptsTbl[]>()

    return receipts
}

async function getAll() {
    let data: ReceiptsTbl[]
    return data
}