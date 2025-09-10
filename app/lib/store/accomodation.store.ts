import type { StateCreator } from "zustand";

export interface Hostel {
  asset_No: string;
  discription: string;
  hostel_Type: string;
  provider_Code: string;
  rooms_Generated: number;
  room_Spaces: number;
  space_Per_Room: number;
  cost_Per_Occupant: number;
  gender: string;
  location: string;
  programme: string;
  cost_per_Room: number;
  jaB_Fees: number;
  ssP_Fees: number;
  special_Programme: number;
}

export interface Floor {
  foor_Code: string;
  asset_No: string;
  description: string;
  gender: string;
  reserved: boolean;
  asset_No_Link: any[];
}

export interface Room {
  hostel_Code: string;
  room_Code: string;
  bed_Spaces: number;
  status: string;
  room_Cost: number;
  reservation_Remarks: string;
  reservation_UserID: string;
  reservation_Date: ReservationDate;
  black_List_reason: string;
  occupied_Spaces: number;
  special_Programme: number;
  total_Spaces: number;
  vacant_Spaces: number;
  floor_No: string;
  floor_Description: string;
  reserved: boolean;
}

export interface ReservationDate {
  year: number;
  month: number;
  day: number;
}

export interface Space {
  hostel_Code: string;
  room_Code: string;
  space_Code: string;
  status: string;
  room_Cost: number;
  black_List_reason: string;
}

export interface StudentHostel {
  line_No: number;
  space_No: string;
  room_No: string;
  hostel_No: string;
  accomodation_Fee: number;
  allocation_Date: AllocationDate;
  clearance_Date: ClearanceDate;
  charges_Amt: number;
  student: string;
  billed: boolean;
  billed_Date: BilledDate;
  semester: string;
  cleared: boolean;
  over_Paid: boolean;
  over_Paid_Amt: number;
  eviction_Code: string;
  hostel_Assigned: boolean;
  academic_Year: string;
  session: string;
  allocated: boolean;
  select: boolean;
  balance: number;
  transfer_to_Hostel_No: string;
  transfer_to_Room_No: string;
  transfer_to_Space_No: string;
  transfered: boolean;
  reversed: boolean;
  switched: boolean;
  switched_from_Hostel_No: string;
  switched_from_Room_No: string;
  switched_from_Space_No: string;
  switched_to_Hostel_No: string;
  switched_to_Room_No: string;
  switched_to_Space_No: string;
  transfed_from_Hostel_No: string;
  transfed_from_Room_No: string;
  transfed_from_Space_No: string;
  status: string;
  invoice_Printed: boolean;
  invoice_Printed_By: string;
  swithed_By: string;
  transfered_By: string;
  reverse_Allocated_By: string;
  key_Allocated: boolean;
  key_No: string;
  allocated_By: string;
  time_allocated: string;
  time_Reversed: string;
  time_Transfered: string;
  time_Swithed: string;
  date_Reversed: DateReversed;
  date_Transfered: DateTransfered;
  date_Switched: DateSwitched;
  key_Allocated_By: string;
  key_Allocated_Time: string;
  key_Allocated_Date: KeyAllocatedDate;
  reversed_By: string;
  switched_By: string;
  amount: number;
  gender: string;
  hostel_Name: string;
  student_Name: string;
  start_Date: StartDate;
  end_Date: EndDate;
  settlement_Type: string;
  space_Status: string;
}

export interface AllocationDate {
  year: number;
  month: number;
  day: number;
}

export interface ClearanceDate {
  year: number;
  month: number;
  day: number;
}

export interface BilledDate {
  year: number;
  month: number;
  day: number;
}

export interface DateReversed {
  year: number;
  month: number;
  day: number;
}

export interface DateTransfered {
  year: number;
  month: number;
  day: number;
}

export interface DateSwitched {
  year: number;
  month: number;
  day: number;
}

export interface KeyAllocatedDate {
  year: number;
  month: number;
  day: number;
}

export interface StartDate {
  year: number;
  month: number;
  day: number;
}

export interface EndDate {
  year: number;
  month: number;
  day: number;
}

export interface AccomodationState {
  rooms: Room[];
  floors: Floor[];
  spaces: Space[];
  room: Room | null;
  floor: Floor | null;
  space: Space | null;
  hostel: Hostel | null;
  hostelInvoice: string | null;
  studentHostel: StudentHostel | null;
  setRoom: (room: Room | null) => void;
  setRooms: (rooms: Room[] | []) => void;
  setFloor: (floor: Floor | null) => void;
  setSpace: (space: Space | null) => void;
  setFloors: (floors: Floor[] | []) => void;
  setSpaces: (spaces: Space[] | []) => void;
  setHostel: (hostel: Hostel | null) => void;
  setHostelInvoice: (hostelInvoice: string | null) => void;
  setStudentHostel: (studentHostel: StudentHostel | null) => void;
}

export const createAccomodationSlice: StateCreator<AccomodationState> = (
  set
) => ({
  rooms: [],
  floors: [],
  spaces: [],
  room: null,
  floor: null,
  space: null,
  hostel: null,
  studentHostel: null,
  hostelInvoice: null,
  setRoom: (room) => set(() => ({ room })),
  setSpace: (space) => set(() => ({ space })),
  setFloor: (floor) => set(() => ({ floor })),
  setRooms: (rooms) => set(() => ({ rooms })),
  setSpaces: (spaces) => set(() => ({ spaces })),
  setHostel: (hostel) => set(() => ({ hostel })),
  setFloors: (floors) => set(() => ({ floors })),
  setStudentHostel: (studentHostel) => set(() => ({ studentHostel })),
  setHostelInvoice: (hostelInvoice) => set(() => ({ hostelInvoice })),
});
