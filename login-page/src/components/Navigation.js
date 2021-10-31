import React from 'react'

export default function Navigation({onRouteChange, isSignedIn}) {
    if (isSignedIn) {
        return (
            <nav style={{position: 'fixed', top: '1em', right: '2em'}}>
                <p 
                onClick={() => onRouteChange('signin')}
                className='f3 link dim black underline pa3 pointer'
                >
                    Sign Out
                </p>
            </nav>
        )
    } else {
        return (
                <nav style={{display: 'inline'}}>
                    <p
                    style={{position: 'fixed', top: '1em', right: '2em'}} 
                    onClick={() => onRouteChange('register')}
                    className='f3 link dim black underline pa3 pointer'
                    >
                        Resgister
                    </p>
                    <p 
                    style={{position: 'fixed', top: '1em', right: '10em'}} 
                    onClick={() => onRouteChange('signin')}
                    className='f3 link dim black underline pa3 pointer'
                    >
                        Sign In
                    </p>
                </nav>
        )
    }
}

