import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export const goTo = (to: string) =>
  history.push({
    pathname: to,
    // search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
  });
