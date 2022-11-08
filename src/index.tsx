import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Title from 'components/title'
import styles from './styles.module.css'

export interface Props {
  url: string
  theme?: 'light' | 'dark'
}

export function Docco(props: Props) {
  return (
    <div className={(props.theme = 'light' ? styles.container : styles.dark)}>
      <h3>URL: {props.url}</h3>
      <h6>NAME: {props.theme ?? props.theme}</h6>
      <Title title='Docco rocks' />
    </div>
  )
}

export function init(url: string, element: HTMLElement) {
  const root = ReactDOM.createRoot(element)
  root.render(Docco({ url }))
}
