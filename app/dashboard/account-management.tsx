import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { CalendarPicker } from "~/components/utils/calendar-picker";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export default function AccountManagement() {
  // TODO: use arketype
  const accountTabs: TabItem[] = [
    {
      icon: "personCircle",
      value: "studentDetails",
      label: "Student Details",
      content: <StudentDetailsForm />,
    },
    {
      icon: "personCircle",
      value: "parentDetails",
      label: "Parent Details",
      content: <ParentDetailsForm />,
    },
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

export const StudentDetailsForm = () => {
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
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,1fr))] gap-4">
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            Names
          </h4>
          <Input disabled placeholder="" value={"Charles Njagua"} />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            Admission Number
          </h4>
          <Input disabled placeholder="" value={"PPT6/M-0020/THI/25"} />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            ID Number
          </h4>
          <Input placeholder="" value={"12345678"} />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            Date of birth
          </h4>
          <CalendarPicker />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            Gender
          </h4>
          <Select>
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
          <Input placeholder="+254712345678" />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            Alternative Phone Number
          </h4>
          <Input placeholder="+254712345678" />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            Email Address
          </h4>
          <Input placeholder="youremail@host.domain" />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            Postal Address
          </h4>
          <Input placeholder={"12345-00000"} />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            Country
          </h4>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={"Country"} />
            </SelectTrigger>
            <SelectContent>
              {/* TODO: Get countries */}
              <SelectItem value="Kenya">Kenya</SelectItem>
              <SelectItem value="Uganda">Uganda</SelectItem>
              <SelectItem value="Tanzania">Tanzania</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            County
          </h4>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={"County"} />
            </SelectTrigger>
            <SelectContent>
              {/* TODO: Get counties */}
              <SelectItem value="Nairobi">Nairobi</SelectItem>
              <SelectItem value="Muranga">Muranga</SelectItem>
              <SelectItem value="Kiambu">Kiambu</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-foreground">
            Religion
          </h4>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={"Religion"} />
            </SelectTrigger>
            <SelectContent>
              {/* TODO: Get counties */}
              <SelectItem value="Christian">Christian</SelectItem>
              <SelectItem value="Muslim">Muslim</SelectItem>
              <SelectItem value="Hindu">Hindu</SelectItem>
              <SelectItem value="Budhist">Budhist</SelectItem>
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
    </div>
  );
};

export const ParentDetailsForm = () => {
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
