var src="https://iii3mdppm7.execute-api.us-east-1.amazonaws.com/prod/UserPortfolioEndpoint/kuangjustin";

$.getJSON(src,function(data){
  var project = data.projects[0];
  var newSrc=project.thumbnail_url;
  var name=project.name;
  var url=project.url;
  var tagline=project.tagline;
  $("#devpostPic").attr("src",newSrc);
  $("#devpostTitle").text("Latest Project: "+name);
  $("#tagline").text(tagline);
  $(".devpostURL").attr("href",url);
  var friends="<h3>";
  var members= project.members;


  if(((members.length===1)&&(members[0].screen_name!=="kuangjustin"))||(members.length>1)){
    var totalNum=members.length;
    for(var i=0;i<members.length;i++){
      if(members[i].screen_name==="kuangjustin"){
        totalNum--;
      }
    }

    friends+="Built with ";
    for(var i=0;i<members.length;i++){
        if(members[i].screen_name!=="kuangjustin"){
          if(i===members.length-1){
            friends+="and "+"<a href='"+members[i].portfolio_url+"'>"+members[i].screen_name+"</a>";
            break;
          }

          if(totalNum===2){
            friends+="<a href='"+members[i].portfolio_url+"'>"+members[i].screen_name+"</a> ";

          }
          else{
            friends+="<a href='"+members[i].portfolio_url+"'>"+members[i].screen_name+"</a>, ";

          }
        }





    }
  }
  friends+="</h3>";
  $("#friends").html(friends);

  // $("#test").text(newSrc);

});
