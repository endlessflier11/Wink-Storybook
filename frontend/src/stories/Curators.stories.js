import CuratorsPage from '../pages/CuratorsPage';

export default {
  component: CuratorsPage,
  title: 'Curated For You Page',
};

const Template = (args) => <CuratorsPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
