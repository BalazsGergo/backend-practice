/* IMPORTS */
const express = require('express');
const path = require('path');
const fs = require("fs")
const app = express();
const port = 3001;

/* middleware ami parseolja  a jsont => ehhez be kell allitani */
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/static/css/style.css'));
});

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/static/js/script.js'));
});

// Updated path for express.static
app.use('/public', express.static(path.join(__dirname, '/frontend/static')));

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/users.json'));
});

app.get('/users/:userid', (req, res) => {
  //res.send(req.params.userid);

  /* s bejovo parametert atalakitom szamma */
  const userId = parseInt(req.params.userid)
  /* check hogy sikerult e  */
  if (isNaN(userId)) {
    console.log(`userid is not a number: ${userId}`)

    /* ha nem sikerult hibat kuldok*/
    res.status(400).send('userId must be a number!!!')

    /* ha sikerult futattom a kodot tovabb*/
  }else {
    console.log('reading file...')
    /* beolvasom az adatot*/ 
    fs.readFile(path.join(__dirname, "/data/users.json"), 'utf8', (err,data) => {
      /* ha hiba van a fajl olvasas kozben */
      if (err){
        console.log('error at reading file')

        res.status(500).send('Error at reading file')
        /* ha nincs hiba  */
      } else {
        console.log(`reading file was succesful, searchin for user is: ${userId}`)
        /* a data erteke string, atalakitom jsben hasznalhatova (array,object) */
        const users =JSON.parse(data)
        const foundUser = users.find((user) => user.id === userId)
        
        /* megkeresem az adott userId*/ 
      if (foundUser) {
        console.log(`found use id: ${userId}, data: ${foundUser}`)

        res.status(200).send(foundUser)
      } else {
        console.log(`user id: ${userId} is not found`)

        res.status(500).send('Error')
      }

      }
    })
  }
});

app.post('/users/new-user',(req,res)=> {
  console.dir(req.body)

  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
