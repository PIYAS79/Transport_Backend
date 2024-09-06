// cronJobs.js
import cron from 'node-cron';
import { Card_Model } from './card.model';


// Function to update card status
const updateExpiredCards = async () => {
  try {
    const now = new Date(); // Current time

    // Find all active cards that have passed their expiration date
    const expiredCards = await Card_Model.updateMany(
      {
        status: 'ACTIVE',
        expiredAt: { $lte: now }
      },
      {
        $set: {
          status: 'EXPIRED',
          expiredBy: "AUTO"
        }
      }
    );

    console.log(`${expiredCards.modifiedCount} cards have been expired.`);
  } catch (error) {
    console.error('Error while updating card status:', error);
  }
};

// Schedule the cron job to run every minute
const updateCardStatus = () => {
  cron.schedule('*/1 * * * *', updateExpiredCards); // Every minute
};

// Export the function to start the cron jobs
export default updateCardStatus;
