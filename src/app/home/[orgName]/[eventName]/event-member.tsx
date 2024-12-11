import { getReceipts } from "@/actions/receipt-actions/get-receipts"
import RemoveReceipt from "@/actions/receipt-actions/remove-receipt"
import { uploadReceipt } from "@/actions/receipt-actions/upload-receipt"
import { Button } from "@/components/ui/button"
import { OrganizationMembersTbl } from "@/types/types"
import { CircleMinus } from "lucide-react"
import "./member-style.css"
import capitalize from "@/actions/capitalize"

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
            <div id="receipt">
            <div><h1><a href="./"><u>Back</u></a></h1></div>
            <div><h1>{props.orgMember.orgName} - {capitalize(props.eventName)}</h1></div>
            <div></div>
            </div>

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

            <div className="receipt-wrapper">
                <h1>Pending for Verification:</h1>
                <div id="receipt">
                    <div>Date:</div>
                    <div>OR-Number:</div>
                    <div>Amount:</div>
                    <div>Category:</div>
                    <div className="end"></div>
                </div>
                {unverifiedReceipts.map(receipt => (
                    <div key={receipt.id}>
                        <form>
                            <div id="receipt">
                                <div>{new Date(receipt.date).toDateString()}</div>
                                <div>{receipt.ORNumber}</div>
                                <div>₱{receipt.amount}</div>
                                <div>{receipt.category}</div>

                                <input name="receiptId" type="hidden" value={receipt.id} />
                                <div className="end">
                                    <Button variant="destructive" size="icon" formAction={RemoveReceipt}>
                                        <CircleMinus />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                ))}

                <h1>Verified:</h1>
                <div id="receipt">
                    <div>Date:</div>
                    <div>OR-Number:</div>
                    <div>Amount:</div>
                    <div>Category:</div>
                    <div className="end"></div>
                </div>
                {verifiedReceipts.map(receipt => (
                    <div key={receipt.id} id="receipt">
                        <div>{new Date(receipt.date).toDateString()}</div>
                        <div>{receipt.ORNumber}</div>
                        <div>{receipt.amount}</div>
                        <div>{receipt.category}</div>
                        <div className="end"></div>
                    </div>
                ))}
            </div>
        </div>
    )
};