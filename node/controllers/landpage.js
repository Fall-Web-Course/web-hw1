const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});


function cyrb53(keyString)
{
  let hash = 0;
  for (charIndex = 0; charIndex < keyString.length; ++charIndex)
  {
    hash += keyString.charCodeAt(charIndex);
    hash += hash << 10;
    hash ^= hash >> 6;
  }
  hash += hash << 3;
  hash ^= hash >> 11;
  //4,294,967,295 is FFFFFFFF, the maximum 32 bit unsigned integer value, used here as a mask.
  return (((hash + (hash << 15)) & 4294967295) >>> 0).toString(16)
};

exports.get_form = function(req, res, next) {
  // res.render('index', { hash_value: req.query.hash_value });
  res.render('index', { phrase: client.get(req.query.hash_value, redis.print), 
                        hash_value: req.query.hash_value, 
                        title: 'Node App'});
}

exports.submit_form = function(req, res, next) {
  hash_value = cyrb53(req.body.phrase)
  client.set(hash_value, req.body.phrase, redis.print);
  res.render('index', { phrase: req.body.phrase, 
                        hash_value: hash_value, 
                        title: 'Node App'});
}
