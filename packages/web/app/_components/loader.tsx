'use client';

import { FC } from 'react';
import { Center, CenterProps } from '@mantine/core';
import Lottie, { LottieComponentProps } from 'lottie-react';
import loadingLottie from '@/public/lottie/loading.json';

type Props = {
  centerProps?: CenterProps;
  lottieProps?: LottieComponentProps;
};

export const Loader: FC<Props> = ({ centerProps, lottieProps }) => {
  return (
    <Center {...centerProps}>
      <Lottie
        animationData={loadingLottie}
        width={300}
        height={300}
        {...lottieProps}
      />
    </Center>
  );
};
