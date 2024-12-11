import { getUser } from "@/actions/get-user"
import { getOrgMember, getOrgMembers } from "@/actions/org-member-actions/get-org-member"
import { demote, promote } from "@/actions/promote-demote"
import { returnMoney } from "@/actions/return-money"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import "./style.css"
import capitalize from "@/actions/capitalize"

export default async function Members({ params, }: { params: Promise<{ orgName: string }> }) {
    const orgName = (await params).orgName
    const user = await getUser()
    const orgMember = await getOrgMember(orgName, user.userId)
    if (orgMember.userType != "auditor")
        redirect("./")

    const orgMembers = await getOrgMembers(orgName, user.userId)
    orgMembers.sort((a, b) => a.UsersTbl.lastName.localeCompare(b.UsersTbl.lastName))
    console.log("members", orgMembers)


    return (
        <div className="hello">
            <h1>Members list</h1>


            <div className="wrapper">
                <p>Balance: ₱{orgMember.money}</p>
                <div id="member">
                    <div>Name:</div>
                    <div>User Type:</div>
                    <div>User Balance:</div>
                    <div></div>
                    <div></div>
                </div>

                {orgMembers.map(orgMember => (
                    <div key={orgMember.userId}>
                        <form>
                            <div id="member">
                                <div>
                                    {orgMember.UsersTbl.firstName} {orgMember.UsersTbl.lastName}
                                </div>

                                <div>
                                    {capitalize(orgMember.userType)}

                                    <input name="userId" type="hidden" value={orgMember.userId} />
                                    <input name="orgName" type="hidden" value={orgMember.orgName} />
                                    {orgMember.userType == "auditor" ? (
                                        <Button className="btn" formAction={demote}>
                                            Demote
                                        </Button>
                                    ) : (
                                        <Button className="btn" formAction={promote}>
                                            Promote
                                        </Button>
                                    )
                                    }
                                </div>

                                <div>
                                    ₱{orgMember.money}
                                </div>
                                <div>
                                    <input name="amount" type="number" placeholder="Amount" />
                                    <input name="receiverId" type="hidden" value={orgMember.userId} />
                                </div>
                                <div>
                                    <Button formAction={returnMoney} className="btn">
                                        Send Money
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )
};