import { serve } from "inngest/next";
import inngestFunctions from "../../../config/inngest";

const { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion } = inngestFunctions;

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        syncUserCreation,
        syncUserUpdation,
        syncUserDeletion,
    ],
});