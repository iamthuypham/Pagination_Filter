//Function1: create page links based on number of students
function createPageLink(currentList){
    totalPage = Math.ceil($(currentList).size()/5);
    $(".pagination").remove();
    var pageLink = "<div class=\"pagination\"><ul>"
            + "<li><a class=\"active\" href=\"#\">1</a></li>";
    for (i=2; i<=totalPage; i++) {
      pageLink += "<li><a href=\"#\">"+ i +"</a></li>"; };
    pageLink += "</ul></div>";
    $(".page").append(pageLink);//Add page links to index.html
};
//Function2: loading based on active page, currentList, numberPerPage
function loadItem(currentList){
  var x = $(".active").text();
  var start = x * 5 - 5; //where detected currentList starts
  var end = x * 5;// where detected currentList ends
  $(".student-item").hide();
  $(currentList).slice(start,end).show();//display 10
};
//Function3: Update CSS when click on certain page link
function pageClick(currentList){
  $( "a" ).click(function(){
    $( "a" ).removeClass("active");//switch active class for CSS update
    $( this ).addClass("active");
    loadItem(currentList); //reload item after every click
  });
}
//Function4: Search item and add class "found"
//1. Create the Search field
$(".page-header").append("<div class=\"student-search\">  <input placeholder=\"Search for students...\">  <button>Search</button></div>");
//2. Create list of all text in the page
var array=[];
$(".student-details").each(function(){
  array.push({
    firstName:$(this).children("h3").text().split(" ")[0],
    lastName:$(this).children("h3").text().split(" ")[1],
    email:$(this).children("span").text()
  })
})
function searchItem(){
  keyWord = $("input").val()
  var result = 0;
  $(".found").toggleClass("found", false);
  for(var i=0; i<array.length; i++) {//loop thru each object
    for(var key in array[i]) {//loop thru each key of object
      if(array[i][key].indexOf(keyWord)!=-1) {//if value match
        $(".student-item").eq(i).addClass("found");//then display
        result ++;
      }
    }
  }
  return result;
};

//LOAD DEFAULT PAGE
createPageLink(".student-item");
loadItem(".student-item");
pageClick(".student-item");

//LOAD SEARCHING PAGE
$("input").keyup(function(){
  searchItem();
  var match = searchItem();
  if (match != 0){ //If there is one or more match
    $(".unmatchMessage").hide();
    $(".student-list").show();
    createPageLink(".found");
    loadItem(".found");
    pageClick(".found");
  } else { //If there is no match
    $(".student-list").hide();
    $(".pagination").hide();
    var noMatch = "<div class = \"unmatchMessage\">There is no match</div>";
    $(".unmatchMessage").empty() //Empty the message every keyup
    $(".page").append(noMatch);
  }
})

//X-credit: Include simple animations when transitioning between pages.
