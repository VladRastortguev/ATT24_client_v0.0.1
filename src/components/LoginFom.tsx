import React, {FC, useContext, useState} from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import '../components/LoginFom.css'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    return (
        <div className='regSection'>
            <div className="regTextSection">
                <h3>Вход</h3>
                <p className='firstP'>Введите ваш логин или пароль</p>
                <p className='secondP'>Или пройдите регистрацию</p>
            </div>

            <div className='emSec'>
                <p>Email </p>
                <input
                    onChange={e => setEmail(e.target.value)} 
                    value={email}
                    type="text" 
                    placeholder='email'
                    className='emailInp'
                /> 
            </div>

            <div className='passSec'>
                <p>Пароль </p>
                <input 
                    onChange={e => setPassword(e.target.value)} 
                    value={password}                
                    type="password" 
                    placeholder='password'
                    className='passwordInp'
                />
            </div>

            <div className='regButtonSection'>
                <button className ='loginRegBtn' onClick={() => store.login(email, password)}>Логин</button>
                <button className ='registrationRegBtn' onClick={() => store.registration(email, password)}>Регистрация</button>
            </div>
        </div>
    )
}

export default observer(LoginForm);