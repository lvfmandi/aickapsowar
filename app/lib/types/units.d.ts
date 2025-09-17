export interface Stage {
  reg_Transacton_ID: string;
  student_No: string;
  programme: string;
  semester: string;
  register_for: string;
  stage: string;
  mode_of_Study: string;
  entry_No: number;
  intake: string;
  academic_Year: string;
  registration_Date: RegistrationDate;
  settlement_Type: string;
  units_Taken: number;
  options: string;
  exam_Status: string;
  registered: boolean;
  curr_Debit: number;
  curr_Credit: number;
  balance: number;
  transfered: boolean;
  unbilled_Amount: number;
  total_Paid: number;
  posted: boolean;
  total_Billed: number;
  reversed: boolean;
  user_ID: string;
  remarks: string;
  card_Serial_No: string;
  allow_Exam_Card: boolean;
  date_Filter: string;
  programme_Link: any[];
  semester_Link: any[];
  intake_Link: any[];
  academic_Year_Link: any[];
  settlement_Type_Link: any[];
}

export interface RegistrationDate {
  year: number;
  month: number;
  day: number;
}

export interface Semester {
  code: string;
  description: string;
  from: From;
  to: To;
  remarks: string;
  current_Semester: boolean;
  exam_Semester: boolean;
  academic_Year: string;
  smS_Results_Semester: boolean;
  exam_Series: string;
  allow_Online_Registration: boolean;
  allow_Nav_Registration: boolean;
  allow_Exam_Entry: boolean;
  academic_Year_Link: any[];
}

export interface From {
  year: number;
  month: number;
  day: number;
}

export interface To {
  year: number;
  month: number;
  day: number;
}

export interface ProgramUnit {
  programme_Code: string;
  stage_Code: string;
  code: string;
  desription: string;
  auxiliaryIndex1: number;
}

export interface StudentUnit {
  student_No: string;
  semester: string;
  programme: string;
  register_for: string;
  stage: string;
  unit: string;
  grade: string;
  final_Score: number;
  student_Type: string;
  total_Score: number;
  ass_Total_Marks: number;
  caT_Total_Marks: number;
  exam_Marks: number;
  campus: string;
  programme_Code: string;
  stage_Code: string;
  code: string;
  desription: string;
  name: string;
  auxiliaryIndex1: string;
  auxiliaryIndex2: number;
  auxiliaryIndex3: string;
}

export type MergedUnit = ProgramUnit & { take: boolean };