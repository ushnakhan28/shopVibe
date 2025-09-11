import { IconCategory } from "@tabler/icons-react";
import { Badge } from "@mantine/core";

const AppBadge = (item) => {
  return (
    <div className="mt-20 mx-3">
      <center>
        <Badge
          leftSection={item.icon}
          color="#7e22ce"
          variant="light"
          radius="xl"
          size="lg">
          {item.text}
        </Badge>
      </center>
    </div>
  );
};

export default AppBadge;
