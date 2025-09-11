import { Badge } from "@mantine/core";
import {
  IconBook,
  IconDeviceLaptop,
  IconShirt,
  IconCamera,
  IconMusic,
  IconBabyCarriage,
  IconChefHat,
  IconHeart,
  IconHome,
  IconTarget,
  IconBallBasketball,
  IconDeviceGamepad2,
  IconStereoGlasses,
} from "@tabler/icons-react";

const BnrBadge = (item) => {
  const iconMap = {
    IconBook: IconBook,
    IconHome: IconHome,
    IconDeviceLaptop: IconDeviceLaptop,
    IconShirt: IconShirt,
    IconCamera: IconCamera,
    IconMusic: IconMusic,
    IconBasketball: IconBallBasketball,
    IconGamepad: IconDeviceGamepad2,
    IconHandbag: IconStereoGlasses,
    IconBabyCarriage: IconBabyCarriage,
    IconChefHat: IconChefHat,
    IconHeart: IconHeart,
    IconTarget: IconTarget,
  };
  const IconComponent = iconMap[item.icon];
  if (!IconComponent) return null;

  return (
    <div>
      <Badge
        leftSection={<IconComponent size={20} color="#7e22ce" />}
        color="grape"
        variant="light"
        radius="xl"
        size="lg"
        style={{
          backgroundColor: "#eeeeee",
          color: "#7e22ce",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          border: "1px solid #7e22ce",
        }}>
        {item.text}
      </Badge>
    </div>
  );
};

export default BnrBadge;
