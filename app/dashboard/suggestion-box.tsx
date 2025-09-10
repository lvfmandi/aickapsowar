import { Textarea } from "~/components/ui/textarea";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { Button } from "~/components/ui/button";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export default function SuggestionBox() {
  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"chatbox"} title="Suggestion Box">
        <div className="flex flex-col gap-4 p-4 max-w-sm">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            Write your suggesions down below
          </h4>
          <Textarea />
          <Button>Submit</Button>
        </div>
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
