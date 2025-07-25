import { currencyFormarter } from "~/lib/formarterts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";
import {
  IconDataDisplay,
  type IconData,
} from "~/components/utils/icon-data-display";

type Hostel = {
  cost: number;
  value: string;
  location: string;
  roomSpaces: number;
  description: string;
  spacesPerRoom: number;
  roomsGenerated: number;
  gender: "Male" | "Female" | "Unisex";
};

export type HostelRoom = {
  value: string;
  floorNo: number;
  roomCost: number;
  bedSpaces: number;
  description: string;
  occupiedSpaces: number;
  blackListReason?: string;
  status: "Vacant" | "Partially Occupied" | "Fully Occupied";
};

export type HostelSpace = {
  value: string;
  description: string;
  status: "Vacant" | "Fully Occupied" | "Partially Occupied";
};

type Selector<T> = {
  title: string;
  description: string;
  type: "hostel" | "room" | "space";
  data: T[];
};

export const hostels: Hostel[] = [
  {
    value: "HS0001",
    description: "Modern hostels",
    roomsGenerated: 20,
    roomSpaces: 80,
    spacesPerRoom: 4,
    cost: 4500,
    gender: "Unisex",
    location: "Westlands, Nairobi",
  },
  {
    value: "HS0002",
    description: "Female-only hostel",
    roomsGenerated: 15,
    roomSpaces: 45,
    spacesPerRoom: 3,
    cost: 5000,
    gender: "Female",
    location: "Kasarani, Nairobi",
  },
  {
    value: "HS0003",
    description: "Affordable male hostel",
    roomsGenerated: 30,
    roomSpaces: 90,
    spacesPerRoom: 3,
    cost: 3500,
    gender: "Male",
    location: "Thika Road, Roysambu",
  },
];

export const hostelRooms: HostelRoom[] = [
  {
    value: "RM0001",
    description: "Ground Floor - Near reception",
    bedSpaces: 4,
    status: "Partially Occupied",
    roomCost: 12000,
    occupiedSpaces: 2,
    floorNo: 0,
  },
  {
    value: "RM0002",
    description: "First Floor - East Wing",
    bedSpaces: 3,
    status: "Fully Occupied",
    roomCost: 10000,
    occupiedSpaces: 3,
    floorNo: 1,
    blackListReason: "Noise complaints",
  },
  {
    value: "RM0003",
    description: "Second Floor - Corner room",
    bedSpaces: 2,
    status: "Vacant",
    roomCost: 9000,
    occupiedSpaces: 0,
    floorNo: 2,
  },
  {
    value: "RM0004",
    description: "First Floor - Central hallway",
    bedSpaces: 5,
    status: "Partially Occupied",
    roomCost: 13000,
    occupiedSpaces: 3,
    floorNo: 1,
  },
  {
    value: "RM0005",
    description: "Ground Floor - Back wing",
    bedSpaces: 4,
    status: "Vacant",
    roomCost: 11000,
    occupiedSpaces: 0,
    floorNo: 0,
  },
  {
    value: "RM0006",
    description: "Third Floor - Opposite stairs",
    bedSpaces: 3,
    status: "Fully Occupied",
    roomCost: 9500,
    occupiedSpaces: 3,
    floorNo: 3,
  },
  {
    value: "RM0007",
    description: "Second Floor - Near kitchen",
    bedSpaces: 2,
    status: "Partially Occupied",
    roomCost: 8500,
    occupiedSpaces: 1,
    floorNo: 2,
  },
  {
    value: "RM0008",
    description: "First Floor - West end",
    bedSpaces: 4,
    status: "Vacant",
    roomCost: 10500,
    occupiedSpaces: 0,
    floorNo: 1,
  },
  {
    value: "RM0009",
    description: "Third Floor - Balcony side",
    bedSpaces: 5,
    status: "Fully Occupied",
    roomCost: 14000,
    occupiedSpaces: 5,
    floorNo: 3,
  },
  {
    value: "RM0010",
    description: "Ground Floor - Next to lounge",
    bedSpaces: 3,
    status: "Partially Occupied",
    roomCost: 9800,
    occupiedSpaces: 2,
    floorNo: 0,
  },
];

export const hostelSpaces: HostelSpace[] = [
  {
    value: "SP0001",
    description: "GF 1-1",
    status: "Vacant",
  },
  {
    value: "SP0002",
    description: "GF 1-2",
    status: "Fully Occupied",
  },
  {
    value: "SP0003",
    description: "1F 2-1",
    status: "Partially Occupied",
  },
  {
    value: "SP0004",
    description: "1F 2-2",
    status: "Vacant",
  },
  {
    value: "SP0005",
    description: "2F 3-1",
    status: "Fully Occupied",
  },
  {
    value: "SP0006",
    description: "2F 3-2",
    status: "Partially Occupied",
  },
];

const iconData: IconData = [
  {
    key: "Hostel",
    value: "Affordable male hostels",
  },
  {
    key: "Hostel Room",
    value: "First Floor - West End",
  },
  {
    monoFont: true,
    key: "Room Space",
    value: "1F 2 - 2",
  },
  {
    monoFont: true,
    key: "Cost per semester",
    value: currencyFormarter(26500),
  },
];

const selectors: Selector<Hostel | HostelRoom | HostelSpace>[] = [
  {
    data: hostels,
    type: "hostel",
    title: "Hostels",
    description: "Select your hostel",
  },
  {
    type: "room",
    data: hostelRooms,
    title: "Hostel Rooms",
    description: "Select your room",
  },
  {
    type: "space",
    data: hostelSpaces,
    title: "Hostel Spaces",
    description: "Select a bed space",
  },
];

export default function HostelBooking() {
  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"bed"} title="Hostel Booking">
        <div className="p-4 space-y-4">
          <div className="space-y-4">
            <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
              Selected Bed
            </h4>
            <IconDataDisplay icon={"bed"} data={iconData} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-4">
            {selectors.map(({ title, type, data, description }, index) => (
              <div className="space-y-4">
                <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
                  {`${index + 1}. ${description}`}
                </h4>
                <Select key={title}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={title} />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map((item) => {
                      const { value, description } = item;
                      let disabled = false;
                      if (type === "room") {
                        const room = item as HostelRoom | HostelSpace;
                        disabled = room.status === "Fully Occupied";
                      }
                      return (
                        <SelectItem
                          key={value}
                          value={value}
                          disabled={disabled}
                        >
                          {`${description}${
                            disabled ? " - Fully Occupied" : ""
                          }`}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            ))}
            <div className="space-y-4">
              <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
                4. Book Hostel
              </h4>
              <Button className="w-full">Book Hostel</Button>
            </div>
          </div>
        </div>
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
