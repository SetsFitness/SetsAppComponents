import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import MessageInput from "../MessageInput";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<MessageInput board={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});
