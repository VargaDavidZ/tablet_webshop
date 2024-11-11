import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainMenu } from './components/menuComp.tsx';
import { MainPage } from './components/mainPageComp.tsx';
import { TabletDetail } from './components/tabletDetailComp.tsx';
import NewTablet from './components/newTabletComp.tsx';
import DeleteTablet from './components/deleteTabletComp.tsx';
import TopListed from './components/topListed.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <TopListed />,
  },
  {
    path: "/tablets",
    element: <MainPage />,
  },  
  {
    path: "/addtablet",
    element: <NewTablet />,
  },
  {
    path: "/deletetablet",
    element: <DeleteTablet />,
  },
  {
    path:"/tablets/:tabletId",
    element: <TabletDetail/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)
