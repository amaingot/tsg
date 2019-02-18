import * as React from 'react';
import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps;

interface State {
  rowsPerPage: number;
  pageNumber: number;
}

export default class JobsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rowsPerPage: 50,
      pageNumber: 1,
    };
  }

  public render() {
    return <div>Employee Page</div>;
  }
}
