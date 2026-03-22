'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { GlobeIcon, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Globe to avoid SSR issues with three.js
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const WAREHOUSE_LOC = { lat: -33.8688, lng: 151.2093, name: 'Sydney HQ' }; // Sydney

const returnHotspots = [
  { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, USA', size: 1.5, color: '#f43f5e' }, // High density
  { lat: 40.7128, lng: -74.0060, name: 'New York, USA', size: 1.2, color: '#ff5c26' }, 
  { lat: 51.5074, lng: -0.1278, name: 'London, UK', size: 0.8, color: '#f79009' },
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo, JP', size: 0.9, color: '#facc15' },
  { lat: 52.5200, lng: 13.4050, name: 'Berlin, DE', size: 0.6, color: '#12b76a' },
  { lat: -23.5505, lng: -46.6333, name: 'Sao Paulo, BR', size: 0.7, color: '#f79009' },
  { lat: 43.6532, lng: -79.3832, name: 'Toronto, CA', size: 0.5, color: '#12b76a' },
];

const arcsData = returnHotspots.map(point => ({
  startLat: point.lat,
  startLng: point.lng,
  endLat: WAREHOUSE_LOC.lat,
  endLng: WAREHOUSE_LOC.lng,
  color: ['rgba(0, 178, 169, 0)', 'rgba(45, 212, 191, 1)'], // Fade from transparent to brand teal
}));

interface PointData {
  lat: number;
  lng: number;
  name: string;
  size?: number;
  color?: string;
}

export const GeospatialReturnDensity = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = React.useRef<any>();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // Auto-rotate
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <Card className="col-span-full border-none bg-gradient-to-br from-[#0a1919] to-[#040f0f] shadow-2xl relative overflow-hidden animate-fade-slide-up group">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00b2a9]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <CardHeader className="relative z-10 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-[#00b2a9]/20 flex items-center justify-center border border-[#00b2a9]/30 shadow-[0_0_15px_rgba(0,178,169,0.5)]">
               <GlobeIcon className="h-5 w-5 text-[#2dd4bf]" />
            </div>
            <div>
              <CardTitle className="text-[20px] font-black font-serif tracking-tight text-white drop-shadow-md">
                Geospatial Return Density <span className="text-[#f43f5e]">(Money Leak)</span>
              </CardTitle>
              <Typography variant="small" className="text-neutral-400 text-[12px] font-medium mt-0.5">
                Real-time origin map of returned inventory converging on Sydney HQ
              </Typography>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f43f5e]/10 rounded-lg border border-[#f43f5e]/20 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-[#f43f5e] animate-ping" />
                <span className="text-[10px] font-black text-[#f43f5e] uppercase tracking-widest leading-none">Global Hotspots Active</span>
             </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="h-[500px] w-full p-0 relative">
         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040f0f] to-transparent z-10 pointer-events-none" />
         <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a1919] to-transparent z-10 pointer-events-none" />
         
         {isMounted && (
            <div className="w-full h-full flex items-center justify-center cursor-move">
              <Globe
                ref={globeRef}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                
                // Arcs connecting to warehouse
                arcsData={arcsData}
                arcColor="color"
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={2500}
                arcStroke={0.5}
                arcAltitude={0.2}

                // Heat points
                pointsData={[...returnHotspots, WAREHOUSE_LOC]}
                pointColor={(d: object) => (d as PointData).color || '#2dd4bf'}
                pointAltitude={(d: object) => (d as PointData).size ? (d as PointData).size! * 0.05 : 0.01}
                pointRadius={(d: object) => (d as PointData).size ? (d as PointData).size! * 0.8 : 1.5}
                pointsMerge={true}
                
                // Label for Warehouse
                labelsData={[WAREHOUSE_LOC]}
                labelLat={(d: object) => (d as PointData).lat}
                labelLng={(d: object) => (d as PointData).lng}
                labelText={(d: object) => (d as PointData).name}
                labelSize={1.5}
                labelDotRadius={0.5}
                labelColor={() => 'white'}
                labelResolution={2}
                
                // Add rings around warehouse
                ringsData={[WAREHOUSE_LOC]}
                ringColor={() => (t: number) => `rgba(45, 212, 191, ${1-t})`}
                ringMaxRadius={15}
                ringPropagationSpeed={2}
                ringRepeatPeriod={1500}
              />
            </div>
         )}

         {/* Overlay Legend */}
         <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl">
            <Typography variant="small" className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3 block">
               Density Variance
            </Typography>
            <div className="space-y-2">
               <div className="flex items-center gap-3">
                 <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-[#12b76a] via-[#facc15] to-[#f43f5e]" />
                 <span className="text-[11px] font-bold text-white">Low to Critical</span>
               </div>
               <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                 <MapPin className="h-3.5 w-3.5 text-[#2dd4bf]" />
                 <span className="text-[11px] font-bold text-white">Sydney Routing Center</span>
               </div>
            </div>
         </div>
      </CardContent>
    </Card>
  );
};
