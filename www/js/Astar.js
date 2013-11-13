var fringe = [];
var visited = {};
var initial = null;
var goal = null;
var parent = {};
var path = [];

function f(state){
  var h = Math.sqrt((goal.lat - state.lat)*(goal.lat - state.lat) + (goal.lon - state.lon)*(goal.lon - state.lon));
  //var h = goal.lat - state.lat + goal.lon - state.lon;
  var g = state.g;
  return(g + h);
}

function do_search(initial_state, goal_state){
  fringe = [];
  visited = {};
  parent = {};
  initial = initial_state;
  goal = goal_state;
  path = [];
  initial.g = 0;
  
  
  fringe.push(initial);
  while(fringe.length > 0){
	fringe.sort(function(a, b){
	  return(f(b) - f(a));
	});
	var top = fringe.pop();
	if(visited[top.id])
		continue;
	if(goal.id == top.id){
	  gen_path(top);
	  return path;
	}

	visited[top.id] = true;

	var succ = [];
	var nodes = json[top.id].nei;
	for(var i = 0; i < nodes.length; i++){
		succ[i] = {};
		succ[i].id = nodes[i];
		succ[i].lat = json[nodes[i]].lat;
		succ[i].lon = json[nodes[i]].lon;
		succ[i].parent = top;
		succ[i].g = succ[i].parent.g + Math.sqrt((succ[i].lat-succ[i].parent.lat)*(succ[i].lat-succ[i].parent.lat) + (succ[i].lon-succ[i].parent.lon)*(succ[i].lon-succ[i].parent.lon));
	}

	for(i = 0; i < succ.length; i++){
	  if(parent[succ[i].id] == null){
		parent[succ[i].id] = succ[i].parent;
		fringe.push(succ[i]);
	  }
	}
  }
}

gen_path = function(top){
	path = [[top.lat, top.lon]];
	var t_id = top.id;
	while(t_id != initial.id){
		path.push([parent[t_id].lat, parent[t_id].lon]);
		t_id = parent[t_id].id;
	}
	path.push([parent[t_id].lat, parent[t_id].lon]);
	console.log(path);
}
