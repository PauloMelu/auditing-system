import { createOrg } from "@/actions/org-actions";
import './style.css'
import Link from "next/link";

export default async function create() {
    return (


        <div>
            <div className="wrapper">
                <h1>Create Organization</h1>
                <form>
                    <input id="orgName" name="orgName" type="text" placeholder="Organization Name" required />
                    <input id="password" name="password" type="text" placeholder="Password" required />
                    <button className="btn" formAction={createOrg}>Create Org</button>
                </form>

                <a href="./">
                    <button className="btn">
                        Back
                    </button>
                </a>
            </div>

        </div>

    )
};