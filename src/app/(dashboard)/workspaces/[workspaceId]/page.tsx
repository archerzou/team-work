import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
// import { WorkspaceIdClient } from "./client";

const WorkspaceIdpage = async () => {
    const current = await getCurrent();
    if (!current) redirect("/sign-in");
    return (
        <div>
            Workspace Id
        </div>
    );
};

export default WorkspaceIdpage;