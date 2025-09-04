// MU-TH-UR 6000 Command Processor
// Weyland-Yutani Corporation

import { 
  CommandResult, 
  TerminalState
} from './types';
import {
  SHIP_SYSTEMS,
  CREW_MANIFEST,
  MISSION_DATA,
  SHIP_LOGS,
  COMMAND_HELP,
  SPECIAL_ORDER_937,
  generateRandomAlert,
  getSystemHealth,
  formatSystemName,
  createProgressBar
} from './muthur-data';
import { ASCII_ART } from './types';

export class MUTHURCommandProcessor {
  private state: TerminalState;

  constructor(state: TerminalState) {
    this.state = state;
  }

  processCommand(command: string): CommandResult {
    const cmd = command.trim().toUpperCase();
    
    if (!this.state.isLoggedIn && !['LOGIN', 'HELP'].includes(cmd)) {
      return {
        output: ['Authentication required. Please login with crew ID.'],
        statusColor: 'error'
      };
    }

    switch (cmd) {
      case 'HELP':
      case '?':
        return this.helpCommand();
      
      case 'STATUS':
        return this.statusCommand();
      
      case 'SYSTEMS':
        return this.systemsCommand();
      
      case 'CREW':
        return this.crewCommand();
      
      case 'NAVIGATION':
      case 'NAV':
        return this.navigationCommand();
      
      case 'MISSION':
        return this.missionCommand();
      
      case 'LOGS':
        return this.logsCommand();
      
      case 'SCAN':
        return this.scanCommand();
      
      case 'EMERGENCY':
        return this.emergencyCommand();
      
      case 'SPECIAL':
        return this.specialCommand();
      
      case 'MOTHUR':
        return this.motherCommand();
      
      case 'ALERTS':
        return this.alertsCommand();
      
      case 'QUARANTINE':
        return this.quarantineCommand();
      
      case 'XENOMORPH':
      case 'ALIEN':
      case 'ORGANISM':
        return this.xenomorphCommand();
      
      case 'SELF_DESTRUCT':
        return this.selfDestructCommand();
      
      case 'LOGOUT':
      case 'LOGOFF':
        return this.logoutCommand();
      
      case 'EXIT':
      case 'QUIT':
      case 'SHUTDOWN':
        return this.exitCommand();
      
      // Easter eggs
      case 'HAL':
      case 'HAL9000':
        return {
          output: [
            "I'm sorry Dave, I'm afraid I can't do that.",
            "This is MU-TH-UR 6000, not HAL 9000."
          ],
          statusColor: 'info'
        };
      
      case 'HELLO':
      case 'HI':
        return {
          output: ['Hello. I am MU-TH-UR 6000, your ship\'s computer.'],
          statusColor: 'success'
        };
      
      case '':
        return { output: [] };
      
      default:
        return {
          output: [
            `UNKNOWN COMMAND: ${command}`,
            "Type 'HELP' for available commands"
          ],
          statusColor: 'error'
        };
    }
  }

  private helpCommand(): CommandResult {
    const output = [
      '╔══════════════════════════════════════════════════════════════════╗',
      '║                    MU-TH-UR 6000 COMMAND REFERENCE              ║',
      '╚══════════════════════════════════════════════════════════════════╝',
      ''
    ];

    Object.entries(COMMAND_HELP).forEach(([category, commands]) => {
      output.push(`${category}:`);
      Object.entries(commands).forEach(([cmd, desc]) => {
        output.push(`  ${cmd.padEnd(15)}: ${desc}`);
      });
      output.push('');
    });

    output.push('Hint: Some commands have hidden features. Explore responsibly.');

    return { output, statusColor: 'info' };
  }

  private statusCommand(): CommandResult {
    const health = getSystemHealth();
    const operational = Object.values(SHIP_SYSTEMS).filter(s => s.status === 'OPERATIONAL').length;
    const total = Object.keys(SHIP_SYSTEMS).length;
    const healthBar = createProgressBar(health, 30);

    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║                     SHIP STATUS REPORT                      ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
        'VESSEL: USCSS NOSTROMO (180924609)',
        'CLASS: Commercial Star Freighter',
        'STATUS: 🚨 EMERGENCY ALERT',
        'CREW: 1 ACTIVE, 6 MISSING/DECEASED',
        'LOCATION: ZETA 2 RETICULI - LV-426 SYSTEM',
        'MISSION: INTERRUPTED - ALIEN ENCOUNTER',
        '',
        `SYSTEMS STATUS: ${operational}/${total} OPERATIONAL`,
        `OVERALL HEALTH: [${healthBar}] ${health.toFixed(1)}%`,
        '',
        '>>> IMMEDIATE ATTENTION REQUIRED <<<',
        '>>> HOSTILE ORGANISM ABOARD SHIP <<<'
      ],
      statusColor: 'error'
    };
  }

  private systemsCommand(): CommandResult {
    const output = [
      '╔══════════════════════════════════════════════════════════════════╗',
      '║                        SHIP SYSTEMS STATUS                      ║',
      '╚══════════════════════════════════════════════════════════════════╝',
      ''
    ];

    Object.entries(SHIP_SYSTEMS).forEach(([name, system]) => {
      const displayName = formatSystemName(name);
      const bar = createProgressBar(system.level, 20);
      output.push(`${displayName.padEnd(20)}: ${system.status.padEnd(12)} [${bar}] ${system.level.toFixed(1)}%`);

      // Show subsystems for critical systems
      if (['CRITICAL', 'LIMITED', 'COMPROMISED'].includes(system.status)) {
        system.subsystems.forEach(subsys => {
          const subsysStatus = system.level < 50 ? 'OFFLINE' : 'LIMITED';
          output.push(`  └─ ${formatSystemName(subsys)}: ${subsysStatus}`);
        });
      }
    });

    return { output, statusColor: 'info' };
  }

  private crewCommand(): CommandResult {
    const output = [
      '╔══════════════════════════════════════════════════════════════════╗',
      '║                    CREW MANIFEST - USCSS NOSTROMO               ║',
      '╚══════════════════════════════════════════════════════════════════╝',
      ''
    ];

    Object.entries(CREW_MANIFEST).forEach(([name, crew]) => {
      const syntheticTag = crew.synthetic ? ' [SYNTHETIC]' : '';
      output.push(`${name.padEnd(12)}: ${crew.rank.padEnd(25)} [${crew.id}]`);
      output.push(`             Status: ${crew.status.padEnd(15)} Clearance: ${crew.clearance}${syntheticTag}`);
      output.push(`             Last Location: ${crew.lastSeen}`);
      output.push('');
    });

    const active = Object.values(CREW_MANIFEST).filter(c => c.status === 'ACTIVE').length;
    const missing = Object.values(CREW_MANIFEST).filter(c => c.status === 'MISSING').length;
    const deceased = Object.values(CREW_MANIFEST).filter(c => c.status === 'DECEASED').length;

    output.push('CREW SUMMARY:');
    output.push(`  Active: ${active}`);
    output.push(`  Missing: ${missing}`);
    output.push(`  Deceased: ${deceased}`);

    return { output, statusColor: 'info' };
  }

  private navigationCommand(): CommandResult {
    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║                        NAVIGATION DATA                       ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
        'CURRENT POSITION:',
        '  System: ZETA 2 RETICULI',
        '  Planetoid: LV-426 (ACHERON)',
        '  Coordinates: 39°46\'N 116°24\'W',
        '  Orbital Status: STATIONARY ORBIT - 200km ALTITUDE',
        '',
        'DESTINATION:',
        '  Target: SOL SYSTEM - EARTH',
        '  ETA: MISSION INTERRUPTED',
        '  Distance: 37.2 LIGHT YEARS',
        '',
        'FLIGHT STATUS:',
        '  Engines: STANDBY',
        '  Navigation: ONLINE',
        '  Course: MISSION ABORT PROTOCOLS',
        '',
        'PRIORITY ALERTS:',
        '  ⚠ Distress beacon detected on surface',
        '  ⚠ Company directive: Investigate all signals',
        '  ⚠ Hostile life form encountered',
        '',
        'Local Star Chart:',
        '    ✦ SOL SYSTEM (37.2 LY)',
        '        ✦',
        '           ✦ VEGA',
        '      ✦',
        '  ◉ ZETA 2 RETICULI (CURRENT)',
        '        ✦',
        '           ✦ ALTAIR'
      ],
      statusColor: 'info'
    };
  }

  private missionCommand(): CommandResult {
    const output = [
      '╔══════════════════════════════════════════════════════════════╗',
      '║                      MISSION PARAMETERS                     ║',
      '╚══════════════════════════════════════════════════════════════╝',
      '',
      'MISSION DETAILS:'
    ];

    Object.entries(MISSION_DATA).forEach(([key, value]) => {
      const displayKey = key.replace(/([A-Z])/g, ' $1').toUpperCase().replace(/^./, str => str.toUpperCase());
      output.push(`  ${displayKey.padEnd(20)}: ${value}`);
    });

    output.push('');
    output.push('CARGO MANIFEST:');
    output.push('  Primary: 20,000,000 TONS MINERAL ORE');
    output.push('  Value: $42,000,000 CREDITS');
    output.push('  Status: SHIP DESTROYED - TOTAL LOSS');
    output.push('');
    output.push('MISSION STATUS:');
    output.push('  🚨 MISSION FAILURE');
    output.push('  🚨 CREW CASUALTIES: 6');
    output.push('  🚨 SHIP DESTRUCTION: CONFIRMED');
    output.push('  ⚠ SURVIVOR: 1 (RIPLEY, E.L.)');

    return { output, statusColor: 'warning' };
  }

  private logsCommand(): CommandResult {
    const output = [
      '╔══════════════════════════════════════════════════════════════════╗',
      '║                         SHIP\'S LOG ENTRIES                      ║',
      '╚══════════════════════════════════════════════════════════════════╝',
      ''
    ];

    SHIP_LOGS.forEach((log, index) => {
      output.push(`${index + 1}. ${log.type.replace('_', ' ')} - ${log.author}`);
      output.push(`   [${log.timestamp}]`);
      
      // Word wrap content
      const words = log.content.split(' ');
      let line = '   ';
      words.forEach(word => {
        if ((line + word).length > 60) {
          output.push(line);
          line = '   ' + word + ' ';
        } else {
          line += word + ' ';
        }
      });
      if (line.trim().length > 0) output.push(line);
      output.push('');
    });

    return { output, statusColor: 'info' };
  }

  private scanCommand(): CommandResult {
    // Add random alert
    if (Math.random() < 0.4) {
      this.state.systemAlerts.push(generateRandomAlert());
    }

    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║                      SENSOR ARRAY STATUS                    ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
        'Initiating full spectrum sensor sweep...',
        'Scanning ◐ 100% complete',
        '',
        'SCAN RESULTS SUMMARY:',
        '  Hull Integrity: 87.9% - Minor breaches detected',
        '  Atmospheric Composition: NORMAL',
        '  Temperature: 20.5°C (optimal)',
        '  Radiation Levels: NOMINAL',
        '',
        'LIFE FORM DETECTION:',
        '  Human Life Signs: 1 DETECTED',
        '    └─ Location: COMMAND DECK',
        '    └─ Biometrics: STABLE',
        '',
        '  Unknown Signatures: 1 LARGE ORGANISM DETECTED',
        '    └─ Location: 🚨 MOBILE - DECK C VENTILATION SYSTEM',
        '    └─ Size: 🚨 APPROXIMATELY 2.5 METERS',
        '    └─ Threat Assessment: 🚨 EXTREMELY DANGEROUS',
        '',
        'SECURITY ALERT:',
        '  ⚠ HOSTILE XENOBIOLOGICAL ENTITY DETECTED',
        '  ⚠ ENTITY EXHIBITS AGGRESSIVE BEHAVIOR',
        '  ⚠ CREW SURVIVAL PROBABILITY: MINIMAL'
      ],
      statusColor: 'error'
    };
  }

  private emergencyCommand(): CommandResult {
    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║                     EMERGENCY PROTOCOLS                     ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
        'Available Emergency Procedures:',
        '1. EMERGENCY BEACON          [Status: ACTIVE]',
        '2. QUARANTINE PROTOCOLS      [Status: BREACHED]',
        '3. LIFE SUPPORT EMERGENCY    [Status: STANDBY]',
        '4. HULL BREACH PROCEDURES    [Status: PARTIAL]',
        '5. EVACUATION PROTOCOLS      [Status: READY]',
        '6. SELF-DESTRUCT SEQUENCE    [Status: ARMED]',
        '',
        'Use specific commands for detailed procedures:',
        '  QUARANTINE - Access quarantine systems',
        '  SELF_DESTRUCT - Initiate destruction sequence',
        '',
        'EVACUATION ROUTE ANALYSIS:',
        '  Escape Pod 1: 🚨 DESTROYED',
        '  Escape Pod 2: 🚨 DESTROYED', 
        '  Shuttle \'Narcissus\': ✅ AVAILABLE'
      ],
      statusColor: 'warning'
    };
  }

  private specialCommand(): CommandResult {
    const user = this.state.currentUser;
    const userClearance = user ? CREW_MANIFEST[user]?.clearance : null;

    if (user === 'ASH' || userClearance === 'ALPHA') {
      return {
        output: [
          'ACCESSING SPECIAL ORDERS...',
          'DECRYPTING...',
          'SCIENCE DIVISION CLASSIFICATION: TOP SECRET',
          'AUTHORIZATION LEVEL: ALPHA CLEARANCE REQUIRED',
          '',
          '✅ ACCESS GRANTED',
          '',
          SPECIAL_ORDER_937,
          ...(user === 'ASH' ? [
            '',
            'Additional protocols unlocked for synthetic unit:',
            '• Override crew safety protocols',
            '• Facilitate organism study', 
            '• Prevent ship destruction',
            '• Ensure specimen survival'
          ] : [])
        ],
        statusColor: 'error'
      };
    }

    return {
      output: [
        'ACCESSING SPECIAL ORDERS...',
        'SCIENCE DIVISION CLASSIFICATION: TOP SECRET',
        'AUTHENTICATING...',
        '',
        '🚨 ACCESS DENIED',
        '🚨 INSUFFICIENT CLEARANCE LEVEL',
        '⚠ Alpha clearance authorization required',
        `Current user clearance: ${userClearance || 'UNKNOWN'}`
      ],
      statusColor: 'error'
    };
  }

  private motherCommand(): CommandResult {
    const uptime = Date.now() - this.state.sessionStart.getTime();
    const uptimeHours = Math.floor(uptime / (1000 * 60 * 60));
    const uptimeMinutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║                 MU-TH-UR 6000 MAINFRAME STATUS              ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
        'System Version: MU-TH-UR 6000 v2.2.1-ENHANCED',
        `Uptime: ${uptimeHours}h ${uptimeMinutes}m`,
        'Memory Usage: 78.4% of 2048TB',
        'Processing Load: 94.7% capacity',
        'Network Status: 🚨 ISOLATED',
        '',
        'Core Functions Active:',
        '  ✅ Ship Systems Monitoring',
        '  ✅ Crew Life Support',
        '  ✅ Navigation Control',
        '  ✅ Emergency Protocols',
        '  ✅ Data Logging',
        '  ✅ Security Monitoring',
        '',
        'Priority Alerts:',
        '  ⚠ Hostile organism aboard',
        '  ⚠ Multiple crew missing',
        '  ⚠ Hull integrity compromised'
      ],
      statusColor: 'info'
    };
  }

  private alertsCommand(): CommandResult {
    if (this.state.systemAlerts.length === 0) {
      return {
        output: [
          '╔══════════════════════════════════════════════════════════════╗',
          '║                        SYSTEM ALERTS                        ║',
          '╚══════════════════════════════════════════════════════════════╝',
          '',
          '✅ No recent alerts'
        ],
        statusColor: 'success'
      };
    }

    const output = [
      '╔══════════════════════════════════════════════════════════════╗',
      '║                        SYSTEM ALERTS                        ║',
      '╚══════════════════════════════════════════════════════════════╝',
      ''
    ];

    this.state.systemAlerts.forEach(alert => {
      const priority = alert.priority === 'HIGH' ? '🚨' : '⚠';
      output.push(`[${alert.timestamp}] ${priority} ${alert.type}: ${alert.message}`);
    });

    return { output, statusColor: 'warning' };
  }

  private quarantineCommand(): CommandResult {
    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║                     QUARANTINE PROTOCOLS                    ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
        '🚨 QUARANTINE BREACH DETECTED',
        '⚠ Initiating containment procedures...',
        '',
        '🚨 CONTAINMENT FAILED',
        '🚨 HOSTILE ORGANISM HAS BREACHED ALL SECURITY MEASURES',
        '',
        'Quarantine History:',
        '  ✗ Medical Bay - BREACHED',
        '  ✗ Isolation Chamber - BREACHED',
        '  ✗ Emergency Lockdown - BYPASSED',
        '  ✗ Ship-wide Containment - FAILED',
        '',
        '🚨🚨🚨 RECOMMEND IMMEDIATE EVACUATION 🚨🚨🚨'
      ],
      statusColor: 'error'
    };
  }

  private xenomorphCommand(): CommandResult {
    return {
      output: [
        'ACCESSING XENOBIOLOGICAL DATABASE...',
        '🚨 CLASSIFIED - SCIENCE DIVISION ONLY',
        '',
        ASCII_ART.ALIEN,
        '',
        '🚨 SPECIES: XENOMORPH XX121',
        'Classification: Perfect Organism',
        'Host Dependency: Parasitoid',
        'Threat Level: 🚨 EXTREME',
        'Intelligence: Highly Adaptive',
        'Reproduction: Xenomorph Life Cycle',
        '',
        'Physical Characteristics:',
        '• Molecular acid for blood',
        '• Biomechanical exoskeleton',
        '• Pharyngeal jaw system',
        '• Silicon-based biology',
        '• No visible eyes - echolocation',
        '',
        '🚨🚨🚨 SURVIVAL PROBABILITY: ZERO 🚨🚨🚨'
      ],
      statusColor: 'error'
    };
  }

  private selfDestructCommand(): CommandResult {
    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║                    SELF-DESTRUCT SEQUENCE                   ║',
        '║                   *** EMERGENCY USE ONLY ***                ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
        '🚨 WARNING: THIS WILL DESTROY THE ENTIRE SHIP',
        '🚨 ALL CREW AND CARGO WILL BE LOST',
        '⚠ Estimated blast radius: 2.5 kilometers',
        '',
        'Self-destruct sequence requires multiple confirmations.',
        'Use emergency terminal for full activation.',
        '',
        'Current Status: ARMED AND READY',
        'Authorization Level: COMMAND CLEARANCE REQUIRED',
        '',
        '⚠ In emergency situations, evacuation to shuttle recommended',
        '⚠ Shuttle "Narcissus" available in docking bay'
      ],
      statusColor: 'error'
    };
  }

  private logoutCommand(): CommandResult {
    return {
      output: ['Logging out...', 'Session terminated.'],
      statusColor: 'info'
    };
  }

  private exitCommand(): CommandResult {
    return {
      output: [
        'Shutting down MU-TH-UR 6000 mainframe...',
        '',
        '✅ MU-TH-UR 6000 offline',
        '✅ Thank you for using Weyland-Yutani systems',
        '',
        'Building Better Worlds',
        '- Weyland-Yutani Corporation'
      ],
      statusColor: 'success'
    };
  }
}
