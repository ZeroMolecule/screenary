import { Text } from '@/app/_components/base/text';
import { Center } from '@mantine/core';

// TODO: add custom loader (see with design)

export default function Loading() {
  return (
    <Center h="100%">
      <Text ff="secondary" fz={42} fw={700}>
        Loading...
      </Text>
    </Center>
  );
}
