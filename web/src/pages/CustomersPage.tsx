import React from "react";

import { Typography } from "@material-ui/core";
import Add from "@material-ui/icons/Add";

import { useGetCustomersQuery } from "../graphql/hooks";
import Table from "../components/Table";

const CustomersPage: React.FC = () => {
  const customersResponse = useGetCustomersQuery();

  const customerList = customersResponse.data?.customers.data || [];
  //'clientId' | 'memNum' | 'firstName' | 'lastName' | 'middleInitial' | 'email' | 'address' | 'address2' | 'city' | 'zip' | 'homePhone' | 'workPhone' | 'updatedAt' | 'createdAt'

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Customers
      </Typography>
      <Table
        columns={[
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Cell Phone", field: "birthYear", type: "numeric" },
          {
            title: "Birth Place",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          },
        ]}
        data={customerList}
        actions={[
          {
            icon: () => <Add />,
            tooltip: "Add Customer",
            isFreeAction: true,
            onClick: () => alert("You want to add a new row"),
          },
        ]}
      />
    </>
  );
};

export default CustomersPage;
