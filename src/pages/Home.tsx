import React from "react";
import {Button} from "../components/ui/Button.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";
import {logOUtUser} from "../reducers/User-slice.ts";

export const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <>
            <h2>HomePage</h2>
            <Button onClick={()=>dispatch(logOUtUser())}>Logout</Button>
        </>
    );
};