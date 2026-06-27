import React from 'react';
import Machinery from '../../assets/icons/machinery.svg?component';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string; 
};

export const IconMachinery: React.FC<IconProps> = ({ size = 24, title, className, ...svgProps }) => {
  const aria = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <Machinery
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

export default IconMachinery;
