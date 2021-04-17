import React from 'react'

function Home() {
    return (
        <div>
            <p>{process.env.NODE_ENV}</p>
            <p>{process.env.REACT_APP_API_URL}</p>
        </div>
    )
}

export default Home
