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

function do_search(type, initial_state, goal_state){
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
	var nodes;
	if(type=="walk")
		nodes = json[top.id].wn;
	else if(type=="drive")
		nodes = json[top.id].dn;
	var c = 0;
	for(var i = 0; i < nodes.length; i++){
		if(json[nodes[i]] == undefined) continue;
		succ[c] = {};
		succ[c].id = nodes[i];
		succ[c].lat = json[nodes[i]].lat;
		succ[c].lon = json[nodes[i]].lon;
		succ[c].parent = top;
		succ[c].g = succ[c].parent.g + Math.sqrt((succ[c].lat-succ[c].parent.lat)*(succ[c].lat-succ[c].parent.lat) + (succ[c].lon-succ[c].parent.lon)*(succ[c].lon-succ[c].parent.lon));
		c++;
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
	if(parent[t_id] != undefined)
		path.push([parent[t_id].lat, parent[t_id].lon]);
	console.log(path);
}
