import React from 'react';
import {zeroPadding,cutString} from '..//common/Common';

function Scheduledetail(props){
    const{rows,year,month,day,editHandleClickOpen,popupClick} = props;

    const items = [];
    let schenum = 0;
    let totalschenum = 0;

    //スケジュール数把握
    for(let i=0;i<rows.length;i++){
        if(rows[i].sch_date == year + '-' + month + '-' + zeroPadding(day)){
            totalschenum++
        }
    }

    //スケジュール出力
    for(let i=0;i<rows.length;i++){
        if(rows[i].sch_date == year + '-' + month + '-' + zeroPadding(day) && schenum < 3){
            items.push(<div className='schedule-title' onClick={editHandleClickOpen} id={rows[i].sch_id} key={i}>{cutString(rows[i].sch_title)}</div>);
            schenum++
        }else if(schenum == 3){
            items.push(<div onClick={popupClick}>+{totalschenum-3}more</div>)
            schenum++
        }
    }
    schenum = 0;
    return items;
}


export default Scheduledetail;