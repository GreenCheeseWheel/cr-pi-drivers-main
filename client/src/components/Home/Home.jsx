import React from "react";
import ShowDrivers from "../ShowDrivers/ShowDrivers";

export default function Home()
{
    const [page, setPage] = React.useState(1) 
   
    return (
        <ShowDrivers page={page} setPage={setPage} />
    )
}