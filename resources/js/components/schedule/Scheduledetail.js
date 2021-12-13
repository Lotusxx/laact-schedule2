import React from 'react';
import {zeroPadding,cutString} from '..//common/Common';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function Scheduledetail(props){
    const{rows,year,month,day,editHandleClickOpen,popupClick,id,popupOpen,anchorEl,popupClose,openedPopoverId} = props;

    const items = [];
    let pItems = [];
    let schenum = 0;
    let totalschenum = 0;

    //スケジュール数把握
    for(let i=0;i<rows.length;i++){
        if(rows[i].sch_date == year + '-' + month + '-' + zeroPadding(day)){
            totalschenum++
        }
    }

    console.log(openedPopoverId)

    //スケジュール出力
    for(let i=0;i<rows.length;i++){
        if(rows[i].sch_date == year + '-' + month + '-' + zeroPadding(day) && schenum < 3){
            items.push(<div className='schedule-title' onClick={editHandleClickOpen} id={rows[i].sch_id} key={i}>{cutString(rows[i].sch_title)}</div>);
            schenum++;
        }else if(rows[i].sch_date == year + '-' + month + '-' + zeroPadding(day) && 3 <= schenum){
            pItems.push(<div className='schedule-title' onClick={editHandleClickOpen} id={rows[i].sch_id} key={i}>{cutString(rows[i].sch_title)}</div>);
            schenum++;
        }
        if(rows[i].sch_date == year + '-' + month + '-' + zeroPadding(day) && schenum > 3 && schenum == totalschenum){
            items.push(<div onClick={popupClick} aria-describedby={day} id={day}>+{totalschenum-3}more</div>);
            items.push(<Popover
                id={day}
                open={openedPopoverId == day}
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
            break;
        }
    }
    pItems = [];
    schenum = 0;
    return items;
}


export default Scheduledetail;