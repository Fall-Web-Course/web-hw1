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
