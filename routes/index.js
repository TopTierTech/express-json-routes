

exports.index = function(req, res){
  res.render('test', { title: 'Test 1' });
};

exports.test2 = function(req, res){
  res.render('test', { title: 'Test 2' });
};