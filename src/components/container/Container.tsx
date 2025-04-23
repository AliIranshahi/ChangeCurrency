import React from 'react'
import { Children } from '../../types/generalTypes'

export default function Container({ children }: Children) {
  return (
    <div className='container'>{children}</div>
  )
}
