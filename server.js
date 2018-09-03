const express = require('express');
const app = express();

app.use(express.static('./build'));

app.get('/hello', function (req, res) {
 return res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
