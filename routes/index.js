var express = require('express');
var router = express.Router();
var docStore = require('s3-client');

var store = docStore.Store();
var storeMiddleware = store.middleware();

/* GET home page. */
/*Please make sure this is the  fileUploaded is the name field in the input type file in html*/
router.post('/data',storeMiddleware.putDoc.array('fileUploaded',5),function(req, res, next) {
  res.send({result:'send data'});
});

router.post('/upload',storeMiddleware.putDoc.single('fileUploaded'),function(req, res, next) {
  res.send({result:'send data'});
});

router.get('/downloadurl',function(req, res, next) {
	
  var params = {
                bucket: req.query.bucket || '', /* required */
                key: req.query.key || '', /* required , currently I have already uploaded , here key will always be the file name at the time of selection from html page*/
                expires: 60
  };
  store.getUrl(params, function(err, result){
	   
	   if(!err)
	   res.send(result.url); 
  });
  
});

router.get('/downloadStream', function(req, res, next){
	
	 var params = {
                bucket: req.query.bucket || '', /* required */
                key: req.query.key || '' /* required */
     };
	  
    store.getStream(params, function(err, result){
	  console.log(result.data);           // successful response
	  if(!err)
	  {
        res.set('Content-Type', result.data.ContenType);
        res.send(result.data.Body);
	  }
    });
});

module.exports = router;
