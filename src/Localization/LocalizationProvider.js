import { Component, Children } from "react";

class LocalizationProvider extends Component {
  static childContextTypes = {
    i18n: PropTypes.object
  };

  getChildContext() {
    const { i18n } = this.props;
    return { i18n };
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default LocalizationProvider;
