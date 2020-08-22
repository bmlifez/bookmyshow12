import React from 'react';
import { Constant } from '../../../enums/constant';
import './style.css';

const Rows = (prop) => {
    let mockData = prop?.data;
    let rowObject = mockData?.rows;
    return (
        <React.Fragment>
            <h1>{mockData?.type} - Rs {mockData?.basePrice}</h1>
            {rowObject.map((value, index) => {
                return <RowData
                    data={value}
                    key={index}
                    getupdateRowValue={prop.getupdateRowValue}
                    selectedData={prop.selectedData}
                />
            })}
        </React.Fragment>
    )
}

const RowData = (prop) => {
    const rowData = prop?.data;
    const rowStyleConfiguration = (rowData) => {
        if (rowData.style === Constant.RIGHT) {
            return "displayRight";
        }

        if (rowData.style === Constant.LEFT) {
            return "displayLeft";
        }

        if (rowData.style === Constant.MIDDLE) {
            return "displayMiddle";
        }
    }
    return (
        <React.Fragment>
            <h2 style={{ 'float': 'left' }}>{rowData.name}</h2>
            <ul className={rowStyleConfiguration(rowData)}>
                {rowData.childNodes.map((node, index) => {
                    console.log(node);
                    return <Node
                        key={index}
                        data={node}
                        getupdateRowValue={prop.getupdateRowValue}
                        selectedData={prop.selectedData}
                    />
                })}
            </ul>
        </React.Fragment>
    )
}


const Node = (prop) => {
    const nodeData = prop?.data;
    const getNodeStyle = (nodeData, selectedData) => {
        const position1 = selectedData?.position1;
        const position2 = selectedData?.position2;
        if (nodeData.checked) {
            // Case Booked : If seats are already selected by someone else
            return 'liStyle grey';
        } else {
            //Case1: If both are selected in same row 
            if (position1?.checked && position2?.checked && nodeData.rowName === position1?.currentRow) {
                if (nodeData.seat_name >= position1?.currentIndex && nodeData.seat_name <= position2?.currentIndex) {
                    return 'liStyle green';
                }
            }
            // Case 2: If only one is selected
            if (nodeData.rowName === position1.currentRow && nodeData.seat_name === position1.currentIndex) {
                return 'liStyle green';
            }
            return 'liStyle';
        }
    }
    return (
        <li className={getNodeStyle(nodeData, prop.selectedData)} onClick={e => prop.getupdateRowValue(nodeData)}>{nodeData.seat_name}</li>
    )
}

export { Rows,Node };