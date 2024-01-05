import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../..';
import LoginFom from '../../components/LoginFom';
import { TaskItemResponse } from '../../models/response/TaskItemResponse';
import TaskService from '../../services/TaskService';
import { useParams } from 'react-router-dom';
import '../DetailsPage/DetailsPage.css'
import PushComment from '../../components/PushComment/PushComment';
import CommentInterface from '../../components/CommentInterface/CommentInterface';

const Detailspage:FC = () => {

    const {store} = useContext(Context);

    const [tasks, setTasks] = useState<TaskItemResponse[]>([]);
    const taskArr: TaskItemResponse[] = [];

    const { name, id } = useParams();

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
                if (String(task.UID) == String(id)) {
                    taskArr.push(task)
                }
            }
        })
    }

    if (store.isLoading) {
        return <div>...Загрузка</div>
    }

    console.log(taskArr);
    

    if (!store.isAuth) {
        return (
          <div>
              <LoginFom />
              <p>Пожалуйста авторизуйтесь или зарегестрируйтесь что бы начать работу</p>            
          </div>
        )
    }

    return (
        <>
          <PushComment />
          <div className='commnentInterfaceBlock'>
            <CommentInterface />
          </div>

          {taskArr.map((item, index) => {
            return (
                <div className='detAllHeaderBlock' key={index}>
                    <div className='detStatusSection' key={"detStatusSection" + index}>
                        <p key={"detStatusLabel" + index}>Статус Задачи:</p>
                        <p key={"detStatusText"}>{item.CurrentStage}</p>
                    </div>

                    <div className='detTaskName' key={"detTaskName" + index}>
                        <p key={"detTaskNameLabel" + index}>Название Задачи:</p>
                        <p key={"detTaskNameText" + index}>{item.TaskName}</p>
                    </div>

                    <div className='detDateOfComplited' key={"detDateOfComplited" + index}>
                        <p key={"detDateOfComplitedLabel" + index}>Дата Завершения: </p>
                        <p key={"detDateOfComplitedText" + index}>{
                            String(item.DateOfCompletion) == String("01.01.0001 0:00:00") ? 
                                `Статус: ${item.CurrentStage}` :
                                item.DateOfCompletion
                        }</p>
                    </div> 

                    <div className='detDateOfCreate' key={"detDateOfCreate" + index}>
                        <p key={"detDateOfCreateLabel" + index}>Дата Создания: </p>
                        <p key={"detDateOfCreateText" + index}>{item.DateOfCreation}</p>
                    </div>

                    <div className='detExecutor' key={"detExecutor" + index}>
                        <p key={"detExecutorLabel" + index}>Исполнитель: </p>
                        <p key={"detExecutorText" + index}>{item.Executor}</p>
                    </div> 

                    <div className='detInitiator' key={"detInitiator" + index}>
                        <p key={"detInitiatorLabel" + index}>Инициатор: </p>
                        <p key={"detInitiatorText" + index}>{item.Initiator}</p>
                    </div>

                    <div className='detOrganizationClient' key={"detOrganizationClient" + index}>
                        <p key={"detOrganizationClientLabel" + index}>Организация инициатора: </p>
                        <p key={"detOrganizationClientText" + index}>{item.OrganizationClient}</p>
                    </div>

                    <div className='detOrganizationExecutor' key={"detOrganizationExecutor" + index}>
                        <p key={"detOrganizationExecutorLabel" + index}>Организация Исполнителя: </p>
                        <p key={"detOrganizationExecutorText" + index}>{item.OrganizationExecutor}</p>
                    </div>

                    <div className='detPryorityTask' key={"detPryorityTask" + index}>
                        <p key={"detPryorityTaskLabel" + index}>Приоритет Задачи: </p>
                        <p key={"detPryorityTaskText" + index}>{item.Priority}</p>
                    </div>

                    <div className='detService' key={"detService" + index}>
                        <p key={"detServiceLabel" + index}>Услуга: </p>
                        <p key={"detServiceText" + index}>{item.Service}</p>
                    </div>
                </div>
            )
          })}  
        </>
    )
}

export default observer(Detailspage)