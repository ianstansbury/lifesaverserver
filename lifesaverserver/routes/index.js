var express = require('express');
var rest = require('restler');
var app = express();
var router = express.Router();

var hostUrl = "localhost:3000"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/vitals', function(req, res) {

    var db = req.db;
    var collection = db.get('vitals');
    collection.find({},{},function(e,docs){
        res.json(docs)
    });
});

router.get('/vitals/:id', function(req, res) {

    var db = req.db;
    var id = req.params.id
    console.log(id)
    var collection = db.get('vitals');
    collection.find({},{},function(e,docs){
        res.json(docs)
    });
});

router.get('/alert', function(req, res){

	var userId = "553474447"
	var appKey = "LE_2CAFA83F2140EE3C_1"
	var urlPrefix = "https://systest.digitallife.att.com:443/penguin";
	var uuid = ""
	var authtoken = ""
	var requestToken = ""
	//login
	var authurl = urlPrefix + "/api/authtokens?userId=" + userId + "&password=NO-PASSWD&domain=DL&appKey=" + appKey
	rest.post(authurl).on('complete', function(result) {
	  if (result instanceof Error) {
	    res.status('Error::').json(result.message);
	    this.retry(5000); // try again after 5 sec 
	  } else {
	  	
	  	
	  	var content = result.content
	  	authtokens = content.authToken
	  	
	  	uuid = content.uuid
	  	requestToken = content.requestToken
	  	var gatewayGuid  = content.gateways[0].id
	  	//console.log(gatewayGuid)
	  	// console.log(authtokens + "///" + uuid + "///" + requestToken)
	    //res.json(result);

	    var addedUrl = "/api/" + gatewayGuid + "/devices"
    	var authHeaders = {"appKey": appKey, "requestToken": requestToken, "authToken": authtokens};

    	rest.get(urlPrefix + addedUrl, {headers : authHeaders}).on('complete', function(result) {
		  if (result instanceof Error) {
		    console.log('Error:', result.message);
		  } else {

		  	var contentArray = result.content
		  	var lightGUID = ""
		  	var lockGUID = ""
		  	var cameraGUID = ""

		  	for(var i = 0; i < contentArray.length; i++) {
		  		device = contentArray[i]
		  		if (device.deviceType === "smart-plug"){
		  			lightGUID = device.deviceGuid
		  		}else if(device.deviceType === "door-lock"){
		  			lockGUID  = device.deviceGuid
		  		}else if(device.deviceType === "camera"){
		  			cameraGUID = device.deviceGuid
		  		}
		  	}



		  	//turn on lights
			var deviceUrl = "/api/" + gatewayGuid + "/devices/" + lightGUID + "/switch"
			var jsonData = "on"
			console.log(urlPrefix + deviceUrl)
		  	rest.post(urlPrefix + deviceUrl, {
		  		headers : authHeaders,
		  		data: jsonData

		  		}).on('complete', function(data,response) {
			  if (result instanceof Error) {
			    res.status('Error::').json(response.message);
			    this.retry(5000); // try again after 5 sec 
			  } else {
			  }
			});  

			//unlock doors
			var deviceUrl2 = "/api/" + gatewayGuid + "/devices/" + lockGUID + "/lock"
			var jsonData2 = "unlock"
			console.log(urlPrefix + deviceUrl2)
		  	rest.post(urlPrefix + deviceUrl2, {
		  		headers : authHeaders,
		  		data: jsonData2

		  		}).on('complete', function(data,response) {
			  if (result instanceof Error) {
			    res.status('Error::').json(response.message);
			    this.retry(5000); // try again after 5 sec 
			  } else {
			  	res.json(data)
			  	console.log(data)
			  }
			});  


			//turn on camera
			var deviceUrl3 = "/api/" + gatewayGuid + "/devices/" + cameraGUID + "/capture"
			var jsonData3 = "image"
		  	console.log(urlPrefix + deviceUrl3)
		  	rest.post(urlPrefix + deviceUrl, {
		  		headers : authHeaders,
		  		data: jsonData3

		  		}).on('complete', function(data,response) {
			  if (result instanceof Error) {
			    res.status('Error::').json(response.message);
			    this.retry(5000); // try again after 5 sec 
			  } else {
			  }
			});  


		  	//res.json(result)
		  }
		});

	  }
	});
});

router.post('/alert', function(req, res){

	var userId = "553474447"
	var appKey = "LE_2CAFA83F2140EE3C_1"
	var urlPrefix = "https://systest.digitallife.att.com:443/penguin";
	var uuid = ""
	var authtoken = ""
	var requestToken = ""
	//login
	var authurl = urlPrefix + "/api/authtokens?userId=" + userId + "&password=NO-PASSWD&domain=DL&appKey=" + appKey
	rest.post(authurl).on('complete', function(result) {
	  if (result instanceof Error) {
	    res.status('Error::').json(result.message);
	    this.retry(5000); // try again after 5 sec 
	  } else {
	  	
	  	
	  	var content = result.content
	  	authtokens = content.authToken
	  	
	  	uuid = content.uuid
	  	requestToken = content.requestToken
	  	var gatewayGuid  = content.gateways[0].id
	  	//console.log(gatewayGuid)
	  	// console.log(authtokens + "///" + uuid + "///" + requestToken)
	    //res.json(result);

	    var addedUrl = "/api/" + gatewayGuid + "/devices"
    	var authHeaders = {"appKey": appKey, "requestToken": requestToken, "authToken": authtokens};

    	rest.get(urlPrefix + addedUrl, {headers : authHeaders}).on('complete', function(result) {
		  if (result instanceof Error) {
		    console.log('Error:', result.message);
		  } else {

		  	var contentArray = result.content
		  	var lightGUID = ""
		  	var lockGUID = ""
		  	var cameraGUID = ""

		  	for(var i = 0; i < contentArray.length; i++) {
		  		device = contentArray[i]
		  		if (device.deviceType === "smart-plug"){
		  			lightGUID = device.deviceGuid
		  		}else if(device.deviceType === "door-lock"){
		  			lockGUID  = device.deviceGuid
		  		}else if(device.deviceType === "camera"){
		  			cameraGUID = device.deviceGuid
		  		}
		  	}



		  	//turn on lights
			var deviceUrl = "/api/" + gatewayGuid + "/devices/" + lightGUID + "/switch"
			var jsonData = "on"
			console.log(urlPrefix + deviceUrl)
		  	rest.post(urlPrefix + deviceUrl, {
		  		headers : authHeaders,
		  		data: jsonData

		  		}).on('complete', function(data,response) {
			  if (result instanceof Error) {
			    res.status('Error::').json(response.message);
			    this.retry(5000); // try again after 5 sec 
			  } else {
			  }
			});  

			//unlock doors
			var deviceUrl2 = "/api/" + gatewayGuid + "/devices/" + lockGUID + "/lock"
			var jsonData2 = "unlock"
			console.log(urlPrefix + deviceUrl2)
		  	rest.post(urlPrefix + deviceUrl2, {
		  		headers : authHeaders,
		  		data: jsonData2

		  		}).on('complete', function(data,response) {
			  if (result instanceof Error) {
			    res.status('Error::').json(response.message);
			    this.retry(5000); // try again after 5 sec 
			  } else {
			  	//res.json(data)
			  	console.log(data)
			  }
			});  


			//turn on camera
			var deviceUrl3 = "/api/" + gatewayGuid + "/devices/" + cameraGUID + "/capture"
			var jsonData3 = "image"
		  	console.log(urlPrefix + deviceUrl3)
		  	rest.post(urlPrefix + deviceUrl3, {
		  		headers : authHeaders,
		  		data: jsonData3

		  		}).on('complete', function(data,response) {
			  if (result instanceof Error) {
			    res.status('Error::').json(response.message);
			    this.retry(5000); // try again after 5 sec 
			  } else {
			  }
			});  


		  	res.json(result)
		  }
		});

	  }
	});
});

router.post('/heartbeats', function(req, res) {
	console.log(req.body)
	console.log(req.body.heartbeat)
	var heartbeats = req.body.heartbeat
	var db = req.db;
	var vitals = db.get('vitals')
	vitals.update(
		{userid: "1"},
		{$set: {heartbeat: heartbeats}},
		function (err) {
			if(err) return done(err);
		}
	);
	res.json("ok")

})

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

module.exports = router;
