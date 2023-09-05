import React from "react";
import {render, screen} from "@testing-library/react";
import Nav from "../components/Nav/Nav";
import Landing from "../components/Landing/Landing"
import { Provider } from "react-redux";
import store from "../redux/store";
import "@testing-library/jest-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom";


describe("Nav component's tests", () => {
    it("Should be rendered", () => {
        render(
            <Provider store={store}> 
                <BrowserRouter>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        );
        let navbar = screen.getByTitle("navbar");
        expect(navbar).toBeInTheDocument();
    });
});