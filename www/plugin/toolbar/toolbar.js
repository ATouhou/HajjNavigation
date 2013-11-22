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
		        'POIs', 'Managing POIs', 'leaflet-control-toolbar', container, this._btn_2_click, this);
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
		load_poi_list_items('');
		$('#manage_poi_window').fadeIn('fast');
		//change_state("ADD_POI", "Click on the map ");
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

L.Control.POIToolbar = L.Control.extend({
	options: {
		position: 'bottomleft'
	},

	onAdd: function (map) {
		var container = L.DomUtil.create('div', ' leaflet-bar inline-bar');

		this._map = map;

		this._btn_all  = this._createButton(
		        "<img src='images/poi/All.png' />", 'All',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_all_click,  this);
		this._btn_1  = this._createButton(
		        "<img src='images/poi/Disable Ramp.png' />", 'Disable Ramp',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_1_click,  this);
		this._btn_2  = this._createButton(
		        "<img src='images/poi/Haram Entrances.png' />", 'Haram Entrances',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_2_click,  this);
		this._btn_3  = this._createButton(
		        "<img src='images/poi/Hotels.png' />", 'Hotels',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_3_click,  this);
		this._btn_4  = this._createButton(
		        "<img src='images/poi/Medical.png' />", 'Medical',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_4_click,  this);
		this._btn_5  = this._createButton(
		        "<img src='images/poi/Mosques.png' />", 'Mosques',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_5_click,  this);
		this._btn_6  = this._createButton(
		        "<img src='images/poi/Place of Interest.png' />", 'Place of Interest',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_6_click,  this);
		this._btn_7  = this._createButton(
		        "<img src='images/poi/Resturants.png' />", 'Resturants',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_7_click,  this);
		this._btn_8  = this._createButton(
		        "<img src='images/poi/Services Center.png' />", 'Services Center',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_8_click,  this);
		this._btn_9  = this._createButton(
		        "<img src='images/poi/Shopping.png' />", 'Shopping',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_9_click,  this);
		this._btn_10  = this._createButton(
		        "<img src='images/poi/Toilet.png' />", 'Toilet',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_10_click,  this);
		this._btn_11  = this._createButton(
		        "<img src='images/poi/Transport.png' />", 'Transport',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_11_click,  this);
		this._btn_12  = this._createButton(
		        "<img src='images/poi/Wudu.png' />", 'Wudu',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_12_click,  this);
		this._btn_13  = this._createButton(
		        "<img src='images/poi/Zam - Zam.png' />", 'Zam - Zam',  'leaflet-control-toolbar inline-toolbar',  container, this._btn_13_click,  this);

		return container;
	},

	_btn_all_click: function (e) {
		filter_poi();
	},
	_btn_1_click: function (e) {
		filter_poi('Disable Ramp');
	},
	_btn_2_click: function (e) {
		filter_poi('Haram Entrances');
	},
	_btn_3_click: function (e) {
		filter_poi('Hotels');
	},
	_btn_4_click: function (e) {
		filter_poi('Medical');
	},
	_btn_5_click: function (e) {
		filter_poi('Mosques');
	},
	_btn_6_click: function (e) {
		filter_poi('Place of Interest');
	},
	_btn_7_click: function (e) {
		filter_poi('Resturants');
	},
	_btn_8_click: function (e) {
		filter_poi('Services Center');
	},
	_btn_9_click: function (e) {
		filter_poi('Shopping');
	},
	_btn_10_click: function (e) {
		filter_poi('Toilet');
	},
	_btn_11_click: function (e) {
		filter_poi('Transport');
	},
	_btn_12_click: function (e) {
		filter_poi('Wudu');
	},
	_btn_13_click: function (e) {
		filter_poi('Zam - Zam');
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
