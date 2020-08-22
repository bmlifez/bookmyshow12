import  React  from 'react';
import  {data} from '../../../mock/mock';
import  Rows from './row';
import './row.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mockdata:{},
            selectedData:{
                position1:{
                    currentRow:'',
                    currentIndex:'',
                    checked:false,
                    type:''
                },
                position2:{
                    currentRow:'',
                    currentIndex:'',
                    checked:false,
                    type:''
                }
            },
            totalPrice:undefined,
            maxSeatCount:10
        };
    }

    componentDidMount(){
        this.setState({
            mockdata: data
        })
    }

    updateRowValue=(value)=>{
        const{selectedData,mockdata,maxSeatCount}=this.state;
        const position1=selectedData?.position1;
        const position2=selectedData?.position2;

        /**
         * 1. check if any is selected or not
         * 2. if selected then same row or not , if row is changed update value
         */

        if(!position1.checked){
            this.setState({
                selectedData:{
                    position1:{
                        currentRow:value.rowName,
                        currentIndex:value.seat_name,
                        checked:true,
                        type:value.type
                    }
                },
                totalPrice:value.seat_price
            })
        }

        //3. If Person is selecting same row 2nd position 
        if(position1?.checked&&position1?.currentRow===value.rowName){
            let maxSeatDiff=value.seat_name - position1.currentIndex;
            if(maxSeatDiff>maxSeatCount){
                alert(`You cannot select seats more that ${maxSeatCount}`);
                return;
            }

            let determineTotal=0;
            let outerIndex;
            for(let i=0;i<mockdata.length;i++){
                if(mockdata[i].type===position1?.type){
                    outerIndex=i;
                };
            }
            let innerNodeSearch = mockdata[outerIndex];
            for(let i=0;i<innerNodeSearch.rows.length;i++){
                let findRowValue=innerNodeSearch.rows[i];
                if(findRowValue.name==position1?.currentRow){
                    for(let i=0;i<findRowValue.childNodes.length;i++){
                        let nodeData = findRowValue.childNodes[i];
                        if(nodeData.seat_name>=position1?.currentIndex && nodeData.seat_name<=value.seat_name){
                            determineTotal += nodeData.seat_price;
                        }
                        
                    }
                }
            }
            this.setState({
                selectedData:{
                    position1,
                    position2:{
                        currentRow:value.rowName,
                        currentIndex:value.seat_name,
                        checked:true,
                        type:value.type
                    }
                },
                totalPrice:determineTotal
            })
        } else if(position1?.checked&&position1?.currentRow!=value.rowName){
            alert(`Dear user you are selecting another ${value.type} type from row ${value.rowName}`);
            this.setState({
                selectedData:{
                    position1:{
                        currentRow:value.rowName,
                        currentIndex:value.seat_name,
                        checked:true,
                        type:value.type
                    },
                    position2:{
                        currentRow:'',
                        currentIndex:'',
                        checked:false,
                        type:''
                    }
                },
                totalPrice:value.seat_price
            })
        }
    }

    render() {
        const{mockdata,selectedData,totalPrice}=this.state;
        return (
            <React.Fragment>
            {mockdata && mockdata.length>0 && mockdata.map((value,index)=>{
                    return <Rows 
                                data={value} key={index}
                                selectedData={selectedData}
                                getupdateRowValue={this.updateRowValue}
                            />
                }) 
            }
            {totalPrice !== undefined? <h4>Total Price: {totalPrice}</h4>:''}
            {totalPrice !== undefined? <button className="btn">Pay</button>:''}
            </React.Fragment>
        );
    }
}