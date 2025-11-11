import * as v from "valibot";

// 1. Define the base schema for individual fields (assuming they are already Date objects or strings that resolve to Date objects)
export const StudentRequisitionSchema = v.pipe(
  v.object({
    leaveOutDate: v.date("Leave-out date is required"), // Assuming these fields now hold Date objects
    leaveOutTime: v.date("Leave-out time is required"),
    returnDate: v.date("Return date is required"),
    returnTime: v.date("Return time is required"),
    whereTo: v.pipe(
      v.string("Ensure you provide where you will be going"),
      v.minLength(3, "Ensure 'where to' has at least 3 characters")
    ),
    reason: v.pipe(
      v.string("Ensure you provide a reason"),
      v.minLength(7, "Ensure your reason has at least 7 characters")
    ),
  }),
  v.check((input) => {
    return input.leaveOutDate <= input.returnDate;
  }, "The leave out date must be before or the same as the return date")
);
