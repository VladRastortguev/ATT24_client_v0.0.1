import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../..';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';
import LoginFom from '../../components/LoginFom';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { log } from 'console';
import { UserItilResponse } from '../../models/response/UserItilResponse';
import UserItilService from '../../services/UserItilService';
import '../Homepage/Homepage.css'
import axios from 'axios';
import { API_TASKS } from '../../http';
import img from '../../image/АТТ_logo.svg'


const Homepage:FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([]);
    const [usersitil, setUsersItil] = useState<UserItilResponse[]>([]);
    const itilArr: UserItilResponse[] = [];
    const navigate = useNavigate();
    const [showNavbar, setShowNavbar] = useState(false)
  
    useEffect(() => {
      if (localStorage.getItem('token')) {
        store.checkAuth()
      }
    }, [])
    
    useEffect(() => {
      getUsers()
    }, [])

    useEffect(() => {
      getUsersItil()
    }, [])

    getEmailUser()
  
    async function getUsers() {
      try{
        const response = await UserService.fetchUsers();
        setUsers(response.data);
      } catch (e) {
        console.log(e);
      }
    }

    async function getUsersItil() {
      try{
        const response = await axios.get(`${API_TASKS}/usersitil`, {
          auth: {
            username: "Vlad",
            password: "123"
          }
        });
        setUsersItil(response.data);
      } catch (e) {
        console.log(e);
      }
    }

    async function getEmailUser() {
      const userEmail = store.user.email;

      usersitil.map((user) => {
        if (String(user.ОсновнойEmail) == String(userEmail)) {
          itilArr.push(user);
        }
      })
    }

    if (store.isLoading) {
      return <div>...Загрузка</div>
    }
  
    if (!store.isAuth) {      

      return (
        <div className='regLogAllHead'>
          <LoginFom />
        </div>
      )
    }
  
    return (
    <div className='homeHeaderBlock'>
        <header className='header'>
          <a className='navbarshow' onClick={() => setShowNavbar(true)}>
            <div></div>
            <div></div>
            <div></div>
          </a>

          <img src={img} alt="" width="50" height="50" className='logosvg'/>
        </header>

        <section className='newsBlock'>
          <div className='informationBlock'>
            <div className='newsItem'>
              <ul className='namePublishNews'>
                <li>Оксана Хан (Приходько)</li>
                <li>Ольга Бирюкова</li>
                <li>Махамаджан Юсупов</li>
                <li>Иброим Юсупов</li>
                <li>И еще 20 получателей</li>
              </ul>

              <p className='dataTextNews'>22 декабря 13:26</p>

              <div className='newsItemtext'>
                  <h4>Корпоративный Новый год 2023_рассадка</h4>
                  <p>Добрый день, дорогие друзья! <br />
                     Напоминаем, в понедельник 25 декабря в ресторане Версаль состоится новогоднее корпоративное шоу Премия Грэмми. <br />
                     Ждем вас в 18-00 по адресу с.Лебединовка. пр.Победы, 323 <br />
                     Хорошее настроение, соревновательный дух и позитивный настрой берем с собой! <br />
                     <p></p>
                    Во вложении рассадка по столам в ресторане. <br />
                    Просьба ознакомиться заранее, на входе в зал будут размещены списки. <br />
                     <p></p>
                     Хорошего дня!</p>
              </div>
            </div>

            <div className='newsItem'>
              <ul className='namePublishNews'>
                <li>Оксана Хан (Приходько)</li>
                <li>Ольга Бирюкова</li>
                <li>Махамаджан Юсупов</li>
                <li>Иброим Юсупов</li>
                <li>И еще 20 получателей</li>
              </ul>

              <p className='dataTextNews'>22 декабря 13:26</p>

              <div className='newsItemtext'>
                  <h4>Корпоративный Новый год 2022_рассадка</h4>
                  <p>Добрый день, дорогие друзья! <br />
                     Напоминаем, в понедельник 25 декабря в ресторане Версаль состоится новогоднее корпоративное шоу Премия Грэмми. <br />
                     Ждем вас в 18-00 по адресу с.Лебединовка. пр.Победы, 323 <br />
                     Хорошее настроение, соревновательный дух и позитивный настрой берем с собой! <br />
                     <p></p>
                    Во вложении рассадка по столам в ресторане. <br />
                    Просьба ознакомиться заранее, на входе в зал будут размещены списки. <br />
                     <p></p>
                     Хорошего дня!</p>
              </div>
            </div>
            
          </div>

          

          <div className='commentNewsBlock'>
          <div className='newsItem'>
              <ul className='namePublishNews'>
                <li>Оксана Хан (Приходько)</li>
                <li>Ольга Бирюкова</li>
                <li>Махамаджан Юсупов</li>
                <li>Иброим Юсупов</li>
                <li>И еще 20 получателей</li>
              </ul>

              <p className='dataTextNews'>22 декабря 13:26</p>

              <div className='newsItemtext'>
                  <h4>Корпоративный Новый год 2021_рассадка</h4>
                  <p>Добрый день, дорогие друзья! <br />
                     Напоминаем, в понедельник 25 декабря в ресторане Версаль состоится новогоднее корпоративное шоу Премия Грэмми. <br />
                     Ждем вас в 18-00 по адресу с.Лебединовка. пр.Победы, 323 <br />
                     Хорошее настроение, соревновательный дух и позитивный настрой берем с собой! <br />
                     <p></p>
                    Во вложении рассадка по столам в ресторане. <br />
                    Просьба ознакомиться заранее, на входе в зал будут размещены списки. <br />
                     <p></p>
                     Хорошего дня!</p>
              </div>
            </div>

            <div className='newsItem'>
              <ul className='namePublishNews'>
                <li>Оксана Хан (Приходько)</li>
                <li>Ольга Бирюкова</li>
                <li>Махамаджан Юсупов</li>
                <li>Иброим Юсупов</li>
                <li>И еще 20 получателей</li>
              </ul>

              <p className='dataTextNews'>22 декабря 13:26</p>

              <div className='newsItemtext'>
                  <h4>Корпоративный Новый год 2020_рассадка</h4>
                  <p>Добрый день, дорогие друзья! <br />
                     Напоминаем, в понедельник 25 декабря в ресторане Версаль состоится новогоднее корпоративное шоу Премия Грэмми. <br />
                     Ждем вас в 18-00 по адресу с.Лебединовка. пр.Победы, 323 <br />
                     Хорошее настроение, соревновательный дух и позитивный настрой берем с собой! <br />
                     <p></p>
                    Во вложении рассадка по столам в ресторане. <br />
                    Просьба ознакомиться заранее, на входе в зал будут размещены списки. <br />
                     <p></p>
                     Хорошего дня!</p>
              </div>
            </div>
          </div>
        </section>
        
        <div className={showNavbar ? "showNavbarBlock" : "unShowNavbarBlock"}>
          <div className='navbarContainer'>
            <button className='closeNavbar' onClick={() => setShowNavbar(false)}>X</button>

            <ul className='navbarList'>
              <li>
                <button className='taskListbtn' onClick={() => navigate(`/mytask/${itilArr[0].Наименование}`)}>Посмотреть мои задачи</button>
              </li>
            </ul>

            <button className='logoutBtn' onClick={() => store.logout()}>Выйти</button>
            
          </div>
        </div>
    </div>
  )
}

export default observer(Homepage)