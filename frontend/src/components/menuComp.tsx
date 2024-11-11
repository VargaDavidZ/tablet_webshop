import 'bootstrap/dist/css/bootstrap.min.css'

export function MainMenu() {


    return (
        <>
            <div className='text-center mt-3 ' >

                <div className='row' >

                    <div className="col-sm-3"> <a href="/">Főoldal</a></div>

                    <div className="col-sm-3"> <a href="/tablets">Tabletek</a></div>

                    <div className="col-sm-3"> <a href="/addtablet">Tablet Felvétele</a> </div>

                    <div className="col-sm-3"> <a href="/deletetablet">Tablet Törlése</a></div>

                </div>



            </div>

        </>
    )




}