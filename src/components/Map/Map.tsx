import {MapContainer, Marker, TileLayer} from "react-leaflet";
import styles from "./Map.module.css";
import RoutingControl from "./RoutingControl.tsx";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
})

export default function Map({path, markerPath, singleMarker} : {path?: [number, number][], markerPath?: [number, number][], singleMarker?: [number, number]}) {

    const position :[number, number] = [50.9856, 12.9810];

    return (
        <MapContainer center={position} zoom={15} scrollWheelZoom={false} className={styles.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markerPath && markerPath.map((position, index) => (
                <Marker key={index} position={position}>

                </Marker>
            ))}

            { path && <RoutingControl waypoints={path} /> }

            {singleMarker && <Marker position={singleMarker}/>}
        </MapContainer>
    )
}