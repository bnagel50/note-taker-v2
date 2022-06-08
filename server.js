const express = require('express');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/develop/public/index.html'))
);

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
);


app.get('/api/notes', (req, res) => {
    fs.readFile('./develop/db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data);
            res.json(parsedData);
        }
    })
});

app.post('/api/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('./develop/db/db.json'));
    
    const newNote = req.body;
        newNote.id = uniqid();
    
    note.push(newNote);
    fs.writeFileSync('./develop/db/db.json', JSON.stringify(note));
    res.json(note);
});
    
    

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/develop/public/index.html'))
);

app.listen(PORT, () => {
    console.log(`This server is listening on ${PORT}!`);
});