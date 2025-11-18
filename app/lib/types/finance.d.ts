export interface FeeStatement {
  entry_No: number;
  transaction_No: number;
  customer_No: string;
  posting_Date: Date;
  due_Date: DueDate;
  pmt_Discount_Date: Date;
  document_Date: Date;
  document_Type: string;
  document_No: string;
  salesperson_Code: string;
  source_Code: string;
  reason_Code: string;
  iC_Partner_Code: string;
  open: boolean;
  currency_Code: string;
  dimension_Set_ID: number;
  charge_Type: string;
  description: string;
  amount: number;
  debit_Amount: number;
  credit_Amount: number;
  remaining_Amount: number;
  amount_LCY: number;
  debit_Amount_LCY: number;
  credit_Amount_LCY: number;
  remaining_Amt_LCY: number;
  original_Amt_LCY: number;
  customer_Name: string;
  auxiliaryIndex1: string;
}

export interface FeeStructure {
  remarks: string;
  due_Duration: string;
  student_Type: string;
  settlemet_Type: string;
  programme_Code: string;
  stage_Code: string;
  stage_Charges: number;
  total_Charges: number;
  auxiliaryIndex1: string;
  auxiliaryIndex2: number;
  auxiliaryIndex3: string;
  auxiliaryIndex4: string;
}

export interface Receipt {
  student_No: string;
  receipt_No: string;
  date: Date;
  payment_Mode: string;
  amount: number;
  no_Series: string;
  payment_By: string;
  user_ID: string;
  transaction_Date: Date;
  transaction_Time: string;
  student_Name: string;
  kcA_Rcpt_No: string;
  un_Posted: boolean;
  posted: boolean;
  reversed: boolean;
  auto_Receipt: boolean;
  auto_Receipt_Date: Date;
  auto_Receipted: boolean;
  unallocated: boolean;
  bank_Slip_Date: Date;
  bank_Code: string;
  unreff: boolean;
  unreff_Transaction_No: string;
  bank_Slip_Cheque_No: string;
  reg_ID: string;
  bank_Account: string;
  room_No: string;
  amount_Applied: number;
  auto_Reversed: boolean;
  settlement_Type: string;
  entry_Count: number;
  stage: string;
  posted_Bank: string;
}

export interface Date {
  year: number;
  month: number;
  day: number;
}
