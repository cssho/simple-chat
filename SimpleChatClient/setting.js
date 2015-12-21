var fs = require('fs'),
  path = require('path');

exports.initialize = function(){

  if (!fs.existsSync(path.join(__dirname, 'setting.json'))) {
    fs.writeFileSync(path.join(__dirname, 'setting.json'), JSON.stringify({
      server: 'http://10.160.9.79:3000',
      username: 'hoge_user'
    }));
  }
};

exports.get = function(){
  delete require.cache[path.join(__dirname, 'setting.json')];
  return require('./setting.json');
};

exports.set = function(name, value){
  var setting = exports.get();
  setting[name] = value;
  fs.writeFileSync(path.join(__dirname, 'setting.json'), JSON.stringify(setting));
}