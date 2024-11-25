import { getEvents } from "@/actions/get-events"
import { returnMoney } from "@/actions/return-money";


type Props = { orgName: string, orgId: number , money: number}

export default async function Member({ ...props }: Props) {
  console.log(props.orgName)

  const events = await getEvents(props.orgId);

  return (
    <div>
      member {props.orgName}
    <br />
      Money: {props.money}
      <br />

      <form>
      <input name="amount" type="number" placeholder="Amount"/>
      <button formAction={returnMoney} >Return</button>
      </form>

      <br />
      {events.map(event => (
            <div key={event.eventId}>
              {event.eventName}
            </div>
          
      ))}

    </div>
  )
};