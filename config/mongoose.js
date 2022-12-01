const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact_List_db');

const db = mongoose.connection;
console.log('mongoose connection');

db.on('error', console.error.bind(console, '**************************error come when connecting to Mongo'));

db.once('open', function (){
    console.log('Connected to Mongo');
});