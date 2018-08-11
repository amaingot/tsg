import axios from 'axios';

export interface GQLResponse {
  data: any;
  gqlError: any;
  error: any;
}

export default function(query: string, token?: string): Promise<GQLResponse> {
  const axiosConfig = {
    method: 'POST',
    url: 'graphql',
    headers: {},
    data: { query },
  };

  if (token) {
    axiosConfig.headers = {
      Authorization: `JWT ${token}`,
    };
  }

  return axios(axiosConfig)
    .then(response => {
      if (response.data.errors) {
        return {
          data: null,
          gqlError: response.data.errors[0].message,
          error: null,
        };
      }
      return {
        data: response.data.data,
        gqlError: null,
        error: null,
      };
    })
    .catch(error => {
      return { data: null, gqlError: null, error };
    });
}
