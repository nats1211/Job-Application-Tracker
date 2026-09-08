import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import {
  deleteUser,
  insertUser,
  updateUser,
} from "../../../../features/users/db/users";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    switch (evt.type) {
      case "user.created":
      case "user.updated": {
        const email = evt.data.email_addresses.find(
          (email) => email.id === evt.data.primary_email_address_id,
        )?.email_address;
        const name = `${evt.data.first_name} ${evt.data.last_name}`.trim();

        if (name === "") return new Response("No name", { status: 400 });

        if (email == null)
          return new Response("No email", {
            status: 400,
          });

        // Creating User
        if (evt.type === "user.created") {
          await insertUser({
            clerkId: evt.data.id,
            email,
            name: name === "" ? null : name,
          });
        } else {
          await updateUser(
            { clerkId: evt.data.id },
            { email, name: name === "" ? null : name },
          );
        }
        break;
      }
      case "user.deleted": {
        if (evt.data.id != null) {
          const deletedUser = await deleteUser({ clerkId: evt.data.id });

          if (deletedUser == null) {
            console.warn(
              `User ${evt.data.id} was already deleted or not found`,
            );
          }
        }
        break;
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
