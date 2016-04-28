//Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number of links to the bottom of the page.
//NUmber of Page
pageNum = Math.ceil($(".student-list li").size()/10);
//Loop number of Page to create link for each page
var pageLink = "<div class=\"pagination\"><ul>";
pageLink += "<li><a class=\"active\" href=\"#\">1</a></li>";
for (i=2; i<=pageNum; i++) {
  pageLink += "<li><a href=\"#\">"+ i +"</a></li>";
};
pageLink += "</ul></div>";
//Add page links to index.html
$(".page").append(pageLink);
//Hide all but the first 10 students when the page loads.
$(".student-item").hide();
$(".student-item").slice(0,10).show();
//When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.
$( "a" ).click(function(){
  //Switch "active" class from previous page to new page
  $( "a" ).removeClass("active");
  $( this ).addClass("active");
  //Detect list of students based on selected page
  var x = $(".active").text();
  var start = x * 10 - 10; //where detected list starts
  var end = x * 10;// where detected list ends
  $(".student-item").hide() // hide all first
  $(".student-item").slice(start,end).show(); // and show only students in detected list
});
//Using progressive enhancement, add the student search markup as presented in the filters-example.html file to the index.html file.
//Add Search button and input field
$(".page-header").append("<div class=\"student-search\">  <input placeholder=\"Search for students...\">  <button>Search</button></div>");
//Users should be able to search by name or e-mail address. And partial matches, like just a first name, should be displayed in the results.
//Create an array of object includes firstName, lastName, and e-mail
var array=[];
$(".student-details").each(function(){
  array.push({
    firstName:$(this).children("h3").text().split(" ")[0],
    lastName:$(this).children("h3").text().split(" ")[1],
    email:$(this).children("span").text()
  })
})
//Add an event listener to the search button. When the user clicks on the button it should use the text in the search input to filter the results.
$(".page-header button").click(function(){
  $(".student-item").hide(); //hide all first
  var input = $("input").val().toLowerCase();//get input text
  for(var i=0; i<array.length; i++) {//loop thru each object
    for(var key in array[i]) {//loop thru each key of object
      if(array[i][key].indexOf(input)!=-1) {//if value match
        $(".student-item:eq("+i+")").show();//then display
      };
    };
  };
})
//Search results should also be paginated. For example, if the search returns more than 10 results, those results should be paginated too.

//X-credit: Include simple animations when transitioning between pages.

//X-credit: As the user types in the search box, dynamically filter the student listings. In other words, after each letter is typed into the search box, display any listings that match .

//X-credit: If no matches are found, include a message in the HTML to tell the user there are no matches.
