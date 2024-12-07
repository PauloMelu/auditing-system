
import claimBudget from "@/actions/event-actions/claim-budget";
import createEvent from "@/actions/event-actions/create-event";
import { getEvents } from "@/actions/event-actions/get-event";


import { Button } from "@/components/ui/button";
import { OrganizationMembersTbl } from "@/types/types";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

type Props = { orgMember: OrganizationMembersTbl }

export default async function OrgAuditor({ ...props }: Props) {

  const orgMember = props.orgMember
  console.log(orgMember.orgName)

  const events = await getEvents(orgMember.orgName);
  console.log(events)
  events.sort((a, b) => a.eventName.localeCompare(b.eventName))

  return (
    <div>
      {orgMember.orgName} - {orgMember.userType}
      <br />
      Money: {orgMember.money}
      <br />
      <Button variant="link">
        <Link href={`./${orgMember.orgName}/members`}>
          Members List
        </Link>
      </Button>
      <br />
      <br />

      <form>
        <input name="orgName" type="hidden" value={orgMember.orgName} />

        <input name="eventName" type="text" placeholder="Event Name" required />
        <input name="budget" type="number" placeholder="Budget" required />
        <Button variant="outline" formAction={createEvent}>Create Event</Button>
      </form>

      <br />
      <br />

      {events.map(event => (

        <div key={event.eventName}>
          <form>
            <Button variant="link">
              <Link href={`/organization/${orgMember.orgName}/${event.eventName}`} >
                {event.eventName}
              </Link>
            </Button>
            - {event.budget}

            <input name="eventName" type="hidden" value={event.eventName} />
            <input name="userId" type="hidden" value={orgMember.userId} />
            <input name="orgName" type="hidden" value={orgMember.orgName} />
            <input name="budget" type="hidden" value={event.budget} />
            {(event.budgetTaken) ? (
              <Button variant="outline" disabled>
                Budget Claimed
              </Button>
            ) : (
              <Button variant="outline" formAction={claimBudget}>
                Claim Budget
              </Button>
            )
            }


          </form>

        </div>

      ))}
    </div>
  )
};