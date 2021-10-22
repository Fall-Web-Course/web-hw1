const redis = require("redis");
const client = redis.createClient();
const crypto = require('crypto')

client.on("error", function(error) {
  console.error(error);
});



 var phrase = ""

exports.get_form = function(req, res, next) {
  // res.render('index', { hash_value: req.query.hash_value });
  if (req.query == null) {
    res.render('index', { phrase: phrase, 
      hash_value: req.query.hash_value, 
      title: 'Node App'});
  }
  else {
    client.get(req.query.hash_value, (err, val) => {
      if (err) {
        res.render('index', { phrase: phrase, 
          hash_value: req.query.hash_value, 
          title: 'Node App'});
      }
      res.render('index', { phrase: val, 
                            hash_value: req.query.hash_value, 
                            title: 'Node App'});
     })

  }
}

exports.submit_form = function(req, res, next) {
  hash_value = crypto.createHash("sha256")
  .update(req.body.phrase)
  .digest("hex")
  client.set(hash_value, req.body.phrase, redis.print);
  res.render('index', { phrase: req.body.phrase, 
                        hash_value: hash_value, 
                        title: 'Node App'});
}
