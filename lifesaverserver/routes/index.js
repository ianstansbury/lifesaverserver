var express = require('express');
var rest = require('restler');
var app = express();
var router = express.Router();

var hostUrl = "localhost:3000"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/alarm', function (req, res) {
  res.send('Got a POST request');
})

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
    		console.log("got here1")
		  if (result instanceof Error) {
		    console.log('Error:', result.message);
		  } else {
		  	console.log("got here2")
		  	res.json(result)
		  }
		});

	  }
	});

});

app.post('/alert', function(req, res){

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
    		console.log("got here1")
		  if (result instanceof Error) {
		    console.log('Error:', result.message);
		  } else {
		  	console.log("got here2")

		 //  	rest.post(authurl).on('complete', function(result) {
			//   if (result instanceof Error) {
			//     res.status('Error::').json(result.message);
			//     this.retry(5000); // try again after 5 sec 
			//   } else {
			  	
			//   }
			// });  

		  	res.json(result)
		  }
		});

	  }
	});
});

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
