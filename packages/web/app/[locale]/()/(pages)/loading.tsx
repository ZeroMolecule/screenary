import { Center } from '@mantine/core';
import { TextAlt } from '@/app/_components/base/text-alt';

// TODO: add custom loader (see with design)

export default function Loading() {
  return (
    <Center h="100%">
      <TextAlt fz={42} fw={700}>
        Loading...
      </TextAlt>
    </Center>
  );
}
