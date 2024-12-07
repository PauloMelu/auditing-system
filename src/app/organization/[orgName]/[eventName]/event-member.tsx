import { getReceipts } from "@/actions/receipt-actions/get-receipts"
import RemoveReceipt from "@/actions/receipt-actions/remove-receipt"
import { uploadReceipt } from "@/actions/receipt-actions/upload-receipt"
import { Button } from "@/components/ui/button"
import { OrganizationMembersTbl } from "@/types/types"
import { CircleMinus } from "lucide-react"

type Props = { orgMember: OrganizationMembersTbl, eventName: string }

export default async function EventMember({ ...props }: Props) {
    const userId = props.orgMember.userId
    const orgName = props.orgMember.orgName
    const eventName = props.eventName

    const verifiedReceipts = await getReceipts(orgName, eventName, userId, true)
    const unverifiedReceipts = await getReceipts(orgName, eventName, userId, false)
    console.log(verifiedReceipts, " - ", unverifiedReceipts)
    return (
        <div>
            {props.eventName} {props.orgMember.orgName}<br />

            event-member <br />
            <form>
                <input type="text" name="ORNumber" placeholder="ORNumber" required />
                <input type="number" name="amount" placeholder="Amount" required />
                <input type="text" name="category" placeholder="Category" required />

                <input name="orgName" type="hidden" value={orgName} />
                <input name="userId" type="hidden" value={userId} />
                <input name="eventName" type="hidden" value={eventName} />
                <Button variant="outline" formAction={uploadReceipt}>Upload</Button>
            </form>

            <h1>Pending for Verification:</h1>
            {unverifiedReceipts.map(receipt => (
                <div key={receipt.id}>
                    <form>
                        {receipt.date.toString()} - {receipt.ORNumber} - {receipt.amount} - {receipt.category}

                        <input name="receiptId" type="hidden" value={receipt.id} />
                        <Button variant="destructive" size="icon" formAction={RemoveReceipt}>
                            <CircleMinus />
                        </Button>
                    </form>
                </div>
            ))}

            <h1>Verified:</h1>
            {verifiedReceipts.map(receipt => (
                <div key={receipt.id}>
                    {receipt.date.toString()} - {receipt.ORNumber} - {receipt.amount} - {receipt.category}
                </div>
            ))}
        </div>
    )
};