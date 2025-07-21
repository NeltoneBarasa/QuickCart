import { clerkClient } from '@clerk/nextjs/server';

/**
 * Script to set a user as a seller
 * Usage: node scripts/setSeller.js <userId>
 * 
 * You can also manually set a user as seller through Clerk Dashboard:
 * 1. Go to your Clerk Dashboard
 * 2. Navigate to Users
 * 3. Select the user
 * 4. Go to "Metadata" tab
 * 5. Add to "Public metadata": { "role": "seller" }
 */

async function setSeller(userId) {
  try {
    const client = await clerkClient();
    
    const user = await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'seller'
      }
    });
    
    console.log(`✅ User ${userId} has been successfully set as a seller`);
    console.log(`User email: ${user.emailAddresses[0]?.emailAddress}`);
    return user;
  } catch (error) {
    console.error('❌ Error setting user as seller:', error.message);
    throw error;
  }
}

// If running this script directly
if (process.argv.length < 3) {
  console.log('Usage: node scripts/setSeller.js <userId>');
  console.log('Example: node scripts/setSeller.js user_2sZFHS1UIIysJyDVzCpQhUhTIhw');
  process.exit(1);
}

const userId = process.argv[2];
setSeller(userId).catch(console.error);

export default setSeller;