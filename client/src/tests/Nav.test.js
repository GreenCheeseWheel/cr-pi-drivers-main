import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Nav from "../components/Nav/Nav";
import Landing from "../components/Landing/Landing"
import Home from "../components/Home/Home"
import { Provider } from "react-redux";
import store from "../redux/store";
import "@testing-library/jest-dom"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";


describe("Nav component's tests", () => {
    it("Should be rendered alongside the unordered list", () => {
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
        let u_list = screen.getByTitle("navbar-contents");

        expect(navbar).toBeInTheDocument();
        expect(navbar).toContainElement(u_list);
    });

    it("Should not render the searchbar when route is the landing page", () => {
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

        expect(navbar.children[0].children.length).toBe(3);

    })


    it("Should render the searchbar when route is the home page", async () => {
        render(
            <Provider store={store}> 
                <BrowserRouter initialEntries={["/home"]}>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        ).rerender;

        
        expect(screen.getByTitle("link-home")).toBeInTheDocument();
    })

    


});