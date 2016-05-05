//Add an HTML Search field
$(".page-header").append("<div class=\"student-search\">  <input placeholder=\"Search for students...\">  <button>Search</button></div>");
//Add an HTML div for animation
$(".page").append("<div id=\"anim\"></div>")
//Function1: create page links based on number of students
function createPageLink(currentList){
    var totalPage = Math.ceil($(currentList).size()/10);
    $(".pagination").remove();
    var pageLink = "<div class=\"pagination\"><ul>" + "<li><a class=\"active\" href=\"#\">1</a></li>";
    for (var i=2; i<=totalPage; i++) {
      pageLink += "<li><a href=\"#\">"+ i +"</a></li>"; }
    pageLink += "</ul></div>";
    $(".page").append(pageLink);//Add page links to index.html
}
//Function2: loading based on active page, currentList, numberPerPage
function loadItem(currentList){
  var x = $(".active").text();
  var start = x * 10 - 10; //where detected currentList starts
  var end = x * 10;// where detected currentList ends
  if ($(currentList).size() > 7) { //if the searching list more than 7 results, apply this animation
    /***Animation for 1000ms***/
    var target = document.getElementById('anim');
    var spinner = new Spinner(opts).spin(target);//create a new spinner
    setTimeout(function() {//spinner will stop and the list will load after 1000ms
          spinner.stop();
          $(".student-item").hide();
          $(currentList).slice(start,end).show();//display 10
      }, 1000);
  } else { //otherwise, quickly loading the list
    $(".student-item").hide();
    $(currentList).slice(start,end).show();//display 10
  }
}
//Function3: Update CSS when click on certain page link
function pageClick(currentList){
  $( ".pagination a" ).click(function(){
    $( ".active" ).removeClass("active");//switch active class for CSS update
    $( this ).addClass("active");
    loadItem(currentList);//reload the list based on clicked page
  });
}
//Function4: Search item and add class "found"
function searchItem(keyWord){
  $(".found").toggleClass("found", false);
  return $(".student-details:contains("+keyWord+")").parent().addClass("found");
}
//LOAD DEFAULT PAGE // when load page, create page link and load all students
createPageLink(".student-item");
loadItem(".student-item");
pageClick(".student-item");

//LOAD SEARCHING PAGE
$("input").keyup(function(){
  var keyWord = $("input").val(); //detect input keyword
  if (keyWord !== ""){ //if keyword is not blank
    var match = searchItem(keyWord); //start searching
    if (match.size() > 0) { //if found one or more matches
      $(".unmatchMessage").remove();//remove any existed message
      createPageLink(".found"); //create page link and load only students that found from searching
      loadItem(".found");
      pageClick(".found");
    } else {//If found no match
      $(".student-item").hide(); //Hide all students
      $(".pagination").remove();//Remove the pagination
      $(".unmatchMessage").remove(); //Remove any existed message whenever keyup. This will avoid create multiple <div> for unmatch message if users type several unmatch keyword such as "1111111111"
      var noMatch = "<div class=\"unmatchMessage\">Sorry, there is no match.</div>";
      $(".page").append(noMatch);
    }
  } else {//If the keyword is blank when key up (this usually happens when users type some keyword and backspace the whole keyword)
    $(".unmatchMessage").remove(); //remove any existed message
    createPageLink(".student-item");//create page link and load all students
    loadItem(".student-item");
    pageClick(".student-item");
  }
});
