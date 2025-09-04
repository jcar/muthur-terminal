// MU-TH-UR 6000 System Types and Interfaces
// Weyland-Yutani Corporation

export interface ShipSystem {
  status: 'OPERATIONAL' | 'LIMITED' | 'CRITICAL' | 'OFFLINE' | 'STANDBY' | 'COMPROMISED';
  level: number;
  subsystems: string[];
}

export interface CrewMember {
  rank: string;
  status: 'ACTIVE' | 'MISSING' | 'DECEASED' | 'DEACTIVATED';
  lastSeen: string;
  id: string;
  clearance: 'ALPHA' | 'BETA' | 'GAMMA' | 'DELTA';
  synthetic?: boolean;
}

export interface LogEntry {
  timestamp: string;
  author: string;
  type: 'FINAL_LOG' | 'CAPTAIN_LOG' | 'SCIENCE_LOG' | 'ENGINEERING_LOG' | 'NAVIGATION_LOG' | 'MEDICAL_LOG';
  content: string;
}

export interface SystemAlert {
  timestamp: string;
  type: 'SECURITY' | 'BIOMETRIC' | 'SYSTEM' | 'EMERGENCY';
  message: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface MissionData {
  missionId: string;
  destination: string;
  cargo: string;
  departure: string;
  currentLocation: string;
  etaEarth: string;
  specialOrders: string;
  contract: string;
  insurance: string;
}

export interface TerminalState {
  isLoggedIn: boolean;
  currentUser: string | null;
  sessionStart: Date;
  alienDetected: boolean;
  selfDestructActive: boolean;
  systemAlerts: SystemAlert[];
  commandHistory: string[];
}

export interface CommandResult {
  output: string[];
  statusColor?: 'success' | 'warning' | 'error' | 'info';
  clearScreen?: boolean;
  playSound?: string;
}

export interface ShipSystems {
  [key: string]: ShipSystem;
}

export interface CrewManifest {
  [key: string]: CrewMember;
}

export const COLORS = {
  GREEN: '#00ff00',
  RED: '#ff0000', 
  YELLOW: '#ffff00',
  BLUE: '#0080ff',
  CYAN: '#00ffff',
  WHITE: '#ffffff',
  DIM: '#808080',
} as const;

export const ASCII_ART = {
  ALIEN: `
    ╭─────────────────────────────╮
    │         ⚠ WARNING ⚠         │
    │    HOSTILE ORGANISM         │
    │       DETECTED              │
    ╰─────────────────────────────╯
                    
            ██████████████
          ██░░░░░░░░░░░░░░██
        ██░░░░░░░░░░░░░░░░░░██
      ██░░░░░░██████████░░░░░░██
    ██░░░░░░██          ██░░░░░░██
    ██░░░░██              ██░░░░██
    ██░░██    ████    ████  ██░░██
    ██░░██    ████    ████  ██░░██
    ██░░██                  ██░░██
    ██░░░░██              ██░░░░██
      ██░░░░░░██████████░░░░░░██
        ██░░░░░░░░░░░░░░░░░░██
          ██░░░░░░░░░░░░░░██
            ██████████████
                ████████
                ████████
                ████████
  `,
  
  NOSTROMO: `
    ╭─────────────────────────────────────╮
    │          USCSS NOSTROMO             │
    │      Commercial Towing Vessel       │
    │        Class: Star Freighter        │ 
    ╰─────────────────────────────────────╯

    ═══════════════════════════════════════════════════
    ║  ███████████████████████████████████████████  ║
    ║ ▐█████████████████ BRIDGE ████████████████▌  ║
    ║  ███████████████████████████████████████████  ║
    ║  ▐████▌ ▐████▌ ▐████▌ ▐████▌ ▐████▌ ▐████▌  ║
    ║  ▐████▌ ▐████▌ ▐████▌ ▐████▌ ▐████▌ ▐████▌  ║
    ║  ████████████████████████████████████████████ ║
    ║ ▐██████████████████ CARGO ███████████████████▌║
    ║  ████████████████████████████████████████████ ║
    ═══════════════════════════════════════════════════
                    ENGINE ARRAY
                  ████ ████ ████ ████
  `,
  
  WEYLAND_YUTANI: `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║               WEYLAND-YUTANI CORPORATION                     ║
║                 BUILDING BETTER WORLDS                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `
} as const;
