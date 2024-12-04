"use server"

import { ReceiptsTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export default async function RemoveReceipt(formData: FormData) {

    const id = parseInt(formData.get('receiptId') as string)
    console.log(id)
    const supabase = await createClient()
    const response = await supabase.from("ReceiptsTbl")
    .delete()
    .eq("id", id)

    console.log("check", response, "check")

    revalidatePath('/', "layout")
};