import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import BackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import CellPhoneIcon from '@material-ui/icons/Smartphone';
import WorkIcon from '@material-ui/icons/Work';

import CustomerModal from 'src/components/CustomerModal';
import CustomFact from 'src/components/CustomFact';
import JobTable from 'src/components/JobTable';
import PagePaper from 'src/components/PagePaper';
import withCustomer, { WithCustomerProps } from 'src/enhancers/withCustomer';
import { Job } from 'src/graphql/types';
import { CustomerFieldKey } from 'src/utils/customerFormHelpers';
import { FormValueMap } from 'src/utils/formHelpers';
import { goTo } from 'src/utils/history';

interface Props extends RouteComponentProps<{ id: string }> {
  id: string;
}

class CustomerDetailPage extends React.Component<Props & WithCustomerProps, {}> {
  public updateCustomer = (values: FormValueMap<CustomerFieldKey>) => {};

  public renderJobTable() {
    const { customerData } = this.props;
    if (
      !customerData ||
      !customerData.getCustomer ||
      !customerData.getCustomer.jobs ||
      !customerData.getCustomer.jobs.items
    ) {
      return null;
    }
    const jobs: Job[] = [];

    customerData.getCustomer.jobs.items.forEach(j => j && jobs.push(j));

    return (
      <Grid item xs={12}>
        <PagePaper fullHeight>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '24px 24px 8px 24px',
            }}
          >
            <Typography variant="h5">Jobs</Typography>
            <Button variant="contained" size="small" color="primary">
              Create Job
            </Button>
          </div>
          <JobTable jobs={jobs} />
        </PagePaper>
      </Grid>
    );
  }

  public render() {
    const { customerData } = this.props;
    if (!customerData || !customerData.getCustomer) {
      return null;
    }

    const {
      email,
      cellPhone,
      homePhone,
      workPhone,
      firstName,
      lastName,
      address,
      address2,
      city,
      state,
      zip,
    } = customerData.getCustomer;
    const hasAddress = !!address || !!address2 || !!city || !!state || !!zip;
    const hasContactInfo = !!email || !!cellPhone || !!homePhone || !!workPhone;

    return (
      <>
        <Typography variant="h4">
          <IconButton onClick={() => goTo('/app/customers')}>
            <BackIcon />
          </IconButton>
          {firstName} {lastName}
        </Typography>
        <CustomerModal
          initialValues={{
            lastName: lastName || undefined,
            firstName: firstName || undefined,
            email: email || undefined,
            address: address || undefined,
            address2: address2 || undefined,
            city: city || undefined,
            state: state || undefined,
            zip: zip || undefined,
            homePhone: homePhone || undefined,
            cellPhone: cellPhone || undefined,
            workPhone: workPhone || undefined,
          }}
          submit={this.updateCustomer}
          loading={customerData.loading}
        />
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <PagePaper withPadding fullHeight>
              <Typography variant="h5">Contact Info</Typography>
              {!hasContactInfo && (
                <Typography variant="caption">No contact information on record</Typography>
              )}
              <CustomFact icon={EmailIcon} label="Email" value={email} />
              <CustomFact icon={CellPhoneIcon} label="Cell Phone" value={cellPhone} />
              <CustomFact icon={HomeIcon} label="Home Phone" value={homePhone} />
              <CustomFact icon={WorkIcon} label="Work Phone" value={workPhone} />
            </PagePaper>
          </Grid>
          <Grid item xs={6}>
            <PagePaper withPadding fullHeight>
              <Typography variant="h5">Address</Typography>
              {hasAddress ? (
                <>
                  <Typography variant="body2">{address}</Typography>
                  <Typography variant="body2">{address2}</Typography>
                  <Typography variant="body2">
                    {city} {state} {zip}
                  </Typography>
                </>
              ) : (
                <Typography variant="caption">No address on record</Typography>
              )}
            </PagePaper>
          </Grid>
          {this.renderJobTable()}
        </Grid>
      </>
    );
  }
}

export default withCustomer<Props>()(CustomerDetailPage);
