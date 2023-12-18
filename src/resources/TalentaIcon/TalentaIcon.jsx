
import talenta from './Talenta.png'
import './TalentaIcon.css'
import {Button} from 'react-bootstrap';
import { useState } from 'react';
import Fade from 'react-bootstrap/Fade';
import Collapse from 'react-bootstrap/Collapse';

function TalentaIcon({onClick}) {

    const [isExpanded, setMenuExpanded] = useState(false);

    const expandMenu = () => {
        onClick();
        setMenuExpanded(!isExpanded);
    };
    return (
        <div className='logo'>
            <Button variant='outline-primary' className={isExpanded ? 'button-open' : 'button-closed'} onClick={expandMenu}>

                <img src={talenta} alt='Talenta Logo' className={isExpanded ? 'open-icon' : 'closed-icon'}></img>
                <Fade in={isExpanded} >
                    <label className={isExpanded? 'label-open' : 'label-closed' }>Talenta Bumi</label>
                </Fade>
             </Button>
             </div>
    
    );
}

export default TalentaIcon