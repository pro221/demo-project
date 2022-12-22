const jwt = require("jsonwebtoken");
Loginjwt = require("../models/user");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
     console.log('we are inside the code');
     console.log('Token Fetched: '+ req.headers.authorization.split(' ')[1]);
    jwt.verify(req.headers.authorization.split(' ')[1], (process.env.API_SECRET || "This_is_very_secret_string"), function (err, decode) {
      //if (err) req.Loginjwt = undefined;
      console.log('first ' + req.Loginjwt);
      console.log('decode is: ' + decode.id);  // this is the object id of the document inside the collection
      console.log('err: ' +err);
      Loginjwt.findOne({
          _id: decode.id      // we are checking the document is there inside the collection or not
        })
        .exec((err, Loginjwt) => {
            console.log('before if');
          if (err) {
            console.log('after if');
            res.status(500)
              .send({
                message: err
              });
          } else {
            console.log('in else');
            console.log('after else ' + Loginjwt);
            req.Loginjwt = Loginjwt;
            next();
          }
        })
    });
  } else {
    req.Loginjwt = undefined;
    next();
  }
};
module.exports = verifyToken;