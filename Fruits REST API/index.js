const fs = require('fs')
const express = require('express');
const app = express();


function readFile() {
    data = fs.readFileSync('files.json','utf-8',(err, data)=>
    {
        if (err) {
            console.error(err)
            return;
        }
    })
    return JSON.parse(data);
}

app.get('/api/v1/fruits', (req, res) => {
    res.json(readFile());
});


app.get('/api/v1/fruits/:id', (req, res) => {
    const fruits = readFile();
    const fruit = fruits.find(fruit => fruit.id === parseInt(req.params.id));
    if (!fruit) return res.status(404).json({ message: 'Fruit not found' });
    res.json(fruit);
});


app.post('/api/v1/fruits/', (req, res) => {
    const fruits = readFile();
    fruits.push(req.body);
    let str = JSON.stringify(fruits)
    fs.promises.writeFile('files.json', str);
    res.json(str);
});


const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}`))