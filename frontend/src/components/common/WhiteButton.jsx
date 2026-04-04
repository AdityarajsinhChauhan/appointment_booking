import React from 'react'

const WhiteButton = ({ title, textColor , width }) => {
  return (
    <button className={`border border-gray-300 rounded-lg py-1 px-5 text-${textColor} ${width}`}>{title}</button>
  )
}

export default WhiteButton
