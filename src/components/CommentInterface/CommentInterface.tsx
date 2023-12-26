import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_TASKS } from '../../http';
import { IData } from './IData';
import '../CommentInterface/CommentInterface.css'
import { observer } from 'mobx-react-lite';

const CommentInterface:FC = () => {
    const { id, name } = useParams();
    const [commentArr, setCommentArr] = useState<IData[]>([]);

    useEffect(() => {
        getComment()
    }, [])

    async function getComment() {
        try {
            const res = await axios.get(`${API_TASKS}/comment/${id}`, {
                auth: {
                    username: "Vlad",
                    password: "123"
                }
            })

            setCommentArr(res.data);
        } catch (e) {
            console.log(e);
        }
    }
  
    return (
        <>
            {commentArr.map((item, index) => {
                return (
                    <div key={index} className={name == item.Имя ? "ourComment" : "notOurComment"}>
                        <p className='comName' key={index + "name"}>{item.Имя}:</p>
                        <p className='comText' key={index + "text"}>{item.Текст}</p>
                        <p className='comDate' key={index + "date"}>{item.Дата}</p>
                    </div>
                )
            })}
        </>
    )
}

export default observer(CommentInterface)