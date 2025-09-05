import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Zap, Thermometer, Wind, Sun, Moon } from "lucide-react";

interface EnergyZone {
  id: string;
  name: string;
  energy: number;
  direction: string;
  element: string;
  color: string;
  description: string;
}

const energyZones: EnergyZone[] = [
  { id: "ne", name: "Northeast", energy: 85, direction: "NE", element: "Water", color: "bg-blue-500", description: "High positive energy, wealth zone" },
  { id: "nw", name: "Northwest", energy: 65, direction: "NW", element: "Air", color: "bg-cyan-500", description: "Movement and change energy" },
  { id: "se", name: "Southeast", energy: 75, direction: "SE", element: "Fire", color: "bg-red-500", description: "Fire energy, fame and recognition" },
  { id: "sw", name: "Southwest", energy: 45, direction: "SW", element: "Earth", color: "bg-yellow-600", description: "Stability and grounding energy" },
  { id: "center", name: "Center", energy: 90, direction: "Center", element: "Space", color: "bg-purple-500", description: "Brahmasthan, cosmic energy center" },
  { id: "n", name: "North", energy: 70, direction: "N", element: "Water", color: "bg-blue-400", description: "Career and life path energy" },
  { id: "s", name: "South", energy: 55, direction: "S", element: "Fire", color: "bg-orange-500", description: "Fame and reputation energy" },
  { id: "e", name: "East", energy: 80, direction: "E", element: "Air", color: "bg-green-500", description: "Health and family energy" },
  { id: "w", name: "West", energy: 60, direction: "W", element: "Earth", color: "bg-brown-500", description: "Children and creativity energy" }
];

const elementIcons = {
  Water: <Zap className="h-4 w-4" />,
  Air: <Wind className="h-4 w-4" />,
  Fire: <Sun className="h-4 w-4" />,
  Earth: <Thermometer className="h-4 w-4" />,
  Space: <Moon className="h-4 w-4" />
};

export default function EnergyMap() {
  const [selectedProperty, setSelectedProperty] = useState("sunset-villa");
  const [energyThreshold, setEnergyThreshold] = useState([50]);
  const [showElements, setShowElements] = useState(true);

  const getEnergyColor = (energy: number) => {
    if (energy >= 80) return "bg-green-500";
    if (energy >= 60) return "bg-yellow-500";
    if (energy >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getEnergyIntensity = (energy: number) => {
    return energy >= energyThreshold[0] ? "opacity-100" : "opacity-30";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Energy Flow Map</h2>
          <p className="text-muted-foreground">
            Visualize energy distribution and flow patterns in your property
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Zap className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            Export Map
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Map Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Property</label>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunset-villa">Sunset Villa</SelectItem>
                  <SelectItem value="riverside-apartments">Riverside Apartments</SelectItem>
                  <SelectItem value="green-valley">Green Valley Complex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Energy Threshold: {energyThreshold[0]}%</label>
              <Slider
                value={energyThreshold}
                onValueChange={setEnergyThreshold}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-elements"
                checked={showElements}
                onChange={(e) => setShowElements(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="show-elements" className="text-sm font-medium">
                Show Elements
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy Map Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Energy Distribution</CardTitle>
          <CardDescription>
            Interactive map showing energy flow and elemental balance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden">
            {/* 3x3 Grid Layout */}
            <div className="grid grid-cols-3 gap-1 h-full p-2">
              {/* Northwest */}
              <div className="relative">
                <div
                  className={`w-full h-full rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${getEnergyColor(energyZones.find(z => z.id === 'nw')!.energy)} ${getEnergyIntensity(energyZones.find(z => z.id === 'nw')!.energy)}`}
                >
                  <div className="text-center">
                    <div className="text-xs">NW</div>
                    <div className="text-lg">{energyZones.find(z => z.id === 'nw')!.energy}%</div>
                    {showElements && (
                      <div className="text-xs opacity-75">
                        {elementIcons[energyZones.find(z => z.id === 'nw')!.element as keyof typeof elementIcons]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* North */}
              <div className="relative">
                <div
                  className={`w-full h-full rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${getEnergyColor(energyZones.find(z => z.id === 'n')!.energy)} ${getEnergyIntensity(energyZones.find(z => z.id === 'n')!.energy)}`}
                >
                  <div className="text-center">
                    <div className="text-xs">N</div>
                    <div className="text-lg">{energyZones.find(z => z.id === 'n')!.energy}%</div>
                    {showElements && (
                      <div className="text-xs opacity-75">
                        {elementIcons[energyZones.find(z => z.id === 'n')!.element as keyof typeof elementIcons]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Northeast */}
              <div className="relative">
                <div
                  className={`w-full h-full rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${getEnergyColor(energyZones.find(z => z.id === 'ne')!.energy)} ${getEnergyIntensity(energyZones.find(z => z.id === 'ne')!.energy)}`}
                >
                  <div className="text-center">
                    <div className="text-xs">NE</div>
                    <div className="text-lg">{energyZones.find(z => z.id === 'ne')!.energy}%</div>
                    {showElements && (
                      <div className="text-xs opacity-75">
                        {elementIcons[energyZones.find(z => z.id === 'ne')!.element as keyof typeof elementIcons]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* West */}
              <div className="relative">
                <div
                  className={`w-full h-full rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${getEnergyColor(energyZones.find(z => z.id === 'w')!.energy)} ${getEnergyIntensity(energyZones.find(z => z.id === 'w')!.energy)}`}
                >
                  <div className="text-center">
                    <div className="text-xs">W</div>
                    <div className="text-lg">{energyZones.find(z => z.id === 'w')!.energy}%</div>
                    {showElements && (
                      <div className="text-xs opacity-75">
                        {elementIcons[energyZones.find(z => z.id === 'w')!.element as keyof typeof elementIcons]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Center */}
              <div className="relative">
                <div
                  className={`w-full h-full rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${getEnergyColor(energyZones.find(z => z.id === 'center')!.energy)} ${getEnergyIntensity(energyZones.find(z => z.id === 'center')!.energy)}`}
                >
                  <div className="text-center">
                    <div className="text-xs">Center</div>
                    <div className="text-lg">{energyZones.find(z => z.id === 'center')!.energy}%</div>
                    {showElements && (
                      <div className="text-xs opacity-75">
                        {elementIcons[energyZones.find(z => z.id === 'center')!.element as keyof typeof elementIcons]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* East */}
              <div className="relative">
                <div
                  className={`w-full h-full rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${getEnergyColor(energyZones.find(z => z.id === 'e')!.energy)} ${getEnergyIntensity(energyZones.find(z => z.id === 'e')!.energy)}`}
                >
                  <div className="text-center">
                    <div className="text-xs">E</div>
                    <div className="text-lg">{energyZones.find(z => z.id === 'e')!.energy}%</div>
                    {showElements && (
                      <div className="text-xs opacity-75">
                        {elementIcons[energyZones.find(z => z.id === 'e')!.element as keyof typeof elementIcons]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Southwest */}
              <div className="relative">
                <div
                  className={`w-full h-full rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${getEnergyColor(energyZones.find(z => z.id === 'sw')!.energy)} ${getEnergyIntensity(energyZones.find(z => z.id === 'sw')!.energy)}`}
                >
                  <div className="text-center">
                    <div className="text-xs">SW</div>
                    <div className="text-lg">{energyZones.find(z => z.id === 'sw')!.energy}%</div>
                    {showElements && (
                      <div className="text-xs opacity-75">
                        {elementIcons[energyZones.find(z => z.id === 'sw')!.element as keyof typeof elementIcons]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* South */}
              <div className="relative">
                <div
                  className={`w-full h-full rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${getEnergyColor(energyZones.find(z => z.id === 's')!.energy)} ${getEnergyIntensity(energyZones.find(z => z.id === 's')!.energy)}`}
                >
                  <div className="text-center">
                    <div className="text-xs">S</div>
                    <div className="text-lg">{energyZones.find(z => z.id === 's')!.energy}%</div>
                    {showElements && (
                      <div className="text-xs opacity-75">
                        {elementIcons[energyZones.find(z => z.id === 's')!.element as keyof typeof elementIcons]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Southeast */}
              <div className="relative">
                <div
                  className={`w-full h-full rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${getEnergyColor(energyZones.find(z => z.id === 'se')!.energy)} ${getEnergyIntensity(energyZones.find(z => z.id === 'se')!.energy)}`}
                >
                  <div className="text-center">
                    <div className="text-xs">SE</div>
                    <div className="text-lg">{energyZones.find(z => z.id === 'se')!.energy}%</div>
                    {showElements && (
                      <div className="text-xs opacity-75">
                        {elementIcons[energyZones.find(z => z.id === 'se')!.element as keyof typeof elementIcons]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy Zones Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Energy Zone Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {energyZones.map((zone) => (
              <div key={zone.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className={`w-4 h-4 rounded ${zone.color}`}></div>
                <div className="flex-1">
                  <div className="font-medium">{zone.name} ({zone.direction})</div>
                  <div className="text-sm text-muted-foreground">{zone.element} Element</div>
                  <div className="text-xs text-muted-foreground mt-1">{zone.description}</div>
                </div>
                <Badge variant="outline">{zone.energy}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}