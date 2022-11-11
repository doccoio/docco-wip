import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import { Docco, Props } from '../';
import { expect } from '@storybook/jest';

export default {
  title: 'Docco',
  component: Docco,
} as Meta<typeof Docco>;

const TemplateComponent: StoryFn<typeof Docco> = (args) => <Docco {...args} />;
export const OpenAPI = TemplateComponent.bind({});
OpenAPI.args = {
  url: 'my fancy docs url',
  theme: 'light',
};

const TemplateWebComponent: StoryFn<typeof Docco> = (args) => <x-docco {...args}></x-docco>;
export const WC = TemplateWebComponent.bind({});
WC.args = {
  url: 'my fancy docs url',
  theme: 'light',
};

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      'x-docco': Props;
    }
  }
}

OpenAPI.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);

  await canvas
    .getAllByText('Docco rocks')
    .forEach((element: HTMLElement) => expect(element).toBeInTheDocument);

  const element = canvas.queryByTestId('input-card-title');

  // Check if element exist since it can not be null
  if (element) {
    await userEvent.clear(element);
    await userEvent.type(element, 'http://specfile.com');
    await expect(canvas.getAllByText('http://specfile.com')).toBeInTheDocument;
  }
};