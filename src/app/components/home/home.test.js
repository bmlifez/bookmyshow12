import React from 'react';
import { configure, shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './home';

configure({ adapter: new Adapter() });

describe('Home Component', () => {

    it('Home Component Renders correctly', () => {
        const component = shallow(<Home />);
        expect(component.find(".movie-title").length).toEqual(1);
    })

    it('Button should be hidden if nothing is selected', () => {
        const component = shallow(<Home />);
        expect(component.find(".btn").length).toEqual(0);
    })
})