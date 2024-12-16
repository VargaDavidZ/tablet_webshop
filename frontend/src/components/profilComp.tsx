import { useState, useEffect, useId } from 'react';
import { fetchProtected } from '../api';
import { useNavigate } from 'react-router-dom';
import { MainMenu } from './menuComp';
import { User } from './userInterface';
import { isDepsOptimizerEnabled } from 'vite';


export function Profil()
{
  const [user, setUser] = useState<User[]>([]);
  const [userId, setUserId] = useState('')
  const [newName, setNewName] = useState<string>();

  console.log(newName)

  const handleSubmit = async (e: React.FormEvent) => {

    console.log("asdasdadsad")
    
   
    try {
      console.log(newName + "new")
        const response = await fetch('http://localhost:3000/users/' + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: newName
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Hiba történt: ${response.status}`)
        }

     
      
    } catch (err: any) {
        
    }  finally {

    }
}



    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchProtected();
          console.log("------")
          console.log(message + "asd")
          setMessage(response.message);
          setUserId(response.id)
         console.log(userId)
          fetch('http://localhost:3000/users')
            .then((response) => {
                if (response.status === 404) {
                    //setErrorServer("Resource not found (404)")
                    //throw new Error('Resource not found (404)');
                }
                if (!response.ok) {
                    //setErrorServer(`Server responded with status ${response.status}`)
                    //throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
             
            })
            .catch((error) => {
                setUser(error.message);
            
            });
          
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
       
        <form action="" onSubmit={handleSubmit}>
        <input type="text" name="" id="changeName" onChange={(e) => setNewName(e.target.value)} />
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}   ><a href=""  style={{color:"white"}}>Név módosítása</a></button><br />
        </form>
      
      
       
        <button className="btn btn-primary"><a href="/cart" style={{color:"white"}}>Kosárt megtekintése</a></button>
      </div>
    );
}

