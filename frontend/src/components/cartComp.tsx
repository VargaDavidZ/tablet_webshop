import { useEffect, useState } from "react";
import { Tablet } from "./tabletInterface";
import { Card } from "./cardComp";
import { MainMenu } from "./menuComp";




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


    async function clearCart() {
        try{
            const response = await fetch('http://localhost:3000/cart/',{
                method: "DELETE"
            })
            if(!response.ok)
            {
               console.log("resource not found")
            }
            setItems([])

        }
        catch(err){
            alert("Hiba" + err)
        }
    }


    async function removeItemFromCart(tabletId:string) {
        let answer = confirm("Are you sure you want to delete the tablet?")

        if(answer)
        {
        try{
            const response = await fetch('http://localhost:3000/cart/' + tabletId, {
                method: "DELETE"
            })
            if(!response.ok)
            {
                console.log("Resource not found (404)")
            }
            setItems(items.filter((p)=> p.id !== parseInt(tabletId)  ))
        }
        catch(err){
            alert("Hiba" + err)
        }
    }
    }

  

    return (<>

        <div className="container mainBody">
           
            <>
            <MainMenu></MainMenu>
            <button onClick={() =>clearCart()} className="btn btn-danger" >Kosár ürítése</button>
                <div className="container row">
                    {
                        items.map((t) =>(
                            <div className="col-sm-4"> {Card(t)} <button onClick={() => removeItemFromCart(t.id.toString())}   className="btn btn-danger"  >Eltávolítás a kosárból</button>    </div>
                        ))
                    }
                </div>
            </>
        </div>


    </>
    )



}