import React,{Fragment,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Example(){
    const [year,setYear] = useState(new Date().getFullYear())
    const [month,setMonth] = useState(new Date().getMonth()+1)

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

    return (
        <Fragment>
            <h1>{`${year}年${month}月`}</h1>
            <div className="calender-nav">
                <button onClick={onClick(-1)}>{'<先月'}</button>
                <button onClick={onClick(1)}>{'翌月>'}</button>
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
                                <th key={`${i}${j}`} className={thisyear == year && thismonth == month && nowday == day && 'today'}>
                                    {day}
                                    {rows.map((row, index) => (
                                        <p key={index}>
                                        {row.sch_date == year + '-' + month + '-' + zeroPadding(day) && '〇' }
                                        </p>
                                    ))}   
                                </th>
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
        </Fragment>
    );
}

function createCalendear(year,month){
    const first = new Date(year,month - 1,1).getDay()
    const last = new Date(year,month,0).getDate()

    return [0,1,2,3,4,5].map((weekIndex) => {
        return [0,1,2,3,4,5,6].map((dayIndex) => {
            const day = dayIndex + 1 + weekIndex * 7
            return day - 1 < first || last < day - first ? null : day - first
        })
    })
}

function zeroPadding(num){
    return ('0' + num).slice(-2);
}

export default Example;

if (document.getElementById('top')) {
    ReactDOM.render(<Example />, document.getElementById('top'));
}
