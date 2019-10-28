import axios from "../utils/axios";
import {
  ListJobsResponse,
  ListCustomersResponse,
  JobsBreakdownResponse,
  ListEmployeesResponse
} from "tsg-shared";
import { AxiosResponse } from "axios";

export type GetAllJobsResponse = AxiosResponse<ListJobsResponse>;
export const getAllJobs = () => axios.get<ListJobsResponse>("/jobs/list");
export const getPendingJobs = () =>
  axios.get<ListJobsResponse>("/jobs/list/pending");

export type GetAllCustomersResponse = AxiosResponse<ListCustomersResponse>;
export const getAllCustomers = () =>
  axios.get<ListCustomersResponse>("/customers/list");

export type GetJobCountByMonthResponse = AxiosResponse<JobsBreakdownResponse>;
export const getJobCountByMonth = () =>
  axios.get<JobsBreakdownResponse>("/jobs/count-breakdown");

export type GetAllEmployeesResponse = AxiosResponse<ListEmployeesResponse>;
export const getAllEmployees = () =>
  axios.get<ListEmployeesResponse>("/employees/list");
