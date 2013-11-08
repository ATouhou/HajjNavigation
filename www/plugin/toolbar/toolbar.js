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
		        'Button 2', 'Button 2', 'leaflet-control-toolbar', container, this._btn_2_click, this);
		this._btn_exit = this._createButton(
		        'Exit', 'Exit', 'leaflet-control-toolbar', container, this._btn_exit_click, this);

		return container;
	},

	_btn_1_click: function (e) {
		get_my_location();
	},

	_btn_2_click: function (e) {
		alert("Button 2 clicked");
	},

	_btn_exit_click: function (e) {
		mosync.app.exit();
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
