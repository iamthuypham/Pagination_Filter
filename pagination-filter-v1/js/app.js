//Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number of links to the bottom of the page.

//1 Add Search button
$(".page-header").append("<div class=\"student-search\">  <input placeholder=\"Search for students...\">  <button>Search</button></div>");

//2 Add List of Page Numbers
$(".page").append("<div class=\"pagination\"><ul><li><a class=\"active\" href=\"#\">1</a></li><li><a href=\"#\">2</a></li><li><a href=\"#\">3</a></li><li><a href=\"#\">4</a></li><li><a href=\"#\">5</a></li></ul></div>");

//Hide all but the first 10 students when the page loads.
$(".student-list").hide();

//When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.

//When click on page number which is not active
$( "a" ).click(function(){
  //Remove students not in that page number

  //Switch "active" class from previous page to new page
  $( "a" ).removeClass("active");
  $( this ).addClass("active");
});

//Using progressive enhancement, add the student search markup as presented in the filters-example.html file to the index.html file.
//1 Add Search button and Search field

//Add an event listener to the search button. When the user clicks on the button it should use the text in the search input to filter the results.


//Users should be able to search by name or e-mail address. And partial matches, like just a first name, should be displayed in the results.

//Search results should also be paginated. For example, if the search returns more than 10 results, those results should be paginated too.

//X-credit: Include simple animations when transitioning between pages.

//X-credit: As the user types in the search box, dynamically filter the student listings. In other words, after each letter is typed into the search box, display any listings that match .

//X-credit: If no matches are found, include a message in the HTML to tell the user there are no matches.
