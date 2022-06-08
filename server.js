const express = require('express');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/develop/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            } else {
                const parsedData = JSON.parse(data);
                res.json(parsedData);
            }
        })
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    
    const newNote = {
          title,
          text,
          note_id: uniqid(),
    };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
            } else {
              const parsedData = JSON.parse(data);
              parsedData.push(newNote);
              fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) => err ? console.error(err) : console.info('Data written to database!'));
            }
          });

    const response = {
        status: 'success',
        body: newNote,
    };
    res.json(response);
})

app.listen(PORT, () => {
    console.log(`This server is listening on ${PORT}!`);
});