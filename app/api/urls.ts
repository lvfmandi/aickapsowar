export const API_URL = import.meta.env.VITE_API_URL;

// Authorization
export const GET_ME = "/api/Utils/me";
export const REFRESH = "/api/Auth/Refresh";
export const POST_LOGIN = "/api/Auth/Login";
export const POST_LOGOUT = "/api/Auth/Signout";
export const POST_RESET_PASSWORD = "/api/Auth/ResetPassword";
export const POST_FORGOT_PASSWORD = "/api/Auth/ForgotPassword";

// Accomodation
export const GET_HOSTELS = "/api/Hostel/getHostels";
export const GET_SPACES = "/api/Hostel/getRoomSpace";
export const GET_ROOMS = "/api/Hostel/getHostelsRooms";
export const GET_FLOORS = "/api/Hostel/getHostelsFloors";
export const BOOK_HOSTEL = "/api/Hostel/bookHostelSpace";
export const GET_STUDENT_HOSTEL = "/api/Hostel/getStudentHostel";
export const PRINT_HOSTEL_INVOICE = "/api/Hostel/printHostelInvoice";

// Units
export const DROP_UNIT = "/api/Unit/dropUnit";
export const REGISTER_UNIT = "/api/Unit/registerUnit";
export const REGISTER_NEXT_STAGE = "api/Unit/registerNextStage";
export const GET_CURRENT_SEMESTER = "/api/Unit/getCurrentSemester";
export const GET_STUDENT_STAGES = "/api/Unit/getRegisteredStudentStages";
export const GET_PROGRAM_UNITS_BY_STAGE = "/api/Unit/getProgramUnitsByStage";
export const GET_STUDENT_UNITS_BY_STAGE = "/api/Unit/getStudentUnitsByStage";
export const CONFIRM_SEMESTER_REGISTRATION =
  "/api/Unit/confirmSemesterRegistration";

//Cards
export const GET_CARDS = "/api/Reports/GenerateCardByType";

//finance
export const GET_RECEIPTS = "/api/FinanceInfo/getReceipts";
export const PRINT_RECEIPT = "/api/FinanceInfo/printReceipt";
export const GET_FEE_STATEMENT = "/api/FinanceInfo/getFeeStatement";
export const GET_FEE_STRUCTURE = "/api/FinanceInfo/getFeeStructure";
export const PRINT_FEE_STATEMENT = "/api/FinanceInfo/printFeeStatement";
export const PRINT_FEE_STRUCTURE = "/api/FinanceInfo/printFeeStructure";

//grades
export const GET_PROVISIONAL_RESULTS = "/api/Grades/getProvisionalResults";
export const GET_OFFICIAL_RESULTS = "/api/Grades/getOfficialResults";

//Accounts
export const GET_STUDENT_INFO = "/api/Accounts/getUserDetails";
export const POST_STUDENT_INFO = "/api/Accounts/postUserDetails";

//Requisition
export const POST_ACADEMIC_LEAVE_OUT =
  "/api/StudentRequisition/postStudentLeaveOut";
export const GET_STUDENT_REQUISITIONS =
  "/api/StudentRequisition/getRequistions";
export const GET_PLACEMENT_HOSPITALS =
  "/api/StudentRequisition/getPlacementHospitals";
export const POST_MEDICAL_LEAVE = "/api/StudentRequisition/postMedicalLeave";
export const POST_GATE_PASS = "/api/StudentRequisition/postGatePass";

// Utils
// export const GET_FEES_INSIGHTS = "/api/Utils/getfinanceInsights";
