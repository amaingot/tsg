import * as React from 'react';

import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style';

import PageContent from '../components/PageContent';
import PageFooter from '../components/PageFooter';
import TopNav from '../components/TopNav';

export default class HomePage extends React.Component {
  public render() {
    return (
      <Layout>
        <TopNav />
        <PageContent>THIS IS THE BEST Totally</PageContent>
        <PageFooter />
      </Layout>
    );
  }
}
