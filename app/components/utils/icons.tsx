import { VerifiedIcon } from "lucide-react";
import {
  IoAlarmOutline,
  IoAlert,
  IoArrowUpCircleOutline,
  IoAttachOutline,
  IoBedOutline,
  IoCalendarClearOutline,
  IoCheckmark,
  IoCloudDownloadOutline,
  IoDocumentOutline,
  IoHomeOutline,
  IoIdCardOutline,
  IoInformation,
  IoLayersOutline,
  IoLinkOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoNotificationsOutline,
  IoPersonCircleOutline,
  IoPrintOutline,
  IoSchoolOutline,
  IoSearchOutline,
  IoSendOutline,
  IoWalletOutline,
} from "react-icons/io5";
import type { IconBaseProps } from "react-icons/lib";

export const Icons = {
  warning: IoAlert,
  bed: IoBedOutline,
  home: IoHomeOutline,
  info: IoInformation,
  link: IoLinkOutline,
  menu: IoMenuOutline,
  send: IoSendOutline,
  success: IoCheckmark,
  print: IoPrintOutline,
  verified: VerifiedIcon,
  idCard: IoIdCardOutline,
  layers: IoLayersOutline,
  logOut: IoLogOutOutline,
  school: IoSchoolOutline,
  search: IoSearchOutline,
  wallet: IoWalletOutline,
  reminder: IoAlarmOutline,
  attached: IoAttachOutline,
  document: IoDocumentOutline,
  date: IoCalendarClearOutline,
  arrowUp: IoArrowUpCircleOutline,
  personCircle: IoPersonCircleOutline,
  notification: IoNotificationsOutline,
  cloudDownload: IoCloudDownloadOutline,
};

type Props = {
  active?: boolean;
  name: keyof typeof Icons;
};

export default function Icon(props: Props & IconBaseProps) {
  const { name } = props;
  const IconComponent = Icons[name];

  return IconComponent ? <IconComponent {...props} /> : null;
}
