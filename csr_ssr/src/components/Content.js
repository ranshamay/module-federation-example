import React from "react";
import { Stack, Text, Icon, StackItem } from "@fluentui/react";

const Content = () => {
  return (
    <Stack
      grow
      tokens={{ childrenGap: 15, padding: "0 0 15px 0" }}
      horizontalAlign="center"
      verticalAlign="center"
    >
      <StackItem>
        <Text variant="xxLarge">Under Construction</Text>
      </StackItem>
      <StackItem>
        <Icon
          iconName="BuildDefinitionIcon"
          styles={{ root: { fontSize: 100 } }}
        />
      </StackItem>
    </Stack>
  );
};

export default Content;
