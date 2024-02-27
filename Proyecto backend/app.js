const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const ComicsRoutes = require('./routes/ComicsRoutes');
const AuthRoutes = require('./routes/AuthRoutes');


// Realizar la coneccion
//mongoose.connect('mongodb://localhost:27017/AppWebIIIP')
mongoose.connect('mongodb+srv://ismaelm201451:password1234@cluster0.ej5rlxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> {
    console.log('conectado a MongoDB');
})
.catch((err)=> {
    console.log('Error conectando a MongoDB', err);
})

const app = express();
app.use(express.json());
app.use(cors());

  
ComicsRoutes(app);
AuthRoutes(app);




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

