export interface RouteType {
  name: string;
  path: string;
  pathTo?: string;
  redirect?: boolean;
  collapse?: boolean;
  icon: string | React.ComponentType<any>;
  state?: string;
  short?: string;
  mini?: string;
  component?: React.ComponentType<any>;
  views?: Array<{
    name: string;
    redirect?: boolean;
    path: string;
    mini?: string;
    component?: React.ComponentType<any>;
  }>;
}
