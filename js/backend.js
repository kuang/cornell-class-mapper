var url ="https://classes.cornell.edu/api/2.0/search/classes.json?roster=SP17&subject=CS"; //cs classes in spring

var places = [];
var counter = 0;
$.getJSON(url,function(data){
    var classes = data.data.classes;
    for(var i = 0; i<classes.length; i++){
      tempClassSections = classes[i].enrollGroups[0].classSections;
      // console.log(tempClassSections.length);
      for(var j = 0; j<tempClassSections.length; j++){
        var buildingName = '';
        if(tempClassSections[j].meetings.length>0){
            buildingName = tempClassSections[j].meetings[0].bldgDescr;
          
        }
        if(buildingName!=null){
          places.push(buildingName);
        }


      }
    }
    console.log(places);

});
