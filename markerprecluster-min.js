L.DistanceGrid=function(zoom,minZoom,maxZoom){this._zoom=zoom;this._level=zoom-minZoom;this._dict={}};L.DistanceGrid.prototype={addObject:function(marker,point){var group=this._getGroup(marker);if(group!=null){this._dict[group]=marker}},_getGroupRecursive:function(marker){if(marker.hierarchy&&(marker.hierarchy.length>=this._level)){return marker.hierarchy[this._level]}else if(marker._childClusters){var children=marker._markers.concat(marker._childClusters);if(children.length){return this._getGroupRecursive(children[0])}}
return null},_getGroup:function(marker){var nodeID=this._getGroupRecursive(marker);marker.nodeID=nodeID;return nodeID},removeObject:function(marker,point){var group=this._getGroup(marker);if(group&&group in this._dict){delete this._dict[group];return true}else{return false}},getNearObject:function(marker){var group=this._getGroup(marker);if(group in this._dict){return this._dict[group]}else{return null}},};L.leaf=function(position,hierarchy,...options){var obj=L.marker(position,...options);obj.hierarchy=hierarchy;return obj};L.MarkerClusterGroup.prototype._generateInitialClusters=function(){var maxZoom=Math.ceil(this._map.getMaxZoom()),minZoom=Math.floor(this._map.getMinZoom()),radius=this.options.maxClusterRadius,radiusFn=radius;if(typeof radius!=="function"){radiusFn=function(){return radius}}
if(this.options.disableClusteringAtZoom!==null){maxZoom=this.options.disableClusteringAtZoom-1}
this._maxZoom=maxZoom;this._gridClusters={};this._gridUnclustered={};for(var zoom=maxZoom;zoom>=minZoom;zoom--){this._gridClusters[zoom]=new L.DistanceGrid(zoom,minZoom,maxZoom);this._gridUnclustered[zoom]=new L.DistanceGrid(zoom,minZoom,maxZoom)}
this._topClusterLevel=new this._markerCluster(this,minZoom-1)};L.MarkerClusterGroup.prototype._addLayer=function(layer,zoom){var gridClusters=this._gridClusters,gridUnclustered=this._gridUnclustered,minZoom=Math.floor(this._map.getMinZoom()),markerPoint,z;if(this.options.singleMarkerMode){this._overrideMarkerIcon(layer)}
layer.on(this._childMarkerEventHandlers,this);for(;zoom>=minZoom;zoom--){markerPoint=this._map.project(layer.getLatLng(),zoom);var closest=gridClusters[zoom].getNearObject(layer);if(closest){closest._addChild(layer);layer.__parent=closest;return}
closest=gridUnclustered[zoom].getNearObject(layer);if(closest){var parent=closest.__parent;if(parent){this._removeLayer(closest,false)}
var newCluster=new this._markerCluster(this,zoom,closest,layer);gridClusters[zoom].addObject(newCluster,this._map.project(newCluster._cLatLng,zoom));closest.__parent=newCluster;layer.__parent=newCluster;var lastParent=newCluster;for(z=zoom-1;z>parent._zoom;z--){lastParent=new this._markerCluster(this,z,lastParent);gridClusters[z].addObject(lastParent,this._map.project(closest.getLatLng(),z))}
parent._addChild(lastParent);this._removeFromGridUnclustered(closest,zoom);return}
gridUnclustered[zoom].addObject(layer,markerPoint)}
this._topClusterLevel._addChild(layer);layer.__parent=this._topClusterLevel;return};