import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { AuthState } from '../store/auth/types';

import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style';

import PageContent from '../components/PageContent';
import PageFooter from '../components/PageFooter';
import TopNav from '../components/TopNav';

export interface AccountDetailsPageProps {
  auth: AuthState;
}

class AccountDetailsPage extends React.Component<AccountDetailsPageProps, any> {
  public render() {
    const { auth } = this.props;
    return (
      <Layout>
        <TopNav />
        <PageContent>{JSON.stringify(auth)}</PageContent>
        <PageFooter />
      </Layout>
    );
  }
}

const mapState2Props = (state: ApplicationState) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState2Props)(AccountDetailsPage);
