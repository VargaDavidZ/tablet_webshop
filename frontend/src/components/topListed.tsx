import { useEffect, useState } from "react";
import { Tablet } from "./tabletInterface";
import { MainMenu } from "./menuComp";
import { Card } from "./cardComp";
import Cheapest from "./cheapestComp";
import MostExpensive from "./mostExpensiveComp";

export default function TopListed()
{
    const [tablets, setTablets] = useState<Tablet[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errorServer, setErrorServer] = useState("");




    useEffect(() => {
        fetch('http://localhost:3000/mostexpensive')
            .then((res) => {
                if (res.status === 404) {
                    setErrorServer("Resource not found (404)");
                }
                if (!res.ok) {
                    setErrorServer(`Server responded with status ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {

                setTablets(data);
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false)
            })

    }, [])


    if (errorServer) {
        return <p>Hiba történt a szerver oldalon</p>
    }

    if (loading) {
        return <p>Loading</p>
    }
    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <>
            <div className="container mainBody">
                <MainMenu></MainMenu>

                    <MostExpensive></MostExpensive>
                    <Cheapest></Cheapest>
                   
                </div>

    


        </>
    )





}