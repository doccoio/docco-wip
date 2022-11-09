import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

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
