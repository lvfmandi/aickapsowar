import Icon, { Icons } from "~/components/utils/icons";
import { IconText } from "~/components/utils/icon-text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export type TabItem = {
  icon: keyof typeof Icons;
  value: string;
  label: string;
  content: React.ReactNode;
};

type TabUtils = { data: TabItem[] };

export const TabsUtils = ({ data }: TabUtils) => {
  return (
    <Tabs defaultValue={data[0].value} className="p-4 w-full">
      <TabsList className="flex-wrap h-fit">
        {data.map(({ icon, label, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="text-base gap-2 font-light lg:text-xs lg:font-semibold data-[state=active]:text-primary"
          >
            <Icon name={icon} className="size-5" />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map(({ icon, label, value, content }) => (
        <TabsContent key={value} value={value} className="h-full">
          <IconText active text={label} icon={icon} className="lg:px-3" />
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
