exports.get_form = function(req, res, next) {
  res.render('index', { title: 'Amin' });
}

exports.submit_form = function(req, res, next) {
  console.log("phrase:", req.body.phrase)
  console.log("hash_value:", req.body.hash_value)
  res.redirect('/sha256')
}
