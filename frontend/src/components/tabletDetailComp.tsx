import { useEffect, useState } from "react";
import { Tablet } from "./tabletInterface";
import { MainMenu } from "./menuComp";
import { Card } from "./cardComp";
import { useParams } from "react-router-dom";



export function TabletDetail() {
    const [tablets, setTablets] = useState<Tablet>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errorServer, setErrorServer] = useState("");
    const { tabletId } = useParams<{ tabletId: string }>();



    useEffect(() => {
        fetch(`http://localhost:3000/tablets/${tabletId}`)
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
        console.log("asdasdads")
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
            <div className="container">
                <MainMenu></MainMenu>



                {tablets ? (
                    <div className="container text-center" >
                        {Card(tablets)}

                    </div>
                ) : (
                    <p>No tablet data avaiable</p>
                )}


            </div>


        </>
    )




}