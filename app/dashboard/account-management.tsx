import * as v from "valibot";

import { toast } from "sonner";
import { Form } from "react-router";
import { countries } from "countries-list";
import { CircleFlag } from "react-circle-flags";
import { getCountryCode } from "countries-list";

import { fetchMe } from "~/api/auth/fetchMe";

import type { User } from "~/lib/store/auth.store";
import { AccountSchema } from "~/lib/schemas/account.schema";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/account-management";
import { CalendarPicker } from "~/components/utils/calendar-picker";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";
import {
  postStudentInfo,
  type PostStudentInfo,
} from "~/api/accounts/postStudentInfo";

export const clientLoader = async () => {
  const { data, error } = await fetchMe();
  if (error) toast.error(error);

  return { data };
};

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  // const data = await serverAction();
  const formData = await request.formData();

  const DOB = formData.get("DOB");
  const idNo = formData.get("idNo");
  const email = formData.get("email");
  const gender = formData.get("gender");
  const county = formData.get("county");
  const country = formData.get("country");
  const religion = formData.get("religion");
  const postalAddress = formData.get("postal");
  const phoneNumber = formData.get("phoneNumber");
  const alternatePhoneNumber = formData.get("alternatePhoneNumber");

  try {
    const safeParse = v.safeParse(AccountSchema, {
      DOB: new Date(DOB as string),
      idNo,
      email,
      county,
      country,
      religion,
      phoneNumber,
      postalAddress,
      alternatePhoneNumber,
      gender: gender == "Male" ? 1 : 2,
    });

    if (!safeParse.success) {
      toast.error(safeParse.issues[0].message);

      return { issues: safeParse.issues };
    }

    if (safeParse.success) {
      const { data, error } = await postStudentInfo(safeParse.output);

      if (error) toast.error(error);
      if (data) toast.success("You have successfully changed your profile");
    }
  } catch (error) {
    toast.error("We couln't validate your data");
  }
};

export default function AccountManagement({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { data } = loaderData;

  // TODO: use arketype
  const accountTabs: TabItem[] = [
    {
      icon: "personCircle",
      value: "studentDetails",
      label: "Student Details",
      content: <StudentDetailsForm data={data} actionData={actionData} />,
    },
    // {
    //   icon: "personCircle",
    //   value: "parentDetails",
    //   label: "Parent Details",
    //   content: <ParentDetailsForm data={data} actionData={actionData} />,
    // },
  ];

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"personCircle"} title="Account Management">
        <TabsUtils data={accountTabs} />
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}

export const StudentDetailsForm = ({
  data,
  actionData,
}: {
  data?: User;
  actionData: any;
}) => {
  const errors = actionData?.issues ?? {};

  return (
    <div className="grid gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
          Profile
        </h4>
        <Avatar className="w-16 h-16">
          <AvatarImage src="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Form method="post" className="grid gap-4">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,1fr))] gap-4">
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Names
            </h4>
            <Input readOnly placeholder="" value={data?.name} />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Admission Number
            </h4>
            <Input readOnly placeholder="" value={data?.no} />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              ID Number
            </h4>
            <Input readOnly value={data?.iD_No} />
            <Input type="hidden" readOnly name="idNo" value={data?.iD_No} />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Date of birth
            </h4>
            <CalendarPicker
              date={
                new Date(
                  `${data?.date_Of_Birth.month} ${data?.date_Of_Birth.day} ${data?.date_Of_Birth.year}`
                )
              }
            />
            <Input
              name="DOB"
              type="hidden"
              value={new Date(
                `${data?.date_Of_Birth.month} ${data?.date_Of_Birth.day} ${data?.date_Of_Birth.year}`
              ).toISOString()}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Gender
            </h4>
            <Select name="gender" defaultValue={data?.gender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Gender"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Phone Number
            </h4>
            <Input
              name="phoneNumber"
              placeholder="+254712345678"
              defaultValue={data?.phone_No}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Alternative Phone Number
            </h4>
            <Input
              name="alternatePhoneNumber"
              placeholder="+254712345678"
              defaultValue={data?.telex_No}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Email Address
            </h4>
            <Input
              name="email"
              placeholder="youremail@host.domain"
              defaultValue={data?.e_Mail}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Postal Address
            </h4>
            <Input
              name="postal"
              placeholder={"12345-00000"}
              defaultValue={data?.address}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Country
            </h4>
            <Select
              name="country"
              defaultValue={`${data?.citizenship
                .charAt(0)
                .toUpperCase()}${data?.citizenship.slice(1).toLowerCase()}`}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Country"} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(countries)
                  .sort(([aC, aV], [bC, bV]) => aV.name.localeCompare(bV.name))
                  .map(([code, country]) => (
                    <SelectItem
                      key={code}
                      value={country.name}
                      className="space-x-2"
                    >
                      <CircleFlag
                        height="4"
                        className="h-4 w-4"
                        countryCode={(
                          getCountryCode(country.name) as string
                        ).toLowerCase()}
                      />
                      {country.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              County
            </h4>
            <Input
              name="county"
              placeholder={"County"}
              defaultValue={data?.county}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              Religion
            </h4>
            <Select
              name="religion"
              defaultValue={`${data?.religion
                ?.charAt(0)
                .toUpperCase()}${data?.religion?.slice(1).toLowerCase()}`}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Religion"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Christian">Christian</SelectItem>
                <SelectItem value="Muslim">Muslim</SelectItem>
                <SelectItem value="Hindu">Hindu</SelectItem>
                <SelectItem value="Budhist">Budhist</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
              &nbsp;
            </h4>
            <Button>Submit Student Details</Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export const ParentDetailsForm = ({
  data,
  actionData,
}: {
  data?: User;
  actionData: any;
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,1fr))] gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
          Father's Name
        </h4>
        <Input placeholder="John" />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
          Father's Phone Number
        </h4>
        <Input placeholder={"+254712345678"} />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
          Father's Occupation
        </h4>
        <Input placeholder={"Profession"} />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
          Mother's Name
        </h4>
        <Input placeholder="Jane" />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
          Mother's Phone Number
        </h4>
        <Input placeholder="+254712345678" />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
          Mother's Occupation
        </h4>
        <Input placeholder="Profession" />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
          Guardian's Name
        </h4>
        <Input placeholder="Jane/John" />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
          &nbsp;
        </h4>
        <Button>Submit Parent Details</Button>
      </div>
    </div>
  );
};
