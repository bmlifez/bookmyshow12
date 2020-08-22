import React from 'react';
import { data } from '../../../mock/mock';
import { Rows } from './row';
import './style.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mockdata: {},
            selectedData: {
                position1: {
                    currentRow: '',
                    currentIndex: '',
                    checked: false,
                    type: ''
                },
                position2: {
                    currentRow: '',
                    currentIndex: '',
                    checked: false,
                    type: ''
                }
            },
            totalPrice: undefined,
            maxSeatCount: 10
        };
    }

    componentDidMount() {
        this.setState({
            mockdata: data
        })
    }

    updateRowValue = (value) => {
        const { selectedData, mockdata, maxSeatCount } = this.state;
        const position1 = selectedData?.position1;
        /**
         * 1. check if any is selected or not
         * 2. if selected then same row or not , if row is changed update value
         */
        if (!position1.checked) {
            this.setState({
                selectedData: {
                    position1: {
                        currentRow: value.rowName,
                        currentIndex: value.seat_name,
                        checked: true,
                        type: value.type
                    }
                },
                totalPrice: value.seat_price
            },()=>{
                console.log(this.state.selectedData.position1);
            })
        }

        function determineTotal() {
            let determineTotal = 0;
            let outerIndex;
            for (let i = 0; i < mockdata.length; i++) {
                if (mockdata[i].type === position1?.type) {
                    outerIndex = i;
                };
            }
            let innerNodeSearch = mockdata[outerIndex];
            for (let i = 0; i < innerNodeSearch.rows.length; i++) {
                let findRowValue = innerNodeSearch.rows[i];
                console.log('findRow', findRowValue, 'position 1', position1)
                if (findRowValue.name === position1?.currentRow) {
                    for (let i = 0; i < findRowValue.childNodes.length; i++) {
                        let nodeData = findRowValue.childNodes[i];
                        if (nodeData.seat_name >= position1?.currentIndex && nodeData.seat_name <= value.seat_name && !nodeData.checked) {
                            determineTotal += nodeData.seat_price;
                        }

                    }
                }
            }
            return determineTotal;
        }
        //3. If Person is selecting same row 2nd position 
        if (position1?.checked && position1?.currentRow === value.rowName) {
            let maxSeatDiff = value.seat_name - position1.currentIndex;
            if (maxSeatDiff > maxSeatCount) {
                alert(`You cannot select seats more that ${maxSeatCount}`);
                return;
            }

            this.setState({
                selectedData: {
                    position1,
                    position2: {
                        currentRow: value.rowName,
                        currentIndex: value.seat_name,
                        checked: true,
                        type: value.type
                    }
                },
                totalPrice: determineTotal()
            })
        } else if (position1?.checked && position1?.currentRow !== value.rowName) {
            alert(`Dear user you are selecting another ${value.type} type from row ${value.rowName}`);
            this.setState({
                selectedData: {
                    position1: {
                        currentRow: value.rowName,
                        currentIndex: value.seat_name,
                        checked: true,
                        type: value.type
                    },
                    position2: {
                        currentRow: '',
                        currentIndex: '',
                        checked: false,
                        type: ''
                    }
                },
                totalPrice: value.seat_price
            })
        }
    }

    render() {
        const { mockdata, selectedData, totalPrice } = this.state;
        return (
            <React.Fragment>
                <span>
                    <h3 className="movie-title">Movie: Avengers</h3>
                    <img alt="avenger" loading="lazy" style={{height:'200px',width:'120px'}} src="https://m.media-amazon.com/images/M/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg" />
                </span>
                {mockdata && mockdata.length > 0 && mockdata.map((value, index) => {
                    return <Rows
                        data={value} key={index}
                        selectedData={selectedData}
                        getupdateRowValue={this.updateRowValue}
                    />
                })
                }
                {totalPrice !== undefined ? <h4>Total Price: {totalPrice}</h4> : ''}
                {totalPrice !== undefined ? <button className="btn">Pay</button> : ''}
            </React.Fragment>
        );
    }
}