import {React} from 'react';
import Field from '../images/harvest.jpg';
import  {Button} from 'react-bootstrap';

function Home() {

    return(
        <div>
            <img src={Field} alt="field" className='cover' />
            <div className="centered">
                <h1 style={{color: "white", fontFamily: "Lucida Sans Typewriter", color: "darkseagreen"}}>Join Us Now!</h1>
                <Button className='button' variant='success' >Log in</Button>
                <Button className='button' variant='success'>Register</Button>
            </div>
        </div>
        );
};

export default Home;

