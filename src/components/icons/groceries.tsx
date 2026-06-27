import React from 'react';
import Groceries from '../../assets/icons/groceries.svg?component';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string; 
};

export const IconGroceries: React.FC<IconProps> = ({ size = 24, title, className, ...svgProps }) => {
  const aria = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <Groceries
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

export default IconGroceries;
