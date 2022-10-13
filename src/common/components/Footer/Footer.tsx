import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {

    return (
        <React.Fragment>
            <div className='footer-container'>
                <div className='footer-sections'>
                    <div className='section1'>
                        <nav>
                            <ul>
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                            </ul>
                        </nav>
                    </div>
                    <div className='section2'>
                        <nav>
                            <ul>
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                            </ul>
                        </nav>
                    </div>
                    <div className='section3'>
                        <nav>
                            <ul>
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='copyRight' >
                    Company Name © 2018
                </div>
            </div>

        </React.Fragment>
    )
}