import PerfectScrollbar from 'perfect-scrollbar';
import * as React from 'react';

interface SidebarWrapperProps {
  user?: React.ReactNode;
  headerLinks?: React.ReactNode;
  links?: React.ReactNode;
  className?: string;
}

let ps: PerfectScrollbar;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component<SidebarWrapperProps, {}> {
  constructor(props: SidebarWrapperProps) {
    super(props);
    this.sidebarWrapper = '';
  }

  public sidebarWrapper: string | HTMLElement;

  public componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }

  public componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
  }

  public render() {
    const { className, user, headerLinks, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {user}
        {headerLinks}
        {links}
      </div>
    );
  }
}

export default SidebarWrapper;
