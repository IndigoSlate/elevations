var express = require('express');
var config  = require('./config');
var router  = express.Router();
var merge   = require('merge')

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
	  	results = resp.json.results
	  	results.map(function(obj, idx) {
	  		delete obj.location
	  		return merge(obj, req.body[idx])
	  	})
	  	res.status(200).send(results)
	  }
	})
})

module.exports = router;