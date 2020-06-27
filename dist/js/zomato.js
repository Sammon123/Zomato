// add event listener to run function 'getResults' when the search button is clicked on
$('.search').click(getResults);
function getResults() {
    // Load JSON-encoded data from the server using a GET HTTP request.
    $.getJSON('https://ipapi.co/json/', (res) => {
        console.log(res);
        // an asynchronous HTTP request
        $.ajax({
            // GET Request
            method: "GET",
            // https://developers.zomato.com/api/v2.1/search
            url: `https://developers.zomato.com/api/v2.1/search?entity_type=city&lat=${res.latitude}&lon=${res.longitude}&radius=40234&sort=real_distance&order=asc`,
            // The type of data that you're expecting back from the server
            dataType: "json",
            // By default, all requests are sent asynchronously
            async: true,
            // A pre-request callback function that can be used to modify the XHR object before it is sent. Use this to set custom headers
            beforeSend: ((xhr) => {
                // replacing the old value with the new one
                xhr.setRequestHeader("user-key", "d52d38b8aaaa8a7ad6ebdebc2dbafe7b");
            })
        })
            .then((data) => {
                // an asynchronous HTTP request
                $.ajax({
                    // GET Request
                    method: "GET",
                    // https://developers.zomato.com/api/v2.1/cuisines
                    url: `https://developers.zomato.com/api/v2.1/cuisines?lat=${data.latitude}&lon=${data.longitude}`,
                    // The type of data that you're expecting back from the server
                    dataType: "json",
                    // By default, all requests are sent asynchronously
                    async: true,
                    // A pre-request callback function that can be used to modify the XHR object before it is sent. Use this to set custom headers
                    beforeSend: ((xhr) => {
                        // replacing the old value with the new one
                        xhr.setRequestHeader("user-key", "d52d38b8aaaa8a7ad6ebdebc2dbafe7b");
                    })
                }).then((data) => {
                    console.log(data);
                    // loop through cuisines
                    for (let i = 0; i < data.cuisines.length; i++) {
                        // appending the cuisine name onto the #categories div
                        $("#categories").append(`
                        <a href="#">${data.cuisines[i].cuisine.cuisine_name}</a>`);
                    }
                });
                console.log(data);
                // scoping restaurants
                const restaurants = data.restaurants
                // create function to display google maps
                const myMap = function () {
                    const mapProp = {
                        // centering the location of the first restaurant in the array
                        center: new google.maps.LatLng(
                            restaurants[0].restaurant.location.latitude,
                            // latitude of the first restaurant in the array
                            restaurants[0].restaurant.location.longitude
                            // longitude of the first restaurant in the array
                        ),
                        // default zoom when map is displayed
                        zoom: 15,
                    };
                    const map = new google.maps.Map(
                        // grabbing the "#googleMaps" element
                        document.getElementById('googleMap'),
                        mapProp
                    );
                    // create for loop for to set marker for each restaurant inside of the array
                    for (i = 0; i < restaurants.length; i++) {
                        marker = new google.maps.Marker({
                            // setting position of marker
                            position: new google.maps.LatLng(
                                restaurants[i].restaurant.location.latitude,
                                // latitude of the index of restaurant in the array
                                restaurants[i].restaurant.location.longitude
                                // longitude of the index of restaurant in the array
                            ),
                            // displaying title in the index of restaurants name
                            title: restaurants[i].restaurant.name,
                            // displaying title in the index of restaurants map
                            map: map,
                        });
                    }
                }
                // scoping out the output of search results
                let output = '<h2 style="background-color: darkred;">Restaurants</h2>';
                // for loop of restaurants
                for (let i = 0; i < restaurants.length; i++) {
                    // using template literal to append name, city, amount of reviews, address, cuisines, highlights, hours, and phone number
                    output += `
                        <div class="container bg-gray-100">
                            <h3 class="text-black text-xl">${data.restaurants[i].restaurant.name}</h3>
                            <img src='https://tse1.mm.bing.net/th?id=OIP.ImMn-KIepQcOZWqS9p4XzgHaDt&pid=Api&P=0&w=324&h=163' class="spoon">
                            <div>
                                <div>
                                    <ul>
                                        <li>
                                        ${data.restaurants[i].restaurant.location.city}
                                        </li>
                                        <li>Reviews: ${data.restaurants[i].restaurant.all_reviews_count}
                                        </li>
                                        <li>${data.restaurants[i].restaurant.location.address}
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li>Cuisines: ${data.restaurants[i].restaurant.cuisines}
                                    </li>
                                    <li>Highlights: ${data.restaurants[i].restaurant.highlights}
                                    <li>Hours: ${data.restaurants[i].restaurant.timings}
                                    </li>
                                    </ul>
                                </div>
                                <p>Call: <a href="${data.restaurants[i].restaurant.menu_url}">${data.restaurants[i].restaurant.phone_numbers}</a>
                                </p>
                            </div>
                        </div>
                    `
                    // grabbing the output element to display html onto the page
                    document.getElementById('output').
                        innerHTML = output;
                }
                // calling myMap function to display map based on the current results
                myMap();
            })
    })
}
