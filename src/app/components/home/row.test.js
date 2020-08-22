import React from 'react';
import { configure, shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Node } from './row';

configure({ adapter: new Adapter() });

describe('Row Component', () => {

    it('Node Component rendered correctly', () => {

        let data = {
            currentRow: 'A',
            currentIndex: 1,
            checked: true,
            type: 'CLUB'
        }
        const component = shallow(<Node
            data={data}
        />);
        expect(component.find(".liStyle").length).toEqual(1);
    })

    it('Node Component select a vacant seat ,it should return green colour', () => {

        let data = {
            checked: false,
            rowName: "A",
            seat_name: 1,
            seat_price: 236,
            type: "CLUB"
        }

        let selectedData = {
            position1: {
                currentRow: "A",
                currentIndex: 1,
                checked: true,
                type: "CLUB"
            }
        }

        const component = shallow(<Node
            data={data}
            selectedData={selectedData}
        />);
        expect(component.find(".liStyle.green").length).toEqual(1);
    })

    it('Node Component select a checked seat ,it should return grey colour which tell a seat has already been filled', () => {

        let data = {
            checked: true,
            rowName: "A",
            seat_name: 1,
            seat_price: 236,
            type: "CLUB"
        }

        let selectedData = {
            position1: {
                currentRow: "A",
                currentIndex: 1,
                checked: true,
                type: "CLUB"
            }
        }

        const component = shallow(<Node
            data={data}
            selectedData={selectedData}
        />);
        expect(component.find(".liStyle.grey").length).toEqual(1);
    })
})