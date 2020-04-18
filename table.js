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

function write2(st)
{
  for(var i=0;i<st.length;i++)
  {
    var mark = "<tr> <td><strong>"+st[i].state+"</strong></td> <td>"+ st[i].confirmed +"</td> <td>"+ st[i].active +"</td> <td>"+st[i].recovered+"</td> <td>"+st[i].deaths+"</td> </tr>" ;
    $("table").append(mark);
  }
  var row = $('tr');
  for(var i=1;i<row.length;i++){
    var cell = row.eq(i).find("td");
    cell.eq(0).addClass("one");
    var active = parseInt(st[i-1].deltaconfirmed) - parseInt(st[i-1].deltarecovered) - parseInt(st[i-1].deltadeaths);
    cell.eq(1).append("<br> <span class = \"con \"> <i class = \"fa fa-caret-up \"> </i>" +st[i-1].deltaconfirmed + "</span>");
    cell.eq(2).append("<br> <span class = \"act \"> <i class = \"fa fa-caret-up \"> </i>" +active + "</span>");
    cell.eq(3).append("<br> <span class = \"rec \"> <i class = \"fa fa-caret-up \"> </i>" +st[i-1].deltarecovered + "</span>");
    cell.eq(4).append("<br> <span class = \"dec \"> <i class = \"fa fa-caret-up \"> </i>" +st[i-1].deltadeaths + "</span>");
  }
}


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

  write2(st);
})
