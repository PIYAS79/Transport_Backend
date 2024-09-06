// cronJobs.js

import cron from 'node-cron';
import dayjs from 'dayjs'; 
import { Semester_Model } from './semester.model';

// Function to update expired semesters
const updateExpiredSemesters = async () => {
  try {
    const now = dayjs(); // Current date and time

    // Find all active semesters that should be marked as expired
    const expiredSemesters = await Semester_Model.updateMany(
      {
        status: 'ACTIVE',
        semester_year: { $lt: now.year() }, // Semesters from years before the current year
        $or: [
          { endMonth: { $lt: now.month() + 1 } }, // Semesters that end before the current month
          { semester_year: { $lt: now.year() }, endMonth: { $lte: 12 } }, // Semesters from previous years
        ]
      },
      {
        $set: { status: 'EXPIRED' }
      }
    );

    console.log(`${expiredSemesters.modifiedCount} semesters have been expired.`);
  } catch (error) {
    console.error('Error while updating semester status:', error);
  }
};

// Schedule the cron job to run every day at midnight
const UpdateSemesterStatus = () => {
  cron.schedule('0 0 * * *', updateExpiredSemesters); // Every day at midnight
};

// Export the function to start the cron jobs
export default UpdateSemesterStatus;
