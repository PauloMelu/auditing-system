
import { getAuditors } from "@/actions/get-auditors";
import { getEvents } from "@/actions/get-events"

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

  const auditors = await getAuditors(orgMember.orgName)
  console.log(auditors)


  return (
    <div>
      member {orgMember.orgName}
      <br />
      Money: {orgMember.money}
      <br />

      <form>
        <input name="orgName" type="hidden" value={orgMember.orgName} />
        <input name="amount" type="number" placeholder="Amount" />
        <Select name="auditorId">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select auditor" />
          </SelectTrigger>
          <SelectContent>
            {auditors.map(auditor => (
              <SelectItem key={auditor.userId} value={auditor.userId}>
                {auditor.UsersTbl.firstName} {auditor.UsersTbl.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" formAction={returnMoney} >Return</Button>
      </form>

      <br />
      {events.map(event => (
        <div key={event.eventId}>
          <Link href={`/organization/${orgMember.orgName}/${event.eventName}`} >
            {event.eventName}
          </Link>
        </div>

      ))}

    </div>
  )
};