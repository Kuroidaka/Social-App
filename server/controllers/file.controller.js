const mongoose = require('mongoose')
const File = require('../models/files')
const fs = require('fs')
let Grid = require('gridfs-stream');


let gfs;
const conn = mongoose.createConnection(process.env.MONGODB_URL);
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('/photo.files');
});


const photoController = {
    upload:  async (req, res) => {
        if (req.file === undefined) return res.send("you must select a file.");
        const imgUrl = `http://localhost:8000/file/${req.file.filename}`;
        return res.status(200).json(imgUrl);
    },
    getFile :async (req, res) => {
        try {
            // const file = await gfs.files.findOne({ filename: req.params.filename });
            const readStream = fs.createReadStream(`./asserts/uploads/${req.params.filename}`)
            readStream.pipe(res);
        } catch (error) {
            res.send("not found");
        }
    }
}   

module.exports = photoController