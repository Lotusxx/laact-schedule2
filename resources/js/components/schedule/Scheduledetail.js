import React from 'react';
import {zeroPadding,cutString} from '..//common/Common';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function Scheduledetail(props){
    const{rows,year,month,day,editHandleClickOpen,popupClick,id,popupOpen,anchorEl,popupClose} = props;

    const items = [];
    const pItems = [];
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
            schenum++;
        }else if(rows[i].sch_date == year + '-' + month + '-' + zeroPadding(day) && schenum == 3){
            items.push(<div onClick={popupClick}>+{totalschenum-3}more</div>);
            pItems.push(<div className='schedule-title' onClick={editHandleClickOpen} id={rows[i].sch_id} key={i}>{cutString(rows[i].sch_title)}</div>);
            schenum++;
        }else if(rows[i].sch_date == year + '-' + month + '-' + zeroPadding(day) && 3 < schenum && schenum < totalschenum-1){
            pItems.push(<div className='schedule-title' onClick={editHandleClickOpen} id={rows[i].sch_id} key={i}>{cutString(rows[i].sch_title)}</div>);
            schenum++;
        }else if(rows[i].sch_date == year + '-' + month + '-' + zeroPadding(day) && schenum == totalschenum-1){
            pItems.push(<div className='schedule-title' onClick={editHandleClickOpen} id={rows[i].sch_id} key={i}>{cutString(rows[i].sch_title)}</div>);
            items.push(<Popover
                id={id}
                open={popupOpen}
                anchorEl={anchorEl}
                onClose={popupClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}>
                <Typography sx={{ p: 2 }}>
                    {pItems.map((item,j) => <li key={j}>{item}</li>)}
                </Typography>
            </Popover>);
        }
    }
    schenum = 0;
    return items;
}


export default Scheduledetail;