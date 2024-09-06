



import dayjs from 'dayjs';

// Function to calculate the expiration date for 2 hours from now
export const calculateExpireTime_For_A_Semester = (digit:number): Date => {
  const now = dayjs(); // Current date and time
  return now.add(digit, 'months').toDate(); // Add 2 hours and return as Date object
};