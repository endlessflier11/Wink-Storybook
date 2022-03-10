import { Component } from 'react';
import {
  primaryFont,
  secondaryFont,
  primaryColor,
  secondaryColor,
} from '../data/common';

class PropsService extends Component {
  constructor(props) {
    super(props);
    const customProps = JSON.parse(localStorage.getItem('custom_props'));
    this.state = {
      primaryFont,
      secondaryFont,
      primaryColor,
      secondaryColor,
      ...customProps,
    };

    this.onChangeParams = this.onChangeParams.bind(this);
  }

  params() {
    return this.state;
  }

  onChangeParams(newParams) {
    localStorage.setItem('custom_props', JSON.stringify(newParams));
  }
}

export default new PropsService();
