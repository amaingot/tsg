import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Employee, Customer, Job, GetJobResponse } from "tsg-shared";
import axios from "../utils/axios";
import moment from "moment";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

const styles = createStyles({
  root: {
    padding: "16px"
  }
});

export interface State {
  employee?: Employee;
  customer?: Customer;
  loading: boolean;
}

class JobDetailTablePanel extends React.Component<
  Job & WithStyles<typeof styles>,
  State
> {
  constructor(props: Job & WithStyles<typeof styles>) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.props;
    axios.get<GetJobResponse>(`/jobs/${id}/detail`).then(res => {
      this.setState({
        loading: false,
        employee: res.data.data.employee,
        customer: res.data.data.customer
      });
    });
  }

  public render() {
    const { finishedAt, classes } = this.props;
    const { employee, customer } = this.state;

    return (
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="caption" gutterBottom>
                Customer
              </Typography>
              {customer && (
                <>
                  <Typography variant="body2">
                    Name: {customer.firstName} {customer.lastName}
                  </Typography>
                  <Typography variant="body2">
                    Cell Phone: {customer.cellPhone}
                  </Typography>
                  <Typography variant="body2">
                    Home Phone: {customer.homePhone}
                  </Typography>
                  <Typography variant="body2">
                    Work Phone: {customer.workPhone}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="caption" gutterBottom>
                Employee
              </Typography>
              <Typography variant="body2">
                Strung by:{" "}
                {!employee
                  ? "Not Recorded"
                  : `${employee.firstName} ${employee.lastName}`}
              </Typography>
              <Typography variant="body2">
                Strung on: {moment(finishedAt).toString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(JobDetailTablePanel);
