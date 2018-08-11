import { shallow } from 'enzyme';
import * as React from 'react';

import HomePage from 'pages/HomePage';

describe('Button', () => {
  it('matches snapshot with props', () => {
    const home = shallow(<HomePage>Blah</HomePage>);
    expect(home).toMatchSnapshot();
  });
});
