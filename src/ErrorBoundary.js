import React, { Component } from 'react';
import { GreenButton } from './styles';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch(error, errorInfo) {
    this.setState(() => ({
      error,
      errorInfo,
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>There was an error!</p>
          <GreenButton onClick={() => window.location.reload(false)}>
            Click to refresh
          </GreenButton>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
