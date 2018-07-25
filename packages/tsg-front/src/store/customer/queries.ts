export function generateListCustomersQuery(): string {
  return `query {
    customers {
      id
      firstName
      lastName
      email
      address
      address2
      city
      state
      zip
      homePhone
      cellPhone
      workPhone
      lastUpdated
      createdAt
    }
  }`;
}
