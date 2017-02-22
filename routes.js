var express = require('express');
var config  = require('./config');
var router  = express.Router();
var merge   = require('merge');

var googleMapsClient = require('@google/maps').createClient({
  key: config.api_key
});

var getElevations = function(group) {
	return new Promise(function(resolve, reject){
		googleMapsClient.elevation({locations: group}, 
		  function(err, resp){
		  if (err) {
		    reject(err);
		  } else {
		  	results = resp.json.results;
		  	results.map(function(obj, idx) {
		  		delete obj.location;
		  		return merge(obj, group[idx]);
		  	});
		  	resolve(results);
		  }
		});
	});
}

router.get('/', function(req, res){
	res.send('Elevations API')
})

router.post('/', function(req, res){
	var groups = [], stuff = [], size = 200;

	while (req.body.length > 0) {
		groups.push(req.body.splice(0, size));
	}

	groups.forEach(function(group, idx){
		getElevations(group).then(function(results){
			Array.prototype.push.apply(stuff, results)
			console.log(stuff.length)
			if (idx = group.length - 1) {
				res.status(200).send(stuff)
			}
		}).catch(function(err){
			res.send({'error':err})
		})
	})	
})

module.exports = router;
