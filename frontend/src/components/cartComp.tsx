import { useEffect, useState } from "react";
import { Tablet } from "./tabletInterface";
import { Card } from "./cardComp";




export function Cart() {

    const [items, setItems] = useState<Tablet[]>([]);


   


    useEffect(() => {
        fetch("http://localhost:3000/cart")
            .then((res) => {
                if (res.status === 400) {
                    console.log("Not found")
                }
                if (!res.ok) {
                    console.log("Server error")
                }
                return res.json();
            })
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                console.log("Server error")
            })
    }, [])


    return (<>

        <div className="container">
            <>
                <div className="container row">
                    {
                        items.map((t) =>(
                            <div className="col-sm-4"> {Card(t)} </div>
                        ))
                    }
                </div>
            </>
        </div>


    </>
    )



}