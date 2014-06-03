// ==UserScript==
// @id             star-links-mod@star-mod
// @name           Star Links mod (IITC)
// @category       Layer
// @version        0.1.5.9
// @updateURL      https://jokedst.github.io/StarLinks.user.js
// @downloadURL    https://jokedst.github.io/StarLinks.user.js
// @description    Calculate how to link the portals to create a star! Enable from the layer chooser.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
    if (typeof window.plugin !== 'function') { window.plugin = function() {};}

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
//plugin_info.buildName = 'jonatkins';
//plugin_info.dateTimeVersion = '20140517.3202';
//plugin_info.pluginId = 'star-links';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.starLinks = function() {};

// const values
window.plugin.starLinks.MAX_PORTALS_TO_OBSERVE = 5000;
window.plugin.starLinks.MAX_PORTALS_TO_LINK = 100;
// zoom level used for projecting points between latLng and pixel coordinates. may affect precision of triangulation
window.plugin.starLinks.PROJECT_ZOOM = 16;
    
window.plugin.starLinks.mindepth = 0;
window.plugin.starLinks.maxdepth = 1000;
window.plugin.starLinks.locked = false;
window.plugin.starLinks.hideOrigin = false;
window.plugin.starLinks.keepExistingLinks = true;
window.plugin.starLinks.keepExistingLinksFor = 'ENLIGHTENED';


window.plugin.starLinks.linksLayerGroup = null;
window.plugin.starLinks.fieldsLayerGroup = null;

window.plugin.starLinks.updateLayer = function(starti, mindepth, maxdepth) {
    if (!window.map.hasLayer(window.plugin.starLinks.linksLayerGroup) &&
        !window.map.hasLayer(window.plugin.starLinks.fieldsLayerGroup))
    {return;}
    
    if(mindepth || mindepth === 0)
        window.plugin.starLinks.mindepth = mindepth;
    if(maxdepth || maxdepth === 0)
        window.plugin.starLinks.maxdepth = maxdepth;
    
    window.plugin.starLinks.linksLayerGroup.clearLayers();
    window.plugin.starLinks.fieldsLayerGroup.clearLayers();
    var ctrl = [$('.leaflet-control-layers-selector + span:contains("Star links")').parent(), 
                $('.leaflet-control-layers-selector + span:contains("Star fields")').parent()];
    if (Object.keys(window.portals).length > window.plugin.starLinks.MAX_PORTALS_TO_OBSERVE) {
        $.each(ctrl, function(guid, ctl) {ctl.addClass('disabled').attr('title', 'Too many portals: ' + Object.keys(window.portals).length);});
        return;
    }
    
    var locations = [];
    
    // drawn polygons
    var polys = [];
    if(window.plugin.drawTools){
        $.each(window.plugin.drawTools.drawnItems._layers, function (name, layer) {
            if (layer instanceof L.Polygon) {
                var poly = layer._latlngs;
                polys.push(poly);
            }
        });
    }
    
    var bounds = map.getBounds();
    $.each(window.portals, function(guid, portal) {
        var ll = portal.getLatLng();
        if (bounds.contains(ll)) {

            var inpoly = false;
            for (var p = 0; p < polys.length; p++) {
                if (isPointInPoly(polys[p], ll)) {
                    inpoly = true;
                    break;
                }
            }

            if (polys.length == 0 || inpoly) {
                var p = map.project(portal.getLatLng(), window.plugin.starLinks.PROJECT_ZOOM);
                p.guid = guid;
                locations.push(p);
            }
        }
    });
    
    var distance = function(a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    };
    
    var drawLink = function(a, b, style) {
        var alatlng = map.unproject(a, window.plugin.starLinks.PROJECT_ZOOM);
        var blatlng = map.unproject(b, window.plugin.starLinks.PROJECT_ZOOM);
        
        var poly = L.polyline([alatlng, blatlng], style);
        poly.addTo(window.plugin.starLinks.linksLayerGroup);
    };
    
    var drawField = function(a, b, c, style) {
        var alatlng = map.unproject(a, window.plugin.starLinks.PROJECT_ZOOM);
        var blatlng = map.unproject(b, window.plugin.starLinks.PROJECT_ZOOM);
        var clatlng = map.unproject(c, window.plugin.starLinks.PROJECT_ZOOM);
        
        var poly = L.polygon([alatlng, blatlng, clatlng], style);
        poly.addTo(window.plugin.starLinks.fieldsLayerGroup);
    };
    
    if (locations.length > window.plugin.starLinks.MAX_PORTALS_TO_LINK) {
        $.each(ctrl, function(guid, ctl) {ctl.addClass('disabled').attr('title', 'Too many portals (linked/observed): ' + locations.length + '/' + Object.keys(window.portals).length);});
        return;
    }
    $.each(ctrl, function(guid, ctl) {ctl.removeClass('disabled').attr('title', 'portals (linked/observed): ' + locations.length + '/' + Object.keys(window.portals).length);});
    
    var EPS = 1e-9;
    var det = function(a, b, c) {
        return a.x * b.y - a.y * b.x + b.x * c.y - b.y * c.x + c.x * a.y - c.y * a.x;
    };
    
    var convexHull = function(points) {
        if (points.length < 3)
            return [];
        var result = [];
        var func = function _func(ai, bi, index) {
            var maxd = 0;
            var maxdi = -1;
            var a = points[ai];
            var b = points[bi];
            var _index = [];
            for (var i = 0; i < index.length; ++i) {
                var c = points[index[i]];
                var d = -det(a, b, c);
                if (d > EPS) {
                    _index.push(index[i]);
                }
                if (maxd < d - EPS) {
                    maxd = d;
                    maxdi = index[i];
                }
            }
            if (maxdi != -1) {
                _func(ai, maxdi, _index);
                _func(maxdi, bi, _index);
            } else {
                result.push(ai);
            }
        };
        var minxi = 0;
        var maxxi = 0;
        var index = [];
        for (var i = 0; i < points.length; ++i) {
            index.push(i);
            if (points[minxi].x > points[i].x)
                minxi = i;
            if (points[maxxi].x < points[i].x)
                maxxi = i;
        }
        func(minxi, maxxi, index);
        func(maxxi, minxi, index);
        return result;
    };
    
    var hull = convexHull(locations);
    
    var lineIntersect = function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
        var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
        var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
        if (isNaN(x)||isNaN(y)) {
            return false;
        } else {
            if (x1>=x2) {
                if (!(x2<=x&&x<=x1)) {return false;}
            } else {
                if (!(x1<=x&&x<=x2)) {return false;}
            }
            if (y1>=y2) {
                if (!(y2<=y&&y<=y1)) {return false;}
            } else {
                if (!(y1<=y&&y<=y2)) {return false;}
            }
            if (x3>=x4) {
                if (!(x4<=x&&x<=x3)) {return false;}
            } else {
                if (!(x3<=x&&x<=x4)) {return false;}
            }
            if (y3>=y4) {
                if (!(y4<=y&&y<=y3)) {return false;}
            } else {
                if (!(y3<=y&&y<=y4)) {return false;}
            }
        }
        return true;
    };

    var intersect2 = function(edge1, edge2){
        return lineIntersect(edge1.a.x, edge1.a.y,
                             edge1.b.x, edge1.b.y,
                             edge2.a.x, edge2.a.y,
                             edge2.b.x, edge2.b.y);
    };

    var CCW = function(p1, p2, p3) {
        return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
    };

    var isIntersect = function (p1, p2, p3, p4) {
		return (CCW(p1, p3, p4) != CCW(p2, p3, p4)) && (CCW(p1, p2, p3) != CCW(p1, p2, p4));
    };

    var intersect = function(edge1, edge2){
		var p1 = edge1.a, p2 = edge1.b,
			p3 = edge2.a, p4 = edge2.b;
		return (CCW(p1, p3, p4) != CCW(p2, p3, p4)) && (CCW(p1, p2, p3) != CCW(p1, p2, p4));
    };

    var pointInsideTriangle = function (px,py,ax,ay,bx,by,cx,cy){
        var v0 = [cx-ax,cy-ay];
        var v1 = [bx-ax,by-ay];
        var v2 = [px-ax,py-ay];
        
        var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
        var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
        var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);
        var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
        var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);
        
        var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);
        
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        
        return ((u >= 0) && (v >= 0) && (u + v < 1));
    };
    
    function isPointInPoly(poly, pt){
		var c = false, 
			i = -1, 
			l = poly.length, 
			j = l - 1;
        for(; ++i < l; j = i){
            if (((poly[i].lng <= pt.lng && pt.lng < poly[j].lng) || (poly[j].lng <= pt.lng && pt.lng < poly[i].lng))
            && (pt.lat < (poly[j].lat - poly[i].lat) * (pt.lng - poly[i].lng) / (poly[j].lng - poly[i].lng) + poly[i].lat))
				c = !c;
		}
        return c;
    }
    
    var cloneLocations = function(locations){
        var clone = [];
        for(var i=0;i<locations.length;i++){
            var loc = locations[i];
            clone.push({x:loc.x, y:loc.y, guid:loc.guid, edges:[], tris:[]});
        }
        return clone;
    };
    var originalEdges = [];
    
	//console.log(locations);
    var makestar = function(from, points){
        if(points.length == 0){ return {edges: [], triangles: [], labels:[], starti:from}; }
        var outsidePoints = {}, outsidePointsList = [];
        var edges = [];
        var triangles = [];
		//console.log(points);
        // First sort points on distance from start portal
        points[from].d = 0;
        for (var i = 0; i < points.length; ++i) if(i!=from) {
            var d = distance(points[i],points[from]);
            points[i].d = d;
		}
        points.sort(function(a,b){return a.d - b.d;});
        
        var labels = [], pointlookup = {};
        for (var i = 0; i < points.length; ++i){
            //window.plugin.starLinks.addLabel(points[i].guid, i)
            points[i].i = i;
            labels.push({guid:points[i].guid, index:i});
            pointlookup[points[i].guid] = i;
        }
        
        if(window.plugin.starLinks.keepExistingLinks){
			for(var e=0;e<originalEdges.length;e++){
				var link = window.links[originalEdges[e]];
				var origindex = pointlookup[link.options.data.oGuid];
				var destindex = pointlookup[link.options.data.dGuid];
				var origPoint, destPoint;
				if(origindex == undefined){
					// This portal is outside the view
					if(!outsidePoints[link.options.data.oGuid]){
						// Unknown, create a point for it
						var newpoint = {};
						newpoint.i = -(Object.keys(outsidePoints).length + 1); // give them negative indexes
						newpoint.p = map.project(link._latlngsinit[0], window.plugin.starLinks.PROJECT_ZOOM);
						newpoint.p.guid = link.options.data.oGuid;
						newpoint.p.edges = [];
						newpoint.p.tris = [];
						outsidePoints[link.options.data.oGuid] = newpoint;
						outsidePointsList.push(newpoint);
					}
					origindex = outsidePoints[link.options.data.oGuid].i;
					origPoint = outsidePoints[link.options.data.oGuid].p;
				}else{
					origPoint = points[origindex];
				}

				if(destindex == undefined){
					// This portal is outside the view
					if(!outsidePoints[link.options.data.dGuid]){
						// Unknown, create a point for it
						var newpoint = {};
						newpoint.i = -(Object.keys(outsidePoints).length + 1); // give them negative indexes
						newpoint.p = map.project(link._latlngsinit[1], window.plugin.starLinks.PROJECT_ZOOM);
						newpoint.p.guid = link.options.data.dGuid;
						newpoint.p.edges = [];
						newpoint.p.tris = [];
						outsidePoints[link.options.data.dGuid] = newpoint;
						outsidePointsList.push(newpoint);
					}
					destindex = outsidePoints[link.options.data.dGuid].i;
					destPoint = outsidePoints[link.options.data.dGuid].p;
				}else{                    
					destPoint = points[destindex];
				}

				var newedge = new window.plugin.starLinks.Edge(origPoint, destPoint, 0, 0, origindex, destindex);
				newedge.exists = true;
				edges.push(newedge);
            }
        }
        
        for(var p=0;p<points.length;p++){points[p].tris = [];}        
        
        for (var i = 0; i < points.length; ++i){
            // Check which other locations I can link to
            for (var j = i+1; j < points.length; ++j) if(i != j) {
                var newedge = { a: points[i], b: points[j] };

                // We could optimize here on i=0 when keeplinks is off, since there can't be any intersections on that pass. Later...

                //console.log('testing from '+i+' to ' + j);
                // go through all edges
                var intersected = false;
                for(var e = 0; e < edges.length; e++){                    
                    var edge = edges[e];
                    
                    // Check if it's the same edge, i.e. edge already exists
					if((edge.ia == i && edge.ib == j) || (edge.ia == j && edge.ib == i)){
						//console.log('--nope, has it already');
						intersected = true;
						break;
					}

					// if this line share a point they can't intersect
					if(edge.ia == i || edge.ib == i || edge.ia == j || edge.ib == j)
						continue;

					if(intersect(newedge, edge)){
						//console.log('--nope, intersected '+edge.ia + ' to ' + edge.ib);
						intersected = true;
						break;
					}
					//console.log('--edge '+edge.ia + ' to ' + edge.ib+' doesnt intersect...');
					//console.log('--('+newedge.a.x+', ' + newedge.a.y +')-('+newedge.b.x+', ' + newedge.b.y +') not int ('+edge.a.x+', ' + edge.a.y +')-('+edge.b.x+', ' + edge.b.y +')');
				}
				if(!intersected){
					//console.log('-- adding link from '+i+' to ' + j);
					// check if this link finishes any triangles
					var alinkedto = {};
					for(var q = 0; q < newedge.a.edges.length; q++){
						alinkedto[newedge.a.edges[q].ia] = 1;
						alinkedto[newedge.a.edges[q].ib] = 1;
					}
					//alinkedto[i] = 0; // remove
					//console.log('loc '+i+' linked to '+Object.keys(alinkedto).join(','));
					
					for(var q = 0; q < newedge.b.edges.length; q++){
						if(alinkedto[newedge.b.edges[q].ia] == 1 || alinkedto[newedge.b.edges[q].ib] == 1){
							var commonloc = alinkedto[newedge.b.edges[q].ia] == 1 ? newedge.b.edges[q].ia : newedge.b.edges[q].ib;
							//Both points are linked to same point - a field!

							// Add field to list
							//triangles.push(new window.plugin.starLinks.Triangle(newedge.a, newedge.b, points[commonloc], 1));
							var newid = triangles.push(new window.plugin.starLinks.Triangle(points, i, j, commonloc, 1, outsidePointsList));
							newid--; // push returns length of array, index is one less
							points[i].tris.push(newid);
							points[j].tris.push(newid);
							// The common location might be outside the view
							if(commonloc < 0){
								outsidePointsList[-commonloc-1].p.tris.push(newid);
							}else{
								points[commonloc].tris.push(newid);
							}
						}
					}

					edges.push(new window.plugin.starLinks.Edge(newedge.a, newedge.b, 0, 0, i, j));
				}
			}
		}

		var depthMax = 0;
		// Check which points lies within each field - we'll use this to figure out which fields are inside other fields
		for(var t=0; t<triangles.length;t++){
			var tri = triangles[t];
			//console.log('--testing triangle '+t+', ('+tri.ia+', '+tri.ib+', '+tri.ic+')');
			//console.log('--('+tri.a.x+', '+tri.a.y+')-('+tri.b.x+', '+tri.b.y+')-('+tri.c.x+', '+tri.c.y+')');
			tri.surrounds = [];
			for(var p=0;p<points.length;p++)
				if(p != tri.ia && p != tri.ib && p != tri.ic){
				var point = points[p];
				//console.log('--- on point '+p+', ('+point.x+', '+point.y+')');                
				if(pointInsideTriangle(point.x, point.y, tri.a.x, tri.a.y, tri.b.x, tri.b.y, tri.c.x, tri.c.y)){
					//console.log('-- point ' + p + ' is inside field '+t+', ('+tri.ia+', '+tri.ib+', '+tri.ic+')');
					tri.surrounds.push(p);
					
					// Each triangle connected to this point are inside this triangle 
					for(var ti = 0; ti < point.tris.length; ti++){
						var surroundedTriangle = triangles[point.tris[ti]];
						surroundedTriangle.depth++;
						if(depthMax < surroundedTriangle.depth) depthMax = surroundedTriangle.depth;
					}
				}
			}
		}        
		
		return {edges:edges, triangles:triangles, starti: from, labels:labels, points: points, depthMax: depthMax};
	};

	var result;
	if(window.plugin.starLinks.keepExistingLinks){
		$.each(window.links, function(guid, link) {
			if (link.options.data.team == window.plugin.starLinks.keepExistingLinksFor && (bounds.contains(link._latlngsinit[0]) || bounds.contains(link._latlngsinit[1]))){
				// This link has at least one anchor within the bounds.
				originalEdges.push(guid);
			}
		});
	}

	if(starti != undefined){
		console.log('making one star from '+starti);
		if(typeof(starti)=='string')
			for(var p=0;p<locations.length; p++) if(locations[p].guid == starti){starti=p;break;}
		result = makestar(starti, cloneLocations(locations));
	}else{
		console.log('making many stars');
		//result = makestar(0, jQuery.extend(true, [], locations));
		result = makestar(0, cloneLocations(locations));
		for(var l=1;l<locations.length;l++){
			var result2 = makestar(l, cloneLocations(locations));
			//if(result2.triangles.length > result.triangles.length || (result2.triangles.length = result.triangles.length && result2.depthMax > result.depthMax))
			if(result2.depthMax > result.depthMax || (result2.triangles.length > result.triangles.length && result2.depthMax == result.depthMax))
				result = result2;
		}
	}

	for(var x=0;x<result.labels.length;x++){
		window.plugin.starLinks.addLabel(result.labels[x].guid, result.labels[x].index);
	}
	//var result = makestar(starti, jQuery.extend(true, [], locations));
	//var result2 = makestar(starti+1, jQuery.extend(true, [], locations));
	//makestar(starti, locations);

	// Convert my cloned objects to L.Point   
	var edges = result.edges;
	var triangles = result.triangles;

	$.each(edges, function(idx, edge) {
		edge.a = new L.Point(edge.a.x, edge.a.y);
		edge.b = new L.Point(edge.b.x, edge.b.y);

		if(!edge.exists)
		if(!window.plugin.starLinks.hideOrigin || (edge.ia != 0 && edge.ib != 0))        
			drawLink(edge.a, edge.b, {
				color: '#FF0000',
				opacity: 1,
				weight: 1.5,
				clickable: false,
				smoothFactor: 10,
				dashArray: [6, 4]
			});
	});

    var highestDepth = 0;
    $.each(triangles, function(idx, triangle) {
        triangle.a = new L.Point(triangle.a.x, triangle.a.y);
        triangle.b = new L.Point(triangle.b.x, triangle.b.y);
        triangle.c = new L.Point(triangle.c.x, triangle.c.y);
        if(triangle.depth > highestDepth) highestDepth = triangle.depth;
        if(triangle.depth >= window.plugin.starLinks.mindepth && triangle.depth <= window.plugin.starLinks.maxdepth)
        if(!window.plugin.starLinks.hideOrigin || (triangle.ia != 0 && triangle.ib != 0 && triangle.ic != 0))
        drawField(triangle.a, triangle.b, triangle.c, {
            stroke: false,
            fill: true,
            fillColor: '#FF0000',
            fillOpacity: 0.15, // 1 - Math.pow(0.85, triangle.depth),
            clickable: false
        });
    });
    
    console.log('fields = ' + triangles.length + ', max depth = ' + highestDepth + ', links = ' + edges.length + ', from: '+result.starti + ', d='+result.depthMax);
    window.plugin.starLinks.edges = edges;
    window.plugin.starLinks.fields = triangles;
    window.plugin.starLinks.locations = locations;
    window.plugin.starLinks.convexHull = convexHull;
};

window.plugin.starLinks.Edge = function(a, b, depth, length, ia, ib) {
    this.a = a;
    this.b = b;
    this.depth = depth;
    this.length = length;
    this.ia = ia;
    this.ib = ib;
    
    this.a.edges = this.a.edges || [];
    this.a.edges.push(this);
        
    this.b.edges = this.b.edges || [];
    this.b.edges.push(this);
};

/*window.plugin.starLinks.Triangle = function(a, b, c, depth) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.depth = depth;
}*/

window.plugin.starLinks.Triangle = function(points, ia, ib, ic, depth, outpoints) {
    this.ia = ia;
    this.ib = ib;
    this.ic = ic;
    this.a = (ia >= 0) ? points[ia] : outpoints[-1-ia].p;
    this.b = (ib >= 0) ? points[ib] : outpoints[-1-ib].p;
    this.c = (ic >= 0) ? points[ic] : outpoints[-1-ic].p;
    this.depth = depth;
};

window.plugin.starLinks.addLabel = function(guid, text) {
	// remove old layer before updating
	//window.plugin.portalLevelNumbers.removeLabel(guid);
	// add portal level to layers
	var p = window.portals[guid];
	var latLng = p.getLatLng();
	var level = L.marker(latLng, {
		icon: L.divIcon({
			className: 'plugin-portal-level-numbers',
			iconSize: [12, 12],
			html: text
		}),
		guid: guid
	});
	//plugin.portalLevelNumbers.levelLayers[guid] = level;
	level.addTo(window.plugin.starLinks.linksLayerGroup);
};

window.plugin.starLinks.showOptions = function () {
    dialog({
        html: 'Keep existing links: <input type="checkbox" onclick="window.plugin.starLinks.setOption(\'keepLinks\', this.checked)" ' + (window.plugin.starLinks.keepExistingLinks ? 'checked="checked"' : '') + ' /></br>' +
              'Keep links for <select onchange="window.plugin.starLinks.setOption(\'keepLinksFor\', this.value)"><option value="ENLIGHTENED">Enl</option><option value="RESISTANCE">Res</option></select></br>' +
              'Lock plan: <input type="checkbox" onclick="window.plugin.starLinks.setOption(\'lock\', this.checked)" ' + (window.plugin.starLinks.locked ? 'checked="checked"' : '') + ' />',
        title: 'Star Links Options'
    });
}

window.plugin.starLinks.setOption = function (name, value) {
    console.log('setting value "' + name + '" to "' + value + '"');
    switch (name) {
        case 'keepLinks': window.plugin.starLinks.keepExistingLinks = value; break;
        case 'keepLinksFor': window.plugin.starLinks.keepExistingLinksFor = value; break;
        case 'locked': window.plugin.starLinks.locked = value; break;
    }
    window.plugin.starLinks.updateLayer();
}

window.plugin.starLinks.setup = function() {
	window.plugin.starLinks.linksLayerGroup = new L.LayerGroup();
	window.plugin.starLinks.fieldsLayerGroup = new L.LayerGroup();

	window.addHook('mapDataRefreshEnd', function(e) {
		if(!window.plugin.starLinks.locked)
			window.plugin.starLinks.updateLayer();
	});

	window.addHook('portalSelected', function(e) {
		if(!window.plugin.starLinks.locked)
			window.plugin.starLinks.updateLayer(e.selectedPortalGuid);
	});

	window.map.on('moveend', function() {
		if(!window.plugin.starLinks.locked)
			window.plugin.starLinks.updateLayer();
	});

	window.addLayerGroup('Star links', window.plugin.starLinks.linksLayerGroup, false);
	window.addLayerGroup('Star fields', window.plugin.starLinks.fieldsLayerGroup, false);

    // When somwthing has been drawn, update graph    
	map.on('draw:created', function (e) {
        // Draw Tools hasn't necessarily added the layer yet, so let that trigger fire before doing the update (thus the setTimeout)
	    setTimeout(function () {
	        window.plugin.starLinks.updateLayer();
	    }, 0);
	});
	map.on('draw:deleted', function (e) {
	    window.plugin.starLinks.updateLayer();
	});
	map.on('draw:edited', function (e) {
	    window.plugin.starLinks.updateLayer();
	});

    // Add options menu
	$('#toolbox').append('<a onclick="window.plugin.starLinks.showOptions();return false;">StarLinks</a>');
};
var setup = window.plugin.starLinks.setup;

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
