
import { getEvents } from "@/actions/event-actions/get-event";
import { getAuditors } from "@/actions/get-auditors";
import { getName } from "@/actions/get-name";


import { returnMoney } from "@/actions/return-money";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrganizationMembersTbl } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";



type Props = { orgMember: OrganizationMembersTbl }

export default async function OrgMember({ ...props }: Props) {

  const orgMember = props.orgMember

  const events = await getEvents(orgMember.orgName);
  console.log(events)
  events.sort((a, b) => a.eventName.localeCompare(b.eventName))

  const auditors = await getAuditors(orgMember.orgName)
  console.log("raw auditors", auditors)

  //add the name of the auditor
  await Promise.all(
    auditors.map(async auditor => {
      auditor.firstName = (await getName(auditor.userId)).firstName
      auditor.lastName = (await getName(auditor.userId)).lastName
    })
  )

  auditors.sort((a, b) => a.lastName.localeCompare(b.lastName))

  return (
    <div>
      {orgMember.orgName} - {orgMember.userType}
      <br />
      Money: {orgMember.money}
      <br />

      <form>
        <input name="orgName" type="hidden" value={orgMember.orgName} />

        <input name="amount" type="number" placeholder="Amount" />
        <Select name="receiverId">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select auditor" />
          </SelectTrigger>
          <SelectContent>
            {auditors.map(auditor => (
              <SelectItem key={auditor.userId} value={auditor.userId}>
                {auditor.lastName}, {auditor.firstName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" formAction={returnMoney} >Return</Button>
      </form>

      <br />
      {events.map(event => (
        <div key={event.eventName}>
          <Link href={`/organization/${orgMember.orgName}/${event.eventName}`} >
            {event.eventName}
          </Link>
        </div>

      ))}

    </div>
  )
};