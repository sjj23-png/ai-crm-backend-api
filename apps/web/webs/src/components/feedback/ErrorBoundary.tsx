



import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";

import ErrorFallback from "./ErrorFallback";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;

  error?: Error;
}

export default class ErrorBoundary
  extends Component<Props, State> {

  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(
    error: Error
  ) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo
  ) {
    console.error(
      error,
      errorInfo
    );
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          reset={this.reset}
        />
      );
    }

    return this.props.children;
  }
}