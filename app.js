"use strict";

var http = require('http');

var env = process.env;
var url = require('url');
var fs = require('fs');
const configUrl = env.CONFIG_URL || 'http://app-cee3fd62-a81e-48b2-a766-a8be305d5fa9.cleverapps.io/file/master';
//console.log("before http config",configUrl);
const parsedUrl = url.parse(configUrl);
const requestOptions = {
  hostname: parsedUrl.hostname,
  path: parsedUrl.path,
  port: parsedUrl.port,
  headers: {
    Accept: 'text/plain, application/xml , application/ld+json',
    'user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:44.0) Gecko/20100101 Firefox/44.0',
  }
};

http.get(requestOptions, function(res) {
  var responseBody = '';
  if (res.statusCode == 200) {

  }
  res.on('data', chunk => {
    responseBody += chunk.toString();
  });

  res.on('end', () => {
    let content = 'module.exports = ' + responseBody;
    console.log(content);
    fs.writeFile("configuration.js", content, 'utf8', function(err) {
      require('./timerScheduler').run(true);
    });
  });

}.bind(this)).on('error', (e) => {
  console.error('timer APP config error', e);
  throw new Error(e)
});

//
// httpGet.makeRequest('GET', configUrl).then(result => {
//   console.log('~~ remote config | ', result);
//   const configJson = result.data;
//   const content = 'module.exports = ' + JSON.stringify(result.data);
//
//
//
//   fs.writeFile("configuration.js", content, 'utf8', function (err) {
//     if (err) {
//       return console.log(err);
//     } else {
//
//       //console.log("~~ remote configuration saved");
//       require('./lib/core/Oauth/google_auth_strategy')(passport);
//
//       var jwtService = require('./webServices/jwtService')
//
//
//       //Sécurisation des route de data
//       safe.use(function (req, res, next) {
//         // ensureSec(req,res,next)
//         jwtService.securityAPI(req, res, next);
//       })
//
//
//
//       app.disable('etag'); //what is that? cache desactivation in HTTP Header
//
//       unSafeRouteur.use(cors());
//
//       require('./webServices/initialiseHTTPS')(unSafeRouteur);
//       require('./webServices/authWebService')(unSafeRouteur);
//       require('./webServices/workspaceWebService')(safe);
//       require('./webServices/workspaceComponentWebService')(safe);
//       require('./webServices/technicalComponentWebService')(safe, unSafeRouteur);
//       require('./webServices/userWebservices')(safe);
//       require('./webServices/rightsManagementWebService')(safe);
//       require('./webServices/adminWebService')(safe);
//
//       ///OTHER APP COMPONENT
//       ///SECURISATION DES REQUETES
//       app.get('/',function(req, res, next){
//         res.redirect('/ihm/application.html');
//       });
//       app.use('/auth', express.static('static'));
//       app.use('/auth', unSafeRouteur);
//       app.use('/configuration', unSafeRouteur);
//       app.use('/data/specific', unSafeRouteur);
//       app.use('/data/api', unSafeRouteur);
//       app.use('/data/core', safe);
//       app.use('/ihm', express.static('static'));
//       app.use('/browserify', express.static('browserify'));
//       app.use('/npm', express.static('node_modules'));
//
//       let errorLib = require('./lib/core/lib/error_lib');
//       let jwtSimple = require('jwt-simple');
//       let errorParser = require('error-stack-parser');
//       app.use(function (err, req, res, next) {
//         if (err) {
//           var token = req.body.token || req.query.token || req.headers['authorization'];
//           //console.log('token |',token);
//           let user;
//           if (token != undefined) {
//             token.split("");
//             let decodedToken = jwtSimple.decode(token.substring(4, token.length), configJson.secret);
//             user = decodedToken.iss;
//             //console.log('user |',user);
//           }
//           errorLib.create(err, user);
//           //console.log(err);
//           //console.log('XXXXXXXXXXX',res);
//           res.status(500).send({
//             message: err.message,
//             stack: errorParser.parse(err),
//             displayMessage: err.displayMessage
//           });
//         }
//         //able to centralise response using res.data ans res.send(res.data)
//       });
//
//       server.listen(process.env.PORT || 8081, function () {
//         console.log('~~ server started at ', this.address().address, ':', this.address().port)
//         require('./timerScheduler').run(true);
//
//         if (jenkins) {
//           console.log("jenkins is true");
//           http.get('http://bkz2jalw7c:3bdcf7bc40f582a4ae7ff52f77e90b24@tvcntysyea-jenkins.services.clever-cloud.com:4003/job/semanticbus-pic-3/build?token=semantic_bus_token', function (res) {
//             console.log("jenkins JOB 3 is trigger")
//           })
//         }
//         // console.log('Listening on port  ');
//         // console.log(this.address().port);
//         //console.log('new message from master 18');
//         //console.log(this.address());
//       })
//
//       // Lets encrypt response
//
//       app.get('/.well-known/acme-challenge/:challengeHash', function (req, res) {
//         var params = req.params.challengeHash.substr(0, req.params.challengeHash.length)
//         var hash = params + ".rCIAnB6OZN-jvB1XIOagkbUTKQQmQ1ogeb5DUVFNUko";
//         res.send(hash)
//       });
//
//       /// Nous Securisons desormais IHM par un appel AJAX
//       /// à lentrée sur la page application.html
//
//       server.on('error', function (err) {
//         console.log(err)
//       })
//     }
//   });
//})
