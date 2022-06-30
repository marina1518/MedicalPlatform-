import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl, GeoJson } from "pigeon-maps";
import axios from "axios";
import "./maps.css";

//! This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

//! Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

const Maps = () => {
  const [Hospitals, setHospitals] = useState([]);

  //! state contains our current location "user location"
  const [isShown, setIsShown] = useState({
    status: false,
    name: "",
    telephone: "",
    address: "",
  });
  const [center, setCenter] = useState([30.117165, 31.339126]);
  //! to get my location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setCenter({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    axios
      .get("https://future-medical.herokuapp.com/entities/info")
      .then((res) => setHospitals(res.data));
  }, [Hospitals]);

  console.log("Hospitals is", Hospitals);
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  const geoJsonSample = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [30.148013265529766, 31.328069660871982],
        },
        properties: { prop0: "value0" },
      },
    ],
  };
  return (
    <div>
      <div className="map">
        <Map
          // height={700}
          center={center}
          // zoom={zoom}
          defaultZoom={15}
        >
          <ZoomControl />
          <Marker
            width={50}
            color={color}
            anchor={[30.148084998897264, 31.327878769895243]}
          />

          {Hospitals.map((space, index) => {
            return (
              <Marker
                onMouseOver={() =>
                  setIsShown({
                    status: true,
                    name: space.arabic_name,
                    telephone: space.telephone[0],
                    address: space.address[0],
                  })
                }
                onMouseOut={() =>
                  setIsShown({
                    status: false,
                    name: space.arabic_name,
                    telephone: space.telephone[0],
                    address: space.address[0],
                  })
                }
                key={index}
                width={50}
                anchor={[space.latitude, space.longitude]}
              />
            );
          })}
        </Map>
      </div>

      <div>
        {isShown.status && (
          <div className="map-status">
            <div>{isShown.name}</div>
            <div>{isShown.address}</div>
            <div>{isShown.telephone}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maps;
