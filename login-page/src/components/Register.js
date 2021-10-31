import React, { useState } from 'react'

export default function Register({onRouteChange, loadUser}) {
    const [email, setEmail] = useState('')
    const [password, setPassword]  = useState('')
    const [name, setName] = useState('')

    function onEmailChange(event) {
        setEmail(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    function onNameChange(event) {
        setName(event.target.value)
    }


    const onSubmitRegister= () => {
        // console.log({password, email, name})
        fetch('http://localhost:3000/register'
              , {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                     'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                      email: email,
                      password: password,
                      name: name
                  })
                 }
              )
              .then(response => response.json())
              .then(user => {
                  if (user) {
                    loadUser(user)
                    onRouteChange('home')
                  }
              })
    }
    
    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <h2 className="centered-txt">Register</h2>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Full name</label>
                        <input 
                        onChange={onNameChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="full name"  
                        id="full-name" 
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                        onChange={onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address" 
                         id="email-address" 
                         />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        onChange={onPasswordChange}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password" 
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                    onClick={onSubmitRegister}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" value="Register" 
                    />
                    </div>
                </div>
            </main>
        </article>
    )
}
