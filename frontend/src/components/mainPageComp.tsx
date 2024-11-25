import { useEffect, useState } from "react";
import { Tablet } from "./tabletInterface";
import { MainMenu } from "./menuComp";
import { Card } from "./cardComp";



export function MainPage() {
    const [tablets, setTablets] = useState<Tablet[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errorServer, setErrorServer] = useState("");




    useEffect(() => {
        fetch('http://localhost:3000/tablets')
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

    console.log(tablets.length)

    return (
        <>
            <div className="container mainBody">
                <MainMenu></MainMenu>


                <div className="row">
                    {tablets.map((t) => (
                        <div className="col-sm-4" >{Card(t)}</div>

                    ))}
                </div>


            </div>




        </>
    )




}