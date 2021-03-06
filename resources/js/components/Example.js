import React,{Fragment,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {zeroPadding} from './/common/Common';
import Navigation from './/navigation/Navigation';
import Scheduledetail from './/schedule/Scheduledetail';
import Registerdis from './/register/Registerdis';
import Updatedis from './/update/Updatedis';
import GetSchedule from './/schedule/GetSchedule';

function Example(){
    const [year,setYear] = useState(new Date().getFullYear())
    const [month,setMonth] = useState(new Date().getMonth()+1)
    const last = new Date(year,month,0).getDate()
    const prevlast = new Date(year,month-1,0).getDate()

    const thisyear = new Date().getFullYear()
    const thismonth = new Date().getMonth()+1
    const nowday = new Date().getDate()

    const calendar = createCalendear(year,month)

    //スケジュールのデータを取得する
    let rows = GetSchedule();

    //新規登録用データ配列
    const [formData,setFormData] = useState({sch_category:'',sch_contents:'',sch_date:'',sch_hour:'',sch_min:'',sch_title:''});

    //新規登録用ダイアログ開閉処理
    const[open,setOpen] = useState(false);

    const handleClickOpen = (e) =>{
        //前月、翌月ならそもそも開かない
        if(e.currentTarget.id<1 || e.currentTarget.id > last){
            return;
        }
        setOpen(true);
        setFormData({sch_date : year + '-' + zeroPadding(month) + '-' + e.currentTarget.id});
    };

    const handleClose = () =>{
        setOpen(false);
    };

    //更新用ダイアログ開閉機能
    const[editopen,setEditOpen] = useState(false);

    const editHandleClickOpen = (e) =>{
        e.stopPropagation();
        setEditOpen(true);
        getEditData(e);
    };

    const editHandleClose = () =>{
        setEditOpen(false);
    };

    //更新用のデータ配列
    const [editData,setEditData] = useState({id:'',sch_category:'',sch_contents:'',sch_date:'',sch_hour:'',sch_min:'',sch_title:''});

    //バックエンドからデータ一覧を取得
    function getEditData(e){
        axios
            .post('/api/edit', {
                id: e.currentTarget.id
            })
            .then(res => {
                setEditData({
                    id:res.data.id,
                    sch_category:res.data.sch_category,
                    sch_contents:res.data.sch_contents,
                    sch_date:res.data.sch_date,
                    sch_hour:res.data.sch_time.substr(0,2),
                    sch_min:res.data.sch_time.substr(3,2),
                    sch_title:res.data.sch_title
                });
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    return (
        <Fragment>
            <Navigation year={year} month={month} setYear={setYear} setMonth={setMonth}/>
            <table className="calender-table">
                <thead>
                    <tr>
                        <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week,i) => (
                        <tr key={week.join('')}>
                            {week.map((day,j) => (
                                <td key={`${i}${j}`} id={day} className={thisyear == year && thismonth == month && nowday == day ? 'today' : undefined}  onClick={handleClickOpen}>
                                    <div>
                                        <div className={day <= 0 || day > last ? 'nschedule-date':'schedule-date'}>
                                            {day > last ? day - last : day <= 0 ? prevlast + day : day}
                                        </div>
                                        <div className="schedule-area"> 
                                            <Scheduledetail rows={rows} year={year} month={month} day={day} editHandleClickOpen={editHandleClickOpen} />
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Registerdis
                open={open}
                onClose={handleClose}
                data = {formData}
                setFormData = {setFormData}
            />
            <Updatedis
                open={editopen}
                onClose={editHandleClose}
                data = {editData}
                setEditData = {setEditData}
            />
        </Fragment>
    );
}

function createCalendear(year,month){
    const first = new Date(year,month - 1,1).getDay()

    return [0,1,2,3,4,5].map((weekIndex) => {
        return [0,1,2,3,4,5,6].map((dayIndex) => {
            const day = dayIndex + 1 + weekIndex * 7
            return day - first 
        })
    })
}

export default Example;

if (document.getElementById('top')) {
    ReactDOM.render(<Example />, document.getElementById('top'));
}
