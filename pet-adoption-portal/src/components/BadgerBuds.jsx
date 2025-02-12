import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import BadgerBudsNavbar from "./nav/BadgerBudsNavbar";
import BadgerBudsDataContext from "../contexts/BadgerBudsDataContext";

export default function BadgerBuds() {
    const [buds, setBuds] = useState([]);

    useEffect(() => {
        fetch('https://cs571api.cs.wisc.edu/rest/f24/hw5/buds', {
            headers: {
                "X-CS571-ID": "bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a"
            }
        })
            .then(res => res.json())
            .then(cats => {
                setBuds(cats)
            })
    }, []);

    console.log(buds)

    return (
        <BadgerBudsDataContext.Provider value={buds}>
            <div>
                <BadgerBudsNavbar />
                <div style={{ margin: "1rem" }}>
                    <Outlet />
                </div>
            </div>
        </BadgerBudsDataContext.Provider>
    );
}