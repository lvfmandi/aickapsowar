export interface LeaveOutRequisition {
  leave_out_No: string;
  leave_Out_Date: Date;
  leave_out_Tme: string;
  reason: string;
  student_No: string;
  student_Name: string;
  return_Date: Date;
  duration: string;
  return_Time: string;
  where_To: string;
  status: string;
  no_Series: string;
}

export interface Date {
  year: number;
  month: number;
  day: number;
}

export interface PlacementHospital {
  hospital: string;
  no_of_Students_Placed: number;
}

export interface MedicalLeave {
  medical_Request_No: string;
  student_No: string;
  student_Name: string;
  hospital: string;
  request_Date: Date;
  status: string;
  posted: boolean;
  no_Series: string;
  reason: string;
}

export interface GatePassRequisition {
  gate_Pass_No: string;
  date_Out: Date;
  tme_Out: string;
  purpose: string;
  student_No: string;
  student_Name: string;
  return_Date: Date;
  duration: string;
  return_Time: string;
  destination: string;
  status: string;
  no_Series: string;
  gate_pass_QR: QR;
  security_Officer_No: string;
  name_of_Officer: string;
  officer_Sign: QR;
  class_Tutor: string;
  tutor_Name: string;
  authorizor: string;
  signature: QR;
}

export interface QR {
  name: string;
  selfLink: string;
  editLink: string;
  contentType: any;
  eTag: any;
}
