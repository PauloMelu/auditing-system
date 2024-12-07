import { getUser } from "@/actions/get-user"
import { getOrgMember, getOrgMembers } from "@/actions/org-member-actions/get-org-member"
import { demote, promote } from "@/actions/promote-demote"
import { returnMoney } from "@/actions/return-money"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

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
        <div>
            Members list
            <br />
            Money: {orgMember.money}

            <br />

            {orgMembers.map(orgMember => (
                <div key={orgMember.userId}>
                    <form>
                        {orgMember.UsersTbl.firstName} {orgMember.UsersTbl.lastName} - {orgMember.userType} - {orgMember.money}

                        <input name="userId" type="hidden" value={orgMember.userId}/>
                        <input name="orgName" type="hidden" value={orgMember.orgName}/>
                        {orgMember.userType == "auditor" ? (
                            <Button variant="outline" formAction={demote}>
                                Demote
                            </Button>
                        ) : (
                            <Button variant="outline" formAction={promote}>
                                Promote
                            </Button>
                        )
                        }
                        <br />
                        <input name="amount" type="number" placeholder="amount"/>
                        <input name="receiverId" type="hidden" value={orgMember.userId}/>
                        
                        <Button formAction={returnMoney}>
                            Send Money
                        </Button>
                    </form>
                </div>
            ))}
        </div>
    )
};