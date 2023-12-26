import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import '../PushComment/PushComment.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { API_TASKS } from '../../http'
import CommentInterface from '../CommentInterface/CommentInterface'
import { render } from '@testing-library/react'

const PushComment:FC = () => {
    const { name, id } = useParams()

    const [commentInp, setCommentInp] = useState("")

    async function pushComment() {
        try {
            let obj = [
                {
                    "Имя": name,
                    "Текст": commentInp
                }
            ]

            const res = await axios.post(`${API_TASKS}/comment/${id}`, obj, {
                auth: {
                    username: "Vlad",
                    password: "123"
                }
            })

            console.log(res);

            setCommentInp("")

            render(<CommentInterface />)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='headerCommentBlock'>
            <textarea name="" id="" cols={130} rows={4}value={commentInp} onChange={(e) => setCommentInp(e.target.value)}></textarea>
            <button onClick={() => pushComment()}>Отправить</button>
        </div>
  )
}

export default observer(PushComment)