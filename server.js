// const https = require('https');
// const fs = require('fs');
const express = require('express');
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

// app.get('*',function(req,res,next){
// 	if(req.headers['x-forwarded-proto']!='https') {
// 		const host = req.get('host');
// 		const redirectURL = `https://${host}${req.url}`;
// 		console.log(redirectURL);
// 		res.redirect(redirectURL);
// 	}
// 	else {
// 		next() /* Continue to other routes if we're not redirecting */
// 	}
// })

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)