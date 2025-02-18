import './App.css'
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import {Login} from "./pages/Login.tsx";
import {Register} from "./pages/Register.tsx";
import {Home} from "./pages/Home.tsx";

function App() {
    const isAuthenticated = useSelector((state: RootState) => state.userReducer.isAuthenticated)

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
            element: isAuthenticated ? <Home/> : <Navigate to='/login'/>
        }
    ])
    return (
        <>
            <RouterProvider router={routes}/>
        </>
    )
}

export default App
