//Function to create page links based on number of students
function pageLinkCreate(pageNum){
  //Loop number of Page to create link for each page
  $(".pagination").remove();
  var pageLink = "<div class=\"pagination\"><ul>"
          + "<li><a class=\"active\" href=\"#\">1</a></li>";
  for (i=2; i<=pageNum; i++) {
    pageLink += "<li><a href=\"#\">"+ i +"</a></li>"; };
  pageLink += "</ul></div>";
  $(".page").append(pageLink);//Add page links to index.html
};
//Function loading currentList based on active page
function refreshPage(currentList){
  var x = $(".active").text();
  var start = x * 3 - 3; //where detected currentList starts
  var end = x * 3;// where detected currentList ends
  $(".student-item").hide();//hide all first
  $(currentList).slice(start,end).show();//display 10
};
//Function when click on each page
function pageClick(currentList){
  $( "a" ).click(function(){
    $( "a" ).removeClass("active");//switch active class for CSS update
    $( this ).addClass("active");
    refreshPage(currentList);//refresh the page to current currentList
  });
}
//Add Search button and input field
$(".page-header").append("<div class=\"student-search\">  <input placeholder=\"Search for students...\">  <button>Search</button></div>");
//Create an array of object includes firstName, lastName, and e-mail for searching
var array=[];
$(".student-details").each(function(){
  array.push({
    firstName:$(this).children("h3").text().split(" ")[0],
    lastName:$(this).children("h3").text().split(" ")[1],
    email:$(this).children("span").text()
  })
})
//ACTION
//Default display
studentPerPage = Math.ceil($(".student-list li").size()/3);
pageLinkCreate(studentPerPage);
refreshPage(".student-item");
pageClick(".student-item");

$(".page-header input").keyup(function(){
  $(".student-item").hide();
  totalResult = 0;
  var input = $("input").val().toLowerCase();//get input text
  for(var i=0; i<array.length; i++) {//loop thru each object
    for(var key in array[i]) {//loop thru each key of object
      if(array[i][key].indexOf(input)!=-1) {//if value match
        $(".student-item:eq("+i+")").show();
        totalResult ++;
      };
    };
  };
  studentPerPage = Math.ceil(totalResult/3)
  pageLinkCreate(studentPerPage);
  refreshPage($(".student-item:visible"));
  pageClick($(".student-item:visible"));
})


//Search results should also be paginated. For example, if the search returns more than 10 results, those results should be paginated too.

//When input is blank, Display is something, Apply Pagination function to this thing
//Need: input, display, Pagination fucntion, and Search function.
//When input is something, Display is soemthing else. Aplly Pagination function to somethign else.

//X-credit: Include simple animations when transitioning between pages.

//X-credit: As the user types in the search box, dynamically filter the student listings. In other words, after each letter is typed into the search box, display any listings that match .

//X-credit: If no matches are found, include a message in the HTML to tell the user there are no matches.
