import React from "react";
import ShowDrivers from "../ShowDrivers/ShowDrivers";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions";

export default function Home()
{
    const [page, setPage] = React.useState(1) 
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams);

    React.useEffect(() => {
        dispatch(getTeams());
    }, []);

    return (
        <ShowDrivers page={page} setPage={setPage} teams={teams} />
    )
}