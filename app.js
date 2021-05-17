const express = require('express');
const ytdl = require("ytdl-core");
var favicon = require('serve-favicon')
var path = require('path')
const app = express();


app.use(express.json());
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')))



app.get('/',(req,res)=>{
	res.sendFile(__dirname + "/views/index.html")
})


app.get('/videoInfo', async(req,res) =>{
	const url = req.query.url;
	const info = await ytdl.getInfo(url);
	if(!info){
		return res.status(400).json({error:'Failed to fetch video'})
	}else{
		res.status(200).json(info.videoDetails)
	}
})


app.get('/download',(req,res) =>{
	const videoURL = req.query.videoURL;
	res.header("Content-Disposition",'attachment;\ filename="video.mp4"');
	ytdl(videoURL,{
		filter: format => format.container === 'mp4'
	}).pipe(res);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
	console.log(`App listening to port 3000`)
})