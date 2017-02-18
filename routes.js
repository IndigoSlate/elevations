var express = require('express');
var config = require('./config');
var router = express.Router();

var googleMapsClient = require('@google/maps').createClient({
  key: config.api_key
});

router.get('/', function(req, res){
	res.send('Elevations API')
})

router.post('/', function(req, res){
	googleMapsClient.elevation({
	  locations: req.body
		}, (err, resp) => {
	  if (err) {
	    res.status(400).send(err)
	  } else {
	  	res.status(200).send(resp.json.results)
	  }
	})
})

module.exports = router;