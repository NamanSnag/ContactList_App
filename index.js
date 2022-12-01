const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const db = require('./config/mongoose');

const contact = require('./model/contact');

// creating array of objects for contact list
// const contactList = [
//     {
//         name: 'Naman Nag',
//         phone: '7083215690'
//     },
//     {
//         name: 'Nupur Nag',
//         phone: '7083215691'
//     }
// ];

// express server
const express = require('express');

// port
const port = 7800;

// calling express server function
const app = express();

// parser
app.use(express.urlencoded());

// middleware for files
app.use(express.static('style'));

// setting up view engine as ejs
app.set('view engine', 'ejs');
// setting path for view engine
app.set('views', path.join(__dirname, 'views'));


// contact page
app.get('/', (request, response) =>{

    contact.find({},(error, contact) =>{
        if(error){
            console.log(error);
            return error;
        }

        return response.render('contact',{
            title: 'Contact Page',
            contact_List: contact
        });

    });

});

// deleting the contact
app.get('/remove', (request, response)=>{
    // let phone = request.query.phone;
    // let index = contactList.findIndex((contactList)=> contactList.phone == phone);
    // if(index != 0) {
    //     contactList.splice(index, 1);
    // };
    // find id to remove contact
    let id = request.query.id;

    contact.findByIdAndDelete(id, (error)=>{
        if(error){
            console.log(error);
            return error;
        }
        return response.redirect('back');
    });
});

// create a new contact 
app.post('/add', (request, response) =>{
    // contactList.push(request.body);
    contact.create({
        name: request.body.name,
        phone: request.body.phone
    },(error, newContact)=>{
        if(error) {
            console.log(error);
            return error;
        }
        console.log(newContact);
        return response.redirect('back');
    });
});


// server side
app.listen(port,(error)=>{
    if(error){
        console.log(error);
        return error;
    }
    console.log('express server listening on port',port);
});


