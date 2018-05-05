/*
 * Define routes to index and chat pages in the pages folder
 */

exports.index = function(req, res){
  res.render('index');
};

exports.pages = function (req, res) {
  var name = req.params.name;
  res.render('pages/' + name);
};