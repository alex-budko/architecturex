
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { Card, Container } from 'react-bootstrap';

function Contact() {
  
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <Container style={{width: '750px'}}>
        <div className="jumbotron mt-5">
            <h1 className="display-3">Architecturex</h1>
            <p className="lead">This open-source editing website was developed by Alexander Budko. In here, you can. Click the button below to begin!</p>
            <hr className="my-4"/>
            <Card align="center">
              <Card.Title className="display-5">Get Started</Card.Title>
              <p align="center" className="lead">
                <Link className="btn btn-primary btn-md" to={`${isAuthenticated ? 'home' : 'login'}`} role="button">{isAuthenticated ? 'Home' : 'Log In'}</Link>
              </p>
            </Card>
            
        </div>
      </Container>
    </>
    
  )
}

export default Contact;