import { toast } from "sonner";
import { useTransition, useEffect } from "react";

import { getRooms } from "~/api/accomodation/get-rooms";
import { getFloors } from "~/api/accomodation/get-floors";
import { getSpaces } from "~/api/accomodation/get-spaces";
import { getHostels } from "~/api/accomodation/get-hostels";
import { bookHostel } from "~/api/accomodation/book-hostel";
import { getStudentHostel } from "~/api/accomodation/get-student-hostel";
import { printHostelInvoice } from "~/api/accomodation/print-hostel-invoice";

import type {
  Room,
  Floor,
  Space,
  Hostel,
  StudentHostel,
} from "~/lib/store/accomodation.store";
import { useStore } from "~/lib/store/index.store";
import { currencyFormarter } from "~/lib/formarterts";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/hostel-booking";
import { PdfDrawer } from "~/components/utils/pdf-drawer";
import { IconDataDisplay } from "~/components/utils/icon-data-display";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export async function clientLoader() {
  const { data: sHostel, error: noStudentHostel } = await getStudentHostel();

  // If we don't have a student hostel then we want to to give the user a chance to book it.
  if (noStudentHostel) {
    const { data, error } = await getHostels();
    return data ? { data, error: noStudentHostel } : { error };
  }

  // else we display their current hostel
  return { sHostel };
}

export default function HostelBooking({ loaderData }: Route.ComponentProps) {
  const {
    error,
    sHostel,
    data: hostels,
  } = loaderData as {
    data: Hostel[];
    error?: string;
    sHostel?: StudentHostel;
  };

  const {
    room,
    floor,
    rooms,
    space,
    spaces,
    floors,
    hostel,
    setRoom,
    setRooms,
    setFloor,
    setSpace,
    setFloors,
    setHostel,
    setSpaces,
    hostelInvoice,
    studentHostel,
    setStudentHostel,
    setHostelInvoice,
  } = useStore((state) => state);

  useEffect(() => {
    setStudentHostel(sHostel || null);
  }, [sHostel, error]);

  const [isPending, startTransition] = useTransition();

  const onSelectHostel = (value: Hostel["asset_No"]) => {
    const hostel = hostels.find((hostel) => hostel.asset_No === value) || null;
    setHostel(hostel);

    startTransition(async () => {
      if (hostel) {
        //fetch the floors of the hostel selected
        const { data: floors, error } = (await getFloors({
          hostelCode: hostel.asset_No,
        })) as { data: Floor[]; error?: string };

        if (error) toast.error(error);
        setFloors(floors);
      }
    });
  };

  const onSelectFloor = (value: Floor["foor_Code"]) => {
    const floor = floors.find((floor) => floor.foor_Code === value) || null;
    setFloor(floor);

    startTransition(async () => {
      if (floor) {
        //fetch the rooms of the floor selected
        const { data: rooms, error } = (await getRooms({
          floorCode: floor.foor_Code,
        })) as { data: Room[]; error?: string };

        if (error) toast.error(error);
        setRooms(rooms);
      }
    });
  };

  const onSelectRoom = (value: Room["room_Code"]) => {
    const room = rooms.find((room) => room.room_Code === value) || null;
    setRoom(room);

    startTransition(async () => {
      if (room) {
        //fetch the rooms of the floor selected
        const { data: spaces, error } = (await getSpaces({
          roomCode: room.room_Code,
        })) as { data: Space[]; error?: string };

        if (error) toast.error(error);
        setSpaces(spaces);
      }
    });
  };

  const onSelectSpace = (value: Space["space_Code"]) => {
    const space = spaces.find((space) => space.space_Code === value) || null;
    setSpace(space);
  };

  const handleBook = () => {
    if (!space || !floor)
      return toast.error("You must select a hostel to submit");

    startTransition(async () => {
      const { data, error } = await bookHostel({
        roomCode: space.room_Code,
        floorCode: floor.foor_Code,
        hostelNo: space.hostel_Code,
        spaceCode: space.space_Code,
      });

      toast[data ? "success" : "error"](
        data ? "You have successfully booked for this semester" : error
      );
      if (data) {
        setStudentHostel(data);
      }
    });
  };

  const generateKeyValue = (studentHostel: StudentHostel) => {
    const toInclude = [
      "hostel_Name",
      "room_No",
      "space_No",
      "accomodation_Fee",
    ];

    return Object.entries(studentHostel)
      .map(([key, value]) => ({
        key,
        value,
      }))
      .filter((entry) => toInclude.includes(entry.key))
      .sort((a, b) => toInclude.indexOf(a.key) - toInclude.indexOf(b.key))
      .map((entry) => ({
        ...entry,
        key:
          entry.key.at(0)?.toUpperCase() +
          entry.key.split("_").join(" ").slice(1),
        value:
          typeof entry.value === "number"
            ? currencyFormarter(entry.value)
            : entry.value,
        monoFont: typeof entry.value === "number" ? true : false,
      }));
  };

  const handlePrintHostelInvoice = () => {
    if (!studentHostel)
      return toast.error(
        "We could not print the hostel, since no hostel is selected"
      );
    const { hostel_No, room_No, space_No } = studentHostel;

    startTransition(async () => {
      const { data, error } = await printHostelInvoice({
        hostelNo: hostel_No,
        roomNo: room_No,
        spaceNo: space_No,
      });

      if (error) toast.error(error);
      if (data) setHostelInvoice(data);
    });
  };

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"bed"} title="Hostel Booking">
        <div className="p-4 space-y-4">
          {studentHostel ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
                  Status: {studentHostel.status}
                </h4>
                <PdfDrawer
                  title="Print Invoice"
                  base64={hostelInvoice}
                  documentTitle="Hostel Invoice"
                  handlePrintDoc={handlePrintHostelInvoice}
                  description="Download or view your hostel invoice"
                />
              </div>
              <IconDataDisplay
                icon={"bed"}
                data={generateKeyValue(studentHostel)}
              />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-4">
              <div className="space-y-4">
                <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
                  1. Selet your hostel
                </h4>
                <Select
                  key={"Hostels"}
                  onValueChange={onSelectHostel}
                  defaultValue={hostel?.asset_No || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Hostels"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(hostels || []).map((hostel) => {
                      const { discription, asset_No } = hostel;
                      return (
                        <SelectItem key={asset_No} value={asset_No}>
                          {discription}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
                  2. Selet the floor {isPending && "Loading ..."}
                </h4>
                <Select
                  key={"Floors"}
                  onValueChange={onSelectFloor}
                  disabled={!Boolean(hostel) || isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Floors"} />
                  </SelectTrigger>
                  <SelectContent>
                    {floors.map((floor) => {
                      const { description, foor_Code } = floor;
                      return (
                        <SelectItem key={foor_Code} value={foor_Code}>
                          {description}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
                  3. Selet the room {isPending && "Loading ..."}
                </h4>
                <Select
                  key={"Rooms"}
                  onValueChange={onSelectRoom}
                  disabled={!Boolean(floor) || isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Rooms"} />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => {
                      const { room_Code, room_Cost, vacant_Spaces, reserved } =
                        room;
                      return (
                        <SelectItem
                          key={room_Code}
                          value={room_Code}
                          disabled={!Boolean(vacant_Spaces) || reserved}
                          className="font-mono text-xs font-light"
                        >
                          {room_Code} - {currencyFormarter(room_Cost)}
                          {!Boolean(vacant_Spaces) && " - Full"}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
                  4. Selet the room space {isPending && "Loading ..."}
                </h4>
                <Select
                  key={"Room Spaces"}
                  onValueChange={onSelectSpace}
                  disabled={!Boolean(room) || isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Room Spaces"} />
                  </SelectTrigger>
                  <SelectContent>
                    {spaces.map((space) => {
                      const { space_Code } = space;
                      return (
                        <SelectItem
                          key={space_Code}
                          value={space_Code}
                          className="font-mono text-xs font-light"
                        >
                          {space_Code}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
                  4. Book Hostel
                </h4>
                <Button
                  className="w-full"
                  onClick={handleBook}
                  disabled={!Boolean(space)}
                >
                  Book Hostel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
