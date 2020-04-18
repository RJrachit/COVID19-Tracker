function sortByProperty(property){
   return function(a,b){
     var ap = parseInt(a[property]);
     var bp = parseInt(b[property]);

      if(ap > bp)
         return -1;
      else if(ap < bp)
         return 1;

      return 0;
   }
}

function write(st){

  $('.state-name').text("");
  $('.state-confirmed').text("");
  $('.state-active').text("");
  $('.state-recovered').text("");
  $('.state-deceased').text("");

  for(var i=0;i<st.length;i++)
  {
    $('.state-name').append(st[i].state + '<br>');
    $('.state-confirmed').append(st[i].confirmed + '<br>');
    $('.state-active').append(st[i].active + '<br>');
    $('.state-recovered').append(st[i].recovered + '<br>');
    $('.state-deceased').append(st[i].deaths + '<br>');
  }
}

$('.con').on('click',function(){
  $.getJSON("https://api.covid19india.org/data.json",function(data){
    var states = data.statewise;
    var st = states;
    st.sort(sortByProperty("confirmed"));
    write(st);
  })
});
$('.act').on('click',function(){
  $.getJSON("https://api.covid19india.org/data.json",function(data){
    var states = data.statewise;
    var st = states;
    st.sort(sortByProperty("active"));
    write(st);
  })
});
$('.rec').on('click',function(){

  $.getJSON("https://api.covid19india.org/data.json",function(data){
    var states = data.statewise;
    var st = states;
    st.sort(sortByProperty("recovered"));
    write(st);
  })
});
$('.dec').on('click',function(){
  $.getJSON("https://api.covid19india.org/data.json",function(data){
    var states = data.statewise;
    var st = states;
    st.sort(sortByProperty("deaths"));
    write(st);
  })
});

$.getJSON("https://api.covid19india.org/data.json",function(data){
  // console.log(data);
  console.log(data.statewise);
  var states = data.statewise;

  $('.confirmed').text(states[0].confirmed);
  $('.active').text(states[0].active);
  $('.recovered').text(states[0].recovered);
  $('.deaths').text(states[0].deaths);

  var st = states;
  st.sort(sortByProperty("confirmed"));
  console.log(st);

  write(st);
})
