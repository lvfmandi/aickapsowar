export interface AcademicRequisition {
  leave_out_No: string;
  leave_Out_Date: LeaveOutDate;
  leave_out_Tme: string;
  reason: string;
  student_No: string;
  student_Name: string;
  return_Date: ReturnDate;
  duration: string;
  return_Time: string;
  where_To: string;
  status: string;
  no_Series: string;
}

export interface LeaveOutDate {
  year: number;
  month: number;
  day: number;
}

export interface ReturnDate {
  year: number;
  month: number;
  day: number;
}
