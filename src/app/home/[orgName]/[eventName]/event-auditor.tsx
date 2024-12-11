import { getEvent } from "@/actions/event-actions/get-event"
import { getName } from "@/actions/get-name"
import { getReceipts } from "@/actions/receipt-actions/get-receipts"
import RemoveReceipt from "@/actions/receipt-actions/remove-receipt"
import { uploadReceipt } from "@/actions/receipt-actions/upload-receipt"
import { verifyReceipt } from "@/actions/receipt-actions/verify-receipt"
import { Button } from "@/components/ui/button"
import { OrganizationMembersTbl } from "@/types/types"
import "./auditor-style.css"
import capitalize from "@/actions/capitalize"

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
            <div id="receipt">
                <h1></h1>
                <h1><a href="./"><u>Back</u></a></h1>
                <h1></h1>
                <h1>{props.orgMember.orgName} {capitalize(props.eventName)}</h1>
                <h1></h1>
                <h1></h1>
                <h1></h1>
            </div>
            <h1>Budget: ₱{event.budget} - Spent: ₱{spentBudget} - Remaining: ₱{remainingBudget}</h1>

            <form>
                <div className="sidebar">
                    <center>
                        <h1>Upload Receipt</h1>
                        <input type="text" name="ORNumber" placeholder="ORNumber" required />
                        <input type="number" name="amount" placeholder="Amount" required />
                        <input type="text" name="category" placeholder="Category" required />

                        <input name="orgName" type="hidden" value={orgName} />
                        <input name="userId" type="hidden" value={userId} />
                        <input name="eventName" type="hidden" value={eventName} />
                        <Button variant="outline" formAction={uploadReceipt}>Upload</Button>
                    </center>
                </div>
            </form>

            <div className="auditor-receipt-wrapper">
                <h1>Receipts:</h1>
                <div id="receipt">
                    <div>Name:</div>
                    <div>Date:</div>
                    <div>OR-Number:</div>
                    <div>Amount:</div>
                    <div>Category:</div>
                    <div className="end"></div>
                </div>
                {allReceipts.map(async receipt => (
                    <div key={receipt.id}>
                        <form>
                            <div id="receipt">
                                <div>{(await getName(receipt.userId)).firstName} {(await getName(receipt.userId)).lastName}</div>
                                <div>{new Date(receipt.date).toDateString()}</div>
                                <div>{receipt.ORNumber}</div>
                                <div>₱{receipt.amount}</div>
                                <div>{receipt.category}</div>

                                <input name="receiptId" type="hidden" value={receipt.id} />
                                <input name="orgName" type="hidden" value={receipt.orgName} />
                                <input name="userId" type="hidden" value={receipt.userId} />
                                <div className="end">
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
                                </div>
                            </div>
                        </form>
                    </div>
                ))}
            </div>


        </div>
    )
};