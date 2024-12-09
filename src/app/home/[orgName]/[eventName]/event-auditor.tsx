import { getEvent } from "@/actions/event-actions/get-event"
import { getName } from "@/actions/get-name"
import { getReceipts } from "@/actions/receipt-actions/get-receipts"
import RemoveReceipt from "@/actions/receipt-actions/remove-receipt"
import { uploadReceipt } from "@/actions/receipt-actions/upload-receipt"
import { verifyReceipt } from "@/actions/receipt-actions/verify-receipt"
import { Button } from "@/components/ui/button"
import { OrganizationMembersTbl } from "@/types/types"
import { CircleMinus } from "lucide-react"

type Props = { orgMember: OrganizationMembersTbl, eventName: string }

export default async function EventAuditor({ ...props }: Props) {

    const userId = props.orgMember.userId
    const orgName = props.orgMember.orgName
    const eventName = props.eventName
    const event = await getEvent(orgName, eventName)

    const allReceipts = await getReceipts(orgName, eventName)
    allReceipts.sort((a, b) => Number(a.verified) - Number(b.verified))
    console.log(allReceipts)

    const spentBudget = allReceipts
    .filter((receipt) => receipt.verified)
    .reduce((sum, receipt) => sum += receipt.amount, 0)

    const remainingBudget: number = event.budget - spentBudget

    console.log(remainingBudget)


    return (
        <div>
            {props.orgMember.orgName} {props.eventName} <br />
            Budget: {event.budget}php - Spent: {spentBudget}php - Remaining: {remainingBudget}php
            <br />
            <br />
            <form>
                <input type="text" name="ORNumber" placeholder="ORNumber" required />
                <input type="number" name="amount" placeholder="Amount" required />
                <input type="text" name="category" placeholder="Category" required />

                <input name="orgName" type="hidden" value={orgName} />
                <input name="userId" type="hidden" value={userId} />
                <input name="eventName" type="hidden" value={eventName} />
                <Button variant="outline" formAction={uploadReceipt}>Upload</Button>
            </form>

            <h1>Receipts:</h1>
            {allReceipts.map(async receipt => (
                <div key={receipt.id}>
                    <form>

                    {(await getName(receipt.userId)).firstName} {(await getName(receipt.userId)).lastName} - {receipt.date.toString()}
                    - {receipt.ORNumber} - {receipt.amount} - {receipt.category}
                        
                        <input name="receiptId" type="hidden" value={receipt.id}/>
                        <input name="orgName" type="hidden" value={receipt.orgName}/>
                        <input name="userId" type="hidden" value={receipt.userId}/>

                        {receipt.verified ? (
                            <Button variant="outline" disabled>
                                verified
                            </Button>
                        ) : (
                            <Button variant="outline" formAction={verifyReceipt}>
                                verify
                            </Button>
                        )
                        }
                    </form>
                </div>
            ))}

            
        </div>
    )
};