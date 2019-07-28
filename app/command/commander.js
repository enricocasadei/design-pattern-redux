var Commander = (function(scope) {
  'use strict';
  var obj = {};
  var _commands = {};
  var _list = [];
  var _current = 0;
  var _currentCommand = function() {
    var name = _list[_current];
    return _commands[name];
  };
  obj.addCommand = function(name, command) {
    _commands[name] = command;
  };
  obj.execute = function(name) {
    var cmd = _commands[name];
    _list = _list.slice(0, _current);
    cmd.execute();
    _list.push(name);
    _current += 1;
  };
  obj.canUndo = function() {
    return _current > 0;
  };
  obj.canRedo = function() {
    return _current < _list.length;
  };
  obj.undo = function() {
    if(!obj.canUndo()) return false;
    _current -= 1;
    _currentCommand().undo();
    return true;
  };
  obj.redo = function() {
    if(!obj.canRedo()) return false;
    _currentCommand().execute();
    _current += 1;
    return true;
  };
  obj.restart = function() {
    _list = [];
    _current = 0;
  };
  return obj;
})(window);