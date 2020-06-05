import React, { useEffect } from 'react';
import './styles.css';
import { FiCheckCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

const Success = () => {
    const history = useHistory();

    useEffect( () => {
        returnHome();
    }, []);

    function returnHome(){
        setTimeout(() => {
            history.push('/');
        }, 5000);
    }

    return (
        <div className="new-point-success">
            <span> <FiCheckCircle /> </span>
            <h2>Cadastro concluído!</h2>            
        </div>        
    );
}

export default Success;