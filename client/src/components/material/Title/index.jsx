import React from 'react'
import Text from '../Text'

const getSize = size => {
  let component;

  switch (size) {
    case 'xs':
      component = 'h6'
      break
    case 'sm':
      component = 'h5'
      break
    case 'md':
      component = 'h4'
      break
    case 'lg':
      component = 'h3'
      break
    case 'xl':
    default:
      component = 'h2'
      break
  }
  return component
}

const Title = ({ children, color, size, align, style }) => {
  const compColor = color || 'primaryText'
  const compSize = getSize(size)
  return (
    <Text
      align={align}
      size={compSize}
      color={compColor}
      style={style}
    >
      <strong>{children}</strong>
    </Text>
  )
}

export default Title