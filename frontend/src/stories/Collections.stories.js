import CollectionsPage from '../pages/CollectionsPage';
export default {
  component: CollectionsPage,
  title: 'Collections Page',
};

const Template = (args) => <CollectionsPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
