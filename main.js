var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const toStream = require('buffer-to-stream');
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
    mensaje: "mi API de reconocimiento facial"
  });
});

router.post('/reconoce', function(req, res) {

  request.post({
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': config.tokenAPIMicrosoftCognitive
    },
    url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
    body: toStream(Buffer.from(req.body.imagen, 'base64'))
  }, function(error, response, body) {
    res.status(response.statusCode).send(JSON.parse(response.body))
  });
})

app.use(router);

app.listen(app.get('port'), function() {
  console.log(`Express corriendo en http://localhost:${config.puerto}`);
});
