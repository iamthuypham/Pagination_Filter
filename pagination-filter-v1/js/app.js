//Create the Search field and Search button
$(".page-header").append("<div class=\"student-search\">  <input placeholder=\"Search for students...\">  <button>Search</button></div>");
//Create array of objects which includes firstName, lastName, and email. This array is used for searching
var array=[];
$(".student-details").each(function(){
  array.push({
    firstName:$(this).children("h3").text().split(" ")[0], //detect the firstName based on h3 tag, split to an array, and get position 0
    lastName:$(this).children("h3").text().split(" ")[1],//detect the firstName based on h3 tag, split to an array, and get position 1
    email:$(this).children("span").text()
  })
})
//Function1: create page links based on currentList. 
//Variable currentList could be full list of student $(".student-item") or search result list $(".found") (please read Function 4)
function createPageLink(currentList){
    maxPage = Math.ceil($(currentList).size()/10); //calculate number of pages = (number of students in current list / number of student per page)
    $(".pagination").remove();//remove any existed page link so that able to apply a new set
    var pageLink = "<div class=\"pagination\"><ul>"
            + "<li><a class=\"active\" href=\"#\">1</a></li>"; //setup page link '1' as active by default
    for (i=2; i<=maxPage; i++) {
      pageLink += "<li><a href=\"#\">"+ i +"</a></li>"; }; //loop thru next page links 2,3,4,... until meet maximum pages
    pageLink += "</ul></div>";
    $(".page").append(pageLink);//Add page links to index.html
};
//Function2: loading student list based on active page, currentList, numberPerPage
function loadItem(currentList){
  var x = $(".active").text(); //if you are in page 2 (which is 'active' page, get the number 2
  var start = x * 10 - 10; //detect where to start in the list, start = 2 * 10 - 10 = 10
  var end = x * 10;// detect where to end in the list, end = 2 * 10 = 20
  $(".student-item").hide(); //hide all current existed list
  $(currentList).slice(start,end).show();//display the current list from position 10th to position 20th
};
//Function3: Update CSS when click on certain page link. Example: You are on page 2 and click on page 3.
function pageClick(currentList){
  $( "a" ).click(function(){
    $( "a" ).removeClass("active");//remove the 'active' class from page 2
    $( this ).addClass("active");//add the 'active' class to page 3
    loadItem(currentList); //reload the current list whenever click on new page
  });
}
//Function4: Search item and add class "found"
function searchItem(){
  keyWord = $("input").val() //detect text that users input
  var result = 0;
  $(".found").toggleClass("found", false);//remove any existed 'found' class so that every keyup function will not load the previous results
  for(var i=0; i<array.length; i++) {//loop thru each object of the array
    for(var key in array[i]) {//loop thru each key of an object
      if(array[i][key].indexOf(keyWord)!=-1) {//if there is a match
        $(".student-item").eq(i).addClass("found");//then add that student item a class 'found'
        result ++;
      }
    }
  }
  return result; //Variable result will be used for no matches scenarios
};
/******LOAD DEFAULT PAGE**********/
createPageLink(".student-item");//create page links for full list of student
loadItem(".student-item");//load full list of student based on page number
pageClick(".student-item"); 

/*******LOAD SEARCHING PAGE********/
$("input").keyup(function(){ //Every key up, program search and find the match
  searchItem();
  var match = searchItem();
  if (match != 0){ //If there is one or more matches
    $(".unmatchMessage").hide(); //hide any existed unmatch message so that program won't load the message every single keyup
    $(".student-list").show();//show whole student list first 
    createPageLink(".found");//and then create page link for the search result list 
    loadItem(".found");//reload all items in the search result list
    pageClick(".found");
  } else { //If there is no match
    $(".student-list").hide();//hide all student list
    $(".pagination").hide();//hide any page link
    var unMatch = "<div class = \"unmatchMessage\">There is no match</div>"; //prepare unmatch message
    $(".unmatchMessage").empty() //Empty the message every keyup first
    $(".page").append(unMatch);// then add the message
  }
})

//X-credit: Include simple animations when transitioning between pages.
