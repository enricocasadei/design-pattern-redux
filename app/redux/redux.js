const createStore = (reducer, initialState) => {
	const store = {};
	store.state = initialState;
	store.listeners = [];
	store.getState = () => store.state;
	store.subscribe = listener => {
		store.listeners.push(listener);
	};
	store.dispatch = action => {
		console.log('> Action', action);
		store.state = reducer(store.state, action);
		store.listeners.forEach(listener => listener());
	};
	return store;
};
const getInitialState = () => {
	return {
		calc: {
		    past: [],
		    present: 0,
		    future: []
		  }
	};
};


const reducer = (state = getInitialState(), action) => {
	const { past, present, future } = state.calc;

	switch (action.type) {
		case 'INSERT':
		return {
			calc:{
				past:[...past, present],
				present: parseInt(action.payload) ,
				future:[...future]
			}
		};
		return nextState;
		case 'ADD':
		return {
			calc:{
				past:[...past, present],
				present: past[past.length-1] + present,
				future:[...future]
			}
		};
		case 'SUB':
		return {
			calc:{
				past:[...past, present],
				present: past[past.length-1] - present,
				future:[...future]
			}
		};
		case 'MOL':
		return {
			calc:{
				past:[...past, present],
				present: past[past.length-1] * present,
				future:[...future]
			}
		};
		case 'DIV':
		return {
			calc:{
				past:[...past, present],
				present: Math.floor(past[past.length-1] / present),
				future:[...future]
			}
		};
		case 'RESET':
		return {
			calc:{
				past:[],
				present:0,
				future:[]
			}
		};
		case 'UNDO':

		const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
		return {
			calc:{
				past:newPast,
				present: previous,
				future:[present, ...future]
			}
		};
		case 'REDO':
		const newFuture = future.slice(1)
		const next = future[0]

		return {
			calc:{
				past:[...past, present],
				present: next,
				future: newFuture
			}
		};

		default:
		return state;
	}
};


