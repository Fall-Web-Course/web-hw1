const redis = require("redis");
const client = redis.createClient();
const crypto = require('crypto');
const exp = require("constants");

client.on("error", function(error) {
  console.error(error);
});



 var phrase = ""

exports.get_form = function(req, res, next) {
  if (req.query.hash_value === undefined) {
    res.render('index', { phrase_1: "", 
                          hash_value_1: "",
                          phrase_2: "",
                          hash_value_2: "",
                          title: 'Node App'});
  }
  else {
    client.get(req.query.hash_value, (err, val) => {
      if (err) {
        res.render('not_found', { error_message: "Something bad happened!",
                                  title: 'Node App'});
      }
      if (val == null) {
        res.render('not_found', { error_message: "key not found",
          title: 'Node App'});
      }
      res.render('index', { phrase_1: val, 
                            hash_value_1: req.query.hash_value, 
                            phrase_2: "",
                            hash_value_2: "",
                            title: 'Node App'});
     })

  }
}

exports.submit_form = function(req, res, next) {
  if (req.body.phrase.length < 8) {
    res.render('not_found', { error_message: "phrase should have more than 7 characters...",
    title: 'Node App'});
  }
  hash_value = crypto.createHash("sha256")
  .update(req.body.phrase)
  .digest("hex")
  client.set(hash_value, req.body.phrase, redis.print);
  res.render('index', { phrase_2: req.body.phrase, 
                        hash_value_2: hash_value, 
                        phrase_1: "",
                        hash_value_1: "",
                        title: 'Node App'});
}


exports.get_by_hash = function(req, res, next) {
  if (req.query.hash_value === undefined) {
    res.json({ error_message: "You should give hash_value as parameter",
               status_code: 404});
  }
  else {
    client.get(req.query.hash_value, (err, val) => {
      if (err) {
        res.json({ error_message: "Something bad happened!",
                   status_code: 404});
      }
      if (val == null) {
        res.json({ error_message: "Hash not found!",
                   status_code: 404});
      }
      res.json({
        value: val,
      });
     })
  }
}

exports.set_by_phrase = function(req, res, next) {
  console.log(req.body.string)
  if (req.body.string.length < 8) {
    res.json({
      error_message: "phrase should have more than 7 characters...",
      status_code: 404
    });
  }
  hash_value = crypto.createHash("sha256")
  .update(req.body.string)
  .digest("hex")
  client.set(hash_value, req.body.string, redis.print);
  res.json({
    sha256: hash_value
  });
}


