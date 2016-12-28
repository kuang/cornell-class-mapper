var url = "https://classes.cornell.edu/api/2.0/search/classes.json?roster=SP17&subject=CS"; //cs classes in spring

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
            //retrieve all sections, LEC, DIS, LAB
            tempClassSections = classes[i].enrollGroups[0].classSections;
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
        uniq(places);
        console.log(places);
        // for(var i = 0; i<places.length; i++){
        //   console.log(places[i]);
        //   searchPlace(places[i]);
        // }

    });
}




function searchPlace(inputs) {
    var searchUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
    searchUrl += inputs.replace(/\s/g, "%20");
    searchUrl += "%20cornell&key=AIzaSyBg54A5AxA3uYMqvCb2NYJ6VB2d-qC38RI";

    $.getJSON(searchUrl, function(data) {
        var position = {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng
        };
        var marker = new google.maps.Marker({
            position: position,
            map: map
        });
    });

}
function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}
