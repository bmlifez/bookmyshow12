import React from 'react';
import {Constant} from '../../../enums/constant';
import {connect} from 'react-redux';
import {selectSeat} from '../../../store/actions/homeAction';
import store from '../../../store/store';
import './row.css';

const mapStateToProps = (state,getState) => {
    console.log(state);
    return {
        selectedSeat: state.post.selectedSeat
    }
}

const Rows = (prop) => {
        let mockData=prop?.data;
        let rowObject=mockData?.rows;
        console.log('store',store.getState());
        return (
            <React.Fragment>
                <h1>{mockData?.type} - Rs {mockData?.basePrice}</h1>
                {rowObject.map((value,index)=>{
                    return <RowData 
                                data={value} 
                                key={index}
                                onAction={prop.onAction}
                                selectedData={prop.selectedSeat}
                            />
                })}
            </React.Fragment>
        )
}

const RowData = (prop) => {
    const rowData = prop?.data;
    const rowStyleConfiguration = (rowData) =>{
        if(rowData.style===Constant.RIGHT){
            return "displayRight";
        }

        if(rowData.style===Constant.LEFT){
            return "displayLeft";
        }

        if(rowData.style===Constant.MIDDLE){
            return "displayMiddle";
        }
    }
    return (
        <React.Fragment>
            <h2 style={{'float':'left'}}>{rowData.name}</h2>
            <ul className={rowStyleConfiguration(rowData)}>
                {rowData.childNodes.map((node,index)=>{
                    return <Node 
                                key={index} 
                                data={node}
                                getupdateRowValue={prop.getupdateRowValue}
                                selectedData={prop.selectedData}
                                onAction={prop.onAction} 
                            />
                })}
            </ul>
        </React.Fragment>
    )
}


const Node = (prop) =>{
   
    const nodeData = prop?.data;
    const getNodeStyle = (nodeData,selectedData) =>{
        const position1 = selectedData?.position1;
        const position2 = selectedData?.position2;
        if(nodeData.checked){
            // Case Booked : If seats are already selected by someone else
            return 'liStyle grey';
        } else {
            //Case1: If both are selected in same row 
            if(position1?.checked && position2?.checked && nodeData.rowName===position1?.currentRow){
                if(nodeData.seat_name>=position1?.currentIndex && nodeData.seat_name<=position2?.currentIndex){
                    return 'liStyle green';
                }
            }
            // Case 2: If only one is selected
            // if(nodeData.rowName===position1.currentRow && nodeData.seat_name===position1.currentIndex){
            //     return 'liStyle green';
            // }
            return 'liStyle';
        }
    }
    return (
        <li className="liStyle" onClick={()=>prop.onAction(nodeData)}>{nodeData.seat_name}</li>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAction: (payload) => dispatch(selectSeat(payload)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Rows)