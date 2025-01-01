"use client";

import Link from "next/link";
import { SettingsIcon } from "lucide-react";


import { useGetMembers } from "@/features/members/api/use-get-members";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/page-loader";

import { PageError } from "@/components/page-error";

import { Button } from "@/components/ui/button";

import { Member } from "@/features/members/types";


export const WorkspaceIdClient = () => {
    const workspaceId = useWorkspaceId();

    const { data: members, isLoading: membersLoading } = useGetMembers({
        workspaceId,
    });

    const isLoading =
        membersLoading;

    if (isLoading) return <PageLoader />;

    if (!members)
        return <PageError message="Failed to load workspace data" />;
    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <MembersList data={members.documents} total={5} />
            </div>
        </div>
    );
};





interface MembersListProps {
    data: Member[];
    total: number;
}
export const MembersList = ({ data, total }: MembersListProps) => {
    const workspaceId = useWorkspaceId();

    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Members ({total})</p>
                    <Button asChild variant="secondary" size="icon">
                        <Link href={`/workspaces/${workspaceId}/members`}>
                            <SettingsIcon className="size-4 text-neutral-400" />
                        </Link>
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((member) => (
                        <li key={member.$id}>
                            <Card className="shadow-none rounded-lg overflow-hidden">
                                <CardContent className="p-3 flex-col flex items-center gap-x-2">
                                    {/*<MemberAvatar className="size-12" name={member.name} />*/}
                                    <div className="flex flex-col items-center overflow-hidden">
                                        <p className="text-lg font-medium line-clamp-1">
                                            {member.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {member.email}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No members found
                    </li>
                </ul>
            </div>
        </div>
    );
};