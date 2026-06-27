import React from 'react';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string;
};

export const IconLogout: React.FC<IconProps> = ({ size = 16, title, className, ...svgProps }) => {
  const aria = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      focusable="false"
      {...aria}
      {...svgProps}
    >
      <g clipPath="url(#clip0_1_2123)">
        <path d="M9.99998 14H1.99998V1.99998H9.99998V2.99998H12V0H0V16H12V13H10V14H9.99998Z" fill="currentColor" />
        <path d="M12.293 4.29297L10.8789 5.70702L12.1719 6.99998H7V8.99999H12.1719L10.8789 10.293L12.293 11.707L16 7.99997L12.293 4.29297Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_1_2123">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconLogout;
