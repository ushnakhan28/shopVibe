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
        leftSection={<IconComponent size={20} color="white" />}
        color="grape"
        variant="light"
        radius="xl"
        size="lg"
        style={{
          backgroundColor: "#C084FC",
          color: "white",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}>
        {item.text}
      </Badge>
    </div>
  );
};

export default BnrBadge;
