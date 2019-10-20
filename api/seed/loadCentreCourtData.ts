import * as AWS from "aws-sdk";
import * as Immutable from "immutable";
import * as uuid from "uuid/v4";
import Customers from "./Customers.json";
import Jobs from "./Jobs.json";
import * as moment from "moment";
import * as LibPhoneNumber from "google-libphonenumber";

const phoneUtil = LibPhoneNumber.PhoneNumberUtil.getInstance();

const dynamo = new AWS.DynamoDB.DocumentClient();

const CLIENT_ID = "a80cb500-e4aa-4f43-b7e9-49e80dcfb77f";

const titleCase = (str: any) => {
  if (typeof str === "string") {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }
  return "";
};

const cleanPhone = (str: any): string | undefined => {
  if (typeof str === "string") {
    try {
      const number = phoneUtil.parseAndKeepRawInput(str, "US");
      if (phoneUtil.isValidNumberForRegion(number, "US")) {
        return phoneUtil.format(number, LibPhoneNumber.PhoneNumberFormat.E164);
      }
    } catch (_e) {
      // to nothing
    }
  }
  return undefined;
};

const run = async () => {
  const customers = Immutable.fromJS(Customers);

  const jobs = Immutable.fromJS(Jobs);

  let idMapping = Immutable.Map();

  const mappedCustomers: Immutable.List<
    Immutable.Map<string, string>
  > = customers.reduce((reduction, c) => {
    const customerUuid = uuid();
    idMapping = idMapping.set(c.get("ID"), customerUuid);
    const customerData = Immutable.fromJS({
      id: customerUuid,
      clientId: CLIENT_ID,
      oldId: c.get("ID"),
      memNumber: c.get("MemNum"),
      lastName: titleCase(c.get("LastName")),
      firstName: titleCase(c.get("FirstName")),
      middleInitial: titleCase(c.get("MiddleInitial")),
      email: titleCase(c.get("Email")),
      address: titleCase(c.get("Address")),
      address2: titleCase(c.get("Address2")),
      city: titleCase(c.get("City")),
      // c.get('State'),
      zip: c.get("Zip"),
      homePhone: cleanPhone(c.get("HomePhone")),
      cellPhone: cleanPhone(c.get("CellPhone")),
      workPhone: cleanPhone(c.get("WorkPhone")),
      updatedAt: moment(c.get("LastUpdated")).format(),
      createdAt: moment(c.get("Created")).format()
    });

    const filteredCustomerData = customerData.filter(
      v => v !== "" && v !== null && v !== undefined
    );
    return reduction.push(filteredCustomerData);
  }, Immutable.List());

  const mappedJobs: Immutable.List<Immutable.Map<string, string>> = jobs.reduce(
    (reduction, j) => {
      const jobUuid = uuid();

      const jobData = Immutable.fromJS({
        id: jobUuid,
        clientId: CLIENT_ID,
        customerId: idMapping.get(j.get("CustomerID")),
        oldId: j.get("ID"),
        oldCustomerId: j.get("CustomerID"),
        name: titleCase(j.get("Name")),
        racket: titleCase(j.get("Racket")),
        tension: j.get("Tension"),
        gauge: j.get("Gauge"),
        recievedAt: moment(j.get("Recieved")).format(),
        finishedAt: moment(j.get("Finished")).format(),
        finished: true,
        stringName: titleCase(j.get("String")),
        oldStringerId: j.get("StringerID")
      });

      const filteredJobData = jobData.filter(
        v => v !== "" && v !== null && v !== undefined
      );

      return reduction.push(filteredJobData);
    },
    Immutable.List()
  );

  let c = 0;
  while (c < mappedCustomers.size) {
    const cust = mappedCustomers.get(c).toJS();

    await dynamo
      .put({
        TableName: "tsg-CustomerTable-prod",
        Item: cust
      })
      .promise();

    console.log("PUT CUST: ", cust);
    c++;
  }

  let j = 0;
  while (j < mappedJobs.size) {
    const job = mappedJobs.get(j).toJS();

    await dynamo
      .put({
        TableName: "tsg-JobTable-prod",
        Item: job
      })
      .promise();

    console.log("PUT JOB: ", job);
    j++;
  }
};
run();
