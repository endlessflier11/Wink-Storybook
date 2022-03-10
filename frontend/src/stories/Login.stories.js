import LoginPage from '../pages/LoginPage';

export default {
  component: LoginPage,
  title: 'Login Page',
};

const Template = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
