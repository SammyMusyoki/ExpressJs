const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger');

const app = express();
// Init MiddleWare
// app.use(logger)


// Body Parser MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//  Handlebars MiddleWare
app.engine('handlebars', exphbs( {defaultLayout: 'main' } ));
app.set('view engine', 'handlebars');

// HomePage Route 
app.get('/', (req, res) => {
    res.render('index')
});

//  Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

//  Members Api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`'Server started on Port ${PORT}`));