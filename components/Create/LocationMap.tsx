import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import { CSSProperties, useEffect, useMemo, useState } from "react"

const mapStyles: CSSProperties = {
    width: '350px',
    height: '180px',
    marginTop: '30px',
    marginBottom: '10px',
    borderRadius: '15px',
    outline: '2px solid #ed7bbe',
    marginLeft: 0,
    marginRight: 0
}

const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true
}

const LocationMap = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAa8AwVw9QKRS5AyGTih-iqcXgJ0ImcJ7o"
    })

    const [center, setCenter] = useState<google.maps.LatLngLiteral>({lat: 0, lng: 0})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((data) => setCenter({lat: data.coords.latitude, lng: data.coords.longitude}))
    }, [])

    return isLoaded ? (

        <GoogleMap options={mapOptions} mapContainerStyle={mapStyles} center={center} zoom={18}>

            <Marker position={center}/>

        </GoogleMap>

    ) : (
        <div>hi</div>
    )
}

export default LocationMap