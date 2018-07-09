import * as React from 'react';

import styled from '../utils/styled-components';

const Header = styled.h1`
    color: blue;
`;

export interface HelloProps {
    compiler: string;
    framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    public render() {
        return <Header>Hello from {this.props.compiler} and {this.props.framework}!</Header>;
    }
}
