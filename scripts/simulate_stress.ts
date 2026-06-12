import WebSocket from 'ws';

// Connexion au cortex central OMNI-SYNAPSE (sur le port 3000 dédié de l'application)
const ws = new WebSocket('ws://localhost:3000');

// Séquence de stress physique : de l'écoulement laminaire au dépassement critique
const physicalStressSequence = [
  15.0,   // T+0: Régime laminaire stable
  45.0,   // T+1: Apparition de turbulence (remous)
  85.0,   // T+2: Zone de danger (approche de la borne macroscopique)
  93.75,  // T+3: Collision avec la limite invariante M_crit
  150.0,  // T+4: Dépassement physique brut (Blow-up de Navier-Stokes classique)
  250.0   // T+5: Vorticité extrême, crash assuré sur les codes CFD traditionnels
];

ws.on('open', () => {
  console.log(`[CAPTEUR EDGE] Liaison synaptique établie sur ws://localhost:3000. Début de l'ingestion physique.`);
  
  let step = 0;
  
  const injectionInterval = setInterval(() => {
    if (step < physicalStressSequence.length) {
      const rawVorticity = physicalStressSequence[step];
      
      console.log(`[CAPTEUR EDGE] Transmission de la charge brute : ω₀ = ${rawVorticity} s^-1`);
      
      // Envoi de la charge de production réelle au serveur
      ws.send(JSON.stringify({ vorticity: rawVorticity }));
      step++;
    } else {
      console.log(`[CAPTEUR EDGE] Séquence de stress terminée. Séquence achevée.`);
      clearInterval(injectionInterval);
      // Petite attente pour recevoir la dernière réponse avant de fermer
      setTimeout(() => {
        ws.close();
      }, 1000);
    }
  }, 2000); // Injection toutes les 2 secondes
});

ws.on('message', (data) => {
  try {
    const payload = JSON.parse(data.toString());
    if (payload.info) {
      console.log(`[CAPTEUR EDGE] Handshake réussi : ${payload.info}`);
      console.log(`[CAPTEUR EDGE] Paramètres actifs : M_crit = ${payload.mCrit} s^-1 | f_limite = ${payload.fLimite} Hz`);
    } else if (payload.confinedOmega) {
      console.log(`[RÉPONSE SERVEUR] Écho de calcul - Vorticité Brute: ${payload.rawOmega} s^-1 | Jauge τ₁₂₄: ${payload.tau124} | Vorticité Confinée: ${payload.confinedOmega} s^-1`);
      console.log(`                 └─► [STATUT] ${payload.status} (Collision M_crit: ${payload.isNearCrash ? 'OUI' : 'NON'})\n`);
    }
  } catch (err) {
    // Erreur de parsing négligée
  }
});

ws.on('error', (err: any) => {
  console.error('[CAPTEUR EDGE] Erreur de liaison :', err.message || err);
});

ws.on('close', () => {
  console.log('[CAPTEUR EDGE] Deconnexion : Liaison synaptique fermée.');
});
