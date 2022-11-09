import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import { expect } from '@storybook/jest';
import { Docco } from '../';

export default {
  title: 'Docco',
  component: Docco,
} as Meta<typeof Docco>;

const Template: StoryFn<typeof Docco> = (args) => <Docco {...args} />;

export const OpenAPI = Template.bind({});
OpenAPI.args = {
  url: 'my fancy docs url',
  theme: 'light',
};

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
