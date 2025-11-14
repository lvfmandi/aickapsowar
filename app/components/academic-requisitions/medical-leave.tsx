import * as v from "valibot";
import { toast } from "sonner";
import { Form } from "react-router";

import type {
  MedicalLeave as TypeMedicalLeave,
  PlacementHospital,
} from "~/lib/types/requisitions";
import { MedicalLeaveSchema } from "~/lib/schemas/medical-leave.schema";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { postMedicalLeave } from "~/api/requisition/postMedicalLeave";
import { MedicalLeaveRequisition } from "../tables/medical-leave-requisition";

export const medicalLeaveAction = async ({
  formData,
}: {
  formData: FormData;
}) => {
  const data = { placementHospital: formData.get("placementHospital") };

  try {
    const safeParse = v.safeParse(MedicalLeaveSchema, data);

    if (!safeParse.success) {
      toast.error(safeParse.issues[0].message);
      return { issues: safeParse.issues };
    }

    if (safeParse.success) {
      const { data, error } = await postMedicalLeave(safeParse.output);
      if (error) toast.error(error);
      if (data)
        toast.success("You have successfully sent your medical leave request");
    }
  } catch (error) {
    toast.error("We couldn't validate your data");
  }
};

export const MedicalLeave = ({
  medicalLeave,
  placementHospitals = [],
}: {
  medicalLeave?: TypeMedicalLeave[];
  placementHospitals?: PlacementHospital[];
}) => {
  return (
    <div>
      <Form
        method={"post"}
        className="py-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]"
      >
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            1. Choose Hospital
          </h4>
          <Select name="placementHospital">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a hospital" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Hospitals</SelectLabel>
                {placementHospitals.map((pH, index) => (
                  <SelectItem key={pH.hospital} value={pH.hospital}>
                    {pH.hospital}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            2. Submit Request
          </h4>
          <Button className="w-full">Submit Request</Button>
        </div>
        <Input type="hidden" name="formType" value={"medicalLeave"} />
      </Form>
      <MedicalLeaveRequisition data={medicalLeave} />
    </div>
  );
};
