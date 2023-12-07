import { FC, SVGProps } from 'react';

export type Props = SVGProps<SVGSVGElement> & {
  fillColor?: string;
};

export const FolderIcon: FC<Props> = ({ fillColor, ...restProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...restProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.3999 7.19999C2.3999 5.8745 3.47442 4.79999 4.7999 4.79999H9.5999L11.9999 7.19999H16.7999C18.1254 7.19999 19.1999 8.2745 19.1999 9.59999V10.8H9.5999C7.61168 10.8 5.9999 12.4118 5.9999 14.4V16.2C5.9999 17.1941 5.19401 18 4.1999 18C3.20579 18 2.3999 17.1941 2.3999 16.2V7.19999Z"
        fill={fillColor ?? 'var(--mantine-color-primary-3)'}
      />
      <path
        d="M7.1999 14.4C7.1999 13.0745 8.27442 12 9.5999 12H19.1999C20.5254 12 21.5999 13.0745 21.5999 14.4V16.8C21.5999 18.1255 20.5254 19.2 19.1999 19.2H2.3999H4.7999C6.12539 19.2 7.1999 18.1255 7.1999 16.8V14.4Z"
        fill={fillColor ?? 'var(--mantine-color-primary-3)'}
      />
    </svg>
  );
};
