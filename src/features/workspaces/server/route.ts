import { ID } from "node-appwrite";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { sessionMiddleware } from "@/lib/session-middleware";

import {
    DATABASE_ID,
    IMAGES_BUCKET_ID,
    WORKSPACE_ID,
} from "@/config";

import {
    createWorkspaceSchema,
    inviteCodeSchema,
    updateWorkspaceSchema,
} from "../schemas";

const app = new Hono()
    .post(
        "/",
        zValidator("form", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("databases");
            const storage = c.get("storage");
            const user = c.get("user");

            const { name, image } = c.req.valid("form");
            let uploadedImage: string | undefined;
            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                );
                const buffer: ArrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id
                );
                uploadedImage = `data:image/png;base64,${Buffer.from(buffer).toString(
                    "base64"
                )}`;
            }
            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACE_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImage,
                    inviteCode: generateInviteCode(INVITECODE_LENGTH),
                }
            );

            await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
                userId: user.$id,
                workspaceId: workspace.$id,
                role: MemberRole.ADMIN,
            });
            return c.json({ data: workspace });
        }
    )


export default app;