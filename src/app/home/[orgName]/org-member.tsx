import { getEvents } from "@/actions/event-actions/get-event";
import { getAuditors } from "@/actions/get-auditors";
import { getName } from "@/actions/get-name";


import { returnMoney } from "@/actions/return-money";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrganizationMembersTbl } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import './member-style.css'


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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <span>User: {orgMember.userType.toUpperCase()}</span>
      </header>

      <div className="dashboard-content">
        <div className="card">
          <h2>Organization: {orgMember.orgName}</h2>
          <p>Role: {orgMember.userType}</p>
          <p>Balance: {orgMember.money}</p>
        </div>

        <div className="form-container">
          <h2>Return Change</h2>
          <form>
            <input name="orgName" type="hidden" value={orgMember.orgName} />
            <input name="amount" type="number" placeholder="Amount" />
            <Select name="receiverId">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Auditor" />
              </SelectTrigger>
              <SelectContent>
                {auditors.map((auditor) => (
                  <SelectItem key={auditor.userId} value={auditor.userId}>
                    {auditor.lastName}, {auditor.firstName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" formAction={returnMoney}>
              Return
            </Button>
          </form>
        </div>
      </div>

      <div className="event-list card">
        <h2>Events</h2>
        {events.map((event) => (
          <div key={event.eventName} className="event-item">
            <Link href={`./${orgMember.orgName}/${event.eventName}`}>
              {event.eventName}
            </Link>
          </div>
        ))}
      </div>
    </div>

  )
};