import * as v from "valibot";

// 1. Define the base schema for individual fields (assuming they are already Date objects or strings that resolve to Date objects)
export const MedicalLeaveSchema = v.pipe(
  v.object({
    placementHospital: v.string("Kindly select a hospital to proceed"), // Assuming these fields now hold Date objects
  })
);
