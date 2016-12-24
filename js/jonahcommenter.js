var src = "https://graph.facebook.com/44667262131/feed?access_token=1343939438983929|6eee7f7d90ff41eb98994a1c02e0e7c5";

$.getJSON(src,function(data){
  // console.log(data);
  var posts = data.data;
  var idArray=[];
  for(var i = 0; i<posts.length; i++){
    idArray.push(posts[i].id);

  }
  console.log(idArray);

  





});
