

//*****************************FRONT 
// END**************************************** */
// navbar with a search and a logo
// search links to mapping/results page 
// home page
// img spans for outer borders
// border animations at 12s for now
// main jumbotron/card
//  - expand when hovered
//  - back to original size when active
//  - enter area credendtials (zip code, current city)
//  - when submit is clicked on:
//      - mapping/results page displays
//      - map of your current area with 25 miles on the right section
//      - another search input for type of food interest/ type of resturant on the left
//      - when submit is clicked, the form input hides, and display a list of resurants 
//      - on the right where the map is diplayed, when the user hovers over the map where place of food is located, a modal appears displaying:
//          - name of resturant
//          - reviews of resturant
//          - location
//  sticky footer on both pages
// 
//  ********************************ZOMATO****************************************






$.ajax({
    method: "GET",
    url: "https://developers.zomato.com/api/v2.1/search?entity_type=city&count=25&lat=43.1888&lon=-70.8868&radius=40234&sort=real_distance&order=asc",
    dataType: "json",
    async: true,
    beforeSend: function (xhr) {
        xhr.setRequestHeader("user-key", "d52d38b8aaaa8a7ad6ebdebc2dbafe7b");
    }
})
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })







// "zomatoUrl" is the url we'll use to query the API
// begin building an object to contain our API's call's query parameters
    // set the API key
    // grab text the user typed into the search input, add to "zomatoObject"
    // if the user provides a type of resturant include it in the "zomatoObject"
