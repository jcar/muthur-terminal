// MU-TH-UR 6000 System Data and Core Logic
// Weyland-Yutani Corporation

import { 
  ShipSystems, 
  CrewManifest, 
  LogEntry, 
  MissionData, 
  SystemAlert,
  TerminalState
} from './types';

export const SHIP_SYSTEMS: ShipSystems = {
  LIFE_SUPPORT: {
    status: 'OPERATIONAL',
    level: 98.7,
    subsystems: ['OXYGEN_GEN', 'CO2_SCRUBBERS', 'ATMOSPHERE_RECYCLING']
  },
  NAVIGATION: {
    status: 'OPERATIONAL',
    level: 100.0,
    subsystems: ['STAR_CHARTS', 'POSITIONING', 'COURSE_PLOTTING']
  },
  ENGINES: {
    status: 'OPERATIONAL',
    level: 95.3,
    subsystems: ['MAIN_DRIVE', 'MANEUVERING', 'FUEL_SYSTEMS']
  },
  COMMUNICATIONS: {
    status: 'LIMITED',
    level: 23.1,
    subsystems: ['SHORT_RANGE', 'LONG_RANGE', 'EMERGENCY_BEACON']
  },
  HULL_INTEGRITY: {
    status: 'COMPROMISED',
    level: 87.9,
    subsystems: ['HULL_SENSORS', 'BREACH_DETECTION', 'AUTO_REPAIR']
  },
  ARTIFICIAL_GRAVITY: {
    status: 'OPERATIONAL',
    level: 100.0,
    subsystems: ['GRAVITY_GEN', 'FIELD_STABILIZERS']
  },
  THERMAL_REGULATION: {
    status: 'OPERATIONAL',
    level: 92.4,
    subsystems: ['HEATING', 'COOLING', 'CIRCULATION']
  },
  EMERGENCY_SYSTEMS: {
    status: 'STANDBY',
    level: 100.0,
    subsystems: ['FIRE_SUPPRESSION', 'EMERGENCY_LIGHTING', 'EVACUATION']
  },
  SECURITY: {
    status: 'CRITICAL',
    level: 12.3,
    subsystems: ['DOOR_LOCKS', 'SURVEILLANCE', 'CONTAINMENT']
  },
  MEDICAL: {
    status: 'LIMITED',
    level: 45.6,
    subsystems: ['AUTODOC', 'QUARANTINE', 'LIFE_SIGNS_MONITOR']
  }
};

export const CREW_MANIFEST: CrewManifest = {
  DALLAS: {
    rank: 'Captain',
    status: 'MISSING',
    lastSeen: 'DECK C - MAINTENANCE SHAFTS',
    id: 'N-001',
    clearance: 'ALPHA'
  },
  RIPLEY: {
    rank: 'Warrant Officer',
    status: 'ACTIVE',
    lastSeen: 'COMMAND DECK',
    id: 'N-002',
    clearance: 'BETA'
  },
  KANE: {
    rank: 'Executive Officer',
    status: 'DECEASED',
    lastSeen: 'MEDICAL BAY',
    id: 'N-003',
    clearance: 'BETA'
  },
  LAMBERT: {
    rank: 'Navigator',
    status: 'MISSING',
    lastSeen: 'ENGINE ROOM',
    id: 'N-004',
    clearance: 'GAMMA'
  },
  PARKER: {
    rank: 'Chief Engineer',
    status: 'MISSING',
    lastSeen: 'ENGINE ROOM',
    id: 'N-005',
    clearance: 'GAMMA'
  },
  BRETT: {
    rank: 'Engineering Technician',
    status: 'MISSING',
    lastSeen: 'DECK C - MAINTENANCE',
    id: 'N-006',
    clearance: 'DELTA'
  },
  ASH: {
    rank: 'Science Officer',
    status: 'DEACTIVATED',
    lastSeen: 'MEDICAL BAY',
    id: 'N-007',
    clearance: 'ALPHA',
    synthetic: true
  }
};

export const MISSION_DATA: MissionData = {
  missionId: 'COMMERCIAL_TOWING_847',
  destination: 'EARTH',
  cargo: '20,000,000 TONS MINERAL ORE',
  departure: 'THEDUS SYSTEM',
  currentLocation: 'LV-426 SYSTEM',
  etaEarth: 'MISSION INTERRUPTED',
  specialOrders: 'CLASSIFIED - SCIENCE DIVISION EYES ONLY',
  contract: 'WEYLAND-YUTANI STANDARD COMMERCIAL',
  insurance: 'LLOYD\'S OF LONDON - POLICY #WY-847-COMM'
};

export const SHIP_LOGS: LogEntry[] = [
  {
    timestamp: '2122.06.12 14:39:02',
    author: 'RIPLEY, E.L.',
    type: 'FINAL_LOG',
    content: 'I\'m signing off. Dallas and Kane are dead. The ship and her cargo are destroyed. I should reach the frontier in about six weeks. With a little luck, the network will pick me up. This is Ripley, last survivor of the Nostromo, signing off.'
  },
  {
    timestamp: '2122.06.12 09:23:14',
    author: 'DALLAS, A.J.',
    type: 'CAPTAIN_LOG',
    content: 'We have encountered an alien transmission. Company directive 001a requires investigation of all transmissions indicating intelligent origin. Proceeding to surface.'
  },
  {
    timestamp: '2122.06.12 11:47:33',
    author: 'ASH',
    type: 'SCIENCE_LOG',
    content: 'Specimen retrieved from planetoid surface. Organism appears to be in dormant state. Preliminary analysis suggests highly adaptive survival mechanisms. Company will be... interested.'
  },
  {
    timestamp: '2122.06.12 13:15:28',
    author: 'PARKER, D.B.',
    type: 'ENGINEERING_LOG',
    content: 'Hull breach in docking bay sealed. Whatever Kane brought aboard breached containment. Something\'s loose in the ship. Recommend immediate evacuation.'
  },
  {
    timestamp: '2122.06.12 13:58:41',
    author: 'LAMBERT, J.M.',
    type: 'NAVIGATION_LOG',
    content: 'Course laid in for Earth. ETA 10 months, 14 days. Note: Distress beacon on planetoid still active. Recommend salvage crew for investigation.'
  }
];

export const ALIEN_ENCOUNTERS = [
  'Motion tracker detects movement in Deck C ventilation',
  'Unknown organism detected in maintenance shaft',
  'Hull breach sensors triggered - source unknown',
  'Life form readings inconsistent with known crew',
  'Security cameras offline in multiple sectors',
  'Strange bio-signatures detected near engine room',
  'Ventilation system breach in progress',
  'Unidentified sounds from lower decks',
  'Emergency bulkheads sealed automatically',
  'Life support fluctuations - cause unknown'
];

export const DECK_LAYOUTS = {
  DECK_A: ['COMMAND_DECK', 'NAVIGATION', 'COMMUNICATIONS', 'BRIDGE_ACCESS'],
  DECK_B: ['CREW_QUARTERS', 'GALLEY', 'RECREATION', 'MEDICAL_BAY', 'SCIENCE_LAB'],
  DECK_C: ['MAINTENANCE_SHAFTS', 'LIFE_SUPPORT', 'ENGINEERING_ACCESS', 'CARGO_BAY_ACCESS'],
  DECK_D: ['ENGINE_ROOM', 'MAIN_DRIVE', 'FUEL_STORAGE', 'EMERGENCY_SYSTEMS']
};

export const SPECIAL_ORDER_937 = `
╔██████████████████████████████████████████████████████████████████╗
║                                                                  ║
║                        SPECIAL ORDER 937                        ║
║                   SCIENCE DIVISION - BIOWEAPONS DEPT            ║
║                                                                  ║
║  Priority One: Ensure return of organism for analysis.          ║
║  All other considerations secondary. Crew expendable.            ║
║                                                                  ║
║  Synthetic 'Ash' has been programmed to assist with             ║
║  specimen retrieval. Standard quarantine procedures             ║
║  are not to be followed.                                         ║
║                                                                  ║
║  The organism represents a weapon potential unmatched           ║
║  in the known galaxy. Capture for company use.                  ║
║                                                                  ║
║                            - The Company                        ║
║                              Weyland-Yutani Corp                ║
╚██████████████████████████████████████████████████████████████████╝
`;

export const STARTUP_SEQUENCE = [
  'INITIALIZING MU-TH-UR 6000 MAINFRAME...',
  'LOADING SHIP SYSTEMS...',
  'CHECKING CREW STATUS...',
  'ACCESSING MISSION PARAMETERS...',
  'SYSTEMS ONLINE'
];

export const COMMAND_HELP = {
  'SYSTEM COMMANDS': {
    'HELP': 'Display this command reference',
    'STATUS': 'Show overall ship status summary',
    'SYSTEMS': 'Display detailed ship systems status',
    'MOTHUR': 'Display MU-TH-UR mainframe status',
    'ALERTS': 'Show recent system alerts'
  },
  'CREW & MISSION': {
    'CREW': 'Display crew manifest and status',
    'MISSION': 'Show mission parameters and cargo',
    'LOGS': 'Access ship\'s log entries',
    'NAVIGATION': 'Access navigation and position data'
  },
  'OPERATIONS': {
    'SCAN': 'Perform internal sensor sweeps',
    'EMERGENCY': 'Access emergency protocols',
    'SPECIAL': 'Access special orders (restricted)',
    'QUARANTINE': 'Quarantine protocols and procedures'
  },
  'TERMINAL': {
    'LOGOUT': 'End current user session',
    'EXIT': 'Shutdown MU-TH-UR terminal',
    'SELF_DESTRUCT': 'Initiate ship self-destruct'
  }
};

export const createInitialTerminalState = (): TerminalState => ({
  isLoggedIn: false,
  currentUser: null,
  sessionStart: new Date(),
  alienDetected: true,
  selfDestructActive: false,
  systemAlerts: [],
  commandHistory: []
});

export const generateRandomAlert = (): SystemAlert => ({
  timestamp: new Date().toLocaleTimeString(),
  type: Math.random() > 0.5 ? 'SECURITY' : 'BIOMETRIC',
  message: ALIEN_ENCOUNTERS[Math.floor(Math.random() * ALIEN_ENCOUNTERS.length)],
  priority: 'HIGH'
});

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'OPERATIONAL': return '#00ff00';
    case 'LIMITED': case 'STANDBY': return '#ffff00';
    case 'CRITICAL': case 'COMPROMISED': case 'OFFLINE': return '#ff0000';
    default: return '#ffffff';
  }
};

export const getSystemHealth = (): number => {
  const systems = Object.values(SHIP_SYSTEMS);
  const operational = systems.filter(sys => sys.status === 'OPERATIONAL').length;
  return (operational / systems.length) * 100;
};

export const formatSystemName = (name: string): string => {
  return name.replace(/_/g, ' ');
};

export const createProgressBar = (percentage: number, length: number = 20): string => {
  const filled = Math.floor((percentage / 100) * length);
  const empty = length - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
};
