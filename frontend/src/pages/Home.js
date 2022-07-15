
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";

function Home() {
  
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <div className='container'>
        <div className="jumbotron mt-5">
            <h1 className="display-4">Welcome To Architecturex!</h1>
            <p className="lead">A free website to architecture your charts</p>
            <hr className="my-4"/>
            <p>Get Started</p>
            <p className="lead">
              <Link className="btn btn-primary btn-lg" to={`${isAuthenticated ? 'home' : 'login'}`} role="button">{isAuthenticated ? 'Home' : 'Log In'}</Link>
            </p>
        </div>
      </div>
    </>
    
  )
}

export default Home;
