//setting up server
const express = require('express');
const { send } = require('process');
const app = express();
app.use(express.json());
app.get('/', (req,res)=> {
    res.send('Welcome to my HTTP Music App!');
})

//list of songs and their information
const songs = [
    {
        id: 1, name:'Boy\'s a Liar', 
        genre:'pop', 
        year: 2023, 
        month: 2
    },
    {
        id: 2, 
        name:'Kill Bill', 
        genre:'pop', 
        year:2022, 
        month:12
    }, 
    {
        id: 3, 
        name:'Lose Yourself', 
        genre:'hip hop', 
        year:2002, 
        month:10
    },
    {
        id: 4, 
        name:'Ms. Jackson', 
        genre:'hip hop', 
        year:2000, 
        month:10
    },
    {
        id: 5, 
        name:'Obedient', 
        genre:'rap', 
        year:2018,
        month:5
    }, 
    {
        id: 6, 
        name:'It Suxx', 
        genre:'rap', 
        year:2017, 
        month:2
    },
    {
        id: 7, 
        name:'Für Elise', 
        genre:'classical', 
        year:1810, 
        month:4
    },
    {
        id: 8, 
        name:'Eine kleine Nachtmusik', 
        genre:'classical', 
        year:1787, 
        month:1
    }, 
    {
        id: 9, 
        name:'Everlong', 
        genre:'rock', 
        year:1997, 
        month:8
    },
    {
        id: 10, 
        name:'Smells Like Teen Spirit', 
        genre:'rock', 
        year:1991, 
        month:9
    },
    {
        id: 11, 
        name:'What a Wonderful World', 
        genre:'jazz', 
        year:1967, 
        month:9
    }, 
    {
        id: 12, 
        name:'Fly Me To The Moon', 
        genre:'jazz', 
        year:1954, 
        month:4
    },
    {
        id: 13, 
        name:'Red House', 
        genre:'blues', 
        year:1967, 
        month:5},
    {
        id: 14, 
        name:'Hoochie Coochie Man', 
        genre:'blues', 
        year:1954, 
        month:1
    },
    {
        id: 15, 
        name:'Real Spring', 
        genre:'electronic', 
        year:2023, 
        month:1
    }, 
    {
        id: 16, 
        name:'Levels', 
        genre:'electronic', 
        year:2011, 
        month:10
    },
];
//list of genres
const genres = [
    {
        id: 1,
        name: "pop"
    },
    {
        id: 2,
        name: "hip hop"
    },
    {
        id: 3,
        name: "rap"
    },
    {
        id: 4,
        name: "classical"
    },
    {
        id: 5,
        name: "rock"
    },
    {
        id: 6,
        name: "jazz"
    },
    {
        id: 7,
        name: "blues"
    },
    {
        id: 8,
        name: "electronic"
    },
]

// HTTP GET Request routes
app.get('/songs', (req,res)=> {
    res.send(songs);
})

app.get('/songs/genres', (req,res)=> {
    res.send(genres);
})

//request song by ID
app.get('/songs/id/:id',(req,res)=>{ 
    const song = songs.find(c=> c.id === parseInt(req.params.id));
    if(!song) { 
        res.status(404).send("The song with the given ID was not found");
        return
    }
    res.send(song);
})

//request song by name
app.get('/songs/name/:name',(req,res)=>{ 
    const song = songs.find(c=> c.name.toLowerCase() === (req.params.name).toLowerCase());
    if(!song) { 
        res.status(404).send("No song with that name was found");
        return
    }
    res.send(song);
})

//filter songs by genre
app.get('/songs/genres/:genre',(req,res)=>{ 
    const genreSongs = songs.filter(c=> c.genre === (req.params.genre).toLowerCase());
    if(genreSongs === []) { 
        res.status(404).send("No songs with that genre were found");
        return
    }
    res.send(genreSongs);
})

//filter songs by year
app.get('/songs/date/year/:year',(req,res)=>{ 
    const yearSongs = songs.filter(c=> c.year === parseInt(req.params.year));
    if(yearSongs === []) { 
        res.status(404).send("No songs released in that year were found");
        return
    }
    res.send(yearSongs);
})

//filter songs by month
app.get('/songs/date/month/:month',(req,res)=>{ 
    const monthSongs = songs.filter(c=> c.month === parseInt(req.params.month));
    if(monthSongs === []) { 
        res.status(404).send("No songs released in that month were found");
        return
    }
    res.send(monthSongs);
})

//filter songs by month+year
app.get('/songs/date/year/:year/month/:month',(req,res)=>{ 
    const yearSongs = songs.filter(c=> c.year === parseInt(req.params.year));
    const yearMonthSongs = yearSongs.filter(c=> c.month === parseInt(req.params.month));
    if(yearMonthSongs === []) { 
        res.status(404).send("No songs released in that month and year were found");
        return
    }
    res.send(yearMonthSongs);
})

// HTTP POST Requests
app.post('/songs', (req,res) => {
    if(req.body.name && req.body.name.length > 1 && req.body.name.length < 51) { 
        const song = {
            //assign ID, name, genre, year, month
            id: songs.length + 1,
            name: req.body.name,
            genre: req.body.genre,
            year: parseInt(req.body.year),
            month: parseInt(req.body.month),
        }
        songs.push(song);
        res.send(song);
    }
    else { 
        res.status(400).send('Bad Syntax: Request must be 2 - 50 characters long!')
    }
});




//HTTP PUT requests
app.put('/songs/id/:id', (req,res)=> { 
    if(req.body.name && req.body.name.length > 1 && req.body.name.length < 51) { 
        const song = songs.find(c=> c.id === parseInt(req.params.id));
        if(!song) { 
            res.status(404).send("The song with the given ID was not found");
            return;
        }
        song.id = parseInt(req.body.id);
        song.name = req.body.name;
        song.genre = req.body.genre;
        song.year = parseInt(req.body.year);
        song.month = parseInt(req.body.month);
        res.send(song);
    }
    else { 
        res.status(400).send('Bad Syntax: Request must be 2 - 50 characters long!')
    }
})
//HTTP DELETE requests
app.delete('/songs/id/:id', (req,res)=> { 
    const song = songs.find(c=> c.id === parseInt(req.params.id));
        if(!song) { 
            res.status(404).send("The song with the given ID was not found");
            return;
        }
        songs.splice(songs.indexOf(song), 1);
        res.send(song);
})

//logging server start
app.listen(3000, () => {
    console.log('Listening on port 3000...')
})

/*
reflection:

(1)
The command 'node' is run through the command line, which opens the server using the express module and allows the information to be viewed via a URL.
The program POSTMAN is used to send HTTP requests to this server, which can retrieve, replace, add, or remove data.
When a request is sent through POSTMAN, the server communicates with the "database" (this file) to carry out the request.
In this case, the database is represented by arrays, and the source code has a route for GET requests to send that information through the API request.
This information can then be used in other programs or reflected in the site itself.

(2)
I learned more about HTTP requests, using POSTMAN/APIs, and even JavaScript. Particularly, the syntax for handling requests is much more familiar now.

(3)
This project could be further extended by writing another program that could use the data from this API and communicate via these requests.

Alem Bicic
Irimina WebDev/Cybersecurity
4/1/2023
*/