import 'bootstrap/dist/css/bootstrap.min.css'

export function MainMenu() {


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Best Webshop</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                          

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/tablets">Tabletek</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/addtablet">Tablet felvétele</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/deletetablet">Tablet törlése</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/cart">Kosár</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/login">Bejelentkezés</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/register">Regisztráció</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/profil">Profil</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/logout">Kijelentkezés</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>



        </>
    )




}