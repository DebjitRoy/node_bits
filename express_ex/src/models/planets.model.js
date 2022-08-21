const {parse} = require('csv-parse');
const fs = require('fs');
const path = require('path');

const isHabitable = planet =>{
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && 
    planet['koi_insol'] < 1.11 && 
    planet['koi_prad'] < 1.6
}
const results = [];
const csvPath = path.join(__dirname, 'kepler.csv');
fs.createReadStream(csvPath)
        .pipe(parse({
            comment:'#',
            columns: true, // object literals instead of array
        })) // readable stream -> writable stream
        .on('data',(data)=>{
            if(isHabitable(data)) {
                results.push(data)
            }
            
        })
        .on('error',(err)=>console.log(err))
        .on('end',()=>{
            console.log("Kepler Result",results.map(planet=>planet["kepoi_name"]))
        })

exports.keplerData = results