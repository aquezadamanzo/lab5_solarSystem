const solarSystem = (await import('npm-solarSystem')).default;

import express from 'express';
import { getJupiter } from 'npm-solarSystem';

//express is an API engine
//it lets you make your own APIs
const app = express();

//EJS is a way to dynamically build HTML pages
//and easily substitute data into them
app.set("view engine", "ejs");

//public folder
app.use(express.static("public"));

//when you get to the base URL, do this function
//since '/' this is the base URL, this function 
//will run when you go to localhost:3000, with no /
//at the end
app.get('/', async (req, res) => {
    try{
        let url = "https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar system";
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Request failed")
        }

        const data = await response.json();

        data.hits.sort(() => Math.random() - 0.5);
        let images = data.hits.slice(0, 4);

        res.render('home.ejs', {
            images: images, 
            errorMessage: ""
        });
    }catch (err){
        res.render('home.ejs', {
        images: [],
        errorMessage: "Could not request random images"
        });
        console.log(err);
    }
});

//like above, but this runs if /catDetails is at the end
//this function is saying what will happen when the user
//accesses the page
app.get('/planetInfo', async (req, res) => {
    let planet = req.query.planet;

    try {
        let url = "https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=" + planet;
        const response = await fetch(url);
        const data = await response.json();

        //this gets 4 random pictures
        data.hits.sort(() => Math.random() - 0.5);
        let images = data.hits.slice(0, 4);

        let planetData;

        if(planet === 'Mercury'){
            planetData = solarSystem.getMercury();
        } 
        else if (planet === 'Venus'){
            planetData = solarSystem.getVenus();
        }
        else if (planet === 'Earth'){
            planetData = solarSystem.getEarth();
        }
        else if (planet === 'Mars'){
            planetData = solarSystem.getMars();
        }
        else if (planet === 'Jupiter'){
            planetData = solarSystem.getJupiter();
        }
        else if (planet === 'Saturn'){
            planetData = solarSystem.getSaturn();
        }
        else if (planet === 'Uranus'){
            planetData = solarSystem.getUranus();
        }
        else if (planet === 'Neptune'){
            planetData = solarSystem.getNeptune();
        }
        else if (planet === 'Pluto'){
            planetData = solarSystem.getPluto();
        }

        console.log(planetData);

        if(planetData){
            res.render('planet.ejs', {planetData: planetData, images: images});
        }

    }catch(err){
        console.log(err);
    }
});
//these are basically routes, and saying what it should do


app.listen(3000, () => {
    console.log('server started');
});