
import claimBudget from "@/actions/event-actions/claim-budget";
import createEvent from "@/actions/event-actions/create-event";
import { getEvents } from "@/actions/event-actions/get-event";


import { Button } from "@/components/ui/button";
import { OrganizationMembersTbl } from "@/types/types";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import "./auditor-style.css"

type Props = { orgMember: OrganizationMembersTbl }

export default async function OrgAuditor({ ...props }: Props) {

  const orgMember = props.orgMember
  console.log(orgMember.orgName)

  const events = await getEvents(orgMember.orgName);
  console.log(events)
  events.sort((a, b) => a.eventName.localeCompare(b.eventName))

  return (
    <div>
      <header className="dashboard">
        <h1><a href="/home"><u>Home</u></a></h1>
        <h1>Dashboard </h1>
        <h1>User: {orgMember.userType}</h1>
      </header>


      <div className="sidebar">
        <h1>
          <span>Money: {orgMember.money}php</span>
        
          <a href={`./${orgMember.orgName}/members`}>
            <u>
              Members List
            </u>
          </a>
        </h1>
        <center>
          <form>
            <input name="orgName" type="hidden" value={orgMember.orgName} />

            <input name="eventName" type="text" placeholder="Event Name" required />
            <input name="budget" type="number" placeholder="Budget" required />
            <Button variant="outline" formAction={createEvent}>Create Event</Button>
          </form>
        </center>
      </div>

      <div className="events-wrapper">
        <h1>Events:</h1>
        <div id="events">
          <div>Event Name:</div>
          <div>Budget:</div>
          <div></div>
        </div>

        {events.map(event => (

          <div key={event.eventName}>

            <form>
              <div id="events">
                <div>
                  <Button variant="link">
                    <Link href={`./${orgMember.orgName}/${event.eventName}`} >
                      <span>{event.eventName}</span>
                    </Link>
                  </Button>
                </div>
                <div>
                  {event.budget} php
                </div>

                <input name="eventName" type="hidden" value={event.eventName} />
                <input name="userId" type="hidden" value={orgMember.userId} />
                <input name="orgName" type="hidden" value={orgMember.orgName} />
                <input name="budget" type="hidden" value={event.budget} />
                <div>
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
                </div>
              </div>
            </form>


          </div>

        ))}

      </div>
    </div>
  )
};