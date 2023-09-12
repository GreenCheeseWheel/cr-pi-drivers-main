import React from "react";
import Button from "../../Button/Button";
import './index.css'

export default function Pagination({page, setPage, maxPage, drivers, numDrivers})
{
    const handleNextPage = () => {
        setPage(prev => {
            const update = (prev*numDrivers >= drivers.length + 1 ) ? prev : prev + 1
            if(update !== prev) window.scrollTo(0, 0);
            return update;
        });
    }

    const handlePreviousPage = () => {
        setPage(prev => {
            const update = prev == 1 ? prev : prev -1
            if(update !== prev) window.scrollTo(0, 0);
            return update;
        });   
    }

    React.useEffect(() => {
        console.log("CAmbio de pagina a: " + page);
    }, [page])

    return (
        <div className="pagination-container" >
            <Button onClick={handlePreviousPage} disabled={page == 1 ? true : false} text="Previous" />
            
            {
                maxPage.map((pageEl, index) => 
                    <Button onClick={() => setPage(index+1)} disabled={page == index + 1} text={index+1}/>
                )
            }
            
            <Button onClick={handleNextPage} disabled={page >= drivers.length / numDrivers ? true : false} text="Next" />
        </div>
    );
}