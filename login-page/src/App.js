import React, {useState} from 'react';
import SignIn from './components/SignIn';
import ProfilePage from './components/ProfilePage';
import Navigation from './components/Navigation';
import Register from './components/Register';
import './styles/App.css'

export default function App() {
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setSignIn] = useState(false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    joined: ''
  })

  function loadUser(data) {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined
    })
  }

 

//obtaining data form the localhost server that is running
// const getData = () => {
//     fetch('http://localhost:3000'
//       , {
//           headers: {
//             'Content-Type': 'application/json',
//              'Accept': 'application/json'
//           }
//          }
//       )
//    .then(function(response) {    
//       return response.json();
//    })
//    .then(function(myJson) {
//      console.log(myJson);
//    });  
// }

// useEffect(() => {
//     getData() 
// }, [])


  const onRouteChange = (route) => {
    if (route === 'signin') {
      setSignIn(false)
    } else if ( route ==='home') {
      setSignIn(true)
    }
    
    setRoute(route)
  }

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      {
        route === 'home'
        ? <ProfilePage 
        name={user.name}
        date={user.joined}
        />
        : (
          route === 'signin'
          ? <SignIn 
          loadUser={loadUser}
          onRouteChange={onRouteChange} 
          />
          : <Register 
          onRouteChange={onRouteChange} 
          loadUser={loadUser}
          />
        )
      }
    </div>
  )
}

