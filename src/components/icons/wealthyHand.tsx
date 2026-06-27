import React from 'react'
import WealthyHand from '../../assets/icons/wealathyHand.svg?component'

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
  title?: string
}

export const IconWealthyHand: React.FC<IconProps> = ({
  size = 84,
  title,
  className,
  width,
  height,
  ...svgProps
}) => {
  const aria = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true }
  return (
    <WealthyHand
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

export default IconWealthyHand
