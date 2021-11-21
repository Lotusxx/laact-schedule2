import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function Delete(props){
    const{editData}=props;

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
        <Button href="/dashboard" onClick={deletePost}>Delete</Button>
    );
}

export default Delete;