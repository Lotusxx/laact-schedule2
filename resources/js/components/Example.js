import React,{Fragment,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//テスト
const emails = ['username@gmail.com', 'user02@gmail.com'];

//Simpleダイアログテスト
function SimpleDialog(props){
    const{onClose,selectedValue,open,btnFunc,data,inputChange}=props;

    const handleClose = () =>{
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates occasionally.
                </DialogContentText>
                <TextField margin="dense" id="sch_date" name="sch_date" label="予定日" type="text" fullWidth variant="standard" value={data.sch_date} onChange={inputChange}/>
                <TextField margin="dense" id="sch_time" name="sch_time" label="予定時刻" type="text" fullWidth variant="standard" value={data.sch_time} onChange={inputChange}/>
                <InputLabel id="sch_category">カテゴリー</InputLabel>
                <Select labelId="sch_category" id="sch_category_select" name="sch_category" label="Category" value={data.sch_category} onChange={inputChange}>
                    <MenuItem value="勉強">勉強</MenuItem>
                    <MenuItem value="案件">案件</MenuItem>
                    <MenuItem value="テスト">テスト</MenuItem>
                </Select>
                <TextField margin="dense" id="sch_category" name="sch_category" label="カテゴリー" type="text" fullWidth variant="standard" value={data.sch_category} onChange={inputChange}/>
                <TextField margin="dense" id="sch_title" name="sch_title" label="タイトル" type="text" fullWidth variant="standard" value={data.sch_title} onChange={inputChange}/>
                <TextField margin="dense" id="sch_contents" name="sch_contents" label="内容" type="text" fullWidth variant="standard"  value={data.sch_contents} onChange={inputChange}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button href="/top" onClick={btnFunc}>Subscribe</Button>
            </DialogActions>
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

    //ダイアログのデータを一時保存する
    const [formData,setFormData] = useState({sch_category:'',sch_contents:'',sch_date:'',sch_time:'',sch_title:''});

    //入力値を一時保存
    const inputChange = (e) =>{
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({},formData);
        setFormData(data);
    }

    //ダイアログデータを登録
    const createSchedule = async() => {
        //空なら弾く
        if(formData==''){
            return;
        }
        //入力値を投げる
        await axios
            .post('/api/post/create',{
                sch_category:post.sch_category,
                sch_contents:post.sch_contents,
                sch_date:post.sch_date,
                sch_time:post.sch_time,
                sch_title:post.sch_title
            })
            .then((res)=>{
                //戻り値をtodosにセット
                const tempPosts = post
                tempPosts.push(res.data);
                setPosts(tempPosts)
                setFormData('');
            })
            .catch(error=>{
                console.log(error);
            })
    }

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
                                                row.sch_date == year + '-' + month + '-' + zeroPadding(day) && 
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
                    Open form dialogだよー
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                btnFunc={createSchedule}
                data = {formData}
                inputChange = {inputChange}
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
