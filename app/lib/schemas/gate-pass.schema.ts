import * as v from "valibot";

// 1. Define the base schema for individual fields (assuming they are already Date objects or strings that resolve to Date objects)
export const GatePassSchema = v.pipe(
  v.object({
    leaveOutDate: v.date("Leave-out date is required."),
    purpose: v.pipe(
      v.string("The purpose is required."),
      v.minLength(5, "The purpose must be at least 5 characters.")
    ),
    duration: v.string("The duration is required."),
    destination: v.string("The destination is required."),
  })
);
