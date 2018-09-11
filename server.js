const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv').config();


app.use(express.static('./build'));

let token = process.env.REACT_APP_YELP;

let config = {
      headers: {'Authorization': 'Bearer ' + token}
 };

app.get('/search/:zip', (req,res) => {
 let zip = req.params.zip;
 axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Sushi&location=Miami`, config).then(response => {
   res.json(response.data);
 })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

 // return res.send('Hello World!');
