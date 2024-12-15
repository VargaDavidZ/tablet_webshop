import { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';
import { MainMenu } from './menuComp';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await register(username, password);
      navigate('/tablets');  // Sikeres regisztráció után navigálás a privát oldalra
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className='mainBody container' >
      <MainMenu></MainMenu>
 <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
    </div>
   
  );
}

export default Register;
