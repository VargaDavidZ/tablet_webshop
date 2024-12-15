const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webbolt'
});


const sessionStore = new MySQLStore({}, db);
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // A frontend URL-je
    credentials: true // Engedélyezd a sütik küldését
  }));

app.use(express.json());
app.use(bodyParser.json());



app.get('/cart', async (req, res) => {

    try {
      const temp = await db.query('SELECT * FROM cart');
      const rows = temp[0];
      const fields = temp[1];
      res.status(200).json(rows);
  } catch (error) {
      console.error(`Error retrieving items in cart ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
  }
 
})




app.get('/mostexpensive', async (req, res) => {

    try {
        const temp = await db.query('SELECT * FROM tablets ORDER BY price DESC LIMIT 3');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/cart', async (req, res) => {


    try {
        let tabletData = [req.body.title, req.body.op_sys,req.body.cpu_hz,req.body.cpu_cores,req.body.screen_size,req.body.screen_res,req.body.ram,req.body.description,req.body.price];
        console.log(tabletData)
        const [rows, fields] = await db.query('INSERT INTO cart (title, op_sys, cpu_hz,cpu_cores,screen_size,screen_res,ram,description,price) VALUES (?,?,?,?,?,?,?,?,?)', tabletData);
        res.status(200).json({ message: 'Tablet successfully added!' });


    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.get('/cheapest', async (req, res) => {

    try {
        const temp = await db.query('SELECT * FROM tablets ORDER BY price ASC LIMIT 3');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.get('/tablets/:tabletId', async (req, res) => {
    try {
        let tabletId = parseInt(req.params.tabletId);
        const [rows, fields] = await db.query('SELECT id, title, op_sys, cpu_hz,cpu_cores,screen_size,screen_res,ram,description,price FROM tablets WHERE id =?', [tabletId]);
        if (rows.length == 1){
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({error: 'There is no tablet with this id.'});
        }
    } catch (error) {
        console.error(`Error retrieving posts ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/tablets', async (req, res) => {


    try {
        let tabletData = [req.body.title, req.body.op_sys,req.body.cpu_hz,req.body.cpu_cores,req.body.screen_size,req.body.screen_res,req.body.ram,req.body.description,req.body.price];

        const [rows, fields] = await db.query('INSERT INTO tablets (title, op_sys, cpu_hz,cpu_cores,screen_size,screen_res,ram,description,price) VALUES (?,?,?,?,?,?,?,?,?)', tabletData);
        res.status(200).json({ message: 'Tablet successfully added!' });


    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.delete('/tablets/:tabletId', async (req, res) => {
    try {
        let tabletId = parseInt(req.params.tabletId);
        const [rows, fields] = await db.query('DELETE FROM tablets WHERE id =?', [tabletId]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Tablet not found" });
        } else {
            res.status(200).json({ message: "Tablet successfully removed" });
        }

    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



app.delete('/cart/:tabletId', async (req, res) => {
  try {
      let tabletId = parseInt(req.params.tabletId);
      const [rows, fields] = await db.query('DELETE FROM cart WHERE id =?', [tabletId]);
      if (rows.length === 0) {
          res.status(404).json({ error: "Tablet not found" });
      } else {
          res.status(200).json({ message: "Tablet successfully removed" });
      }

  } catch (error) {
      console.error(`Error retrieving tablets ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
  }
})




app.delete('/cart', async (req, res) => {
  try {
      let tabletId = parseInt(req.params.tabletId);
      const [rows, fields] = await db.query('TRUNCATE TABLE cart');
      if (rows.length === 0) {
          res.status(404).json({ error: "cart not found" });
      } else {
          res.status(200).json({ message: "cart successfully emptied" });
      }

  } catch (error) {
      console.error(`Error retrieving tablets ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
  }
})


// Session beállítások MySQL-ben tárolva
app.use(session({
  key: 'session_cookie_name',
  secret: 'your_secret_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 60000 } // Sütik beállításai
}));

// Regisztrációs végpont
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Ellenőrizd, hogy a felhasználónév már létezik-e
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Jelszó titkosítása bcrypt használatával
    const hashedPassword = await bcrypt.hash(password, 10);

    // Új felhasználó hozzáadása
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Bejelentkezési végpont
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
   
  try {
    // Felhasználó keresése
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];

    // Jelszó ellenőrzése
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Session-beállítás (felhasználói információk mentése session-ben)
    console.log(user.username)
    req.session.user = { id: user.id, username: user.username };
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/tablets', async (req, res) => {

      try {
        const temp = await db.query('SELECT * FROM tablets');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
   
})


// Kijelentkezési végpont
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('session_cookie_name'); // Session cookie törlése
    res.json({ message: 'Logout successful' });
  });
});

// Privát végpont, csak bejelentkezett felhasználóknak
app.get('/profil', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ message: `${req.session.user.username}` });
});



app.listen(3000);
