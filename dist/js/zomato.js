

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
document.getElementById('search').addEventListener('click', getResults);


function getResults() {
    $.getJSON('https://ipapi.co/json/', (res) => {
        console.log(res);

        $.ajax({
            method: "GET",
            url: `https://developers.zomato.com/api/v2.1/search?entity_type=city&lat=${res.latitude}&lon=${res.longitude}&radius=40234&sort=real_distance&order=asc`,
            dataType: "json",
            async: true,
            beforeSend: ((xhr) => {
                xhr.setRequestHeader("user-key", "d52d38b8aaaa8a7ad6ebdebc2dbafe7b");
            })
        })
            .then((data) => {
                console.log(data);

                const restaurants = data.restaurants[0].restaurant.name;


                let output = '<h2>Restaurants</h2>';
                for (let i = 0; i < restaurants.length; i++) {
                    output += `
                        <div>
                            <h3>${data.restaurants[i].restaurant.name}</h3>
                            <img src='${data.restaurants[i].restaurant.photos_url}'>
                            <ul>
                                <li>${data.restaurants[i].restaurant.location.city}
                                </li>
                                <li>Reviews: ${data.restaurants[i].restaurant.all_reviews_count}
                                </li>
                                <li>${data.restaurants[i].restaurant.location.address}
                                </li>
                                <li>Cuisines: ${data.restaurants[i].restaurant.cuisines}
                                </li>
                                <li>Highlights: ${data.restaurants[i].restaurant.highlights}
                                <li>Hours: ${data.restaurants[i].restaurant.timings}
                                </li>
                                <li>Call: ${data.restaurants[i].restaurant.phone_numbers}
                                </li>
                            </ul>
                        </div>
                    `

                    document.getElementById('output').innerHTML = output;
                }

            })
    })
};











// "zomatoUrl" is the url we'll use to query the API
// begin building an object to contain our API's call's query parameters
    // set the API key
    // grab text the user typed into the search input, add to "zomatoObject"
    // if the user provides a type of resturant include it in the "zomatoObject"
