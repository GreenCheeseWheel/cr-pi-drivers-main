import React from 'react';
import svgImage from "../../assets/F1_car.svg"
import './index.css'

export default function Landing()
{
    return (
        <section>
            <article id="banner">
                <h1>Welcome to the F1 Driver Wiki!</h1>
                <p>The website to perform full CRUD operations on your favourite drivers of all time</p>
                <div id='banner-image-container'></div>
            </article>
        </section>
    );
}