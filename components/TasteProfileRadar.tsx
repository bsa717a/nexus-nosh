'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { TasteProfile } from '@/lib/types';

interface TasteProfileRadarProps {
  profile: TasteProfile;
  compareProfile?: TasteProfile;
}

export default function TasteProfileRadar({ profile, compareProfile }: TasteProfileRadarProps) {
  const { preferences } = profile;

  const data = [
    { attribute: 'Quietness', value: preferences.quietness, compare: compareProfile?.preferences.quietness },
    { attribute: 'Service', value: preferences.serviceQuality, compare: compareProfile?.preferences.serviceQuality },
    { attribute: 'Healthiness', value: preferences.healthiness, compare: compareProfile?.preferences.healthiness },
    { attribute: 'Value', value: preferences.value, compare: compareProfile?.preferences.value },
    { attribute: 'Atmosphere', value: preferences.atmosphere, compare: compareProfile?.preferences.atmosphere },
  ];

  return (
    <div className="w-full h-80 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Taste Profile
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="attribute" className="text-xs" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name="Your Preferences"
            dataKey="value"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.6}
          />
          {compareProfile && (
            <Radar
              name="Comparison"
              dataKey="compare"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.3}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Your Profile</span>
        </div>
        {compareProfile && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Comparison</span>
          </div>
        )}
      </div>
    </div>
  );
}

