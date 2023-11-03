import { FC, SVGProps } from 'react';

export type SvgProps = SVGProps<SVGSVGElement>;

export const IconSvg: FC<SvgProps> = ({ children, ...restProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...restProps}
    >
      {children}
    </svg>
  );
};
