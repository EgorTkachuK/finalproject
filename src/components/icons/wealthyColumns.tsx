import React from 'react'
import WealthyColumns from '../../assets/icons/wealthyColumns.svg?component'

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
  title?: string
}

export const IconWealthyColumns: React.FC<IconProps> = ({
  size = 180,
  title,
  className,
  width,
  height,
  ...svgProps
}) => {
  const aria = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true }
  return (
    <WealthyColumns
      width={width ?? size}
      height={height ?? size}
      className={className}
      fill="currentColor"
      focusable="false"
      {...aria}
      {...svgProps}
    />
  )
}

export default IconWealthyColumns
