import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Remount from 'remount';

import Title from './components/title';
import styles from './styles.module.css';

export interface Props {
  url: string;
  theme?: 'light' | 'dark';
}

export function Docco({ url, theme = 'light' }: Props) {
  return (
    <div className={theme === 'light' ? styles.container : styles.dark}>
      <h3>URL: {url}</h3>
      <h6>NAME: {theme}</h6>
      <Title title='Docco rocks' />
    </div>
  );
}

export function init(url: string, element: HTMLElement) {
  const root = ReactDOM.createRoot(element);
  root.render(Docco({ url }));
}

Remount.define({ 'x-docco': Docco }, { attributes: ['url', 'theme'] });
