import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {Login} from "./pages/Login.tsx";
import {Register} from "./pages/Register.tsx";
import {Home} from "./pages/Home.tsx";

function App() {

    const routes = createBrowserRouter([
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/register',
            element: <Register/>
        },
        {
            path: '/',
            element: <Home/>
        },
    ])
    return (
        <>
            <RouterProvider router={routes}/>
        </>
    )
}

export default App
