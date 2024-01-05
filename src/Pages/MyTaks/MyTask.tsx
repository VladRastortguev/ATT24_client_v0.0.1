import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import { TaskItemResponse } from '../../models/response/TaskItemResponse';
// import TaskService from '../../services/TaskService';
import LoginFom from '../../components/LoginFom';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import TaskService from '../../services/TaskService';
import UserService from '../../services/UserService';
import $api, { API_TASKS } from '../../http';
import { useNavigate, useParams } from 'react-router-dom';
import CreateTaskModal from '../../modal/CreateTaskModal/CreateTaskModal';
import '../MyTaks/MyTask.css'

const MyTask = () => {
    const [taskName, setTaskName] = useState("");
    const [detailsTaskName, setDetailsTaskName] = useState(""); 
    const [organization, setOrganization] = useState("");
    const [service, setService] = useState("");
    const [priority, setPriority] = useState("");


    const [tasks, setTasks] = useState<TaskItemResponse[]>([]);
    const {store} = useContext(Context);
    const [createTask, setCreateTask] = useState(false);
    const taskArr: TaskItemResponse[] = [];

    const navigate = useNavigate();

    const { name } = useParams();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    useEffect(() => {
        getTasks();       
    }, [])

    getFilteredTask(); 

    async function getTasks() {
        try {
            const response = await TaskService.fetchTasks();
            setTasks(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    async function getFilteredTask() {
        tasks.map(task => {
            if (String(task.Initiator) == String(name)) {
                taskArr.push(task)
            }
        })
    }

    async function getCreatedTask() {
        let taskObj = [ 
            {
                Наименование: taskName,
                Описание: detailsTaskName,
                Организация: organization,
                Услуга: service,
                Приоритет: priority,
                Инициатор: name
            }   
        ]    

        const res = await axios.post(`${API_TASKS}/tasks`, taskObj, {
            auth: {
                username: "Vlad",
                password: "123"
            }
        })

        setTaskName("")
        setDetailsTaskName("")
        setOrganization("")
        setService("")
        setPriority("")
        setCreateTask(false)

        alert("Задача создана")


        // const res = await axios.post(`${API_TASKS}/tasks`, , {
        //     auth: {
        //         username: "Vlad",
        //         password: "123"
        //     }
        // })
    }

    if (store.isLoading) {
        return <div>...Загрузка</div>
    }

    if (!store.isAuth) {
        return (
          <div>
              <LoginFom />
              <p>Пожалуйста авторизуйтесь или зарегестрируйтесь что бы начать работу</p>            
          </div>
        )
    }

    return (
        <div className='myTaskHeader'>
            <div className='taskInitiatorBlock'>
                <ul className='tableHeader' key={"tableHeader"}>
                    <li className='numberTextlable' key={"numberTextlable"}>№</li>
                    <li className='taskNameTextlable' key={"taskNameTextlable"}>Задача</li>
                    <li className='dateTextlable' key={"dateTextlable"}>Дата создания</li>
                    <li className='initiatorTextlable' key={"initiatorTextlable"}>Инициатор</li>
                    <li className='statusTextlable' key={"statusTextlable"}>Статус</li>
                </ul>
                {taskArr.map((task, index) => {
                    return (
                        <ul key={index}  onClick={() => navigate(`/mytask/${name}/details/${task.UID}`)} className='taskElement'>                                    
                            <li key={"numberText" + index}>{index + 1}</li>
                            <li key={"taskNameText" + index}>{task.TaskName}</li>
                            <li key={"dateText" + index}>{task.DateOfCreation}</li>
                            <li key={"initiatorText" + index}>{task.Initiator}</li>
                            <li key={"statusText" + index}>{task.CurrentStage != "" ? task.CurrentStage : "Согласование"}</li>
                        </ul>
                    )
                })}

                <div className='buttonBlock'>                    
                    <div className='clientTask'>
                        <p>Общие количество задач: {tasks.length}</p>
                        <p>Количество ваших задач: {taskArr.length}</p>
                    </div>

                    <button onClick={() => setCreateTask(true)}>Создать Задачу</button>
                </div>

                {createTask ? (
                    <div className='headerCreateTaskModal'>
                        <div className='modalCreateContainer'>
                            <div className='taskNameSection'>
                                <p>Название Задачи: </p>
                                <input type="text" value={taskName} placeholder='Название новой задачи' onChange={(e) => setTaskName(e.target.value)}/>
                            </div>

                            <div className='detailsTaskNameSection'>
                                <p>Подробное описание:</p>
                                <textarea name="detailsTaskNameArea" id="detailsTaskNameArea" value={detailsTaskName} placeholder='Введите подробное описание задачи' onChange={(e) => setDetailsTaskName(e.target.value)} rows={3}></textarea>
                            </div>  

                            <div className='organizationSection'>
                                <p>Выберите вашу организацию</p>
                                <select name="organizationArea" id="organizationArea" value={organization} placeholder='Ваша организация' onChange={(e) => setOrganization(e.target.value)}>
                                    <option value=""></option>
                                    <option value="АТТ">АТТ</option>
                                    <option value="Джи Моторс">Джи Моторс</option>
                                    <option value="ДТ Техник">ДТ Техник</option>
                                    <option value="КИА Моторс">КИА Моторс</option>
                                    <option value="КИА Моторс">КИА Моторс</option>
                                    <option value="ОДА БАКР">ОДА БАКР</option>
                                    <option value="Проф-Перспектива">Проф-Перспектива</option>
                                    <option value="Тойота Центр">Тойота Центр</option>
                                    <option value="Форвард Трейд">Форвард Трейд</option>
                                    <option value="Эстокада">Эстокада</option>
                                </select>
                            </div>

                            <div className='serviceSection'>
                                <p>Выберите услугу:</p>
                                <select name="ServiceArea" id="ServiceArea" value={service} placeholder='Выберите услугу' onChange={(e) => setService(e.target.value)}>
                                    <option value=""></option>
                                    <option value="Настройки">Настройки</option>
                                    <option value="Обслуживание">Обслуживание</option>
                                    <option value="Типовые Задачи">Типовые Задачи</option>
                                    <option value="Доработка/Разработка">Доработка/Разработка</option>
                                    <option value="Задачи ФинОтдела/Бухгалтерии 1С">Задачи ФинОтдела/Бухгалтерии 1С</option>
                                    <option value="Задачи it">Задачи it</option>
                                </select>
                            </div>

                            <div className='prioritySection'>
                                <p>Приоритет задачи:</p>
                                <select name="priorityArea" id="priorityArea" value={priority} placeholder='Выберите приоритет задачи' onChange={(e) => setPriority(e.target.value)}>
                                    <option value=""></option>
                                    <option value="Низкий">Низкий</option>
                                    <option value="Средний">Средний</option>
                                    <option value="Высокий">Высокий</option>
                                </select>
                            </div>

                            <button className='createBtn' onClick={() => getCreatedTask()}>Создать задачу</button>
                            <button className='closeBtn' onClick={() => setCreateTask(false)}>Закрыть</button>
                        </div>
                    </div>  
                ) : (null)}
            </div>
        </div>
    )
}

export default observer(MyTask)