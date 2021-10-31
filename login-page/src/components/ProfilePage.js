import React from 'react'

export default function ProfilePage({name, date}) {
    return (
        <div>
            <h1>Welcome, dear {name}</h1>
            <p>Date and time joined: {date}</p>
        </div>
    )
}
