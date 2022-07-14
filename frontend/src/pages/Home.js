
import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
      <div className='container'>
        <div className="jumbotron mt-5">
            <h1 className="display-4">Welcome To Architecturex!</h1>
            <p className="lead">A free website to architecture your charts</p>
            <hr className="my-4"/>
            <p>Click To Log In</p>
            <p className="lead">
              <Link className="btn btn-primary btn-lg" to="login" role="button">Log In</Link>
            </p>
        </div>
      </div>
    </>
    
  )
}

export default Home;
