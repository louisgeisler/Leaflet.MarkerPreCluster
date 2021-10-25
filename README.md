Leaflet.markerprecluster
=====================

Change the behavior oh the [MarkerCluster plugin](https://github.com/Leaflet/Leaflet.markercluster)

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

```javascipt
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

var leafs = L.markerClusterGroup({
	showCoverageOnHover: false,
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
```
![Présentation sans titre](https://user-images.githubusercontent.com/82355033/138681708-844ceeec-a493-4289-ad5f-b43fba164507.jpg)

