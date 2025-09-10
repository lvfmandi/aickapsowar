import type { StateCreator } from "zustand";

export interface User {
  no: string;
  name: string;
  address: string;
  address_2: string;
  city: string;
  contact: string;
  country_Region_Code: string;
  phone_No: string;
  telex_No: string;
  global_Dimension_1_Code: string;
  global_Dimension_2_Code: string;
  county: string;
  e_Mail: string;
  id: string;
  date_Of_Birth: DateOfBirth;
  marital_Status: string;
  religion: string;
  citizenship: string;
  iD_No: string;
  kneC_No: string;
  nationality: string;
  password: string;
  current_Programme: string;
  current_Program: string;
  study_Mode: string;
  changed_Password: boolean;
  can_Graduate: boolean;
  gender: string;
  balance: number;
  balance_LCY: number;
  student_Programme: string;
  index_Number: string;
  curr_Programme: string;
  debit_Amount: number;
  credit_Amount: number;
}

export interface DateOfBirth {
  year: number;
  month: number;
  day: number;
}

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
});
