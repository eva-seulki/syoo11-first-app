const app = require('./app');
const port = process.env.PORT || 3000; 

// Start Node Server
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
  });