
import { Tablet } from "./tabletInterface";
import 'bootstrap/dist/css/bootstrap.min.css'

export function Card(props: Tablet) {


   
    
    return (
        <>
            <div className="card my-3" style={{width:"100%"}} >
                    <div className="card-body row">
                    <h5 className="card-title text-center">{props.title}</h5>

                    <div className="col-sm-6" >
                        <p className="card-text"> Operating System: </p>
                        <p className="card-text"> CPU Refreshrate: </p>
                        <p className="card-text"> CPU Cores: </p>
                        <p className="card-text"> Screen Size: </p>
                        <p className="card-text"> Screen resolution: </p>
                        <p className="card-text"> Ram: </p>
                        <p className="card-text"> Description: </p>
                        <p className="card-text"> Price: </p>    
                    </div>

                    <div className="col-sm-6" >
                    <p className="card-text"> {props.op_sys}  </p>
                    <p className="card-text"> {props.cpu_hz} GHz  </p>
                    <p className="card-text"> {props.cpu_cores}  </p>
                    <p className="card-text"> {props.screen_size}  </p>
                    <p className="card-text"> {props.screen_res}  </p>
                    <p className="card-text"> {props.ram} GB </p>
                    <p className="card-text"> {props.description}  </p>
                    <p className="card-text"> {props.price} Ft  </p>    
                    </div>

                   
                        
                    </div>
            </div>

        </>
    )




}