import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style';
import * as React from 'react';

import styled from '../utils/styled-components';

const MainContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;

export interface PageContentProps {
  children: React.ReactNode;
}

export default class PageContent extends React.Component<PageContentProps> {
  public render() {
    const { children } = this.props;
    return (
      <Layout.Content>
        <MainContentWrapper>{children}</MainContentWrapper>
      </Layout.Content>
    );
  }
}
