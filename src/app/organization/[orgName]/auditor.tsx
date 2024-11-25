type Props = {orgName: string}

export default function Auditor({...props}: Props) {
    console.log(props.orgName)
    return (
    <div>
        auditor
        {props.orgName}
    </div>
  )
};