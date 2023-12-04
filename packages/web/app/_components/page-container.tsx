import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import stylesFlex from '@/styles/utils/flex.module.scss';
import stylesOverflow from '@/styles/utils/overflow.module.scss';

type Props = {
  children: ReactNode;
};

export const PageContainer: FC<Props> = ({ children }) => {
  return (
    <div
      className={classNames(
        stylesFlex['flex-1'],
        stylesOverflow['overflow-auto']
      )}
    >
      {children}
    </div>
  );
};
