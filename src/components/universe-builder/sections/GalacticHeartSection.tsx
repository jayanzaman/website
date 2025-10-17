'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw } from 'lucide-react'

// Galaxy Visualization Component
function GalaxyVisualization({ 
  blackHoleMass, 
  activityLevel, 
  timelineProgress 
}: {
  blackHoleMass: number;
  activityLevel: 'dormant' | 'active' | 'quasar';
  timelineProgress: number;
}) {
  const massScale = Math.log10(blackHoleMass / 1e5) / 5; // 0-1 scale
  const coreSize = 20 + (massScale * 40);
  const diskRadius = 120 + (massScale * 80);
  
  // Activity effects
  const getActivityEffects = () => {
    switch (activityLevel) {
      case 'quasar':
        return {
          coreBrightness: 150,
          jetLength: 200,
          radiationZone: 180,
          starDensity: 0.2,
          diskColor: 'rgba(255, 100, 100, 0.8)'
        };
      case 'active':
        return {
          coreBrightness: 120,
          jetLength: 100,
          radiationZone: 80,
          starDensity: 0.6,
          diskColor: 'rgba(255, 180, 100, 0.6)'
        };
      default: // dormant
        return {
          coreBrightness: 80,
          jetLength: 0,
          radiationZone: 0,
          starDensity: 1.0,
          diskColor: 'rgba(200, 200, 255, 0.4)'
        };
    }
  };

  const effects = getActivityEffects();
  
  // Generate stars based on conditions
  const generateStars = () => {
    const stars = [];
    const baseStarCount = 50;
    const actualStarCount = Math.floor(baseStarCount * effects.starDensity);
    
    for (let i = 0; i < actualStarCount; i++) {
      const angle = (i / actualStarCount) * 2 * Math.PI;
      const spiralArm = Math.floor(i / (actualStarCount / 3)); // 3 spiral arms
      const armAngle = angle + spiralArm * (2 * Math.PI / 3);
      const radius = 60 + Math.random() * (diskRadius - 60);
      
      // Skip stars in radiation zone
      if (radius < effects.radiationZone) continue;
      
      const x = Math.cos(armAngle + radius * 0.01) * radius;
      const y = Math.sin(armAngle + radius * 0.01) * radius;
      
      stars.push({
        id: i,
        x: x + 200, // Center offset
        y: y + 200,
        size: 1 + Math.random() * 2,
        brightness: 0.5 + Math.random() * 0.5
      });
    }
    return stars;
  };

  const stars = generateStars();

  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden bg-black/30 rounded-lg">
      <div className="galaxy-container relative w-96 h-96">
        
        {/* Galactic Disk */}
        <div 
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background: `radial-gradient(circle, transparent 15%, ${effects.diskColor} 40%, transparent 70%)`,
            width: `${diskRadius * 2}px`,
            height: `${diskRadius * 2}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'galaxy-rotation 20s linear infinite'
          }}
        />

        {/* Stars */}
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.brightness,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness})`,
              animation: `star-twinkle ${2 + Math.random() * 3}s ease-in-out infinite`
            }}
          />
        ))}

        {/* Radiation Zone (if active) */}
        {effects.radiationZone > 0 && (
          <div 
            className="absolute rounded-full border-2 border-red-400/50 bg-red-500/10"
            style={{
              width: `${effects.radiationZone * 2}px`,
              height: `${effects.radiationZone * 2}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'radiation-pulse 2s ease-in-out infinite'
            }}
          />
        )}

        {/* Black Hole Core */}
        <div 
          className="absolute rounded-full"
          style={{
            width: `${coreSize}px`,
            height: `${coreSize}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: activityLevel === 'quasar' 
              ? 'radial-gradient(circle, #fff 0%, #ff6b6b 30%, #000 70%)'
              : activityLevel === 'active'
              ? 'radial-gradient(circle, #fff 0%, #ffa500 40%, #000 80%)'
              : 'radial-gradient(circle, #fff 0%, #4a90e2 50%, #000 90%)',
            boxShadow: `0 0 ${coreSize * 2}px rgba(255, 255, 255, ${effects.coreBrightness / 100})`,
            filter: `brightness(${effects.coreBrightness}%)`,
            animation: `core-pulse ${activityLevel === 'quasar' ? '0.5s' : '2s'} ease-in-out infinite`
          }}
        />

        {/* Jets (if active) */}
        {effects.jetLength > 0 && (
          <>
            <div 
              className="absolute bg-gradient-to-t from-transparent via-blue-400/60 to-transparent"
              style={{
                width: '4px',
                height: `${effects.jetLength}px`,
                left: '50%',
                top: `${200 - effects.jetLength}px`,
                transform: 'translateX(-50%)',
                animation: 'jet-flicker 1s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute bg-gradient-to-b from-transparent via-blue-400/60 to-transparent"
              style={{
                width: '4px',
                height: `${effects.jetLength}px`,
                left: '50%',
                top: '200px',
                transform: 'translateX(-50%)',
                animation: 'jet-flicker 1s ease-in-out infinite'
              }}
            />
          </>
        )}

        {/* Timeline Epoch Overlay */}
        {timelineProgress > 0 && (
          <div className="absolute top-4 left-4 bg-black/70 rounded px-3 py-1 text-xs text-white">
            {timelineProgress < 0.2 ? 'Quasar Era' :
             timelineProgress < 0.5 ? 'Feedback Winds' :
             timelineProgress < 0.8 ? 'Stellar Calm' : 'Life-Friendly Epoch'}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes galaxy-rotation {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes core-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes radiation-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes jet-flicker {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Habitability Gauge Component
function HabitabilityGauge({ blackHoleMass, activityLevel }: {
  blackHoleMass: number;
  activityLevel: 'dormant' | 'active' | 'quasar';
}) {
  const calculateHabitability = () => {
    const massScale = Math.log10(blackHoleMass / 1e5) / 5;
    let baseHabitability = 0.5;
    
    // Optimal mass range (around Milky Way's 4.3M solar masses)
    const optimalMass = 4.3e6;
    const massRatio = blackHoleMass / optimalMass;
    
    if (massRatio > 0.1 && massRatio < 10) {
      baseHabitability = 0.8 - Math.abs(Math.log10(massRatio)) * 0.3;
    } else if (massRatio <= 0.1) {
      baseHabitability = 0.3; // Too small, burns out early
    } else {
      baseHabitability = 0.1; // Too large, sterilizes galaxy
    }
    
    // Activity level effects
    switch (activityLevel) {
      case 'quasar':
        baseHabitability *= 0.1;
        break;
      case 'active':
        baseHabitability *= 0.6;
        break;
      default: // dormant
        baseHabitability *= 1.0;
    }
    
    return Math.max(0, Math.min(1, baseHabitability));
  };

  const habitability = calculateHabitability();
  const getColor = () => {
    if (habitability > 0.6) return '#10b981'; // green
    if (habitability > 0.3) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getZoneDescription = () => {
    if (habitability > 0.6) return 'High habitability - stable star formation & metal enrichment';
    if (habitability > 0.3) return 'Moderate habitability - limited rocky planet formation';
    return 'Low habitability - radiation sterilizes inner regions';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Galactic Habitability</span>
        <span className="text-sm" style={{ color: getColor() }}>
          {Math.round(habitability * 100)}%
        </span>
      </div>
      
      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full transition-all duration-500 rounded-full"
          style={{
            width: `${habitability * 100}%`,
            backgroundColor: getColor(),
            boxShadow: `0 0 10px ${getColor()}50`
          }}
        />
      </div>
      
      <p className="text-xs text-gray-400">{getZoneDescription()}</p>
    </div>
  );
}

export default function GalacticHeartSection({ 
  educatorMode, 
  cosmicTime = 0,
  contemplativeMode 
}: { 
  educatorMode: boolean; 
  cosmicTime?: number;
  contemplativeMode?: boolean;
}) {
  const [blackHoleMass, setBlackHoleMass] = useState(4.3e6) // Milky Way's Sagittarius A*
  const [activityLevel, setActivityLevel] = useState<'dormant' | 'active' | 'quasar'>('dormant')
  const [timelineMode, setTimelineMode] = useState(false)
  const [timelineProgress, setTimelineProgress] = useState(0)
  const [outcome, setOutcome] = useState('')

  // Timeline animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timelineMode) {
      interval = setInterval(() => {
        setTimelineProgress(prev => {
          if (prev >= 1) {
            setTimelineMode(false);
            return 0;
          }
          return prev + 0.01;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [timelineMode]);

  // Update outcome based on parameters
  useEffect(() => {
    const massScale = Math.log10(blackHoleMass / 1e5) / 5;
    
    if (blackHoleMass < 1e6) {
      if (activityLevel === 'dormant') {
        setOutcome('Small black hole — galaxy overproduces stars, burns out early. Limited heavy element dispersal.');
      } else {
        setOutcome('Small active black hole — brief starburst followed by rapid depletion of gas reserves.');
      }
    } else if (blackHoleMass > 1e9) {
      setOutcome('Gigantic quasar — radiation sterilizes inner 50,000 light-years. Few surviving star-forming regions.');
    } else {
      if (activityLevel === 'quasar') {
        setOutcome('Massive quasar phase — violent feedback winds disperse metals but halt star formation.');
      } else if (activityLevel === 'active') {
        setOutcome('Active galactic nucleus — moderate feedback maintains spiral structure with periodic starbursts.');
      } else {
        setOutcome('Balanced feedback — long-term star formation, stable spiral arms, optimal metal enrichment.');
      }
    }

    // Trigger perfect condition event for contemplative mode
    if (contemplativeMode && blackHoleMass > 3e6 && blackHoleMass < 6e6 && activityLevel === 'dormant') {
      window.dispatchEvent(new CustomEvent('perfectCondition', { 
        detail: { section: 'galacticHeart' } 
      }));
    }
  }, [blackHoleMass, activityLevel, contemplativeMode]);

  const handleRandomize = () => {
    const masses = [1e5, 5e5, 1e6, 4.3e6, 1e7, 1e8, 1e9, 1e10];
    const activities: ('dormant' | 'active' | 'quasar')[] = ['dormant', 'active', 'quasar'];
    
    setBlackHoleMass(masses[Math.floor(Math.random() * masses.length)]);
    setActivityLevel(activities[Math.floor(Math.random() * activities.length)]);
  };

  const resetToMilkyWay = () => {
    setBlackHoleMass(4.3e6);
    setActivityLevel('dormant');
    setTimelineProgress(0);
    setTimelineMode(false);
  };

  useEffect(() => {
    window.addEventListener('randomizeUniverse', handleRandomize);
    return () => window.removeEventListener('randomizeUniverse', handleRandomize);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Panel - Controls and Info */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Galactic Heart
              </CardTitle>
              <CardDescription className="text-gray-300">
                Supermassive Black Holes: Creators and Destroyers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Introduction */}
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-sm leading-relaxed text-gray-200">
                  "Galaxies live and die by their black holes. A little violence spreads the metals of life. 
                  Too much, and it burns them away."
                </p>
              </div>

              {/* Black Hole Mass Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Black Hole Mass</label>
                  <span className="text-xs text-gray-400">
                    {blackHoleMass.toExponential(1)} M☉
                  </span>
                </div>
                <div className="relative">
                  <Slider
                    value={[Math.log10(blackHoleMass)]}
                    onValueChange={(value) => setBlackHoleMass(Math.pow(10, value[0]))}
                    min={5} // 10^5 solar masses
                    max={10} // 10^10 solar masses
                    step={0.1}
                    className="w-full"
                  />
                  {/* Optimal range indicator - around Milky Way mass */}
                  <div className="absolute top-0 h-2 bg-green-500/30 rounded" 
                       style={{
                         left: `${((6.0 - 5) / (10 - 5)) * 100}%`,
                         width: `${((7.5 - 6.0) / (10 - 5)) * 100}%`
                       }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>10⁵ M☉</span>
                  <span className="text-green-400 font-bold">10⁶-10⁷·⁵ M☉ (optimal)</span>
                  <span className="text-yellow-400">Milky Way: 4.3×10⁶ M☉</span>
                  <span>10¹⁰ M☉</span>
                </div>
              </div>

              {/* Activity Level Toggle */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Activity Level</label>
                <div className="flex gap-2">
                  {(['dormant', 'active', 'quasar'] as const).map((level) => (
                    <Button
                      key={level}
                      variant={activityLevel === level ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActivityLevel(level)}
                      className={`flex-1 ${
                        activityLevel === level 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      } text-white`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Timeline Controls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Cosmic Timeline</label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTimelineMode(!timelineMode)}
                      className="bg-white/5 border-white/20 hover:bg-white/10 text-white"
                    >
                      {timelineMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetToMilkyWay}
                      className="bg-white/5 border-white/20 hover:bg-white/10 text-white"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {timelineMode && (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-100"
                      style={{ width: `${timelineProgress * 100}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Habitability Gauge */}
              <HabitabilityGauge blackHoleMass={blackHoleMass} activityLevel={activityLevel} />

              {/* Milky Way Facts */}
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="text-sm font-semibold mb-2 text-blue-300">Sagittarius A* Facts</h4>
                <div className="text-xs space-y-1 text-gray-300">
                  <div>Mass: 4.3 million M☉</div>
                  <div>Distance: 26,000 light-years</div>
                  <div>Activity: Dormant</div>
                  <div>Role: Regulated Milky Way's star formation</div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Visualization */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-white/20 text-white">
            <CardContent className="p-6">
              <GalaxyVisualization 
                blackHoleMass={blackHoleMass}
                activityLevel={activityLevel}
                timelineProgress={timelineProgress}
              />
            </CardContent>
          </Card>

          {/* Outcome Display */}
          <Card className="bg-white/5 border-white/20 text-white">
            <CardContent className="p-4">
              <h4 className="text-sm font-semibold mb-2">Galaxy Evolution</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{outcome}</p>
            </CardContent>
          </Card>

          {/* Reflection Quote */}
          {contemplativeMode && (
            <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 text-white">
              <CardContent className="p-4">
                <p className="text-sm italic text-amber-200 leading-relaxed">
                  "We owe our existence to the calm in the eye of a cosmic storm. 
                  Creation requires containment; violence gives birth to order."
                </p>
              </CardContent>
            </Card>
          )}

          {educatorMode && (
            <div className="space-y-4">
              <Card className="bg-blue-900/20 border-blue-500/30 text-white">
                <CardHeader>
                  <CardTitle className="text-blue-300">Educational Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-blue-200">
                    <p>• Black holes regulate star formation through feedback</p>
                    <p>• Optimal mass range enables long-term habitability</p>
                    <p>• Early quasar activity dispersed heavy elements</p>
                    <p>• Our galaxy's dormant phase allows life to emerge</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-900/20 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-300">⚠️ The Supermassive Black Hole Enigmas</CardTitle>
                  <CardDescription className="text-red-200">
                    Fundamental mysteries about galactic evolution and black hole formation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-red-200">
                    <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                      <p className="font-semibold text-red-100 mb-2">The Seed Black Hole Problem:</p>
                      <p className="text-xs">Supermassive black holes with billions of solar masses exist when the universe was only 700 million years old. Even growing at the maximum theoretical rate (Eddington limit), <strong>seed black holes would need to start at ~10,000 solar masses</strong> - but we don't know how such massive seeds formed so early.</p>
                    </div>
                    
                    <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                      <p className="font-semibold text-red-100 mb-2">The M-Sigma Relation Mystery:</p>
                      <p className="text-xs">Black hole mass correlates precisely with galaxy bulge velocity dispersion across 5 orders of magnitude. This suggests <strong>black holes and galaxies co-evolved</strong>, but the physical mechanism is unknown. How does a tiny black hole "know" about the much larger galaxy around it?</p>
                    </div>

                    <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                      <p className="font-semibold text-red-100 mb-2">The Feedback Mechanism Puzzle:</p>
                      <p className="text-xs">Active galactic nuclei somehow regulate star formation across entire galaxies, but the physics is unclear. <strong>Jets, winds, and radiation</strong> from black holes must precisely balance inflow and outflow to maintain the M-sigma relation. Too much feedback = dead galaxy; too little = runaway star formation.</p>
                    </div>

                    <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                      <p className="font-semibold text-red-100 mb-2">The Dormancy Problem:</p>
                      <p className="text-xs">Most supermassive black holes today are nearly dormant (including Sagittarius A*), accreting at ~0.01% of the Eddington rate. <strong>We don't understand why they "turned off"</strong> or what maintains this low-activity state that enables habitability around galaxies.</p>
                    </div>

                    <div className="bg-red-900/30 p-3 rounded border border-red-500/40">
                      <p className="font-semibold text-red-100 mb-2">The Intermediate Mass Gap:</p>
                      <p className="text-xs">We observe stellar-mass black holes (3-100 M☉) and supermassive ones (10⁶-10¹⁰ M☉), but very few intermediate-mass black holes. This <strong>"mass gap" suggests unknown physics</strong> prevents or destroys black holes in the 100-100,000 solar mass range.</p>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/40 rounded">
                      <p className="text-yellow-200 font-semibold mb-2">🕳️ The Deeper Mystery:</p>
                      <p className="text-xs text-yellow-100">
                        Black holes are the most extreme objects in the universe, yet they seem to <strong>create order rather than chaos</strong>. They regulate star formation, distribute heavy elements, and maintain galactic structure. The fact that our galaxy's black hole is in a "Goldilocks zone" of mass and activity may be necessary for life, but we don't understand why this balance exists or how it's maintained.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
