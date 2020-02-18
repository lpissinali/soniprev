

export default function initMap() {
    let coordinates = {lat: 55.768003, lng: 37.582674},
        map = new google.maps.Map(document.querySelector(".main-map__google-map"), {
            center: coordinates,
            zoom: 17
        });

    // let markerImage = {
    //     url: './img/content/icon_map-marker.png',
    //     size: new google.maps.Size(24, 36),
    //     origin: new google.maps.Point(0, 0),
    //     anchor: new google.maps.Point(10, 0)
    // };
    let marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        // icon: markerImage,
        // height: 32,
        // width: 24,
    });
}

