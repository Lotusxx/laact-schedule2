import React,{Fragment,useState} from 'react';
import ReactDOM from 'react-dom';

function Example(){
    const [year,setYear] = useState(new Date().getFullYear())

    const [month,setMonth] = useState(new Date().getMonth()+1)

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

    return (
        <Fragment>
            <h1>{`${year}年${month}月`}</h1>
            <div>
                <button onClick={onClick(-1)}>{'prev'}</button>
                <button onClick={onClick(1)}>{'next'}</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week,i) => (
                        <tr key={week.join('')}>
                            {week.map((day,j) => (
                                <th key={`${i}${j}`}>{day}</th>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default Example;

if (document.getElementById('top')) {
    ReactDOM.render(<Example />, document.getElementById('top'));
}
