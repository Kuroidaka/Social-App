const File = require('../models/files')
const fs = require('fs')



// let gfs;
// const conn = mongoose.createConnection(process.env.MONGODB_URL);
// conn.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);  
//     gfs.collection('/photo.files');
// });


const photoController = {
    upload:  async (req, res) => {
        if (req.file !== undefined) {
            const port = process.env.PORT || 'http://localhost:8000'
            const imgUrl = `${port}/file/${req.file.filename}`;
            return res.status(200).json(imgUrl);
        }
        else return
    },
    getFile :async (req, res) => {
        try {
            const readStream = fs.createReadStream(`asserts/uploads/${req.params.filename}`)
            readStream.pipe(res);
        } catch (error) {
            res.send("not found");
        }
    }
}   

module.exports = photoController