import ProductsPage from '../pages/ProductsPage';
export default {
  component: ProductsPage,
  title: 'Products Page',
};

const Template = (args) => <ProductsPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: { collection_id: 4 },
};
