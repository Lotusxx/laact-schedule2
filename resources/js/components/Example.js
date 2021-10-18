import React,{Fragment,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';

//テスト
const emails = ['username@gmail.com', 'user02@gmail.com'];

//Simpleダイアログテスト
function SimpleDialog(props){
    const{onClose,selectedValue,open}=props;

    const handleClose = () =>{
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{pt:0}}>
                {emails.map((email)=>(
                    <ListItem button key={email}>
                        <ListItemText primary={email} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose:PropTypes.func.isRequired,
    open:PropTypes.bool.isRequired,
    selectedValue:PropTypes.string.isRequired,
};

function Example(){
    const [year,setYear] = useState(new Date().getFullYear())
    const [month,setMonth] = useState(new Date().getMonth()+1)
    const last = new Date(year,month,0).getDate()
    const prevlast = new Date(year,month-1,0).getDate()
    var schenum = 0

    const thisyear = new Date().getFullYear()
    const thismonth = new Date().getMonth()+1
    const nowday = new Date().getDate()

    const calendar = createCalendear(year,month)

    const onClick = n => () => {
        const nextMonth = month + n
        if (12 < nextMonth) {
          setMonth(1)
          setYear(year + 1)
        } else if (nextMonth < 1) {
          setMonth(12)
          setYear(year - 1)
        } else {
          setMonth(nextMonth)
        }
    }

    //スケジュールのデータ
    const [schedules,setSche] = useState([])

    //画面読み込み時に、1度だけ起動
    useEffect(()=>{
        getPostData();
    },[])

    //バックエンドからデータ一覧を取得
    const getPostData = () =>{
        axios
        .get('/api/posts')
        .then(response=>{
            setSche(response.data); //バックエンドからのデータでスケジュールを更新
            console.log(response.data); //確認用ログ
        }).catch(()=>{
            console.log('通信に失敗しました');
        });
    }

    //データ格納の空配列を作成
    let rows = [];

    //スケジュールデータをrowに格納する
    schedules.map((post)=>
        rows.push({
            sch_category:post.sch_category,
            sch_contents:post.sch_contents,
            sch_date:post.sch_date,
            sch_time:post.sch_time,
            sch_title:post.sch_title
        })
    );

    //ダイアログテスト、ここから
    const[open,setOpen] = useState(false);
    const[selectedValue,setSelectedValue] = useState(emails[1]);

    const handleClickOpen = () =>{
        setOpen(true);
    };

    const handleClose = (value) =>{
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <Fragment>
            <div className="calender-header">
                <h1>{`${year}年${month}月`}</h1>
                <div className="calender-nav">
                    <button onClick={onClick(-1)}>{'<先月'}</button>
                    <button onClick={onClick(1)}>{'翌月>'}</button>
                </div>
            </div>
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
                                <td key={`${i}${j}`} className={thisyear == year && thismonth == month && nowday == day && 'today'} >
                                    <div>
                                        <div className={day <= 0 || day > last ? 'nschedule-date':'schedule-date'}>
                                            {day > last ? day - last : day <= 0 ? prevlast + day : day}
                                        </div>
                                        <div className="schedule-area"> 
                                            {rows.map((row, index) => (
                                                row.sch_date == year + '-' + month + '-' + zeroPadding(day) && index < 4 && 
                                                    <div key={index} className='schedule-title'>{cutString(row.sch_title)}</div>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {rows.map((row, index) => (
              <p key={index}>
                  {row.sch_date}
                  {row.sch_time}
                  {row.sch_category}
                  {row.sch_contents}
                  {row.sch_title}
              </p>
            ))}
            <Button variant="outlined" onClick={handleClickOpen}>
                    Open simple dialogだよー
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
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

function zeroPadding(num){
    return ('0' + num).slice(-2);
}

function cutString(str){
    return str.substr(0,8) + '...';
}

export default Example;

if (document.getElementById('top')) {
    ReactDOM.render(<Example />, document.getElementById('top'));
}
