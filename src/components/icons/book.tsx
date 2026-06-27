import React from 'react';
import Book from '../../assets/icons/book.svg?component';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string; 
};

export const IconBook: React.FC<IconProps> = ({ size = 24, title, className, ...svgProps }) => {
  const aria = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <Book
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

export default IconBook;
