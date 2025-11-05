import { useMemo, useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

type TastePoint = { trait: string; score: number };

const YOU: TastePoint[] = [
  { trait: 'Quiet', score: 85 },
  { trait: 'Speed', score: 70 },
  { trait: 'Service', score: 90 },
  { trait: 'Healthy', score: 65 },
  { trait: 'Impress', score: 88 },
  { trait: 'Value', score: 75 },
];

const FRIENDS: TastePoint[] = [
  { trait: 'Quiet', score: 70 },
  { trait: 'Speed', score: 75 },
  { trait: 'Service', score: 82 },
  { trait: 'Healthy', score: 72 },
  { trait: 'Impress', score: 80 },
  { trait: 'Value', score: 85 },
];

const RESTAURANTS = [
  { name: 'Cliffside Restaurant', lat: 37.0916, lng: -113.5610, note: 'Quiet • Impress 9/10', kind: 'favorite' as const },
  { name: 'Wood Ash Rye', lat: 37.1077, lng: -113.5839, note: 'Upscale • Service 9/10', kind: 'match' as const },
  { name: 'Farmstead', lat: 37.1165, lng: -113.5624, note: 'Friend pick • Value 8/10', kind: 'friend' as const },
];

export default function LunchApp() {
  const [compare, setCompare] = useState<'you'|'friends'|'both'>('you');
  const center = useMemo(() => ({ lat: 37.0965, lng: -113.5684 }), []); // St. George-ish

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">Nexus Nosh</h1>
        <p className="text-gray-600">Smart lunch pairings for business and pleasure</p>
      </header>

      {/* Top Picks */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-3">Welcome Back, Derek!</h2>
            <p className="text-gray-500 mb-4">Here are your top lunch spots today:</p>
            <div className="grid md:grid-cols-3 gap-4">
              {['Cliffside Restaurant','Wood Ash Rye','Painted Pony'].map((r) => (
                <Card key={r} className="border rounded-xl">
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{r}</span>
                      <span>⭐</span>
                    </div>
                    <p className="text-gray-500 text-sm">Perfect for business lunches</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Map / Nearby Picks */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Map — Nearby Picks</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Near Me</Button>
                <Button variant="outline" size="sm">Filters</Button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <MapView restaurants={RESTAURANTS} center={center} />
              </div>
              <div className="space-y-3">
                {RESTAURANTS.map((i) => (
                  <Card key={i.name} className="border rounded-xl">
                    <CardContent>
                      <p className="font-semibold">{i.name}</p>
                      <p className="text-sm text-gray-500">{i.note}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* AI Taste Profile with toggle */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Taste Profile</h2>
              <div className="flex gap-2">
                <Button variant={compare==='you'?'solid':'outline'} size="sm" onClick={()=>setCompare('you')}>You</Button>
                <Button variant={compare==='friends'?'solid':'outline'} size="sm" onClick={()=>setCompare('friends')}>Friends</Button>
                <Button variant={compare==='both'?'solid':'outline'} size="sm" onClick={()=>setCompare('both')}>Compare</Button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={YOU} cx="50%" cy="50%" outerRadius="80%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="trait" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    {(compare === 'you' || compare === 'both') && (
                      <Radar name="You" dataKey="score" stroke="#fb923c" fill="#fb923c" fillOpacity={0.3} />
                    )}
                    {(compare === 'friends' || compare === 'both') && (
                      <Radar name="Friends" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} data={FRIENDS} />
                    )}
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• You favor <span className="font-semibold">quiet</span> spaces and high <span className="font-semibold">service</span>.</p>
                <p>• Friends lean higher on <span className="font-semibold">value</span> and <span className="font-semibold">healthy</span>.</p>
                <p>• Use <em>Compare</em> to find overlap picks for meetings.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Action */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center">
        <Button className="shadow-lg px-8 py-3 text-lg">+ Add Restaurant</Button>
      </div>
    </div>
  );
}
