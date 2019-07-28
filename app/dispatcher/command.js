class Commander {
constructor(){
this._commands = {};
this._list = [];
this._current = 0;

}

addCommand(name, command){
this._commands[name] = command;
};

execute(name, dati){
const cmd = this._commands[name];
this._list = this._list.slice(0, this._current);
cmd.execute(dati);
this._list.push(name);
this._current += 1;
};

canUndo(){ return this._current > 0 };

canRedo(){ return this._current < this._list.length};

undo(){
if( !this.canUndo() ) return false;
this._current -= 1;
this._currentCommand().undo();
return true;
};

redo(){
if( !this.canRedo() ) return false;
this._currentCommand().execute();
this._current += 1;
return true;
};

restart(){
this._list = [];
this._current = 0;
};

_currentCommand(){
const name = this._list[this._current];
return this._commands[name];
}
}