import React from 'react';
import { MessageBar, MessageBarType, Stack, Text, IconButton } from '@fluentui/react';

export default function OfflineRemote() {
  return (
    <MessageBar messageBarType={MessageBarType.error} isMultiline>
      <Stack enableScopedSelectors horizontal horizontalAlign="space-around" verticalAlign="center">
        <Stack.Item align="auto">
          <Text>OOPS, Remote Component is offline</Text>
        </Stack.Item>
        <Stack.Item align="auto">
          <IconButton iconProps={{ iconName: 'PlugDisconnected' }} title="Offline Component" ariaLabel="Offline Component" />
        </Stack.Item>
      </Stack>
    </MessageBar>
  );
}
