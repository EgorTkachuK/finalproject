import React from 'react';
import Couch from '../../assets/icons/couch.svg?component';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string; 
};

export const IconCouch: React.FC<IconProps> = ({ size = 24, title, className, ...svgProps }) => {
  const aria = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <Couch
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

export default IconCouch;
