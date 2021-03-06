const { SchemaType } = require('mongoose');
const path = require('path');
require('dotenv').config();

var Note = require('./models/notemodel');

function routes(app, db) 
{
    app.get('/', (req, res) => { res.sendFile('index.html') });

    app.get('/archive', (req, res) => { res.sendFile(__dirname + '/public/archive.html') });

    app.get('/get_archive', (req, res) => { 

        params = {}
        Note.find(params).exec(function(err, posts) {
        if(err) {
            res.json({"archive":[], "error":err});
            return;
        }
        res.json({"archive":posts});
        });
    });

    app.get('/delete/:id', (req, res) => { 
        const id = req.params.id;
        Note.deleteOne({_id:id}).exec(function(err, note) {
            if(err) {
                res.json({"note":null, "error":err});
                return;
            }
            res.redirect('../');
        });    
    });


    app.get('/get_note/:id', (req, res) => { 
        const id = req.params.id;
        Note.findOne({_id:id}).exec(function(err, note) {
            if(err) {
                res.json({"note":null, "error":err});
                return;
            }
            res.json({"note":note});
        });    
    });

    app.post('/create_note', async (req, res) => {

        var note = new Note({
            content: req.body.content,
            author: req.body.author,
            created: Date.now(),
            openAt: req.body.openAt
        })

        note.save(function(err) {
            if(err) {
                console.log(req.body)
                console.log("error in note");
                res.redirect('./');
            }else {
                console.log("note made");
                res.redirect('./?note=' + note.id);
            }
            
        })
    });

}


module.exports = routes