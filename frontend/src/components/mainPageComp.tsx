import { useEffect, useState } from "react";
import { Tablet } from "./tabletInterface";
import { MainMenu } from "./menuComp";
import { Card } from "./cardComp";
import { fetchProtected } from '../api';
import { useNavigate } from 'react-router-dom';



export function MainPage() {
    const [tablets, setTablets] = useState<Tablet[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errorServer, setErrorServer] = useState("");

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    
    
     const addToCart = async (tabletId: string) =>
    {
        const tablet = await fetch(`http://localhost:3000/tablets/${tabletId}`)
        .then((res) => {
            if (res.status === 404) {
                setErrorServer("Resource not found (404)");
            }
            if (!res.ok) {
                setErrorServer(`Server responded with status ${res.status}`);
            }
            return res.json();
        })

        console.log(JSON.stringify(tablet))


        const newTablet = {
            title: tablet.title ,
            op_sys: tablet.op_sys,
            cpu_hz: tablet.cpu_hz,
            cpu_cores: tablet.cpu_cores,
            screen_size: tablet.screen_size,
            screen_res: tablet.screen_res,
            ram: tablet.ram,
            description: tablet.description,
            price: tablet.price
        }

        console.log("asdsadadadsd")
        console.log(JSON.stringify(newTablet))


        try {
            const response = await fetch('http://localhost:3000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(newTablet)
            })
          
            if (!response.ok) {
                const errorData = await response.json();
              
                throw new Error(`Hiba történt: ${response.status}`)
            }
        }
        catch(e: any)
        {
            console.log(e.message)
        }
        finally{

        }
    }



    useEffect(() => {

        console.log("test2")
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
           


    }, [navigate])


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

                <p>{message}</p>
                <div className="row">
                    {tablets.map((t) => (
                        <div className="col-sm-4" >{Card(t)}  <button className="btn btn-primary" onClick = {()=> addToCart(t.id.toString())}    >Add to cart</button></div>
                      
                    ))}
                </div>


            </div>




        </>
    )




}