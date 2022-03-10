import { Component } from 'react';
import { withSize } from 'react-sizeme';
import InfiniteLoader from 'react-infinite-loader';
import { chunk } from 'lodash';
import { Button } from '@material-ui/core';

import UserService from '../../services/user.service';
import { friends } from '../../data/socials';
import data from '../../data/products';
import { primaryColor, primaryFont, secondaryColor } from '../../data/common';
import Product from './Product';
import './index.css';
import { isStorybook } from '../../utils';

const PAGE_SIZE = 50;

class InternProducts extends Component {
  constructor(props) {
    super(props);

    this.pageNumber = 1;
    this.isMobile = props.size.width < 600;

    this.state = {
      primaryFont: props.theme?.primaryFont || primaryFont,
      primaryColor: props.theme?.primaryColor || primaryColor,
      secondaryColor: props.theme?.secondaryColor || secondaryColor,
      columns: this.isMobile ? 1 : props.columns || 3,
      type: props.type || 'all',
      cardStyle: props.cardStyle,
      containerStyle: props.containerStyle,
      claims: null,
      activeTab: 0,
    };
  }

  componentDidMount() {
    if (isStorybook()) {
      this.setState({
        products: data,
      });
    } else {
      UserService.getProducts(this.pageNumber).then((response) => {
        this.setState({
          products: response.data.docs,
          scrollableContainerId: this.props.scrollableContainerId,
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollableContainerId !== prevProps.scrollableContainerId) {
      this.setState({
        scrollableContainerId: this.props.scrollableContainerId,
      });
    }
    if (this.props.claims !== prevProps.claims) {
      // @patrick.bergeron - if claims change (e.g. HAS/WANTS), reload the products
      //  and start @ page 1 (0-based)
      console.log('loading products => %o', this.props.claims);
      this.pageNumber = 1;
      this.loadItems();
    }
  }

  loadItems() {
    if (isStorybook()) {
      setTimeout(() => {
        let items = this.state.products.slice();
        items = items.concat(this.getItems());
        this.setState({ products: items });
      }, 1000);
    } else {
      UserService.getProducts(this.pageNumber).then((response) => {
        let items = this.state.products.slice();
        items = items.concat(response.data.docs);
        this.setState({ products: items });
      });
    }
  }

  handleVisit() {
    this.pageNumber++;
    this.loadItems();
  }

  getItems() {
    return data;
  }

  onTabChange(active) {
    this.setState({ activeTab: active });
  }

  render() {
    const {
      products,
      primaryFont,
      primaryColor,
      secondaryColor,
      columns,
      type,
      containerStyle,
      activeTab,
    } = this.state;

    const chunkedProducts = chunk(products, columns);
    return (
      <div
        className='d-intern-container'
        style={{
          width: this.isMobile && '100%',
        }}
      >
        <div className='d-intern-tab_group'>
          <Button
            variant='contained'
            className={
              activeTab === 0
                ? 'd-intern-selected_button'
                : 'd-intern-unselected_button'
            }
            style={{ ...primaryFont, fontSize: 12 }}
            onClick={() => this.onTabChange(0)}
          >
            ALL PRODUCTS
          </Button>
          <Button
            variant='contained'
            className={
              activeTab === 1
                ? 'd-intern-selected_button'
                : 'd-intern-unselected_button'
            }
            style={{ ...primaryFont, fontSize: 12 }}
            onClick={() => this.onTabChange(1)}
          >
            FINISH ME!
          </Button>
        </div>

        <div className='d-intern-child' style={{ ...containerStyle }}>
          {chunkedProducts
            .filter((group, idx) => (type === 'all' ? true : idx === 0))
            .map((productGroup, idx) => (
              <div
                key={`products-${idx}`}
                className='d-intern-row'
                style={{
                  paddingBottom: this.isMobile && 30,
                  justifyContent: !this.isMobile && 'flex-start',
                  width: this.isMobile ? '100%' : '1107px',
                }}
              >
                {productGroup.map((product) => (
                  <div
                    key={`product-${product.id}`}
                    className='d-intern-cell'
                    style={{ margin: !this.isMobile && '0px 12px' }}
                  >
                    <Product
                      key={`product-card-${product?.id}`}
                      isMobile={this.isMobile}
                      friends={friends}
                      productData={product}
                      columns={columns}
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                      {...this.props}
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
        {type === 'all' && this.state.scrollableContainerId && (
          <InfiniteLoader
            onVisited={() => this.handleVisit()}
            containerElement={
              this.state.scrollableContainerId
                ? document.getElementById(this.state.scrollableContainerId)
                : null
            }
          />
        )}
        {type === 'all' && !this.state.scrollableContainerId && (
          <InfiniteLoader onVisited={() => this.handleVisit()} />
        )}
      </div>
    );
  }
}

export default withSize()(InternProducts);
