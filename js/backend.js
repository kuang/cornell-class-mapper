var url = "https://classes.cornell.edu/api/2.0/search/classes.json?roster=SP17&subject=CS"; //cs classes in spring
var places = [];
var counter = 0;
var map, service;
var cornell;

function initMap() {
    // Initialize locations
    cornell = new google.maps.LatLng(42.447909, -76.477998); // Campus center
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: cornell
    });
    service = new google.maps.places.PlacesService(map); // For searching locations
    getData();
}

//TODO add param for retrieving specific subjects
function getData() {
    $.getJSON(url, function(data) {
        //retrieve all classes under param
        var classes = data.data.classes;

        for (var i = 0; i < classes.length; i++) {
            //NOTE: enrollGroups length should never be more than 2 or 3 anyway
            for (var k = 0; k < classes[i].enrollGroups.length; k++) {
                //retrieve all sections, LEC, DIS, LAB
                var tempClassSections = classes[i].enrollGroups[k].classSections;
                // console.log(tempClassSections.length);

                //retrieve the building for each section
                for (var j = 0; j < tempClassSections.length; j++) {

                    var buildingName = '';

                    //if the section has a building location attached to it
                    if (tempClassSections[j].meetings.length > 0) {
                        buildingName = tempClassSections[j].meetings[0].bldgDescr;

                    }

                    //probably not efficient way of checking uniqueness lol
                    if (buildingName && places.indexOf(buildingName) == -1) {
                        places.push(buildingName);
                    }
                }
            }
        }

        console.log(places);
        //placeAllMarkers();
        for (var i = 0; i < places.length; i++) {
            console.log("1 " + places[i]);
            findCoordinates(places[i]);
        }
        // console.log(loc_list);

    });
}

function findCoordinates(place) {
    var coordinates = loc_list[place];
    console.log(coordinates);
    var latlng = {
        lat: coordinates[0],
        lng: coordinates[1]
    };
    placeMarker(latlng, place);
}

function placeMarker(latlng, name) {
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });
    var infowindow = new google.maps.InfoWindow({
        content: name
    });
    marker.addListener("click", function() {
        infowindow.open(map, marker);
    });
}

/*
function searchPlace(input) {
    var req = {
        query: input,
        location: cornell,
        radius: '100'
    }
    service.textSearch(req, processData);
}

function processData(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK &&
        map.getBounds().contains(results[0].geometry.location)) {
        placeMarker(results[0].geometry.location, results[0].name);
    } else {
        console.log("Error: " + status);
    }
}


// places markers at every single location in the building dataset- just to test
function placeAllMarkers() {
    for (key in loc_list) {
        var location = {};
        location.lat = parseFloat(loc_list[key][0]); //the values are strings right now- might want to change to ints later? idk time efficiency of parseFloat()
        location.lng = parseFloat(loc_list[key][1]);
        placeMarker(location, key);
    }


} */
