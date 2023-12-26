import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Homepage from '../Pages/Homepage/Homepage'
import MyTask from '../Pages/MyTaks/MyTask';
import Detailspage from '../Pages/DetailsPage/Detailspage';


const MainRoutes = () => {
    const PUBLIC_ROUTES = [
        {link: "/", element: <Homepage/>, id: 1},
        {link: "/mytask/:name", element: <MyTask/>, id: 2},
        {link: "/mytask/:name/details/:id", element: <Detailspage/>, id: 1},
        {link: "/", element: <Homepage/>, id: 1},
        {link: "/", element: <Homepage/>, id: 1},
        {link: "/", element: <Homepage/>, id: 1},
        {link: "/", element: <Homepage/>, id: 1},
        {link: "/", element: <Homepage/>, id: 1},
    ];

    return(
        <Routes>
            {PUBLIC_ROUTES.map(item => (
                <Route path={item.link} element={item.element} key={item.id} />
            ))}
        </Routes>
    )
}

export default MainRoutes;