import { useState } from 'react';
import './App.css';


function App() {

  const [userData, setUserData] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUserData = () => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`).then(response => {
      return response.json();
    }).then(data => {

      if(data.message) {
        setMessage("User not found");
      }
      
      setLoading(false);
      setUserData(data);
    });
    setMessage('');
  };


  return (
    <div className="App">
      <div className='container'>
        <div className='app__title'>
          devfinder
        </div>
        <div className='search__container'>
          <i className="fas fa-search"></i>
          <input type="text" placeholder='Search GitHub username' onChange={(e) => setUsername(e.target.value)} />
          <button type='button' className='btn btn-primary' onClick={fetchUserData}>Search</button>
        </div> 
        <h6 className='mb-4 text-danger'>{message}</h6>
        <div className='user__profile'>
          {userData ? 
          (<div className='row w-100'>
            <div className='col-lg-3'>
              {userData.avatar_url ? <img src={userData.avatar_url} className='avatar img-responsive' alt="user-image" /> 
                        : <i className="fas fa-user"></i>
              }
            </div>
            <div className='col-lg-9'>
              <div className='profile__header'>
                <h4 className='mb-0'>{userData.name}</h4>
                <h6 className='mb-0 text-muted font-weight-bold'>Joined {userData.created_at}</h6>
              </div>
              <small className='username'>@{userData.login}</small>
              <div className='profile__bio'>
                {(userData && (userData.bio)) ? <h6>{userData.bio}</h6> : <h6>This profile has no bio</h6>}
              </div>
              <div className='repo_info'>
                <div>
                  <small>Repos</small>
                  <h6 className='repo_title'>{userData.public_repos}</h6>
                </div>
                <div>
                  <small>Followers</small>
                  <h6 className='repo_title'>{userData.followers}</h6>
                </div>
                <div>
                  <small>Following</small>
                  <h6 className='repo_title'>{userData.following}</h6>
                </div>
              </div>
              <div className='profile_socials'>
                <div className='media_item'>
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {userData.location ? <small>{userData.location}</small>
                    : <small className='text-muted'>Not Available</small>}
                </div>
                <div className='media_item'>
                  <i className="fab fa-twitter mr-2"></i>
                  {userData.twitter_username ? <small>@{userData.twitter_username}</small>
                   : <small className='text-muted'>Not Available</small>}
                </div>
                <div className='media_item'>
                  <i className="fas fa-link mr-2"></i>
                  {userData.blog ? <small>{userData.blog}</small> 
                    : <small className='text-muted'>Not Available</small> }
                </div>
                <div className='media_item'>
                  <i className="fab fa-github mr-2"></i>
                  <small>@github</small>
                </div>
              </div>
            </div>
          </div>)
          : <i className="fab fa-github"></i>}
        </div>
      </div>
      {loading && <div className="spinner-border text-primary mt-2" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
        }
    </div>
  );
}

export default App;
