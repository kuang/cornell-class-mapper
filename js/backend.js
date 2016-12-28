var url = "https://classes.cornell.edu/api/2.0/search/classes.json?roster=SP17&subject=AEP"; //cs classes in spring
var places = [];
var counter = 0;
var map;

function initMap() {
    var cornell = {
        lat: 42.447909,
        lng: -76.477998
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: cornell
    });
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

        // console.log(places);
        // searchPlace("derp");
        // for (var i = 0; i < places.length; i++) {
        // console.log(places[i]);
        searchPlace(places[0]);
        // }

    });
}

function searchPlace(inputs) {
    var searchUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
    searchUrl += inputs.replace(/\s/g, "%20");
    searchUrl += "%20cornell&key=AIzaSyAtAfFoVO4LdbhQhb54w_cCVn9pgVSUxqo";
    $.ajax({
        url: searchUrl,
        dataType: "jsonp",
        jsonpCallback: "pullInfo"
    });
}

function pullInfo(response) {
    console.log(response);
    var position = {
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng
    };
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
}
