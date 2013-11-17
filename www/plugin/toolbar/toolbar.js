L.Control.Toolbar = L.Control.extend({
	options: {
		position: 'topright'
	},

	onAdd: function (map) {
		var container = L.DomUtil.create('div', ' leaflet-bar');

		this._map = map;

		this._btn_1  = this._createButton(
		        'My Location', 'My Location',  'leaflet-control-toolbar',  container, this._btn_1_click,  this);
		this._btn_2 = this._createButton(
		        'Add POI', 'Add POI', 'leaflet-control-toolbar', container, this._btn_2_click, this);
		this._btn_3 = this._createButton(
		        'Routing', 'Routing', 'leaflet-control-toolbar', container, this._btn_3_click, this);
		this._btn_4 = this._createButton(
		        'Drive', 'Drive', 'leaflet-control-toolbar', container, this._btn_4_click, this);

		return container;
	},

	_btn_1_click: function (e) {
		get_my_location();
	},

	_btn_2_click: function (e) {
		change_state("ADD_POI", "Click on the map ");
	},

	_btn_3_click: function (e) {
		if(route){
			map.removeLayer(route);
			route = null;
			for(var i = 0; i < routing_markers.length; i++){
				map.removeLayer(routing_markers[i]);
			}
			routing_markers = [];
			routing_points = [];
		}
		change_state("ROUTING", "Tap on the map for source and dest");
	},
	
	_btn_4_click: function (e) {
		if(routing_type == "drive"){
			routing_type = "walk";
			this._btn_4.innerHTML = this._btn_4.title = "Walk";
		}
		else{
			routing_type = "drive";
			this._btn_4.innerHTML = this._btn_4.title = "Drive";
		}
	},
	
	_createButton: function (html, title, className, container, fn, context) {
		var link = L.DomUtil.create('a', className, container);
		link.innerHTML = html;
		link.href = '#';
		link.title = title;

		var stop = L.DomEvent.stopPropagation;

		L.DomEvent
		    .on(link, 'click', stop)
		    .on(link, 'mousedown', stop)
		    .on(link, 'dblclick', stop)
		    .on(link, 'click', L.DomEvent.preventDefault)
		    .on(link, 'click', fn, context);

		return link;
	},

	_updateDisabled: function () {
		var map = this._map,
			className = 'leaflet-disabled';

		L.DomUtil.removeClass(this._zoomInButton, className);
		L.DomUtil.removeClass(this._zoomOutButton, className);

		if (map._zoom === map.getMinZoom()) {
			L.DomUtil.addClass(this._zoomOutButton, className);
		}
		if (map._zoom === map.getMaxZoom()) {
			L.DomUtil.addClass(this._zoomInButton, className);
		}
	}
});
