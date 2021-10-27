import React,{Fragment,useState,useEffect} from 'react';

function Schedule(props){
    return(
        <div className="schedule-area"> 
            {rows.map((row, index) => (
                row.sch_date == year + '-' + month + '-' + zeroPadding(day) && 
                    <div key={index} className='schedule-title' onClick={editHandleClickOpen} id={row.sch_id}>{cutString(row.sch_title)}</div>
            ))}
        </div>
    )
}


export default Schedule;