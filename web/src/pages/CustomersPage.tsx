import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { Typography } from "@material-ui/core";
import Add from "@material-ui/icons/Add";

import { useGetCustomersQuery } from "../graphql/hooks";
import Table from "../components/Table";

const CustomersPage: React.FC = () => {
  const customersResponse = useGetCustomersQuery();
  const history = useHistory();

  const customerList = (
    customersResponse.data?.customers.data || []
  ).map((x) => ({ ...x }));

  const handleRowClick = (
    _event?: React.MouseEvent<Element, MouseEvent> | undefined,
    rowData?: { id: string }
  ) => {
    if (typeof rowData !== "undefined") {
      history.push(`/app/customers/${rowData.id}/detail`);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Customers
      </Typography>
      <Table
        columns={[
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Cell Phone", field: "cellPhone" },
          { title: "Home Phone", field: "homePhone" },
          { title: "Work Phone", field: "workPhone" },
          { title: "Email", field: "email" },
          {
            title: "Last Updated",
            field: "updatedAt",
            render: (c) => moment(c.updatedAt).format("MMM d, y"),
            defaultSort: "desc",
          },
        ]}
        // TODO: Implement remote data here
        data={customerList}
        isLoading={customersResponse.loading}
        onRowClick={handleRowClick}
        actions={[
          {
            icon: () => <Add />,
            tooltip: "Add Customer",
            isFreeAction: true,
            onClick: () => history.push("/app/customers/create"),
          },
        ]}
      />
    </>
  );
};

export default CustomersPage;
