import { createOrg } from "@/actions/org-actions";


export default async function create() {
    return (
        <div>
            <form>
                <label htmlFor="orgname">Organization Name:</label>
                <input id="orgName" name="orgName" type="text" required />

                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="text" required />


                <button formAction={createOrg}>Create Org</button>
            </form>

        </div>
    )
};