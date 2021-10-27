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
import { Panorama } from '@mui/icons-material';

//Simpleダイアログテスト
function SimpleDialog(props){
    const{onClose,open,btnFunc,data,inputChange}=props;

    const handleClose = () =>{
        onClose();
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
                <Select labelId="sch_category" id="sch_category_select" name="sch_category" label="Category" variant="standard"  value={data.sch_category} onChange={inputChange}>
                    <MenuItem value="勉強">勉強</MenuItem>
                    <MenuItem value="案件">案件</MenuItem>
                    <MenuItem value="テスト">テスト</MenuItem>
                </Select>
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
};

//Editダイアログ
function EditDialog(props){
    const{onClose,open,btnFunc,data,inputChange,onDelete}=props;

    const handleClose = () =>{
        onClose();
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
                <Select labelId="sch_category" id="sch_category_select" name="sch_category" label="Category" variant="standard"  value={data.sch_category} onChange={inputChange}>
                    <MenuItem value="勉強">勉強</MenuItem>
                    <MenuItem value="案件">案件</MenuItem>
                    <MenuItem value="テスト">テスト</MenuItem>
                </Select>
                <TextField margin="dense" id="sch_title" name="sch_title" label="タイトル" type="text" fullWidth variant="standard" value={data.sch_title} onChange={inputChange}/>
                <TextField margin="dense" id="sch_contents" name="sch_contents" label="内容" type="text" fullWidth variant="standard"  value={data.sch_contents} onChange={inputChange}/>
            </DialogContent>
            <DialogActions>
                <Button href="/top" onClick={onDelete}>Delete</Button>
                <Button onClick={handleClose}>Cancel</Button>
                <Button href="/top" onClick={btnFunc}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}

EditDialog.propTypes = {
    onClose:PropTypes.func.isRequired,
    open:PropTypes.bool.isRequired,
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
            sch_id:post.id,
            sch_category:post.sch_category,
            sch_contents:post.sch_contents,
            sch_date:post.sch_date,
            sch_time:post.sch_time,
            sch_title:post.sch_title
        })
    );

    //ダイアログテスト、ここから
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
            .post('/api/posts/create',{
                sch_category:formData.sch_category,
                sch_contents:formData.sch_contents,
                sch_date:formData.sch_date,
                sch_time:formData.sch_time,
                sch_title:formData.sch_title
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

    //更新用ダイアログテスト、ここから
    const[editopen,setEditOpen] = useState(false);

    const editHandleClickOpen = (e) =>{
        e.stopPropagation();
        setEditOpen(true);
        getEditData(e);
    };

    const editHandleClose = () =>{
        setEditOpen(false);
    };

    //バックエンドからデータ一覧を取得
    function getEditData(e){
        axios
            .post('/api/edit', {
                id: e.currentTarget.id
            })
            .then(res => {
                setEditData(res.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    //更新用のデータ配列
    const [editData,setEditData] = useState({id:'',sch_category:'',sch_contents:'',sch_date:'',sch_time:'',sch_title:''});

    //更新処理
    function updateSchedule(){
        //空なら弾く
        if(editData==''){
            return;
        }
        //入力値を投げる
        axios
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
    //値を変更したら登録する
    function editChange(e){
        const key = e.target.name;
        const value = e.target.value;
        editData[key] = value;
        let data = Object.assign({},editData);
        setEditData(data);
    }

    //削除処理
    const deletePost = async(post) =>{
        await axios
            .post('api/delete',{
                id:editData.id
            })
            .then((res)=>{
                this.setState({
                    posts:res.posts
                });
            })
            .catch(error=>{
                console.log(error);
            });
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
                                <td key={`${i}${j}`} id={day} className={thisyear == year && thismonth == month && nowday == day && 'today'}  onClick={handleClickOpen}>
                                    <div>
                                        <div className={day <= 0 || day > last ? 'nschedule-date':'schedule-date'}>
                                            {day > last ? day - last : day <= 0 ? prevlast + day : day}
                                        </div>
                                        <div className="schedule-area"> 
                                            {scheduleDisplay(rows,year,month,day,editHandleClickOpen)}
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <SimpleDialog
                open={open}
                onClose={handleClose}
                btnFunc={createSchedule}
                data = {formData}
                inputChange = {inputChange}
            />
            <EditDialog
                open={editopen}
                onClose={editHandleClose}
                btnFunc={updateSchedule}
                data = {editData}
                inputChange = {editChange}
                onDelete = {deletePost}
            />
        </Fragment>
    );
}

function scheduleDisplay(rows,year,month,day,editHandleClickOpen){
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
            items.push(<div className='schedule-title' onClick={editHandleClickOpen} id={rows[i].sch_id}>{cutString(rows[i].sch_title)}</div>);
            schenum++
        }else if(schenum == 3){
            items.push(<div>+{totalschenum-3}more</div>)
            schenum++
        }
    }
    schenum = 0;
    return items;
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
