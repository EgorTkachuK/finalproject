import React from 'react';
import Close from '../../assets/icons/close.svg?component';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string; 
};

export const IconClose: React.FC<IconProps> = ({ size = 24, title, className, ...svgProps }) => {
  const aria = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <Close
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      focusable="false"
      {...aria}
      {...svgProps}
    />
  );
};

export default IconClose;
