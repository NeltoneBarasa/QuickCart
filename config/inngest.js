import { Inngest } from "inngest";
import connectDB from "./db.js";
// Removed static import of User

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    { event: 'clerk/user.created'},
    async ({event}) => {
        try {
            console.log("syncUserCreation triggered", event.data);
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const userData = {
                _id:id,
                email: email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                imageUrl:image_url
            };
            await connectDB();
            console.log("Database connected");
            const User = (await import("../models/User.js")).default;
            console.log('User model:', User);
            const result = await User.create(userData);
            console.log("User created:", result);
        } catch (error) {
            console.error("Error in syncUserCreation:", error);
        }
    }
)

// Inngest Function to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated' },
    async ({event}) => {
        try {
            console.log("syncUserUpdation triggered", event.data);
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const userData = {
                _id: id,
                email: email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                imageUrl: image_url
            };
            await connectDB();
            console.log("Database connected");
            const User = (await import("../models/User.js")).default;
            console.log('User model:', User);
            const result = await User.findByIdAndUpdate(id, userData);
            console.log("User updated:", result);
        } catch (error) {
            console.error("Error in syncUserUpdation:", error);
        }
    }
)

// Inngest Function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted' },
    async ({event}) => {
        try {
            console.log("syncUserDeletion triggered", event.data);
            const { id } = event.data;
            await connectDB();
            console.log("Database connected");
            const User = (await import("../models/User.js")).default;
            console.log('User model:', User);
            const result = await User.findByIdAndDelete(id);
            console.log("User deleted:", result);
        } catch (error) {
            console.error("Error in syncUserDeletion:", error);
        }
    }
)

export default {
  inngest,
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion
};

