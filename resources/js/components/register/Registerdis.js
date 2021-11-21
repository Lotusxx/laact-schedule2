import React from 'react';
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
import Register from './Register';

function Registerdis(props){
    const{onClose,open,data,setFormData}=props;

    const handleClose = () =>{
        onClose();
    };

    //入力値を一時保存
    const inputChange = (e) =>{
        const key = e.target.name;
        const value = e.target.value;
        data[key] = value;
        let datas = Object.assign({},data);
        setFormData(datas);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates occasionally.
                </DialogContentText>
                <TextField margin="dense" id="sch_date" name="sch_date" label="予定日" type="text" fullWidth variant="standard" value={data.sch_date} onChange={inputChange}/>
                <InputLabel id="sch_time_label">時刻</InputLabel>
                <Select labelId="sch_hour" id="sch_hour_select" name="sch_hour" label="Hour" variant="standard" defaultValue="00" onChange={inputChange}>
                    <MenuItem value="00">00</MenuItem>
                    <MenuItem value="01">01</MenuItem><MenuItem value="02">02</MenuItem><MenuItem value="03">03</MenuItem><MenuItem value="04">04</MenuItem>
                    <MenuItem value="05">05</MenuItem><MenuItem value="06">06</MenuItem><MenuItem value="07">07</MenuItem><MenuItem value="08">08</MenuItem>
                    <MenuItem value="09">09</MenuItem><MenuItem value="10">10</MenuItem><MenuItem value="11">11</MenuItem><MenuItem value="12">12</MenuItem>
                    <MenuItem value="13">13</MenuItem><MenuItem value="14">14</MenuItem><MenuItem value="15">15</MenuItem><MenuItem value="16">16</MenuItem>
                    <MenuItem value="17">17</MenuItem><MenuItem value="18">18</MenuItem><MenuItem value="19">19</MenuItem><MenuItem value="20">20</MenuItem>
                    <MenuItem value="21">21</MenuItem><MenuItem value="22">22</MenuItem><MenuItem value="23">23</MenuItem>
                </Select>
                <Select labelId="sch_min" id="sch_min_select" name="sch_min" label="Min" variant="standard" defaultValue="00" onChange={inputChange}>
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="00">00</MenuItem>
                    <MenuItem value="01">01</MenuItem><MenuItem value="02">02</MenuItem><MenuItem value="03">03</MenuItem><MenuItem value="04">04</MenuItem>
                    <MenuItem value="05">05</MenuItem><MenuItem value="06">06</MenuItem><MenuItem value="07">07</MenuItem><MenuItem value="08">08</MenuItem>
                    <MenuItem value="09">09</MenuItem><MenuItem value="10">10</MenuItem><MenuItem value="11">11</MenuItem><MenuItem value="12">12</MenuItem>
                    <MenuItem value="13">13</MenuItem><MenuItem value="14">14</MenuItem><MenuItem value="15">15</MenuItem><MenuItem value="16">16</MenuItem>
                    <MenuItem value="17">17</MenuItem><MenuItem value="18">18</MenuItem><MenuItem value="19">19</MenuItem><MenuItem value="20">20</MenuItem>
                    <MenuItem value="21">21</MenuItem><MenuItem value="22">22</MenuItem><MenuItem value="23">23</MenuItem><MenuItem value="24">24</MenuItem>
                    <MenuItem value="25">25</MenuItem><MenuItem value="26">26</MenuItem><MenuItem value="27">27</MenuItem><MenuItem value="28">28</MenuItem>
                    <MenuItem value="29">29</MenuItem><MenuItem value="30">30</MenuItem><MenuItem value="31">31</MenuItem><MenuItem value="32">32</MenuItem>
                    <MenuItem value="33">33</MenuItem><MenuItem value="34">34</MenuItem><MenuItem value="35">35</MenuItem><MenuItem value="36">36</MenuItem>
                    <MenuItem value="37">37</MenuItem><MenuItem value="38">38</MenuItem><MenuItem value="39">39</MenuItem><MenuItem value="40">40</MenuItem>
                    <MenuItem value="41">41</MenuItem><MenuItem value="42">42</MenuItem><MenuItem value="43">43</MenuItem><MenuItem value="44">44</MenuItem>
                    <MenuItem value="45">45</MenuItem><MenuItem value="46">46</MenuItem><MenuItem value="47">47</MenuItem><MenuItem value="48">48</MenuItem>
                    <MenuItem value="49">49</MenuItem><MenuItem value="50">50</MenuItem><MenuItem value="51">51</MenuItem><MenuItem value="52">52</MenuItem>
                    <MenuItem value="53">53</MenuItem><MenuItem value="54">54</MenuItem><MenuItem value="55">55</MenuItem><MenuItem value="56">56</MenuItem>
                    <MenuItem value="57">57</MenuItem><MenuItem value="58">58</MenuItem><MenuItem value="59">59</MenuItem>
                </Select>
                <InputLabel id="sch_category_label">カテゴリー</InputLabel>
                <Select labelId="sch_category" id="sch_category_select" name="sch_category" label="Category" variant="standard" defaultValue="勉強" onChange={inputChange}>
                    <MenuItem value="勉強">勉強</MenuItem>
                    <MenuItem value="案件">案件</MenuItem>
                    <MenuItem value="テスト">テスト</MenuItem>
                </Select>
                <TextField margin="dense" id="sch_title" name="sch_title" label="タイトル" type="text" fullWidth variant="standard" onChange={inputChange}/>
                <TextField margin="dense" id="sch_contents" name="sch_contents" label="内容" type="text" fullWidth variant="standard" onChange={inputChange}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Register formData={data}　/>
            </DialogActions>
        </Dialog>
    );
}

Registerdis.propTypes = {
    onClose:PropTypes.func.isRequired,
    open:PropTypes.bool.isRequired,
};

export default Registerdis;