var a=Object.defineProperty;var o=(e,r)=>a(e,"name",{value:r,configurable:!0});import{H as n}from"./Header-326dbdc4.js";import{j as s}from"./jsx-runtime-d0e2239a.js";import"./Button-0e689c03.js";import"./index-13f3a07b.js";import"./_commonjsHelpers-df0bf62c.js";const y={title:"Example/Header",component:n,parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: 'Jane Doe',
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
`,locationsMap:{"logged-in":{startLoc:{col:48,line:14},endLoc:{col:78,line:14},startBody:{col:48,line:14},endBody:{col:78,line:14}},"logged-out":{startLoc:{col:48,line:14},endLoc:{col:78,line:14},startBody:{col:48,line:14},endBody:{col:78,line:14}}}},layout:"fullscreen"}},t=o(e=>s(n,{...e}),"Template"),d=t.bind({});d.args={user:{name:"Jane Doe"}};const l=t.bind({});l.args={};const L=["LoggedIn","LoggedOut"];export{d as LoggedIn,l as LoggedOut,L as __namedExportsOrder,y as default};
//# sourceMappingURL=Header.stories-e4fbe636.js.map
