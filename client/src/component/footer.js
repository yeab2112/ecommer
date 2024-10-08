import React from 'react';
import '../asett/footer.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Import icons

function Footer() {
    return (
        <div className="footer d-flex justify-content-between align-items-center">
        <p className='mb-0'>[YEABSIRA] [2023]</p>
        <div>
            <Link to="https://www.linkedin.com/in/yeabsira-aychiluhim/" className='social-links'>
                <FontAwesomeIcon icon={faLinkedin} />
            </Link>
    
            <Link to="https://github.com/yeab2112/ecommer" className='social-links'>
                <FontAwesomeIcon icon={faGithub} />
            </Link>
    
            <Link to="[Your Twitter URL]" className='social-links'>
                <FontAwesomeIcon icon={faTwitter} />
            </Link>
        </div>
    </div>
    
    );
}

export default Footer;