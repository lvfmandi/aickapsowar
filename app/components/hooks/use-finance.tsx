import type { FinanceInsights } from "~/lib/types/finance";

type FinanceData = {
  label: string;
  amountPaid: number;
  percentage: number;
}[];

export const useFinance = () => {
  function convertFeesToFinanceData(fees: FinanceInsights): FinanceData {
    return [
      {
        label: "Total Fees",
        amountPaid: parseFloat(fees["Total Charges (Paid)"].replace(/,/g, "")),
        percentage: parseFloat(fees["Total Charges (%)"].replace(/,/g, "")),
      },
      {
        label: "Tuition Fees",
        amountPaid: parseFloat(fees["Tuition Fee (Paid)"].replace(/,/g, "")),
        percentage: parseFloat(fees["Tuition Fee (%)"].replace(/,/g, "")),
      },
      {
        label: "Hostel Fees",
        amountPaid: parseFloat(fees["Hostel Fee (Paid)"].replace(/,/g, "")),
        percentage: parseFloat(fees["Hostel Fee (%)"].replace(/,/g, "")),
      },
      {
        label: "Other Charges",
        amountPaid: parseFloat(fees["Other Charges (Paid)"].replace(/,/g, "")),
        percentage: parseFloat(fees["Other Charges (%)"].replace(/,/g, "")),
      },
    ];
  }

  return { convertFeesToFinanceData };
};
