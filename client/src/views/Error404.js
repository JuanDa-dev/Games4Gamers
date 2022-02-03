import fondo from '../images/404.svg'
import '../CSS/Error404.css'

const Error404 = () => {
    return (
        <div className="row justify-content-around align-items-center contentError">
            <img className="col-md-5 col-12 col-sm-5" src={fondo} />
            <div className="col-md-4 col-12 col-sm-7 tab-cont">
                <h2>Page not found</h2>
                <div className="d-grid gap-2">
                    <a href='/' className="btn btn-primary" type="submit" value="submit">Go to Home Page</a>
                </div>
            </div>
        </div>
    );
}

export default Error404;