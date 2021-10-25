Leaflet.markerprecluster
=====================

Change the behavior of the [MarkerCluster plugin](https://github.com/Leaflet/Leaflet.markercluster) to use data pre-clustered.

# Using the plugin

Download the *markerprecluster-min.js* file and add the following lines in the header of your html file:
```html
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
<script src="markerprecluster-min.js"></script>
```

**Nota Bene:** You need to import the leaflet package and markerclusterpackage before using that plugin

# Example
See the included examples for usage.

# Usage
It behaves almost exactly like the [MarkerCluster plugin](https://github.com/Leaflet/Leaflet.markercluster), with only one difference: L.leaf

Instead of adding markers to markerClusterGroup, you will add leaves that will give information to build the tree.

```html
<!DOCTYPE html>
<html>
<head>
	<title>MarkerPreCluster - Demo</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
	<script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
    <script src="markerprecluster-min.js"></script>
	<style>
		body {
			padding: 0;
			margin: 0;
		}
		html, body, #map {
			height: 100%;
			width: 100%;
			background: white;
		}
		#map .leaflet-div-icon {
			width:0;
			height:0;
			border: 0;
			padding: 0;
		}
		#map .leaflet-div-icon div {
			display:inline-block;
			padding: 3px;
			border: 1px solid #666;
			border-radius: 3px;
			background:#fff;
			transform:translate(-50%, -50%);
			text-align: center;
		}
	</style>
</head>
<body>
<div id='map'></div>
<script>

const dNode = {
	1: "You",
	2: "ok?",
	0: "Hi!",
};
const lLeaf = [
	[[0,1], [2, -2], "Hope"],
	[[0,1], [1, -1], "you"],
	[[0,1], [0, 0], "like"],
	[[0,2], [-1, 1], "that"],
	[[0,2], [-2, 2], "Plugin :-)"],
];

const maxDepth = 2;
const bounds = [[-2, -2], [2, 2]];


var map = L.map('map', {
	zoom: 0,
	center: [0,0],
	crs: L.CRS.Simple,
});
map.fitBounds(bounds);

var zoomOffset = map.getZoom();
map.options.minZoom = zoomOffset-maxDepth;
map.options.maxZoom = zoomOffset;
map.options.zoom = zoomOffset;

var leafs = L.markerClusterGroup({
	spiderfyOnMaxZoom: false,
	showCoverageOnHover: false,
	zoomToBoundsOnClick: true,
	singleMarkerMode: false,
	iconCreateFunction: function(cluster) {
		return L.divIcon({ html: "<div><b>"+ dNode[cluster.nodeID] + '</b><br>(' + cluster.getChildCount() + "children)</div>", iconSize: "auto"});
	},
});
for (var info of lLeaf) {
	var hierarchy = info[0];
	var position = info[1];
	var popup = info[2];
	var leaf = L.leaf(position, hierarchy).bindTooltip(popup, {permanent: true});
	leafs.addLayer(leaf);
}
map.addLayer(leafs);
map.setView([0,0],map.options.minZoom);
</script>
</body>
</html>
```
![Présentation sans titre](https://user-images.githubusercontent.com/82355033/138681708-844ceeec-a493-4289-ad5f-b43fba164507.jpg)

As you see, the path (hierarchical path) explained how the leaf must fusion to create nodes.

So when you use ```L.leaf(position, hierarchical_path)```, just like the exemple.
