'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Sucre, Bolivia coordinates
const SUCRE_COORDS: [number, number] = [-19.0478, -65.2596]

// Fix default marker icons for Next.js
const createCustomIcon = (color: string, emoji: string) => {
  return L.divIcon({
    html: `<div style="
      background: ${color};
      width: 40px;
      height: 40px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span style="transform: rotate(45deg); font-size: 18px; display: block; text-align: center; line-height: 34px;">${emoji}</span>
    </div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })
}

const markers = [
  {
    position: SUCRE_COORDS,
    title: '🦋 Borboleta Salón de Eventos',
    description: 'Nuestro hermoso salón en el corazón de Sucre',
    color: '#9333ea',
    emoji: '🦋',
    main: true,
  },
  {
    position: [-19.0420, -65.2590] as [number, number],
    title: '🏨 Hotel Los Parrales',
    description: 'Hotel recomendado para huéspedes',
    color: '#3b82f6',
    emoji: '🏨',
  },
  {
    position: [-19.0510, -65.2550] as [number, number],
    title: '🅿️ Parqueo Central',
    description: 'Amplio parqueo a 5 minutos',
    color: '#10b981',
    emoji: '🅿️',
  },
  {
    position: [-19.0460, -65.2620] as [number, number],
    title: '🏨 Gran Hotel Sucre',
    description: 'Alojamiento para visitantes',
    color: '#3b82f6',
    emoji: '🏨',
  },
]

function SetView({ coords }: { coords: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(coords, 15)
  }, [map, coords])
  return null
}

export default function MapComponent() {
  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden shadow-xl border">
      <MapContainer
        center={SUCRE_COORDS}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, i) => (
          <Marker
            key={i}
            position={marker.position}
            icon={createCustomIcon(marker.color, marker.emoji)}
          >
            <Popup>
              <div className="p-1">
                <p className="font-bold text-sm">{marker.title}</p>
                <p className="text-xs text-gray-600 mt-1">{marker.description}</p>
                {marker.main && (
                  <a
                    href="https://www.openstreetmap.org/search?query=Sucre+Bolivia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-600 hover:underline mt-2 block"
                  >
                    Ver en OpenStreetMap →
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
