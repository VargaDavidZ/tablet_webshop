import { useEffect, useState } from "react";
import { Tablet } from "./tabletInterface";
import { MainMenu } from "./menuComp";
import { Card } from "./cardComp";


export default function DeleteTablet(){

    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errorServer,setErrorServer] = useState("");

    const handleDeletePost = async (tabletId: string) =>{
        let answer = confirm("Are you sure you want to delete the tablet?")

        if(answer)
        {
        try{
            const response = await fetch('http://localhost:3000/tablets/' + tabletId, {
                method: "DELETE"
            })
            if(!response.ok)
            {
                setErrorServer("Resource not found (404)")
            }
            setTablets(tablets.filter((p)=> p.id !== parseInt(tabletId)  ))
        }
        catch(err){
            alert("Hiba" + err)
        }
    }
    }
    
    useEffect(() => {

        fetch('http://localhost:3000/tablets')
            .then((response) => {
                if (response.status === 404) {
                    setErrorServer("Resource not found (404)")
                    //throw new Error('Resource not found (404)');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`)
                    //throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);


    


    return <>
        <div className="container mainBody">
                <MainMenu></MainMenu>

                <div className="container row" >
                    {tablets.map((t) => (
                        <div className="col-sm-4" >{Card(t)}<button className="btn btn-primary" style={{width:"100%"}}  onClick = {()=> handleDeletePost(t.id.toString())} >Törlés</button> </div>
                        

                    ))}

                </div>

            </div>

    </>
}