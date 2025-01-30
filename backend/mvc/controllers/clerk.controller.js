const { Webhook } = require("svix");
const { clerkClient } = require("@clerk/express");
const { cleanupUser } = require("../models/users.models");

exports.clerkWebhook = async (req, res, next) => {
  const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!CLERK_SIGNING_SECRET) {
    throw new Error("Error: Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env");
  }

  const wh = new Webhook(CLERK_SIGNING_SECRET);
  const headers = req.headers;
  const payload = req.rawBody;

  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      success: false,
      message: "Error: Missing svix headers",
    });
  }

  let evt;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.log("Error: Could not verify webhook:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  //   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  //   console.log("Webhook payload:", evt.data);
  switch (eventType) {
    case "user.created": {
      try {
        //   console.log(evt.data.id);
        const user = await clerkClient.users.getUser(evt.data.id);

        if (!user.publicMetadata.role) {
          await clerkClient.users.updateUserMetadata(evt.data.id, {
            publicMetadata: {
              role: "user",
            },
          });
          console.log(`Added role metadata for user ${evt.data.id}`);
        } else {
          console.log(`Role metadata already exists for user ${evt.data.id}`);
        }
      } catch (error) {
        console.log("Error updating user metadata:", error.message);
        return res.status(500).json({
          success: false,
          message: "Failed to update user metadata.",
        });
      }

      break;
    }
    case "user.deleted": {
      try {
        const response = await cleanupUser(evt.data.id);
        // console.log(response);
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: `Failed to clean up user: ${evt.data.id}.`,
        });
      }
    }
    default:
      console.log(`Unhandled event type ${eventType}.`);
  }

  return res.status(200).json({
    success: true,
    message: "Webhook received",
  });
};

// https://clerk.com/docs/webhooks/overview
// https://clerk.com/docs/webhooks/sync-data
// https://clerk.com/docs/webhooks/sync-data#create-the-endpoint
