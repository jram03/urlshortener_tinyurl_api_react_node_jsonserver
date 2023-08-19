const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { response } = require('express');
console.log("server read")
const app = express();
const port = 4000; // Choose a port number that is not in use

app.use(cors());
app.use(express.json());
app.post('/create', async (req, res) => {
  try {
    const response = await axios.post('https://api.tinyurl.com/create', req.body, {
      headers: {
        'Authorization': 'Bearer v1UkCxwFiQVu0NiIi32sqBnVYlaFsqYsJt67wRyiuq08SnVA2ju3NhZ3plcX',
        'Content-Type' : 'application/json'
      }
    }); 
console.log(req.body);
    console.log(response.data.data.tiny_url);

    res.json(response.data);
    
    

  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
  finally {
    // console.log(req.body.long_url);
    // console.log(req.body);
    // console.log(res);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
