var express = require('express');
var bodyParser = require('body-parser');
var exec = require('child_process').exec ;
var fs = require('fs');
var app = express()



app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/uploadfile', function (req, res) {

var x= req.body;
// console.log("x.UP_CONFIGS=" + JSON.parse(x.UP_CONFIGS));
  var m = `var PROD = false; \n
  var UP_CONFIG=${JSON.stringify(x.UP_CONFIGS, (key, value)=> {
	  console.log("in function value=" +value + "type=" + typeof value);
	  //return true;
		if (value === 'true'){
          return true;
	  }else if(value === 'false'){
		   return false;
	  }else if(!isNaN(value)){
		  return new Number(value)
	  }
  		return value;
	}, 4)}
  var LOGIN_MODAL = 'up_login_overlay';
  var GOOGLE_LOCATION_INPUT = ['#google_location', '#google_location_2'];
  UP_CONFIG.API_BASE = UP_CONFIG.API_BASE_VANILLA + 'api/';
  UP_CONFIG.AUTH_BUSINESS = 'apikey ' + UP_CONFIG.USERNAME + ':' + UP_CONFIG.API_KEY;
  var GOOGLE_LOCATION_INPUT_v2 = [{
      el: '#google_location',
      case: 're-render'
  }, {
      el: '#google_location_2',
      case: 're-render'
  }, {
      el: '#google_locality2',
      case: 'prefill-address'
  }, {
      el: '#google_location_landing_page',
      case: 'route-to-order'
  }];

  UP_CONFIG.SASS_VARS.locateme= UP_CONFIG.LOCATEME;
  var STATIC_PAGES = ['tos', 'faq', 'privacy'];

try {
    module.exports = {
        UP_CONFIG: UP_CONFIG
    };
} catch (err) {
    console.log('Module not available');
}`;
  fs.writeFileSync("./web-clients/js/up_config.js", m, function(err){
      console.log(err)



 });
  exec("cd web-clients; gulp", function(err, stdout, stderr){
      console.log(err);
      console.log(stdout);
      console.log(stderr);
    //   exec("gulp", function(err, stdout, stderr){
    //      console.log(err);
    //      console.log(stdout);
    //      console.log(stderr);
    //  })
  })
  exec("gulp", function(err, stdout, stderr){
     console.log(err);
     console.log(stdout);
     console.log(stderr);
 })

  res.send('hello world');
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
