'use client';

import { Center } from '@mantine/core';
import Lottie from 'lottie-react';
import loadingLottie from '@/public/lottie/loading.json';

export default function Loading() {
  return (
    <Center h="100%">
      <Lottie animationData={loadingLottie} width={300} height={300} />
    </Center>
  );
}
