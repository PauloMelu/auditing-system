type Props = {orgName: string}

export default function Member({...props}: Props) {
    console.log(props.orgName)
    return (
    <div>
        member
        {props.orgName}
    </div>
  )
};