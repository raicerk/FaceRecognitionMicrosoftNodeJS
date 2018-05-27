var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var config = require('./config')

var app = express();

var router = express.Router();

app.set('port', config.puerto);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function(req, res) {
  res.status(200).send({
    mensaje: "mi app con reconocimiento facial"
  });
});

router.post('/imagen', function(req, res) {

  request.post({
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': config.tokenAPIMicrosoftCognitive
    },
    url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
    body: fs.createReadStream('imagen.jpg')
  }, function(error, response, body) {
    res.status(200).send(JSON.parse(response.body))
  });
})

app.use(router);

app.listen(app.get('port'), function() {
  console.log(`Express corriendo en http://localhost:${config.puerto}`);
});
