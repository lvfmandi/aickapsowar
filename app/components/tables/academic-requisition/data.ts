import type { AcademicRequisition } from "~/components/tables/academic-requisition/columns";

export const data: AcademicRequisition[] = [
  {
    type: "Academic Leave",
    requestedDate: new Date("2025-01-15"),
    reason: "Medical treatment abroad",
    supportingDocuments: ["https://university.edu/docs/medical-report.pdf"],
    status: "Approved",
    reviewedBy: "Dr. Martha Njeri",
    reviewedAt: new Date("2025-01-20"),
  },
  {
    type: "Return from Leave",
    requestedDate: new Date("2025-03-10"),
    reason: "Recovered and ready to resume studies",
    supportingDocuments: ["https://university.edu/docs/clearance-letter.pdf"],
    status: "Pending",
  },
  {
    type: "Special Exam",
    requestedDate: new Date("2025-04-05"),
    reason: "Missed exam due to bereavement",
    supportingDocuments: ["https://university.edu/docs/bereavement-letter.pdf"],
    status: "Approved",
    reviewedBy: "Prof. Omondi Otieno",
    reviewedAt: new Date("2025-04-07"),
  },
  {
    type: "Change of Program",
    requestedDate: new Date("2025-02-20"),
    reason: "Aligning with career goals in data science",
    supportingDocuments: [
      "https://university.edu/docs/program-change-form.pdf",
    ],
    status: "Rejected",
    reviewedBy: "Dean of School of Computing",
    reviewedAt: new Date("2025-02-25"),
  },
  {
    type: "Academic Leave",
    requestedDate: new Date("2025-05-01"),
    reason: "Internship opportunity overseas",
    supportingDocuments: [
      "https://university.edu/docs/internship-offer-letter.pdf",
    ],
    status: "Pending",
  },
  {
    type: "Special Exam",
    requestedDate: new Date("2025-06-12"),
    reason: "Illness during final exams",
    supportingDocuments: ["https://university.edu/docs/doctor-note.pdf"],
    status: "Approved",
    reviewedBy: "Dr. Kibet Kiprono",
    reviewedAt: new Date("2025-06-14"),
  },
];
