import { useState, useEffect } from 'react';
import { fetchProtected } from '../api';
import { useNavigate } from 'react-router-dom';
import { MainMenu } from './menuComp';


export function Profil()
{
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchProtected();
          setMessage(response.message);
          
        } catch (error) {
          setMessage('Unauthorized');
          navigate('/login');  // Ha a felhasználó nem bejelentkezett, vissza a login oldalra
        }
      };
      fetchData();
    }, [navigate]);
  
    return (
      <div className='container mainBody'>
        <MainMenu></MainMenu>
        <h2>{message} felhasználó!</h2>
        <button className="btn btn-primary"><a href="/cart" style={{color:"white"}}>Kosárt megtekintése</a></button>
      </div>
    );
}

