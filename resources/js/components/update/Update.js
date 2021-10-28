import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function Update(props){
    const{editData}=props;

    //ダイアログデータを登録
    const updateSchedule = async() => {
        //空なら弾く
        if(editData==''){
            return;
        }
        //入力値を投げる
        await axios
            .post('/api/update',{
                id:editData.id,
                sch_category:editData.sch_category,
                sch_contents:editData.sch_contents,
                sch_date:editData.sch_date,
                sch_time:editData.sch_time,
                sch_title:editData.sch_title
            })
            .then((res)=>{
                //戻り値をtodosにセット
                setEditData(res.data);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    return (
        <Button href="/top" onClick={updateSchedule}>Subscribe</Button>
    );
}

export default Update;