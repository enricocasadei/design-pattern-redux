
const command = new Commander()
const dispatcher = new Dispatcher();
const stack = document.querySelector('#stack')

function push(n) {
  var p = document.createElement('p');
  p.innerText = String(n)
  stack.appendChild(p)
};

function pop() {
  var first = stack.firstChild
  if(!first)return
  var value = first.innerText
  first.parentNode.removeChild(first);
  return parseInt(value) || 0;
}

function reset() {
  stack.innerHTML = ""
}
const numbers = [0,1,2,3,4,5,6,7,8,9]
numbers.forEach((num)=>{
	command.addCommand('add-number-to-stack-'+num, {
	  execute: function() { push(num); },
	  undo: function() { pop(); }
	});
})

const operators = ['+','-','/','*'] 

operators.forEach(function(operator){
	command.addCommand("calc-"+operator, (()=> {
	  var prev = [];
	  return {
	    execute: function() {
	      var n1 = pop(), n2 = pop();
	      prev.push(n1);
	      prev.push(n2);
	      
	      push(eval(n1 + operator + n2));
	    },
	    undo: function() {
	      pop();
	      push(prev.pop());
	      push(prev.pop());
	    }
	  };
	})());

})




dispatcher.addListener('[Number] to stack', (number) => {
command.execute("add-number-to-stack-"+number);
});

dispatcher.addListener('[Operators] calc', (operator) => { 
command.execute("calc-"+operator);
});


dispatcher.addListener('RESET', () => { 
reset();
command.restart();
});

dispatcher.addListener('UNDO', () => {
command.undo();
});

dispatcher.addListener('REDO', () => { 
command.redo();
});





