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
                const restaurants = data.restaurants
                const myMap = function () {
                    var mapProp = {
                        center: new google.maps.LatLng(
                            restaurants[0].restaurant.location.latitude,
                            restaurants[0].restaurant.location.longitude
                        ),
                        zoom: 15,
                    };
                    var map = new google.maps.Map(
                        document.getElementById('googleMap'),
                        mapProp
                    );
                    for (i = 0; i < restaurants.length; i++) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(
                                restaurants[i].restaurant.location.latitude,
                                restaurants[i].restaurant.location.longitude
                            ),
                            map: map,
                        });
                    }
                }
                let output = '<h2>Restaurants</h2>';
                for (let i = 0; i < restaurants.length; i++) {
                    output += `
                        <div class="list-none">
                            <h3>${data.restaurants[i].restaurant.name}</h3>
                            <img src='${data.restaurants[i].restaurant.photos_url}'>
                            <div class="hidden">
                                <div class="container">
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
                                <div class="container">
                                    <ul>
                                        <li>Cuisines: ${data.restaurants[i].restaurant.cuisines}
                                    </li>
                                    <li>Highlights: ${data.restaurants[i].restaurant.highlights}
                                    <li>Hours: ${data.restaurants[i].restaurant.timings}
                                    </li>
                                    </ul>
                                </div>
                                <p>Call: ${data.restaurants[i].restaurant.phone_numbers}
                                </p>
                            </div>
                        </div>
                    `
                    document.getElementById('output').innerHTML = output;
                }
                myMap();
            })
    })
}