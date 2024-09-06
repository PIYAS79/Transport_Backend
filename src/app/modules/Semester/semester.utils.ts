import { Semester_Model } from "./semester.model";

// Function to convert month string to a number
export const monthToNumber = (month: string): number => {
    const months = {
        JANUARY: 1,
        FEBRUARY: 2,
        MARCH: 3,
        APRIL: 4,
        MAY: 5,
        JUNE: 6,
        JULY: 7,
        AUGUST: 8,
        SEPTEMBER: 9,
        OCTOBER: 10,
        NOVEMBER: 11,
        DECEMBER: 12,
    };
    return months[month as keyof typeof months];
};

// Function to check for overlapping semesters
export const isOverlappingSemester = async (startMonth: number, endMonth: number, year: number,semesterName:string): Promise<boolean> => {
    // Convert start and end month from string to number
    // const startMonthNum = monthToNumber(startMonth);
    // const endMonthNum = monthToNumber(endMonth);

    // Fetch semesters that might overlap
    const overlappingSemesters = await Semester_Model.find({
        semester_year: year,
        $or: [
            {
                $and: [
                    { startMonth: { $lte: endMonth } }, // New semester's start is within an existing semester
                    { endMonth: { $gte: startMonth } }  // New semester's end is within or after the start of an existing semester
                ]
            },
            {
                $and: [
                    { startMonth: { $gte: startMonth } }, // New semester starts after or during an existing semester
                    { endMonth: { $lte: endMonth } }  // New semester ends before or during an existing semester
                ]
            },
            // Check for duplicate semester names within the same year
            {
                semester_name: semesterName
            }
        ]
    });

    if (overlappingSemesters.length > 0) {
        console.log('Overlapping semesters found:', overlappingSemesters);
    }

    return overlappingSemesters.length > 0;
};



// Function to generate the next semester code
export const generateSemesterCode = async (year: number): Promise<string> => {
    const semesterCount = await Semester_Model.countDocuments({ semester_year: year });
    return `${year}${semesterCount + 1}`;
};