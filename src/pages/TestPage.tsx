import * as React from 'react';

const TestPage: React.SFC = props => {
  return <div>{props && JSON.stringify(props)}</div>;
};

export default TestPage;
