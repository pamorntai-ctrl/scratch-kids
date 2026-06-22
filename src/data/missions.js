/* ─── Scratch category palette colours ─────────────────────────────────── */
export const SCRATCH_PALETTE = {
  motion:    { label: 'Motion',    bg: '#4C97FF', text: '#fff' },
  events:    { label: 'Events',    bg: '#FFAB19', text: '#fff' },
  control:   { label: 'Control',   bg: '#FF8C1A', text: '#fff' },
  looks:     { label: 'Looks',     bg: '#9966FF', text: '#fff' },
  sensing:   { label: 'Sensing',   bg: '#5CB1D6', text: '#fff' },
  sound:     { label: 'Sound',     bg: '#CF63CF', text: '#fff' },
  operators: { label: 'Operators', bg: '#59C059', text: '#fff' },
  variables: { label: 'Variables', bg: '#FF8C1A', text: '#fff' },
}

/* ─── Scratch editor area descriptors ──────────────────────────────────── */
export const SCRATCH_AREAS = {
  'overview':         { icon: '🖥️',  label: 'Scratch Editor',    color: '#6366f1' },
  'backdrop':         { icon: '🖼️',  label: 'Backdrop Selector', color: '#ec4899' },
  'sprites':          { icon: '🐱',  label: 'Sprite Panel',      color: '#f59e0b' },
  'palette-events':   { icon: '⚡',  label: 'Events Palette',    color: '#FFAB19' },
  'palette-motion':   { icon: '🏃',  label: 'Motion Palette',    color: '#4C97FF' },
  'palette-control':  { icon: '🔁',  label: 'Control Palette',   color: '#FF8C1A' },
  'palette-sensing':  { icon: '👁️',  label: 'Sensing Palette',   color: '#5CB1D6' },
  'palette-variables':{ icon: '📦',  label: 'Variables Palette', color: '#FF8C1A' },
  'palette-looks':    { icon: '🎨',  label: 'Looks Palette',     color: '#9966FF' },
  'scripts':          { icon: '📜',  label: 'Scripts Area',      color: '#a855f7' },
  'green-flag':       { icon: '🏁',  label: 'Green Flag Button', color: '#10b981' },
  'paint-editor':     { icon: '🖌️',  label: 'Paint Editor',      color: '#ec4899' },
  'costumes':         { icon: '👗',  label: 'Costumes Tab',      color: '#d946ef' },
}

/* ─── MISSIONS ──────────────────────────────────────────────────────────── */
export const MISSIONS = [

  /* ══════════════════════════════════════════════════════
     MISSION 1 — APPLE COLLECTOR
  ══════════════════════════════════════════════════════ */
  {
    id: 'apple-collector',
    title: 'Apple Collector',
    emoji: '🍎',
    tagline: 'Walk, jump, and collect apples for points!',
    description:
      'Build a platformer-style game: move your character left and right with arrow keys, jump with the spacebar, and collect randomly placed apples to rack up your score.',
    difficulty: 'Beginner',
    difficultyColor: 'emerald',
    xpReward: 300,
    timeEstimate: '35 min',
    color: 'from-green-500 to-emerald-600',
    gradientBg: 'from-emerald-900/30 to-green-900/20',
    badge: {
      id: 'apple-champion',
      name: 'Apple Champion',
      emoji: '🏆',
      description: 'Built the Apple Collector game in Scratch!',
      color: 'from-green-400 to-emerald-500',
    },
    concepts: ['Backdrops', 'Sprites', 'Events', 'Motion', 'Variables', 'Sensing'],
    programmingSkills: [
      {
        emoji: '⚡',
        skill: 'Event Handling',
        color: '#FFAB19',
        detail: 'Arrow keys and spacebar trigger your code instantly. In JavaScript or Python this is called an event listener — the same idea powers every button, form, and game on the web.',
      },
      {
        emoji: '🔁',
        skill: 'Loops',
        color: '#FF8C1A',
        detail: '"forever" runs your movement code 30 times per second. Every game engine — Unity, Godot, Pygame — uses this same pattern called a game loop.',
      },
      {
        emoji: '🔀',
        skill: 'Conditionals',
        color: '#4C97FF',
        detail: '"if key pressed? then" is an if-statement — the single most important tool in all of programming. Every app, website, and AI uses them to make decisions.',
      },
      {
        emoji: '📦',
        skill: 'Variables',
        color: '#a855f7',
        detail: '"y power" and "Score" are variables — named boxes that hold a value which can change. Every programming language has them, from Python to Swift to C++.',
      },
      {
        emoji: '🎯',
        skill: 'Collision Detection',
        color: '#5CB1D6',
        detail: '"touching [sprite]?" checks if two objects overlap pixel by pixel. Game engines like Unity use the same concept — called hitboxes or colliders.',
      },
      {
        emoji: '🌍',
        skill: 'Physics Simulation',
        color: '#10b981',
        detail: 'Gravity is just math: subtract 1 from velocity each frame. Real physics engines — Box2D, Bullet, Havok — do exactly this, just with more decimal places.',
      },
    ],
    steps: [

      /* ── Step 1 ── */
      {
        id: 1,
        title: 'Open Scratch & Set the Scene',
        emoji: '🌳',
        xp: 15,
        concept: { name: 'Getting Started · Backdrops', color: '#6366f1' },
        goal: 'Open Scratch with a fun outdoor backdrop ready to go',
        description:
          "Every game starts with a setting. We'll open Scratch, get rid of the default cat, and pick an outdoor backdrop so our apple-collecting world has a colourful background.",
        scratchArea: 'overview',
        previewStep: 0,
        actions: [
          { text: 'Open your browser and go to scratch.mit.edu', highlight: 'scratch.mit.edu' },
          { text: 'Click the orange "Create" button at the top to open a new project.', area: 'Top Menu' },
          { text: 'Right-click the cat sprite in the sprite panel and choose "Delete" to remove it.', area: 'Sprite Panel' },
          { text: 'In the bottom-right, hover over the backdrop thumbnail and click "Choose a Backdrop".', area: 'Backdrop Selector' },
          { text: 'Search for "Blue Sky" or "Garden" and click a colourful outdoor scene to add it.', area: 'Backdrop Library' },
        ],
        blocks: [],
        tip: 'Create a free Scratch account so your project saves automatically — look for "Sign in" at the top right.',
        didYouKnow: 'The Scratch stage is 480 × 360 pixels. x=0, y=0 is the very centre. Positive y = up, negative y = down.',
      },

      /* ── Step 2 ── */
      {
        id: 2,
        title: 'Design Your Character',
        emoji: '🎨',
        xp: 30,
        concept: { name: 'Sprites · Costumes', color: '#d946ef' },
        goal: 'Add a character sprite then customise its look in the Costumes editor',
        description:
          "Don't just pick a sprite — make it 100% yours! Scratch has a built-in paint editor inside the Costumes tab where you can recolour body parts, add accessories, draw on decorations, or completely redesign the look. Your hero, your rules.",
        scratchArea: 'costumes',
        previewStep: 1,
        actions: [
          { text: 'Click the blue "Choose a Sprite" button in the sprite panel (bottom-right).', area: 'Sprite Panel' },
          { text: 'Browse the library — "Avery", "Amon", "Cheesy", or any person/animal you like. Click it to add.', area: 'Sprite Library' },
          { text: 'Now click the "Costumes" tab at the very top-left of the editor (next to Code and Sounds).', area: 'Costumes Tab' },
          { text: 'Your character\'s image appears in the paint editor. On the left toolbar, choose the Fill tool (paint bucket 🪣).', area: 'Paint Editor' },
          { text: 'Click the colour swatch at the top to pick any colour, then click a body part — shirt, pants, hair, skin — to recolour it instantly!', area: 'Paint Editor' },
          { text: 'Switch to the Brush or Shape tools to draw extras: a hat, a cape, sunglasses, a star on the shirt — anything you imagine.', area: 'Paint Editor' },
          { text: 'Want a walking animation? Right-click your costume in the list on the left, choose "duplicate", then make a tiny change (e.g. shift the legs). Scratch will flip between them!', area: 'Costumes Tab' },
          { text: 'Happy with your hero? Click "Code" at the top-left to go back. Set Size to 60 and drag the sprite to the bottom-left of the stage.', area: 'Sprite Info' },
        ],
        blocks: [],
        tip: 'Use "duplicate costume" to create 2–4 frames of a walking cycle — then in Code, add a "next costume" block inside the forever loop!',
        didYouKnow: 'Every Scratch sprite image is called a "costume". Switching costumes fast creates animation — the same trick used in cartoons and hand-drawn flipbooks.',
      },

      /* ── Step 3 ── */
      {
        id: 3,
        title: 'Walk Left & Right',
        emoji: '⬅️➡️',
        xp: 50,
        concept: { name: 'Events · Motion · Control', color: '#4C97FF' },
        goal: 'Left and right arrow keys move your character — and the screen edge stops them',
        description:
          "First coding step! We need three ingredients: an Event to kick things off, a Control loop to keep checking forever, and Motion blocks that actually move the sprite. We also add \"if on edge, bounce\" so the character never walks off screen.",
        scratchArea: 'scripts',
        previewStep: 2,
        actions: [
          { text: 'Click your character sprite in the sprite panel to select it (blue outline).', area: 'Sprite Panel' },
          { text: 'In the Sprite Info panel (bottom), find the three rotation-style icons and click the middle one — "left-right" (↔). This lets the sprite face left or right without flipping upside-down.', area: 'Sprite Info' },
          { text: 'Click the "Code" tab at the top-left if it isn\'t open already.', area: 'Code Tab' },
          { text: 'From "Events" (yellow), drag "when 🏁 clicked" into the empty scripts area.', area: 'Events Palette' },
          { text: 'From "Motion", drag "go to x: ( ) y: ( )" and snap it below. Fill in the x and y from Step 2 as your start position.', area: 'Motion Palette' },
          { text: 'From "Control" (orange), snap a "forever" loop below.', area: 'Control Palette' },
          { text: 'Inside forever: add "if < > then". From "Sensing", drag "key (left arrow) pressed?" into the ◇ diamond slot.', area: 'Sensing Palette' },
          { text: 'Inside that if: from "Motion", add "change x by (-5)". Negative = left!', area: 'Motion Palette' },
          { text: 'Add a second "if" (still inside forever) for the right arrow: "key (right arrow) pressed?" → "change x by (5)".', area: 'Control Palette' },
          { text: 'Still inside forever, after both arrow-key blocks: from "Motion" drag "if on edge, bounce". This stops the character walking off screen.', area: 'Motion Palette' },
          { text: 'Click the green flag and walk toward each edge — the character should stop and turn around.', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                          cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'go to x: (-150) y: (-120)',                 cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'forever',                                   cat: 'control', indent: 0, shape: 'c'     },
          { text: 'if ‹key [left arrow] pressed?› then',       cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change x by (-5)',                          cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if ‹key [right arrow] pressed?› then',      cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change x by (5)',                           cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if on edge, bounce',                        cat: 'motion',  indent: 1, shape: 'stack' },
        ],
        tip: 'The rotation style "left-right" is key — without it "if on edge, bounce" can flip your character upside-down. Always set it before adding the bounce block!',
        didYouKnow: '"if on edge, bounce" is actually a shortcut for: check x position, if past the edge reverse direction. It saves you writing 4 extra blocks yourself.',
      },

      /* ── Step 4 ── */
      {
        id: 4,
        title: 'Jump with the Spacebar',
        emoji: '🦘',
        xp: 65,
        concept: { name: 'Variables · Physics', color: '#a855f7' },
        goal: 'Spacebar launches the character upward; gravity pulls them back down',
        description:
          "Jumping uses a secret trick called velocity — a variable that controls how fast the character moves up or down each frame. When you jump, velocity shoots up; gravity drags it back to zero, then negative, until the character lands.",
        scratchArea: 'palette-variables',
        previewStep: 3,
        actions: [
          { text: 'Create a variable: click "Variables" in the palette → "Make a Variable" → type "y power" → OK.', area: 'Variables Palette' },
          { text: 'In the character\'s script, add "set [y power] to (0)" right after "when 🏁 clicked" — before the "go to" block.', area: 'Scripts Area' },
          { text: 'Inside the forever loop, after both arrow-key blocks, add a new "if < > then".', area: 'Control Palette' },
          { text: 'From "Sensing", put "key (space) pressed?" in its ◇ diamond.', area: 'Sensing Palette' },
          { text: 'Inside that if, nest another "if < > then". In the Operators palette (green), build "(y position) < (-115)" and put it in the inner diamond.', area: 'Operators Palette' },
          { text: 'Inside the inner if: from "Variables" add "set [y power] to (12)". This launches the jump!', area: 'Variables Palette' },
          { text: 'Below the space block (still inside forever): from "Variables" add "change [y power] by (-1)". This is gravity.', area: 'Variables Palette' },
          { text: 'Next line (still inside forever): from "Motion" add "change y by (y power)". Drag the [y power] reporter into the slot.', area: 'Motion Palette' },
          { text: 'Final block inside forever: "if < > then" with "(y position) < (-120)" as the condition. Inside: "set y to (-120)" and "set [y power] to (0)". This lands the character.', area: 'Control Palette' },
          { text: 'Green flag → walk → press space to jump. You\'re a platformer!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                              cat: 'events',    indent: 0, shape: 'hat'   },
          { text: 'set [y power] to (0)',                      cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'go to x: (-150) y: (-120)',                    cat: 'motion',    indent: 0, shape: 'stack' },
          { text: 'forever',                                      cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'if ‹key [left arrow] pressed?› then',          cat: 'control',   indent: 1, shape: 'c'     },
          { text: 'change x by (-5)',                             cat: 'motion',    indent: 2, shape: 'stack' },
          { text: 'if ‹key [right arrow] pressed?› then',         cat: 'control',   indent: 1, shape: 'c'     },
          { text: 'change x by (5)',                              cat: 'motion',    indent: 2, shape: 'stack' },
          { text: 'if ‹key [space] pressed?› then',               cat: 'control',   indent: 1, shape: 'c'     },
          { text: 'if ‹(y position) < (-115)› then',              cat: 'control',   indent: 2, shape: 'c'     },
          { text: 'set [y power] to (12)',                     cat: 'variables', indent: 3, shape: 'stack' },
          { text: 'change [y power] by (-1)     ← gravity',    cat: 'variables', indent: 1, shape: 'stack' },
          { text: 'change y by (y power)',                     cat: 'motion',    indent: 1, shape: 'stack' },
          { text: 'if ‹(y position) < (-120)› then   ← landing',  cat: 'control',   indent: 1, shape: 'c'     },
          { text: 'set y to (-120)',                              cat: 'motion',    indent: 2, shape: 'stack' },
          { text: 'set [y power] to (0)',                      cat: 'variables', indent: 2, shape: 'stack' },
        ],
        tip: 'Try "set [y power] to (15)" for a higher jump, or "change [y power] by (-2)" for stronger gravity. Experiment!',
        didYouKnow: 'This velocity trick powers almost every 2D platformer ever made — Mario, Sonic, Celeste, Hollow Knight — they all work this way!',
      },

      /* ── Step 5 ── */
      {
        id: 5,
        title: 'Add the Apple Sprite',
        emoji: '🍎',
        xp: 25,
        concept: { name: 'Multiple Sprites · Positioning', color: '#10b981' },
        goal: 'Place an Apple sprite on the ground at a fixed position',
        description:
          "Every game has more than one sprite. We'll add the Apple as a second sprite, give it a size, and write its own script so it lands on the ground when the game begins. Each sprite has its own code — totally independent!",
        scratchArea: 'sprites',
        previewStep: 4,
        actions: [
          { text: 'Click "Choose a Sprite" in the sprite panel and search for "Apple" — click it to add.', area: 'Sprite Library' },
          { text: 'With the Apple sprite selected, set its Size to 50 in the Sprite Info panel.', area: 'Sprite Info' },
          { text: 'Click the Code tab while the Apple is selected (blue outline in the sprite panel).', area: 'Code Tab' },
          { text: 'From "Events", drag "when 🏁 clicked" into the scripts area.', area: 'Events Palette' },
          { text: 'From "Motion", drag "go to x: (0) y: (-120)" and snap it below.', area: 'Motion Palette' },
          { text: 'Click the green flag — the apple should appear in the centre of the ground!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',        cat: 'events', indent: 0, shape: 'hat'   },
          { text: 'go to x: (0) y: (-120)', cat: 'motion', indent: 0, shape: 'stack' },
        ],
        tip: 'Always check which sprite is selected (blue outline) before coding — each sprite has its own scripts!',
        didYouKnow: 'In real game engines like Unity and Godot, every character, item, and effect is a separate object with its own code — just like each Scratch sprite.',
      },

      /* ── Step 6 ── */
      {
        id: 6,
        title: 'Randomize the Spawn',
        emoji: '🎲',
        xp: 30,
        concept: { name: 'Operators · Random Numbers', color: '#10b981' },
        goal: 'Make the apple appear at a different spot each time using "pick random"',
        description:
          "The apple always lands at x=0 — boring! Scratch's green Operators palette has a \"pick random\" block that generates a surprise number every time it runs. Drop it into the x slot and no two games will ever be the same.",
        scratchArea: 'scripts',
        previewStep: 5,
        actions: [
          { text: 'Make sure the Apple sprite is selected in the sprite panel.', area: 'Sprite Panel' },
          { text: 'Look at the "go to x: (0) y: (-120)" block in your Apple\'s script.', area: 'Scripts Area' },
          { text: 'Click "Operators" in the palette (the green section) — find "pick random (1) to (10)".', area: 'Operators Palette' },
          { text: 'Drag "pick random" and drop it on top of the "0" in the x slot — it snaps right in!', area: 'Scripts Area' },
          { text: 'Change the numbers to: pick random (-180) to (180) so the apple can land anywhere on stage.', area: 'Scripts Area' },
          { text: 'Click the green flag 5 times — the apple jumps to a brand-new spot each time!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                                  cat: 'events', indent: 0, shape: 'hat'   },
          { text: 'go to x: (pick random (-180) to (180)) y: (-120)', cat: 'motion', indent: 0, shape: 'stack' },
        ],
        tip: 'The y stays fixed at -120 (the ground level) — only the x is random so the apple always lands on the floor!',
        didYouKnow: 'Random number generation powers loot drops, enemy spawns, procedural maps, weather systems, and nearly every game mechanic that feels "alive".',
      },

      /* ── Step 7 ── */
      {
        id: 7,
        title: 'Sense the Collision',
        emoji: '👆',
        xp: 40,
        concept: { name: 'Sensing · Forever Loop', color: '#5CB1D6' },
        goal: 'Make the apple react with a speech bubble the moment the player touches it',
        description:
          "This is where the apple becomes aware of the player! We add a forever loop that checks 30 times per second whether your character is touching the apple. When it is — say something. This proves the collision detection is working before we hook up the score.",
        scratchArea: 'palette-sensing',
        previewStep: 6,
        actions: [
          { text: 'Make sure the Apple sprite is selected.', area: 'Sprite Panel' },
          { text: 'Below the "go to" block, snap a "forever" loop from the Control palette (orange).', area: 'Control Palette' },
          { text: 'Inside forever: add "if < > then" from Control.', area: 'Control Palette' },
          { text: 'Open "Sensing" (light blue) — drag "touching [ ]?" into the ◇ diamond slot.', area: 'Sensing Palette' },
          { text: 'Click the dropdown on "touching?" and choose your character\'s sprite name.', area: 'Scripts Area' },
          { text: 'Inside the if: from "Looks", add "say [🍎 Got it!] for (0.5) secs".', area: 'Looks Palette' },
          { text: 'Green flag → walk into the apple — it should say "🍎 Got it!" the instant you touch it!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                                  cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'go to x: (pick random (-180) to (180)) y: (-120)', cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'forever',                                           cat: 'control', indent: 0, shape: 'c'     },
          { text: 'if ‹touching [your character]?› then',              cat: 'sensing', indent: 1, shape: 'c'     },
          { text: 'say [🍎 Got it!] for (0.5) secs',                  cat: 'looks',   indent: 2, shape: 'stack' },
        ],
        tip: '"touching?" checks pixel-by-pixel overlap 30 times per second inside the forever loop. That\'s called polling!',
        didYouKnow: 'Collision detection is one of the most important algorithms in games. Unity calls them "colliders", Godot calls them "collision shapes" — same idea, different names.',
      },

      /* ── Step 8 ── */
      {
        id: 8,
        title: 'Track the Score',
        emoji: '🔢',
        xp: 35,
        concept: { name: 'Variables · State', color: '#a855f7' },
        goal: 'Create a Score variable that increases by 1 each time an apple is collected',
        description:
          "Variables are named boxes that store a value your program can change at any time. We'll create a \"Score\" variable, set it to 0 at the start, and add 1 every time the apple detects a touch — then remove the say block since the score does the job.",
        scratchArea: 'palette-variables',
        previewStep: 7,
        actions: [
          { text: 'In the palette, click "Variables" → "Make a Variable" → type "Score" → click OK.', area: 'Variables Palette' },
          { text: 'A Score display appears on the stage automatically. Right-click it → "Large readout" for a big visible counter!', area: 'Stage' },
          { text: 'In the Apple\'s script, snap "set [Score] to (0)" right after "when 🏁 clicked" — before the "go to" block.', area: 'Scripts Area' },
          { text: 'Inside the if-block, add "change [Score] by (1)" from the Variables palette.', area: 'Variables Palette' },
          { text: 'Remove the "say" block — drag it off the script area to delete it. Score is the feedback now!', area: 'Scripts Area' },
          { text: 'Green flag → walk into the apple — watch the Score count up each time!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                                  cat: 'events',    indent: 0, shape: 'hat'   },
          { text: 'set [Score] to (0)',                               cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'go to x: (pick random (-180) to (180)) y: (-120)', cat: 'motion',    indent: 0, shape: 'stack' },
          { text: 'forever',                                           cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'if ‹touching [your character]?› then',              cat: 'sensing',   indent: 1, shape: 'c'     },
          { text: 'change [Score] by (1)',                             cat: 'variables', indent: 2, shape: 'stack' },
        ],
        tip: 'Tick the checkbox next to "Score" in the Variables palette to show or hide the score display on the stage.',
        didYouKnow: 'A variable is the most fundamental idea in all programming. Python, JavaScript, Swift, C++ — every language uses them to remember and update information while a program runs.',
      },

      /* ── Step 9 ── */
      {
        id: 9,
        title: 'Respawn the Apple',
        emoji: '✨',
        xp: 10,
        concept: { name: 'Game Loop · Respawn Pattern', color: '#f59e0b' },
        goal: 'After collecting, teleport the apple to a new random spot so the game never ends',
        description:
          "One block closes the loop: after the score goes up, the apple instantly jumps to a brand-new random position. This collect → reward → reset → repeat cycle is the core mechanic of every collectible in every game ever made.",
        scratchArea: 'scripts',
        previewStep: 8,
        actions: [
          { text: 'Make sure the Apple sprite is selected.', area: 'Sprite Panel' },
          { text: 'Inside the if (right after "change [Score] by (1)"), add another "go to x: (pick random (-180) to (180)) y: (-120)" block.', area: 'Scripts Area' },
          { text: 'Green flag → walk into the apple — score goes up AND the apple jumps to a new spot instantly!', area: 'Stage' },
          { text: 'Keep collecting — how high can you get your score? 🏆', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                                  cat: 'events',    indent: 0, shape: 'hat'   },
          { text: 'set [Score] to (0)',                               cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'go to x: (pick random (-180) to (180)) y: (-120)', cat: 'motion',    indent: 0, shape: 'stack' },
          { text: 'forever',                                           cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'if ‹touching [your character]?› then',              cat: 'sensing',   indent: 1, shape: 'c'     },
          { text: 'change [Score] by (1)',                             cat: 'variables', indent: 2, shape: 'stack' },
          { text: 'go to x: (pick random (-180) to (180)) y: (-120)', cat: 'motion',    indent: 2, shape: 'stack' },
        ],
        tip: 'Your game is complete! Try adding more apples, a countdown timer, or different point values for a challenge!',
        didYouKnow: '"Game loop" is the name for this pattern: check input → update state → render → repeat. Every game in history — from Pong to Fortnite — runs on this same cycle.',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     MISSION 4 — CATCH THE STARS
  ══════════════════════════════════════════════════════ */
  {
    id: 'catch-stars',
    title: 'Catch the Stars',
    emoji: '⭐',
    tagline: 'Catch falling stars before they hit the ground!',
    description:
      'Move a bowl left and right to catch stars falling from the sky. Stars spawn randomly and fall at different speeds — every catch scores a point and every miss costs a life!',
    difficulty: 'Beginner',
    difficultyColor: 'emerald',
    xpReward: 350,
    timeEstimate: '30 min',
    color: 'from-yellow-400 to-amber-500',
    gradientBg: 'from-yellow-900/30 to-amber-900/20',
    badge: {
      id: 'star-catcher',
      name: 'Star Catcher',
      emoji: '💫',
      description: 'Caught the stars!',
      color: 'from-yellow-400 to-amber-500',
    },
    concepts: ['Backdrops', 'Sprites', 'Clones', 'Sensing', 'Variables'],
    programmingSkills: [
      {
        emoji: '🧬',
        skill: 'Clone Instantiation',
        color: '#a855f7',
        detail: '"create clone of [myself]" spawns a new independent star each second — identical to calling new Star() in JavaScript or Python. This object-instantiation pattern is the heart of OOP.',
      },
      {
        emoji: '🎲',
        skill: 'Random Numbers',
        color: '#10b981',
        detail: '"pick random (-200) to (200)" gives every star a different x position. Randomness drives loot drops, procedural maps, shuffled playlists, and enemy spawns across every game genre.',
      },
      {
        emoji: '🎯',
        skill: 'Collision Detection',
        color: '#5CB1D6',
        detail: '"touching [Catcher]?" polls 30 times per second to check if a star overlaps the bowl. Game engines like Unity call this a trigger volume — the same concept behind every catch mechanic.',
      },
      {
        emoji: '📦',
        skill: 'State Variables',
        color: '#f59e0b',
        detail: 'Score and Lives track the game\'s current state. Managing state — reading, updating, and displaying variables — is the central challenge of all real software engineering.',
      },
      {
        emoji: '🔁',
        skill: 'Game Loop',
        color: '#FF8C1A',
        detail: 'The "forever" loop runs every frame, moving the bowl and creating clones. Every game engine — Unity, Godot, Pygame — has this same main loop running 60 times per second.',
      },
      {
        emoji: '🔀',
        skill: 'Conditionals',
        color: '#4C97FF',
        detail: '"if ‹(Lives) = (0)›" checks a boolean condition and branches the program. If-statements are the single most important tool in all of programming — every app uses them constantly.',
      },
    ],
    steps: [

      /* ── Step 1 ── */
      {
        id: 1,
        title: 'Set the Night Sky',
        emoji: '🌌',
        xp: 20,
        concept: { name: 'Program Setup', color: '#6366f1' },
        goal: 'Choose a galaxy or stars backdrop and delete the default cat',
        description:
          'Every game starts with a scene. Pick a dark starry backdrop so your falling stars stand out beautifully against the night sky.',
        scratchArea: 'backdrop',
        previewStep: 0,
        actions: [
          { text: 'Open Scratch and create a new project (File → New).', area: 'File Menu' },
          { text: 'Right-click the cat sprite in the sprite panel and choose "Delete".', area: 'Sprite Panel' },
          { text: 'Click "Choose a Backdrop" (bottom-right) and search for "Stars" or "Galaxy".', area: 'Backdrop Selector' },
          { text: 'Click a dark starfield backdrop to add it — the stage turns into a night sky!', area: 'Backdrop Library' },
        ],
        blocks: [],
        tip: 'A dark background makes the yellow stars pop visually. Contrast is a key principle in game design!',
        didYouKnow: 'The Scratch stage is 480 × 360 pixels. x=0, y=0 is the dead centre. Positive y = up, negative y = down.',
      },

      /* ── Step 2 ── */
      {
        id: 2,
        title: 'Add the Catcher',
        emoji: '🥣',
        xp: 25,
        concept: { name: 'Object Properties', color: '#d946ef' },
        goal: 'Add a Bowl or Cup sprite, set its size, and position it near the bottom',
        description:
          "The catcher is the player's tool. We'll add a Bowl sprite, resize it so it looks right, and write its opening script to lock it at the bottom of the screen.",
        scratchArea: 'sprites',
        previewStep: 1,
        actions: [
          { text: 'Click "Choose a Sprite" and search for "Bowl" or "Cup" — add it.', area: 'Sprite Library' },
          { text: 'Set the Bowl\'s Size to 80 in the Sprite Info panel.', area: 'Sprite Info' },
          { text: 'Click the Code tab while Bowl is selected.', area: 'Code Tab' },
          { text: 'From "Events", drag "when 🏁 clicked" into the scripts area.', area: 'Events Palette' },
          { text: 'From "Motion", snap "go to x: (0) y: (-150)" below it — this pins the bowl near the bottom.', area: 'Motion Palette' },
          { text: 'Click the green flag — the bowl should appear at the bottom centre!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',          cat: 'events', indent: 0, shape: 'hat'   },
          { text: 'go to x: (0) y: (-150)',    cat: 'motion', indent: 0, shape: 'stack' },
          { text: 'set size to (80) %',        cat: 'looks',  indent: 0, shape: 'stack' },
        ],
        tip: 'y: -150 places the bowl near the bottom. The stage goes from y=-180 (bottom) to y=180 (top).',
        didYouKnow: 'Every object in a game starts with initialization code that sets position, size, and state before the player can interact.',
      },

      /* ── Step 3 ── */
      {
        id: 3,
        title: 'Move the Catcher',
        emoji: '⬅️➡️',
        xp: 45,
        concept: { name: 'Event Handling · Loops', color: '#4C97FF' },
        goal: 'Left/right arrow keys slide the bowl across the screen; edge stops it',
        description:
          "Time to make the bowl responsive! We use the same forever-loop pattern as every other game: check left arrow → move left, check right arrow → move right, then bounce off edges.",
        scratchArea: 'scripts',
        previewStep: 2,
        actions: [
          { text: 'With the Bowl sprite selected, find your "when 🏁 clicked" script.', area: 'Sprite Panel' },
          { text: 'Below "go to x/y", snap a "forever" loop from Control.', area: 'Control Palette' },
          { text: 'Inside forever: add "if < > then". From Sensing, put "key (left arrow) pressed?" in the diamond.', area: 'Sensing Palette' },
          { text: 'Inside that if: "change x by (-10)".', area: 'Motion Palette' },
          { text: 'Add a second "if" for right arrow → "change x by (10)".', area: 'Control Palette' },
          { text: 'After both ifs, add "if on edge, bounce" from Motion.', area: 'Motion Palette' },
          { text: 'Green flag → press the arrow keys. The bowl glides left and right!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                      cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'go to x: (0) y: (-150)',                cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'forever',                               cat: 'control', indent: 0, shape: 'c'     },
          { text: 'if ‹key [left arrow] pressed?› then',   cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change x by (-10)',                     cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if ‹key [right arrow] pressed?› then',  cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change x by (10)',                      cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if on edge, bounce',                    cat: 'motion',  indent: 1, shape: 'stack' },
        ],
        tip: 'Set the Bowl\'s rotation style to "left-right" in Sprite Info so "if on edge, bounce" never flips it upside-down.',
        didYouKnow: 'This input-polling pattern inside a forever loop is the game loop — it runs in Unity, Godot, Pygame, and every other game engine at 30–60 fps.',
      },

      /* ── Step 4 ── */
      {
        id: 4,
        title: 'Add the Star Template',
        emoji: '⭐',
        xp: 25,
        concept: { name: 'Object Templates · Hiding', color: '#a855f7' },
        goal: 'Add a Star sprite and hide it on flag click — it will be the clone template',
        description:
          "Before cloning, we need a template. The original Star sprite hides itself immediately so only its clones will be visible. This is the class-vs-instance pattern: the class stays hidden; instances do the work.",
        scratchArea: 'sprites',
        previewStep: 3,
        actions: [
          { text: 'Click "Choose a Sprite" and search "Star" — pick the yellow star.', area: 'Sprite Library' },
          { text: 'Resize the Star to 40 in the Sprite Info panel.', area: 'Sprite Info' },
          { text: 'Click the Code tab while Star is selected.', area: 'Code Tab' },
          { text: 'From "Events", add "when 🏁 clicked".', area: 'Events Palette' },
          { text: 'From "Looks", snap "hide" below it. The original star is now invisible!', area: 'Looks Palette' },
          { text: 'Green flag — you should see only the bowl. Star is hiding, ready to be cloned.', area: 'Stage' },
        ],
        blocks: [
          { text: '— STAR: when 🏁 clicked →', cat: 'events', indent: 0, shape: 'hat',  note: true },
          { text: 'hide',                        cat: 'looks',  indent: 0, shape: 'stack' },
        ],
        tip: 'Any sprite that uses clones MUST hide its original first. Otherwise the "master" copy sits frozen on the stage forever.',
        didYouKnow: 'This template-hide pattern maps directly to a class definition in OOP — the class sits in memory invisibly until you instantiate (clone) it.',
      },

      /* ── Step 5 ── */
      {
        id: 5,
        title: 'Clone Falls',
        emoji: '🌠',
        xp: 55,
        concept: { name: 'Clone Instantiation', color: '#a855f7' },
        goal: 'Make the master Star create clones that fall from top to bottom and delete themselves',
        description:
          "Two scripts on the Star sprite: one forever loop that creates clones every second, and one clone script that shows the star, moves it downward frame by frame, then deletes it when it exits the screen.",
        scratchArea: 'scripts',
        previewStep: 4,
        actions: [
          { text: 'On the Star sprite, add a second "when 🏁 clicked" script (separate from the hide script).', area: 'Scripts Area' },
          { text: 'Inside a "forever" loop: "wait (1) seconds" then "create clone of [myself]".', area: 'Control Palette' },
          { text: 'Add a third script: "when I start as a clone".', area: 'Control Palette' },
          { text: 'In the clone script: "show", then "repeat until ‹(y position) < (-170)›".', area: 'Control Palette' },
          { text: 'Inside the repeat-until: "change y by (-5)".', area: 'Motion Palette' },
          { text: 'After the repeat-until: "delete this clone".', area: 'Control Palette' },
          { text: 'Green flag — a star should appear at y=0 and fall down, disappearing at the bottom!', area: 'Stage' },
        ],
        blocks: [
          { text: '— STAR master: when 🏁 clicked →',            cat: 'events',  indent: 0, shape: 'hat',  note: true },
          { text: 'hide',                                          cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'forever',                                       cat: 'control', indent: 0, shape: 'c'     },
          { text: 'wait (1) seconds',                              cat: 'control', indent: 1, shape: 'stack' },
          { text: 'create clone of [myself]',                      cat: 'control', indent: 1, shape: 'stack' },
          { text: '— STAR clone: when I start as a clone →',      cat: 'control', indent: 0, shape: 'hat',  note: true },
          { text: 'show',                                          cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'repeat until ‹(y position) < (-170)›',         cat: 'control', indent: 0, shape: 'c'     },
          { text: 'change y by (-5)',                              cat: 'motion',  indent: 1, shape: 'stack' },
          { text: 'delete this clone',                             cat: 'control', indent: 0, shape: 'cap'   },
        ],
        tip: '"delete this clone" is essential — without it, thousands of invisible off-screen stars pile up and slow the game to a crawl.',
        didYouKnow: '"delete this clone" is the game-object lifecycle in action: create → update → destroy. Every bullet, enemy, and particle in every game follows this same lifecycle.',
      },

      /* ── Step 6 ── */
      {
        id: 6,
        title: 'Random Spawn Position',
        emoji: '🎲',
        xp: 30,
        concept: { name: 'Random Numbers', color: '#10b981' },
        goal: 'Make each clone appear at a random x position so stars fall from different spots',
        description:
          "One block transforms a predictable waterfall into a real game: \"go to x:(pick random (-200) to (200)) y:(175)\" at the very start of the clone script. Now every star spawns at a surprise position.",
        scratchArea: 'scripts',
        previewStep: 5,
        actions: [
          { text: 'In the clone script (when I start as a clone), find the "show" block.', area: 'Scripts Area' },
          { text: 'BEFORE "show", snap "go to x:( ) y:(175)" from Motion.', area: 'Motion Palette' },
          { text: 'In the x slot, drop "pick random (-200) to (200)" from Operators.', area: 'Operators Palette' },
          { text: 'Green flag — stars now appear at random horizontal positions each time!', area: 'Stage' },
        ],
        blocks: [
          { text: '— STAR clone: when I start as a clone →',           cat: 'control',   indent: 0, shape: 'hat',  note: true },
          { text: 'go to x: (pick random (-200) to (200)) y: (175)',   cat: 'motion',    indent: 0, shape: 'stack' },
          { text: 'show',                                               cat: 'looks',     indent: 0, shape: 'stack' },
          { text: 'repeat until ‹(y position) < (-170)›',              cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'change y by (-5)',                                   cat: 'motion',    indent: 1, shape: 'stack' },
          { text: 'delete this clone',                                  cat: 'control',   indent: 0, shape: 'cap'   },
        ],
        tip: 'Try pick random (-170) to (170) so stars never spawn partially off-screen.',
        didYouKnow: 'Random number generation drives loot tables, enemy spawns, procedural worlds, and weather systems. Randomness is what makes games feel alive.',
      },

      /* ── Step 7 ── */
      {
        id: 7,
        title: 'Catch a Star',
        emoji: '🤲',
        xp: 50,
        concept: { name: 'Collision Detection · Polling', color: '#5CB1D6' },
        goal: 'Detect when a falling star touches the Bowl — celebrate with a speech bubble',
        description:
          "Inside the clone's repeat-until loop, check every frame whether the star is touching the Catcher. If yes: show a message and delete the clone. This is collision detection via polling — the same technique as every catch/collect mechanic in gaming.",
        scratchArea: 'palette-sensing',
        previewStep: 6,
        actions: [
          { text: 'On the Star sprite, find the "when I start as a clone" script.', area: 'Scripts Area' },
          { text: 'Inside the repeat-until loop (after "change y by (-5)"), add "if < > then".', area: 'Control Palette' },
          { text: 'From Sensing, drag "touching [Bowl]?" into the ◇ diamond.', area: 'Sensing Palette' },
          { text: 'Inside the if: "say [⭐ Caught!] for (0.5) secs", then "delete this clone".', area: 'Looks Palette' },
          { text: 'Green flag → move the bowl under a falling star — it says "⭐ Caught!" on contact!', area: 'Stage' },
        ],
        blocks: [
          { text: '(inside repeat-until loop)',                 cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'change y by (-5)',                           cat: 'motion',  indent: 1, shape: 'stack' },
          { text: 'if ‹touching [Bowl]?› then',                cat: 'sensing', indent: 1, shape: 'c'     },
          { text: 'say [⭐ Caught!] for (0.5) secs',           cat: 'looks',   indent: 2, shape: 'stack' },
          { text: 'delete this clone',                          cat: 'control', indent: 2, shape: 'cap'   },
        ],
        tip: '"touching [Bowl]?" polls every frame — asking "do these two sprites overlap?" up to 30 times per second.',
        didYouKnow: 'Collision detection is one of the most important algorithms in games. Unity calls these "colliders", Godot calls them "collision shapes" — same idea, different names.',
      },

      /* ── Step 8 ── */
      {
        id: 8,
        title: 'Score the Catch',
        emoji: '🔢',
        xp: 40,
        concept: { name: 'Variables · State', color: '#f59e0b' },
        goal: 'Create a Score variable and add 1 every time a star is caught',
        description:
          "Variables hold state. We create \"Score\", set it to 0 at the start, and replace the speech bubble with a score increment. Now every catch feels rewarding without a blocking pop-up.",
        scratchArea: 'palette-variables',
        previewStep: 7,
        actions: [
          { text: 'Click "Variables" → "Make a Variable" → type "Score" → OK.', area: 'Variables Palette' },
          { text: 'On the BOWL\'s "when 🏁 clicked" script, add "set [Score] to (0)" right after the flag block.', area: 'Scripts Area' },
          { text: 'In the star clone\'s if-touching-Bowl block, remove the "say" block.', area: 'Scripts Area' },
          { text: 'Replace it with "change [Score] by (1)" from Variables.', area: 'Variables Palette' },
          { text: 'Green flag → catch stars — watch the Score count up!', area: 'Stage' },
        ],
        blocks: [
          { text: '(inside if ‹touching [Bowl]?›)',             cat: 'control',   indent: 0, shape: 'stack', note: true },
          { text: 'change [Score] by (1)',                      cat: 'variables', indent: 1, shape: 'stack' },
          { text: 'delete this clone',                          cat: 'control',   indent: 1, shape: 'cap'   },
        ],
        tip: 'Right-click the Score display on the stage and choose "Large readout" for a big satisfying counter!',
        didYouKnow: 'A variable is the most fundamental concept in all programming. Python, JavaScript, Swift — every language uses them to remember and update values as a program runs.',
      },

      /* ── Step 9 ── */
      {
        id: 9,
        title: 'Lives & Game Over',
        emoji: '💀',
        xp: 60,
        concept: { name: 'Game Loop · Lifecycle', color: '#f59e0b' },
        goal: 'Add Lives — lose one when a star escapes; game ends when Lives reach zero',
        description:
          "The final mechanic: consequences. When a star escapes (the repeat-until ends without a catch), deduct a life. When lives hit zero, announce game over and stop everything. This is a state machine: PLAYING → GAME_OVER.",
        scratchArea: 'scripts',
        previewStep: 8,
        actions: [
          { text: 'Create a "Lives" variable (Variables → Make a Variable → "Lives").', area: 'Variables Palette' },
          { text: 'On the BOWL\'s "when 🏁 clicked" script, add "set [Lives] to (3)".', area: 'Scripts Area' },
          { text: 'In the STAR clone script, after the repeat-until loop ends (outside it), add "change [Lives] by (-1)".', area: 'Scripts Area' },
          { text: 'Below that: "if ‹(Lives) = (0)› then".', area: 'Control Palette' },
          { text: 'Inside the if: "say [Game Over! 💫] for (2) secs" then "stop [all]".', area: 'Looks Palette' },
          { text: 'After the if: "delete this clone".', area: 'Control Palette' },
          { text: 'Green flag → let stars fall — after 3 misses, Game Over! Your Catch the Stars game is complete! ⭐', area: 'Stage' },
        ],
        blocks: [
          { text: '(after the repeat-until — star escaped)',    cat: 'control',   indent: 0, shape: 'stack', note: true },
          { text: 'change [Lives] by (-1)',                     cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'if ‹(Lives) = (0)› then',                   cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'say [Game Over! 💫] for (2) secs',          cat: 'looks',     indent: 1, shape: 'stack' },
          { text: 'stop [all]',                                 cat: 'control',   indent: 1, shape: 'cap'   },
          { text: 'delete this clone',                          cat: 'control',   indent: 0, shape: 'cap'   },
        ],
        tip: 'Show ♥ hearts for lives by right-clicking the Lives display — or display it as "large readout" for impact!',
        didYouKnow: 'PLAYING → GAME_OVER is a state machine. Traffic lights, login flows, vending machines, and game modes are all state machines — one of the most powerful patterns in software.',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     MISSION 2 — SPACE SHOOTER
  ══════════════════════════════════════════════════════ */
  {
    id: 'space-shooter',
    title: 'Space Shooter',
    emoji: '🚀',
    tagline: 'Blast aliens before they reach you!',
    description:
      'Pilot a spaceship, fire lasers with the spacebar, dodge alien invaders, and see how long you can survive. Teaches clones, collision, and score tracking.',
    difficulty: 'Intermediate',
    difficultyColor: 'blue',
    xpReward: 450,
    timeEstimate: '40 min',
    color: 'from-blue-500 to-indigo-600',
    gradientBg: 'from-blue-900/30 to-indigo-900/20',
    badge: {
      id: 'galaxy-defender',
      name: 'Galaxy Defender',
      emoji: '🛡️',
      description: 'Defended the galaxy in Space Shooter!',
      color: 'from-blue-400 to-indigo-500',
    },
    concepts: ['Events', 'Motion', 'Clones', 'Sensing', 'Variables'],
    programmingSkills: [
      {
        emoji: '⚡',
        skill: 'Event Handling',
        color: '#FFAB19',
        detail: '"when [space] key pressed" is an event handler. In JavaScript this is addEventListener("keydown", …) — the same pattern powers every web app and game.',
      },
      {
        emoji: '🏗️',
        skill: 'Object Instantiation',
        color: '#ec4899',
        detail: '"create clone of [Ball]" spawns a new object at runtime — exactly like writing new Bullet() in Java, Python, or C#. This is the heart of Object-Oriented Programming.',
      },
      {
        emoji: '🔁',
        skill: 'Game Loop',
        color: '#FF8C1A',
        detail: 'The "forever" loop checks inputs and moves sprites every frame — this is the game loop, the pattern that runs inside every game engine ever made.',
      },
      {
        emoji: '📦',
        skill: 'State Variables',
        color: '#a855f7',
        detail: 'Score and Lives are state variables — they track what\'s happening in the program right now. Managing state is the central challenge of all real software.',
      },
      {
        emoji: '🎯',
        skill: 'Collision Detection',
        color: '#5CB1D6',
        detail: '"touching [Ball]?" checks whether two sprites overlap. In real engines this is called AABB or bounding-box collision — the algorithm behind every game\'s hit detection.',
      },
      {
        emoji: '🔀',
        skill: 'Control Flow',
        color: '#4C97FF',
        detail: '"if Lives = 0 then stop all" branches your program down a different path. Control flow — if/else, loops, returns — is the skeleton of every program ever written.',
      },
    ],
    steps: [
      /* ── Step 1 ── */
      {
        id: 1,
        title: 'Set the Space Scene',
        emoji: '🌌',
        xp: 20,
        concept: { name: 'Backdrops · Sprites', color: '#6366f1' },
        goal: 'Create the space environment and add a spaceship',
        description:
          "Every space game needs a starry backdrop and a hero ship. Let's set the stage before we write any code.",
        scratchArea: 'backdrop',
        previewStep: 0,
        actions: [
          { text: 'Open Scratch and create a new project (File → New).', area: 'File Menu' },
          { text: 'Delete the default cat sprite (right-click → Delete).', area: 'Sprite Panel' },
          { text: 'Click "Choose a Backdrop" and search for "Stars" — pick the black starfield.', area: 'Backdrop Selector' },
          { text: 'Click "Choose a Sprite" and search for "Rocketship" — add it.', area: 'Sprite Library' },
          { text: 'Set the Rocketship size to 60 and drag it to the bottom-centre of the stage.', area: 'Sprite Info' },
        ],
        blocks: [],
        tip: 'Set the stage direction to 0° (pointing up) in the Sprite Info panel so the rocket faces upward.',
        didYouKnow: 'The Scratch stage is 480 × 360 pixels. x=0, y=0 is the centre.',
      },

      /* ── Step 2 ── */
      {
        id: 2,
        title: 'Fly the Ship',
        emoji: '🎮',
        xp: 50,
        concept: { name: 'Events · Motion · Control', color: '#4C97FF' },
        goal: 'Move the spaceship left and right with arrow keys',
        description:
          "Same technique as the basket, but this time we'll also lock the ship to the bottom of the screen using a 'set y' block.",
        scratchArea: 'scripts',
        previewStep: 1,
        actions: [
          { text: 'Click the Rocketship sprite to select it.', area: 'Sprite Panel' },
          { text: 'Add "when 🏁 clicked" from Events.', area: 'Events Palette' },
          { text: 'Add "go to x: (0) y: (-150)" from Motion right below — this pins the ship at the bottom.', area: 'Motion Palette' },
          { text: 'Add a "forever" loop from Control.', area: 'Control Palette' },
          { text: 'Inside forever, add two "if < > then" blocks — one for left arrow, one for right.', area: 'Control Palette' },
          { text: '"key (left arrow) pressed?" → "change x by (-8)".', area: 'Sensing Palette' },
          { text: '"key (right arrow) pressed?" → "change x by (8)".', area: 'Sensing Palette' },
          { text: 'After both ifs, add "if on edge, bounce" from Motion to keep the ship inside the stage.', area: 'Motion Palette' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                      cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'go to x: (0) y: (-150)',                cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'forever',                               cat: 'control', indent: 0, shape: 'c'     },
          { text: 'if ‹key [left arrow] pressed?› then',   cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change x by (-8)',                      cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if ‹key [right arrow] pressed?› then',  cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change x by (8)',                       cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if on edge, bounce',                    cat: 'motion',  indent: 1, shape: 'stack' },
        ],
        tip: 'Test now — the ship should glide left and right without flying off screen.',
        didYouKnow: '"if on edge, bounce" saves you from writing edge-detection code yourself.',
      },

      /* ── Step 3 ── */
      {
        id: 3,
        title: 'Add the Laser Bullet',
        emoji: '🟡',
        xp: 25,
        concept: { name: 'Sprite Templates · Hiding', color: '#a855f7' },
        goal: 'Add a Ball sprite and hide it on start — ready to become a laser clone',
        description:
          "Before we can fire anything, we need a bullet template. In Scratch, a sprite that uses clones must hide its original at the start — otherwise you'll see the \"master\" Ball sitting in the middle of the screen forever. The clones will show themselves when they're created.",
        scratchArea: 'sprites',
        previewStep: 2,
        actions: [
          { text: 'Click "Choose a Sprite" and search for "Ball" — add it.', area: 'Sprite Library' },
          { text: 'Resize Ball to 20 in the Sprite Info panel.', area: 'Sprite Info' },
          { text: 'Click the "Costumes" tab on the Ball sprite and recolour it bright yellow — it\'s a laser!', area: 'Costumes Tab' },
          { text: 'Click the "Code" tab while Ball is selected.', area: 'Code Tab' },
          { text: 'From "Events", add "when 🏁 clicked".', area: 'Events Palette' },
          { text: 'From "Looks", snap "hide" below it. Now the original Ball is invisible — clones will do the work.', area: 'Looks Palette' },
          { text: 'Click the green flag — you should see only the ship. Ball is hiding, ready to be cloned!', area: 'Stage' },
        ],
        blocks: [
          { text: '— On BALL: when 🏁 clicked →', cat: 'events', indent: 0, shape: 'hat',  note: true },
          { text: 'hide',                           cat: 'looks',  indent: 0, shape: 'stack' },
        ],
        tip: 'Any sprite that spawns clones must hide its original first — otherwise the "master" copy sits frozen in the middle of the stage.',
        didYouKnow: 'This template-and-clone pattern is identical to the "class and instance" concept in Object-Oriented Programming. The Ball sprite is the class; each clone is an instance.',
      },

      /* ── Step 4 ── */
      {
        id: 4,
        title: 'Create the Clone',
        emoji: '💫',
        xp: 45,
        concept: { name: 'Object Instantiation · Clone Pattern', color: '#a855f7' },
        goal: 'Press SPACE to spawn a Ball clone that appears at the ship\'s position',
        description:
          "Now the fun part: instantiation! When SPACE is pressed, the Rocketship creates a Ball clone. The clone's own script immediately teleports it to wherever the Rocketship is — that's why \"go to [Rocketship]\" lives in the clone script, not the ship script.",
        scratchArea: 'scripts',
        previewStep: 3,
        actions: [
          { text: 'Click the Ball sprite in the sprite panel.', area: 'Sprite Panel' },
          { text: 'Add a SECOND script: from "Control", drag "when I start as a clone" into an empty area of the scripts canvas.', area: 'Control Palette' },
          { text: 'Snap "go to [Rocketship]" (Motion) as the first block — this teleports the clone to the ship the instant it spawns.', area: 'Motion Palette' },
          { text: 'Snap "show" (Looks) below — the clone becomes visible at the ship\'s position.', area: 'Looks Palette' },
          { text: 'Now switch to the ROCKETSHIP sprite.', area: 'Sprite Panel' },
          { text: 'Add a new script: "when [space] key pressed" from Events.', area: 'Events Palette' },
          { text: 'Snap "create clone of [Ball]" from Control below it.', area: 'Control Palette' },
          { text: 'Green flag → press SPACE — a yellow dot should appear at the ship! (It stays there for now — we animate it next.)', area: 'Stage' },
        ],
        blocks: [
          { text: '— On BALL: when I start as a clone →',        cat: 'control', indent: 0, shape: 'hat',  note: true },
          { text: 'go to [Rocketship]  ← snaps to ship first',   cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'show',                                          cat: 'looks',   indent: 0, shape: 'stack' },
          { text: '— On ROCKETSHIP: when [space] key pressed →', cat: 'events',  indent: 0, shape: 'hat',  note: true },
          { text: 'create clone of [Ball]',                        cat: 'control', indent: 0, shape: 'stack' },
        ],
        tip: '"go to [Rocketship]" must be the FIRST block in the clone script — before show. Otherwise the clone appears at the wrong position!',
        didYouKnow: '"create clone of [Ball]" is identical to writing "new Bullet()" in Java or Python. You are doing Object-Oriented Programming right now.',
      },

      /* ── Step 5 ── */
      {
        id: 5,
        title: 'Fire the Laser',
        emoji: '🔥',
        xp: 45,
        concept: { name: 'Repeat-Until · Destruction Pattern', color: '#4C97FF' },
        goal: 'The clone shoots upward and deletes itself when it leaves the screen',
        description:
          "Time to animate the clone! A \"repeat until\" loop moves the clone upward every frame. Once it exits the top of the screen the condition becomes true, the loop exits, and we instantly delete the clone — freeing memory. This is the standard game-object lifecycle.",
        scratchArea: 'scripts',
        previewStep: 4,
        actions: [
          { text: 'Select the Ball sprite and find its "when I start as a clone" script.', area: 'Sprite Panel' },
          { text: 'Below "show", add a "repeat until" loop from Control.', area: 'Control Palette' },
          { text: 'From Operators (green), build "(y position) > (175)" and drop it into the ◇ diamond of the repeat until.', area: 'Operators Palette' },
          { text: 'Inside the loop, add "change y by (15)" from Motion — this pushes the clone upward each frame.', area: 'Motion Palette' },
          { text: 'After the loop (outside, below it), add "delete this clone" from Control.', area: 'Control Palette' },
          { text: 'Green flag → press SPACE rapidly — lasers should shoot upward from the ship and vanish at the top!', area: 'Stage' },
        ],
        blocks: [
          { text: '— On BALL: when I start as a clone →',      cat: 'control', indent: 0, shape: 'hat',  note: true },
          { text: 'go to [Rocketship]',                         cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'show',                                        cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'repeat until ‹(y position) > (175)›',        cat: 'control', indent: 0, shape: 'c'     },
          { text: 'change y by (15)',                            cat: 'motion',  indent: 1, shape: 'stack' },
          { text: 'delete this clone',                           cat: 'control', indent: 0, shape: 'cap'   },
        ],
        tip: 'Increase "change y by (15)" to 20 or 25 for faster bullets. Faster bullets make the game easier!',
        didYouKnow: '"delete this clone" frees memory — just like garbage collection in Python and Java. Without it, hundreds of off-screen bullets would pile up and slow the game down.',
      },

      /* ── Step 6 ── */
      {
        id: 6,
        title: 'Spawn Alien Enemies',
        emoji: '👾',
        xp: 50,
        concept: { name: 'Clones · Timers · Parallel Execution', color: '#f59e0b' },
        goal: 'Aliens appear randomly at the top and descend toward the ship',
        description:
          "Same clone trick — but for enemies! A hidden Alien sprite runs a forever loop that waits, picks a random x, then creates a clone. Each clone shows itself and descends. Two independent scripts running at the same time — that's parallel execution.",
        scratchArea: 'sprites',
        previewStep: 5,
        actions: [
          { text: 'Click "Choose a Sprite" and search "Gobo", "Tera", or any creature you like.', area: 'Sprite Library' },
          { text: 'Resize it to 60 and rename it "Alien" in the Sprite Info panel.', area: 'Sprite Info' },
          { text: 'On the Alien sprite, add "when 🏁 clicked" → "hide" (same template trick as the Ball).', area: 'Looks Palette' },
          { text: 'Add a "forever" loop from Control below "hide".', area: 'Control Palette' },
          { text: 'Inside forever: "wait (1.5) seconds" from Control.', area: 'Control Palette' },
          { text: 'Then: "go to x: (pick random (-200) to (200)) y: (180)" — random entry point at the top.', area: 'Motion Palette' },
          { text: 'Then: "create clone of [myself]" from Control.', area: 'Control Palette' },
          { text: 'Add a SECOND script: "when I start as a clone" → "show".', area: 'Control Palette' },
          { text: 'Add "repeat until ‹(y position) < (-180)›" — loops while alien is on screen.', area: 'Control Palette' },
          { text: 'Inside the loop: "change y by (-3)". After the loop: "delete this clone".', area: 'Motion Palette' },
          { text: 'Green flag — aliens should stream down from random positions!', area: 'Stage' },
        ],
        blocks: [
          { text: '— ALIEN: when 🏁 clicked →',                   cat: 'events',  indent: 0, shape: 'hat',  note: true },
          { text: 'hide',                                           cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'forever',                                        cat: 'control', indent: 0, shape: 'c'     },
          { text: 'wait (1.5) seconds',                             cat: 'control', indent: 1, shape: 'stack' },
          { text: 'go to x: (pick random (-200) to (200)) y: (180)', cat: 'motion', indent: 1, shape: 'stack' },
          { text: 'create clone of [myself]',                       cat: 'control', indent: 1, shape: 'stack' },
          { text: '— ALIEN: when I start as a clone →',            cat: 'control', indent: 0, shape: 'hat',  note: true },
          { text: 'show',                                           cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'repeat until ‹(y position) < (-180)›',          cat: 'control', indent: 0, shape: 'c'     },
          { text: 'change y by (-3)',                               cat: 'motion',  indent: 1, shape: 'stack' },
          { text: 'delete this clone',                              cat: 'control', indent: 0, shape: 'cap'   },
        ],
        tip: 'Lower the wait time (e.g. 0.8 secs) to spawn aliens faster. Higher "change y by" makes them fall quicker.',
        didYouKnow: 'Two "when 🏁 clicked" scripts on one sprite run at the same time. In real code, this is called concurrency or async programming.',
      },

      /* ── Step 7 ── */
      {
        id: 7,
        title: 'Detect the Hit',
        emoji: '💥',
        xp: 40,
        concept: { name: 'Sensing · Collision Detection', color: '#5CB1D6' },
        goal: 'Make an alien react when a laser touches it — play a sound as feedback',
        description:
          "Inside the alien's descent loop we now check: is any Ball clone touching me? If yes — play a sound! This confirms the collision detection is wired up before we add the score. Getting feedback first, then adding consequences, is good programming practice.",
        scratchArea: 'palette-sensing',
        previewStep: 6,
        actions: [
          { text: 'Select the Alien sprite and find its "when I start as a clone" script.', area: 'Sprite Panel' },
          { text: 'Inside the "repeat until" loop, after "change y by (-3)", add "if < > then" from Control.', area: 'Control Palette' },
          { text: 'From "Sensing" (light blue), drag "touching [Ball]?" into the ◇ diamond.', area: 'Sensing Palette' },
          { text: 'Inside the if: from "Sound", add "play sound [pop] until done" (or any sound from the library).', area: 'Sounds Palette' },
          { text: 'Below the sound block (still inside the if): add "delete this clone" from Control.', area: 'Control Palette' },
          { text: 'Green flag → shoot at aliens — they should pop with a sound when hit!', area: 'Stage' },
        ],
        blocks: [
          { text: '— ALIEN: when I start as a clone →',       cat: 'control', indent: 0, shape: 'hat',  note: true },
          { text: 'show',                                       cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'repeat until ‹(y position) < (-180)›',      cat: 'control', indent: 0, shape: 'c'     },
          { text: 'change y by (-3)',                           cat: 'motion',  indent: 1, shape: 'stack' },
          { text: 'if ‹touching [Ball]?› then',                cat: 'sensing', indent: 1, shape: 'c'     },
          { text: 'play sound [pop] until done',               cat: 'sound',   indent: 2, shape: 'stack' },
          { text: 'delete this clone',                          cat: 'control', indent: 2, shape: 'cap'   },
        ],
        tip: 'Click the Sounds tab on the Alien sprite to add new sounds. "Zap", "Laser1", and "Pop" all feel great for hits.',
        didYouKnow: '"touching [Ball]?" polls for overlap 30 times per second. Game engines like Unity call this an AABB (Axis-Aligned Bounding Box) check — the algorithm behind every game\'s hit detection.',
      },

      /* ── Step 8 ── */
      {
        id: 8,
        title: 'Score the Kill',
        emoji: '🔢',
        xp: 50,
        concept: { name: 'Variables · Reward State', color: '#a855f7' },
        goal: 'Create a Score variable and add 10 points every time an alien is destroyed',
        description:
          "Now we attach a reward to the collision. Create a Score variable, set it to 0 at the start, and replace the sound block with a score increment. Every destroyed alien is worth 10 points — the foundation of every score system ever built.",
        scratchArea: 'palette-variables',
        previewStep: 7,
        actions: [
          { text: 'In the palette, click "Variables" → "Make a Variable" → type "Score" → OK.', area: 'Variables Palette' },
          { text: 'On the ROCKETSHIP\'s "when 🏁 clicked" script, add "set [Score] to (0)" right after the flag block.', area: 'Scripts Area' },
          { text: 'On the Alien sprite, inside the "if touching [Ball]?" block, add "change [Score] by (10)".', area: 'Variables Palette' },
          { text: 'Remove or keep the sound block — your choice. Score is the real reward now!', area: 'Scripts Area' },
          { text: 'Green flag → shoot aliens → watch the Score count up by 10 each time!', area: 'Stage' },
        ],
        blocks: [
          { text: '— ALIEN (inside repeat-until loop) →',     cat: 'control',   indent: 0, shape: 'stack', note: true },
          { text: 'if ‹touching [Ball]?› then',               cat: 'sensing',   indent: 0, shape: 'c'     },
          { text: 'change [Score] by (10)',                    cat: 'variables', indent: 1, shape: 'stack' },
          { text: 'delete this clone',                         cat: 'control',   indent: 1, shape: 'cap'   },
        ],
        tip: 'Right-click the Score display on the stage and choose "Large readout" for a big, satisfying counter!',
        didYouKnow: 'Every leaderboard, achievement, and in-game economy is built on this same pattern: event detected → variable updated → UI refreshed.',
      },

      /* ── Step 9 ── */
      {
        id: 9,
        title: 'Lives & Game Over',
        emoji: '💀',
        xp: 35,
        concept: { name: 'State Machine · Program Termination', color: '#ef4444' },
        goal: 'Lose a life when an alien escapes; the game ends when lives reach zero',
        description:
          "The alien's repeat-until loop exits when the alien falls off the bottom — that's our escape event. We deduct a life, check if lives = 0, and if so: stop everything. This is a state machine: PLAYING → GAME_OVER.",
        scratchArea: 'scripts',
        previewStep: 8,
        actions: [
          { text: 'Create a "Lives" variable (Variables → Make a Variable → "Lives").', area: 'Variables Palette' },
          { text: 'On the Rocketship\'s "when 🏁 clicked" script, add "set [Lives] to (3)".', area: 'Scripts Area' },
          { text: 'On the Alien sprite, after the "repeat until" loop ends (outside it), add "change [Lives] by (-1)".', area: 'Scripts Area' },
          { text: 'Below that, add "if ‹(Lives) = (0)› then" from Control.', area: 'Control Palette' },
          { text: 'Inside the if: "say [Mission Failed! 💥] for (2) seconds" from Looks.', area: 'Looks Palette' },
          { text: 'Then: "stop [all]" from Control — this freezes the entire game.', area: 'Control Palette' },
          { text: 'After the if, add "delete this clone" so the escaped alien disappears.', area: 'Control Palette' },
          { text: 'Green flag → let aliens escape until 0 lives — Mission Failed! Your Space Shooter is complete! 🚀', area: 'Stage' },
        ],
        blocks: [
          { text: '(outside the repeat-until, after it ends)',  cat: 'control',   indent: 0, shape: 'stack', note: true },
          { text: 'change [Lives] by (-1)',                      cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'if ‹(Lives) = (0)› then',                    cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'say [Mission Failed! 💥] for (2) seconds',   cat: 'looks',     indent: 1, shape: 'stack' },
          { text: 'stop [all]',                                   cat: 'control',   indent: 1, shape: 'cap'   },
          { text: 'delete this clone',                            cat: 'control',   indent: 0, shape: 'cap'   },
        ],
        tip: 'Share your game by clicking "Share" at the top of Scratch — anyone with the link can play it!',
        didYouKnow: 'Traffic lights, login flows, vending machines, and game modes are all state machines. "PLAYING → GAME_OVER" is the simplest version of a pattern used everywhere in software.',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     MISSION 5 — WHACK-A-MOLE
  ══════════════════════════════════════════════════════ */
  {
    id: 'whack-a-mole',
    title: 'Whack-a-Mole',
    emoji: '🔨',
    tagline: 'Click the moles before they disappear!',
    description:
      'Paint your own mole-field backdrop with six holes, spawn moles that pop up and hide, and score points by clicking them before time runs out.',
    difficulty: 'Intermediate',
    difficultyColor: 'blue',
    xpReward: 450,
    timeEstimate: '35 min',
    color: 'from-amber-500 to-orange-600',
    gradientBg: 'from-amber-900/30 to-orange-900/20',
    badge: {
      id: 'mole-master',
      name: 'Mole Master',
      emoji: '🔨',
      description: 'Whacked all the moles!',
      color: 'from-amber-400 to-orange-500',
    },
    concepts: ['Paint Editor', 'Clones', 'Mouse Events', 'Variables', 'Timers'],
    programmingSkills: [
      {
        emoji: '🖱️',
        skill: 'Mouse Events',
        color: '#ec4899',
        detail: '"when this sprite clicked" fires the moment the mouse button is released over a sprite — identical to addEventListener("click") in JavaScript. Mouse events power every button, link, and interactive UI on the web.',
      },
      {
        emoji: '🧬',
        skill: 'Clone Pattern',
        color: '#a855f7',
        detail: 'A hidden master mole spawns clones that pop up independently. This is the class-and-instance pattern: one blueprint, many live objects — the foundation of OOP in every language.',
      },
      {
        emoji: '⏱️',
        skill: 'Timers',
        color: '#f59e0b',
        detail: '"wait (1.5) secs" and "repeat (30)" together create a countdown timer — the same pattern used in login timeouts, OTP codes, rate limiters, and cooking apps.',
      },
      {
        emoji: '🎲',
        skill: 'Random Position',
        color: '#10b981',
        detail: '"go to x:(pick random) y:(-60)" teleports the mole to a surprise hole each spawn. Randomness is what makes the game feel unpredictable and fair.',
      },
      {
        emoji: '📦',
        skill: 'State Variables',
        color: '#6366f1',
        detail: 'Score and Timer are state variables. All game logic reduces to reading state, updating it on events, and displaying the result — the universal pattern of interactive software.',
      },
      {
        emoji: '🔀',
        skill: 'Control Flow',
        color: '#4C97FF',
        detail: '"if Timer = 0 → stop all" branches the game into the GAME_OVER state. Control flow — if/else, loops, and returns — is the skeleton of every program ever written.',
      },
    ],
    steps: [

      /* ── Step 1 ── */
      {
        id: 1,
        title: 'Draw the Mole Field',
        emoji: '✏️',
        xp: 35,
        concept: { name: 'Drawing API · Backdrop', color: '#ec4899' },
        goal: 'Use the Paint Editor to draw a brown dirt backdrop with 6 dark oval holes',
        description:
          "This game starts in the Paint Editor. You'll draw a rich brown dirt field and six dark oval holes arranged in a 3×2 grid — the targets your moles will pop out of.",
        scratchArea: 'paint-editor',
        previewStep: 0,
        actions: [
          { text: 'Open Scratch and delete the cat sprite.', area: 'Sprite Panel' },
          { text: 'Click the backdrop thumbnail → "Paint" (pencil icon) to open the Paint Editor.', area: 'Backdrop Selector' },
          { text: 'Fill the whole canvas with a warm brown colour using the Fill tool.', area: 'Paint Editor' },
          { text: 'Switch to the Ellipse tool, pick a very dark brown or black fill, and draw 6 ovals in a 3×2 grid.', area: 'Paint Editor' },
          { text: 'Arrange the holes: 3 in a row near the top-centre, 3 below. Leave space around each hole for the mole to fit.', area: 'Paint Editor' },
          { text: 'Click the back-arrow to return to the main editor.', area: 'Paint Editor' },
        ],
        blocks: [],
        tip: 'Keep your hole ovals consistent in size — you\'ll position mole clones to match each hole centre in later steps.',
        didYouKnow: 'You just used a 2D drawing API — the same API that browsers use for HTML Canvas, and that Figma uses for its design canvas.',
      },

      /* ── Step 2 ── */
      {
        id: 2,
        title: 'Add the Mole',
        emoji: '🐹',
        xp: 25,
        concept: { name: 'Object Templates', color: '#f59e0b' },
        goal: 'Add a hedgehog or mole sprite, size it to 50, and hide it on flag click',
        description:
          "The mole sprite is a template. We hide it immediately so only its clones will be visible. Each clone will independently pop up and disappear from a different hole.",
        scratchArea: 'sprites',
        previewStep: 1,
        actions: [
          { text: 'Click "Choose a Sprite" and search "Hedgehog" or "Mole" — add it.', area: 'Sprite Library' },
          { text: 'Set the sprite Size to 50 in the Sprite Info panel.', area: 'Sprite Info' },
          { text: 'Click the Code tab while the mole is selected.', area: 'Code Tab' },
          { text: 'From "Events", add "when 🏁 clicked" → from "Looks", snap "hide".', area: 'Looks Palette' },
          { text: 'Green flag — only the dirt field should be visible. Mole is hiding!', area: 'Stage' },
        ],
        blocks: [
          { text: '— MOLE: when 🏁 clicked →', cat: 'events', indent: 0, shape: 'hat',  note: true },
          { text: 'hide',                        cat: 'looks',  indent: 0, shape: 'stack' },
        ],
        tip: 'If you can still see the mole, make sure the Code tab is on the MOLE sprite (blue outline in sprite panel).',
        didYouKnow: 'A hidden sprite with "when I start as a clone" scripts is exactly like a class — it defines behaviour without doing anything visible until instantiated.',
      },

      /* ── Step 3 ── */
      {
        id: 3,
        title: 'Pick a Random Hole',
        emoji: '🎲',
        xp: 35,
        concept: { name: 'Random Positioning · Clones', color: '#a855f7' },
        goal: 'Make the mole teleport to a random hole position and create one clone',
        description:
          "For now we'll spawn just one clone to test the idea. The master mole picks a random x position matching one of the holes, then creates a clone. In the next step we'll make the clone animate.",
        scratchArea: 'scripts',
        previewStep: 2,
        actions: [
          { text: 'On the Mole sprite, add a "when 🏁 clicked" → "go to x:(pick random (-160) to (160)) y:(-60)".', area: 'Scripts Area' },
          { text: 'Snap "create clone of [myself]" below.', area: 'Control Palette' },
          { text: 'Green flag — you should see a mole clone appear at a random hole!', area: 'Stage' },
        ],
        blocks: [
          { text: '— MOLE master: when 🏁 clicked →',                        cat: 'events',  indent: 0, shape: 'hat',  note: true },
          { text: 'hide',                                                       cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'go to x: (pick random (-160) to (160)) y: (-60)',           cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'create clone of [myself]',                                   cat: 'control', indent: 0, shape: 'stack' },
        ],
        tip: 'Adjust the x range to match your painted holes. If holes are at x=-120, 0, 120 use pick random (-120) to (120).',
        didYouKnow: '"pick random" is a pseudo-random number generator — it produces numbers that feel random but are actually deterministic sequences computed from a seed.',
      },

      /* ── Step 4 ── */
      {
        id: 4,
        title: 'Mole Pops Up',
        emoji: '🦔',
        xp: 45,
        concept: { name: 'Timer · Object Lifecycle', color: '#f59e0b' },
        goal: 'The mole clone appears, waits 1.5 seconds, hides, waits 0.5 seconds, then deletes itself',
        description:
          "Now the clone has a full lifecycle: show → stay visible → hide → delete. This timed appearance and disappearance creates the core whack-a-mole tension.",
        scratchArea: 'scripts',
        previewStep: 3,
        actions: [
          { text: 'On the Mole sprite, add a new script: "when I start as a clone".', area: 'Scripts Area' },
          { text: 'Snap "show" as the first block.', area: 'Looks Palette' },
          { text: 'Add "wait (1.5) seconds" from Control.', area: 'Control Palette' },
          { text: 'Add "hide" from Looks.', area: 'Looks Palette' },
          { text: 'Add "wait (0.5) seconds".', area: 'Control Palette' },
          { text: 'Add "delete this clone".', area: 'Control Palette' },
          { text: 'Green flag — the mole pops up briefly then disappears!', area: 'Stage' },
        ],
        blocks: [
          { text: '— MOLE: when I start as a clone →', cat: 'control', indent: 0, shape: 'hat',  note: true },
          { text: 'show',                               cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'wait (1.5) seconds',                 cat: 'control', indent: 0, shape: 'stack' },
          { text: 'hide',                               cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'wait (0.5) seconds',                 cat: 'control', indent: 0, shape: 'stack' },
          { text: 'delete this clone',                  cat: 'control', indent: 0, shape: 'cap'   },
        ],
        tip: 'Try wait (0.8) for a faster pop-up or wait (2.5) for a slower, easier game. This timer controls difficulty!',
        didYouKnow: 'This show → wait → hide → delete pattern is the game-object lifecycle: create → active → deactivate → destroy. It\'s used in every game engine for temporary objects.',
      },

      /* ── Step 5 ── */
      {
        id: 5,
        title: 'Click to Whack',
        emoji: '🖱️',
        xp: 35,
        concept: { name: 'Mouse Events · Input', color: '#ec4899' },
        goal: 'Add a click handler on the Mole that plays a sound when whacked',
        description:
          "\"when this sprite clicked\" fires the instant the player clicks on a visible mole clone. We'll add a sound first as audio feedback to confirm the click event is wired up, before adding score.",
        scratchArea: 'scripts',
        previewStep: 4,
        actions: [
          { text: 'On the Mole sprite, add another new script: "when this sprite clicked".', area: 'Scripts Area' },
          { text: 'Snap "play sound [pop] until done" from the Sound palette.', area: 'Sounds Palette' },
          { text: 'Green flag → click a visible mole — you should hear a pop!', area: 'Stage' },
        ],
        blocks: [
          { text: '— MOLE: when this sprite clicked →', cat: 'events', indent: 0, shape: 'hat',  note: true },
          { text: 'play sound [pop] until done',         cat: 'sound',  indent: 0, shape: 'stack' },
        ],
        tip: 'Click the Sounds tab on the Mole sprite to browse and add sound effects. "Chomp", "Zap", or "Pop" all work well.',
        didYouKnow: '"when this sprite clicked" is addEventListener("click") in JavaScript — the event pattern that powers every button, menu, and interactive element on the entire web.',
      },

      /* ── Step 6 ── */
      {
        id: 6,
        title: 'Score the Hit',
        emoji: '🔢',
        xp: 40,
        concept: { name: 'Variables · Reward State', color: '#6366f1' },
        goal: 'Create a Score variable and increment it on each successful click',
        description:
          "Reward the player! Create Score, set it to 0 at the start, and add score + delete the clone when clicked. Deleting the clone stops it from hiding and deleting naturally — the player got it first.",
        scratchArea: 'palette-variables',
        previewStep: 5,
        actions: [
          { text: 'Click "Variables" → "Make a Variable" → type "Score" → OK.', area: 'Variables Palette' },
          { text: 'On the MOLE\'s "when 🏁 clicked" script, add "set [Score] to (0)".', area: 'Scripts Area' },
          { text: 'In the "when this sprite clicked" script, after the sound, add "change [Score] by (1)".', area: 'Variables Palette' },
          { text: 'Then add "delete this clone" — the mole disappears instantly on hit!', area: 'Control Palette' },
          { text: 'Green flag → click moles → Score counts up!', area: 'Stage' },
        ],
        blocks: [
          { text: '— MOLE: when this sprite clicked →', cat: 'events',    indent: 0, shape: 'hat',  note: true },
          { text: 'play sound [pop] until done',         cat: 'sound',     indent: 0, shape: 'stack' },
          { text: 'change [Score] by (1)',               cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'delete this clone',                   cat: 'control',   indent: 0, shape: 'cap'   },
        ],
        tip: 'Right-click the Score display and choose "Large readout" for a satisfying big counter.',
        didYouKnow: 'Every leaderboard, XP system, in-game currency, and achievement tracker is built on this same pattern: event detected → variable updated → display refreshed.',
      },

      /* ── Step 7 ── */
      {
        id: 7,
        title: 'Moles Keep Coming',
        emoji: '🔄',
        xp: 50,
        concept: { name: 'Parallel Execution · Concurrency', color: '#f59e0b' },
        goal: 'Make the master mole spawn new clones continuously in a forever loop',
        description:
          "Replace the single-clone test with a forever loop that spawns a new mole every 1.2 seconds. Two independent scripts run at the same time — the spawn loop and the input handler — that\'s parallel execution.",
        scratchArea: 'scripts',
        previewStep: 6,
        actions: [
          { text: 'On the Mole\'s master "when 🏁 clicked" script, remove the single "create clone" block.', area: 'Scripts Area' },
          { text: 'Add "set [Score] to (0)" right after the flag block.', area: 'Variables Palette' },
          { text: 'Below that, add a "forever" loop.', area: 'Control Palette' },
          { text: 'Inside forever: "wait (1.2) seconds".', area: 'Control Palette' },
          { text: 'Then: "go to x:(pick random (-160) to (160)) y:(-60)".', area: 'Motion Palette' },
          { text: 'Then: "create clone of [myself]".', area: 'Control Palette' },
          { text: 'Green flag → moles pop up at random holes again and again!', area: 'Stage' },
        ],
        blocks: [
          { text: '— MOLE master: when 🏁 clicked →',                          cat: 'events',    indent: 0, shape: 'hat',  note: true },
          { text: 'hide',                                                         cat: 'looks',     indent: 0, shape: 'stack' },
          { text: 'set [Score] to (0)',                                           cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'forever',                                                      cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'wait (1.2) seconds',                                           cat: 'control',   indent: 1, shape: 'stack' },
          { text: 'go to x: (pick random (-160) to (160)) y: (-60)',             cat: 'motion',    indent: 1, shape: 'stack' },
          { text: 'create clone of [myself]',                                     cat: 'control',   indent: 1, shape: 'stack' },
        ],
        tip: 'Lower the wait time (0.8 secs) for more moles at once. Higher (2 secs) gives beginners more breathing room.',
        didYouKnow: 'Two "when 🏁 clicked" scripts running at the same time is concurrency — the same concept behind async/await in JavaScript and Python\'s threading module.',
      },

      /* ── Step 8 ── */
      {
        id: 8,
        title: 'Countdown Timer',
        emoji: '⏱️',
        xp: 45,
        concept: { name: 'Countdown Timer', color: '#f59e0b' },
        goal: 'Add a 30-second countdown Timer variable that ticks down once per second',
        description:
          "A parallel script starts counting down the moment the flag is clicked. The Timer variable decrements every second using a repeat-30 loop — the same pattern powering every OTP code, session timeout, and cooking timer ever built.",
        scratchArea: 'scripts',
        previewStep: 7,
        actions: [
          { text: 'Create a "Timer" variable (Variables → Make a Variable → "Timer").', area: 'Variables Palette' },
          { text: 'On the Mole sprite, add a THIRD "when 🏁 clicked" script — this runs in parallel!', area: 'Events Palette' },
          { text: 'Snap "set [Timer] to (30)".', area: 'Variables Palette' },
          { text: 'Add "repeat (30)" from Control.', area: 'Control Palette' },
          { text: 'Inside the repeat: "wait (1) seconds" then "change [Timer] by (-1)".', area: 'Control Palette' },
          { text: 'Green flag — watch the Timer count down from 30 while moles keep spawning!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked  (timer script)',  cat: 'events',    indent: 0, shape: 'hat',  note: true },
          { text: 'set [Timer] to (30)',               cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'repeat (30)',                       cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'wait (1) seconds',                  cat: 'control',   indent: 1, shape: 'stack' },
          { text: 'change [Timer] by (-1)',             cat: 'variables', indent: 1, shape: 'stack' },
        ],
        tip: 'Increase to 45 or 60 seconds for an easier game. The "repeat" count always matches the start Timer value.',
        didYouKnow: 'This repeat-wait-change pattern is how every countdown works in code — from quiz timers to rocket launch sequences.',
      },

      /* ── Step 9 ── */
      {
        id: 9,
        title: 'Game Over',
        emoji: '🏁',
        xp: 35,
        concept: { name: 'State Machines · Program Termination', color: '#ef4444' },
        goal: 'When the timer hits zero, show a message and stop the game',
        description:
          "After the repeat loop finishes counting down, the game transitions from PLAYING to GAME_OVER. Display the result and freeze everything with \"stop [all]\". Your Whack-a-Mole game is complete!",
        scratchArea: 'scripts',
        previewStep: 8,
        actions: [
          { text: 'In the timer script, after the "repeat (30)" block, add "say [Time\'s up! 🔨] for (2) secs".', area: 'Scripts Area' },
          { text: 'Below that, add "stop [all]" from Control.', area: 'Control Palette' },
          { text: 'Green flag → play for 30 seconds — then Time\'s up! Your Whack-a-Mole is complete! 🔨', area: 'Stage' },
        ],
        blocks: [
          { text: '(after the repeat loop)',              cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'say [Time\'s up! 🔨] for (2) secs',   cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'stop [all]',                           cat: 'control', indent: 0, shape: 'cap'   },
        ],
        tip: 'Share your game on Scratch — click "Share" at the top. Friends can try to beat your high score!',
        didYouKnow: 'PLAYING → GAME_OVER is a state machine. Login flows, vending machines, traffic lights, and payment systems all work as state machines — one of the most powerful patterns in software.',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     MISSION 3 — MAZE RUNNER
  ══════════════════════════════════════════════════════ */
  {
    id: 'maze-runner',
    title: 'Maze Runner',
    emoji: '🧩',
    tagline: 'Navigate through the maze before the clock runs out!',
    description:
      "Draw your own maze, guide a hero through walls using colour detection, find the exit, and beat a countdown timer. Great introduction to Scratch's Paint Editor.",
    difficulty: 'Advanced',
    difficultyColor: 'purple',
    xpReward: 550,
    timeEstimate: '45 min',
    color: 'from-purple-500 to-violet-600',
    gradientBg: 'from-purple-900/30 to-violet-900/20',
    badge: {
      id: 'maze-master',
      name: 'Maze Master',
      emoji: '🗝️',
      description: 'Built and escaped your own maze!',
      color: 'from-purple-400 to-violet-500',
    },
    concepts: ['Paint Editor', 'Motion', 'Sensing (colour)', 'Variables', 'Timers'],
    programmingSkills: [
      {
        emoji: '📍',
        skill: '2D Coordinates',
        color: '#ec4899',
        detail: 'Every sprite has an x and y position. This coordinate system is used in every graphics library, game engine, map app, and UI framework in existence.',
      },
      {
        emoji: '🔀',
        skill: 'Conditionals',
        color: '#4C97FF',
        detail: '"if touching colour? then change y by (-4)" reverses the move. This if-statement pattern — check a condition, branch the code — is the foundation of all logic in programming.',
      },
      {
        emoji: '👁️',
        skill: 'Colour-Based Sensing',
        color: '#5CB1D6',
        detail: '"touching color?" reads actual pixel data on the screen — a form of collision detection used in retro games and still found in creative-coding tools today.',
      },
      {
        emoji: '⚙️',
        skill: 'Parallel Execution',
        color: '#FFAB19',
        detail: 'Multiple "when 🏁 clicked" scripts run at the same time. In real code this is called concurrency or async programming — how apps do several things at once.',
      },
      {
        emoji: '⏱️',
        skill: 'Timers & State',
        color: '#f59e0b',
        detail: 'The Timer variable counts down every second — a loop that changes state over time. Real apps use the same pattern for countdowns, sessions, and animations.',
      },
      {
        emoji: '🧮',
        skill: 'Boolean Logic',
        color: '#10b981',
        detail: '"(y position) < (-120)" evaluates to true or false — called a boolean expression. All conditionals in every language evaluate to true or false at their core.',
      },
    ],
    steps: [
      /* ── Step 1 ── */
      {
        id: 1,
        title: 'Draw the Maze',
        emoji: '✏️',
        xp: 35,
        concept: { name: 'Paint Editor · Backdrops', color: '#ec4899' },
        goal: 'Create your own maze as a Scratch backdrop',
        description:
          "This game starts in the Paint Editor — Scratch's built-in drawing tool. You'll draw walls using a solid colour; the hero will bounce back whenever it touches that colour.",
        scratchArea: 'paint-editor',
        previewStep: 0,
        actions: [
          { text: 'Open Scratch and delete the cat sprite.', area: 'Sprite Panel' },
          { text: 'Click the stage backdrop thumbnail (bottom-right) then click "Paint" (pencil icon) to create a new backdrop.', area: 'Backdrop Selector' },
          { text: 'The Paint Editor opens. Select the Rectangle tool on the left toolbar.', area: 'Paint Editor' },
          { text: 'Pick a solid fill colour — dark blue or black works best. Make sure the outline is the SAME colour (no separate outline).', area: 'Paint Editor' },
          { text: 'Draw thick rectangles to form maze walls. Leave corridors about 30–40 pixels wide for the hero to walk through.', area: 'Paint Editor' },
          { text: 'Draw a border rectangle around the whole stage first, then add inner walls to form your maze paths.', area: 'Paint Editor' },
          { text: 'When done, click the back-arrow to return to the main editor.', area: 'Paint Editor' },
        ],
        blocks: [],
        tip: 'Keep paths wide! If they are too narrow, the hero will get stuck in the walls.',
        didYouKnow: 'In Scratch, "touching colour" checks the exact pixel colour — that\'s why solid, consistent wall colours are so important.',
      },

      /* ── Step 2 ── */
      {
        id: 2,
        title: 'Add the Hero',
        emoji: '🧍',
        xp: 20,
        concept: { name: 'Sprites · Size', color: '#f59e0b' },
        goal: 'Add a small hero sprite that fits inside the maze corridors',
        description:
          "The hero needs to be small enough to navigate through the maze corridors. We'll place it at the start position and give it a starting point in code.",
        scratchArea: 'sprites',
        previewStep: 1,
        actions: [
          { text: 'Click "Choose a Sprite" and pick something small — "Avery", a small animal, or search "arrow".', area: 'Sprite Library' },
          { text: 'Set the sprite Size to 25–30 in the Sprite Info panel — it must fit in your corridors!', area: 'Sprite Info' },
          { text: 'Drag the hero sprite to the maze starting position (e.g. top-left open cell).', area: 'Stage' },
          { text: 'Note the x and y coordinates shown in Sprite Info — you\'ll use these in the next step.', area: 'Sprite Info' },
        ],
        blocks: [],
        tip: 'After placing the hero, check that it\'s smaller than the maze corridors. If it looks cramped, reduce the size further.',
        didYouKnow: 'You can click anywhere on the stage while editing to see those x/y coordinates in the bottom-right of the editor.',
      },

      /* ── Step 3 ── */
      {
        id: 3,
        title: 'Move Up & Down',
        emoji: '⬆️⬇️',
        xp: 25,
        concept: { name: 'Events · Motion · Y-Axis', color: '#4C97FF' },
        goal: 'Press the up and down arrow keys to move the hero vertically through the corridor',
        description:
          "First movement! A maze runner needs to go up and down — those are the y-axis keys. We'll add the event trigger, a forever loop, and just the up/down motion blocks. Keeping it to two directions lets you see exactly how each \"change y by\" block works before adding more.",
        scratchArea: 'scripts',
        previewStep: 2,
        actions: [
          { text: 'Click the hero sprite in the sprite panel.', area: 'Sprite Panel' },
          { text: 'From "Events", drag "when 🏁 clicked" into the scripts area.', area: 'Events Palette' },
          { text: 'From "Motion", snap "go to x: (your start x) y: (your start y)" below using the coordinates from Step 2.', area: 'Motion Palette' },
          { text: 'From "Control", add a "forever" loop below.', area: 'Control Palette' },
          { text: 'Inside forever: add "if < > then". Put "key (up arrow) pressed?" from Sensing in the diamond.', area: 'Sensing Palette' },
          { text: 'Inside that if: "change y by (4)". Positive y = up!', area: 'Motion Palette' },
          { text: 'Add a second "if" still inside forever: "key (down arrow) pressed?" → "change y by (-4)".', area: 'Control Palette' },
          { text: 'Green flag → press up and down. The hero glides through the corridor!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                     cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'go to x: (-190) y: (150)',             cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'forever',                              cat: 'control', indent: 0, shape: 'c'     },
          { text: 'if ‹key [up arrow] pressed?› then',    cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change y by (4)',                       cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if ‹key [down arrow] pressed?› then',  cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change y by (-4)',                      cat: 'motion',  indent: 2, shape: 'stack' },
        ],
        tip: '"change y by (4)" moves UP because positive y is upward in Scratch. Negative y moves down — just like a maths graph!',
        didYouKnow: 'In Scratch, y=0 is the centre of the stage. y=180 is the very top; y=−180 is the very bottom.',
      },

      /* ── Step 4 ── */
      {
        id: 4,
        title: 'Move All 4 Directions',
        emoji: '🕹️',
        xp: 40,
        concept: { name: '2D Vectors · 4-Way Input', color: '#4C97FF' },
        goal: 'Add left and right arrow keys to complete full 4-direction movement',
        description:
          "Two more if-blocks and the hero can move anywhere in the maze. Left and right change the x position — negative = left, positive = right. Together with up/down, these four values form a 2D direction vector: the mathematical foundation of every game movement system ever built.",
        scratchArea: 'scripts',
        previewStep: 3,
        actions: [
          { text: 'Inside the forever loop, after the down-arrow if-block, add two more "if < > then" blocks.', area: 'Scripts Area' },
          { text: '"key (left arrow) pressed?" → "change x by (-4)".', area: 'Motion Palette' },
          { text: '"key (right arrow) pressed?" → "change x by (4)".', area: 'Motion Palette' },
          { text: 'Green flag → try all four arrow keys. The hero should move smoothly in every direction!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                       cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'go to x: (-190) y: (150)',               cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'forever',                                cat: 'control', indent: 0, shape: 'c'     },
          { text: 'if ‹key [up arrow] pressed?› then',      cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change y by (4)',                         cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if ‹key [down arrow] pressed?› then',    cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change y by (-4)',                        cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if ‹key [left arrow] pressed?› then',    cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change x by (-4)',                        cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if ‹key [right arrow] pressed?› then',   cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change x by (4)',                         cat: 'motion',  indent: 2, shape: 'stack' },
        ],
        tip: 'Use the same speed value (4) for all four directions so movement feels balanced.',
        didYouKnow: 'Vectors power every game engine, physics simulator, animation system, and robotics controller in existence.',
      },

      /* ── Step 5 ── */
      {
        id: 5,
        title: 'Sense the Wall Colour',
        emoji: '👁️',
        xp: 40,
        concept: { name: 'Colour Sensing · Pixel Detection', color: '#5CB1D6' },
        goal: 'Detect when the hero touches a wall — say "Ouch!" as proof it works',
        description:
          "Scratch's Sensing palette has a special block: \"touching color [ ]?\". It reads actual pixel colours on the stage and returns true or false. We'll add it at the end of the forever loop. For now the hero says \"Ouch!\" to confirm detection — we'll add the bounce-back logic next step.",
        scratchArea: 'palette-sensing',
        previewStep: 4,
        actions: [
          { text: 'Make sure the hero sprite is selected.', area: 'Sprite Panel' },
          { text: 'At the very end of the forever loop (after all four arrow ifs), add "if < > then" from Control.', area: 'Control Palette' },
          { text: 'From "Sensing" (light blue), drag "touching color [ ]?" into the ◇ diamond.', area: 'Sensing Palette' },
          { text: 'Click the colour swatch in the block, then click the eyedropper 🎨 icon — and click directly on a wall in the stage.', area: 'Stage' },
          { text: 'Inside the if: from "Looks", add "say [Ouch! 🧱] for (0.5) secs".', area: 'Looks Palette' },
          { text: 'Green flag → walk into a wall. The hero should say "Ouch!" the moment it touches the wall colour!', area: 'Stage' },
        ],
        blocks: [
          { text: '(at the end of the forever loop)',               cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'if ‹touching color [■ dark blue]?› then',       cat: 'sensing', indent: 1, shape: 'c'     },
          { text: 'say [Ouch! 🧱] for (0.5) secs',                 cat: 'looks',   indent: 2, shape: 'stack' },
        ],
        tip: 'The eyedropper only works when you click it first, THEN click the wall on the stage. The colour must match exactly.',
        didYouKnow: '"touching color?" reads actual pixel data on screen — making the maze artwork itself the collision system. No coordinate math needed!',
      },

      /* ── Step 6 ── */
      {
        id: 6,
        title: 'Bounce Back',
        emoji: '🧱',
        xp: 55,
        concept: { name: 'Rollback Pattern · Colour Sensing', color: '#5CB1D6' },
        goal: 'Reverse each move if the hero touches a wall — the "rollback" pattern',
        description:
          "Now the clever part: instead of saying \"Ouch!\", we reverse the move. After each \"change y by (4)\", immediately check if the hero is touching a wall — if yes, \"change y by (-4)\" puts it right back. This save-move-check-restore cycle is how databases undo failed transactions and Git reverts bad commits.",
        scratchArea: 'scripts',
        previewStep: 5,
        actions: [
          { text: 'Remove the "say [Ouch!]" block from the colour-sensing if.', area: 'Scripts Area' },
          { text: 'Move the "if ‹touching color?› then" block so it sits INSIDE the up-arrow if — right after "change y by (4)".', area: 'Scripts Area' },
          { text: 'Inside the colour-check: add "change y by (-4)" — this pushes the hero back out of the wall.', area: 'Motion Palette' },
          { text: 'Repeat this pattern for all four directions (each "change x/y" gets its own colour-check + reverse immediately after it).', area: 'Scripts Area' },
          { text: 'Green flag → walk into a wall. The hero should stop cleanly at the wall edge instead of passing through!', area: 'Stage' },
        ],
        blocks: [
          { text: 'if ‹key [up arrow] pressed?› then',         cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change y by (4)',                            cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'if ‹touching color [■ dark blue]?› then',   cat: 'sensing', indent: 2, shape: 'c'     },
          { text: 'change y by (-4)   ← rollback!',            cat: 'motion',  indent: 3, shape: 'stack' },
        ],
        tip: 'Do the EXACT same pattern for all 4 directions — up/down use y, left/right use x. Each direction gets its own immediate rollback.',
        didYouKnow: 'Database transactions, Git commits, undo/redo stacks, and save files all use rollback — "save state, try action, restore if bad."',
      },

      /* ── Step 7 ── */
      {
        id: 7,
        title: 'Add the Exit Star',
        emoji: '⭐',
        xp: 20,
        concept: { name: 'Multiple Sprites · Parallel Scripts', color: '#10b981' },
        goal: 'Place a spinning star at the maze exit — it runs its own code independently',
        description:
          "Every maze needs a goal! We'll add a Star sprite with a spin animation. The star runs its own script completely in parallel with the hero — both scripts run the moment the flag is clicked, with zero conflict. This is Scratch's superpower: parallel execution.",
        scratchArea: 'sprites',
        previewStep: 6,
        actions: [
          { text: 'Click "Choose a Sprite" and search "Star" — pick the yellow one.', area: 'Sprite Library' },
          { text: 'Resize the star to 40 and drag it to the far end of the maze (the exit cell).', area: 'Stage' },
          { text: 'With the Star sprite selected, click the Code tab.', area: 'Code Tab' },
          { text: 'From "Events", add "when 🏁 clicked".', area: 'Events Palette' },
          { text: 'From "Control", add a "forever" loop.', area: 'Control Palette' },
          { text: 'Inside the loop: from "Motion", add "turn (4) degrees". The star spins!', area: 'Motion Palette' },
          { text: 'Green flag → the star should spin AND the hero should move — both at the same time!', area: 'Stage' },
        ],
        blocks: [
          { text: '— STAR: when 🏁 clicked →', cat: 'events',  indent: 0, shape: 'hat',  note: true },
          { text: 'forever',                    cat: 'control', indent: 0, shape: 'c'     },
          { text: 'turn (4) degrees',           cat: 'motion',  indent: 1, shape: 'stack' },
        ],
        tip: 'Drag the star to the very end of your maze path — players must navigate all the way through to reach it.',
        didYouKnow: 'Multiple "when 🏁 clicked" scripts run simultaneously. This is called parallel execution — the same concept used in async programming, game engines, and operating systems.',
      },

      /* ── Step 8 ── */
      {
        id: 8,
        title: 'Win the Maze',
        emoji: '🎉',
        xp: 50,
        concept: { name: 'Win Conditions · Boolean Logic', color: '#10b981' },
        goal: 'Celebrate when the hero reaches the exit star — stop the game on victory',
        description:
          "A win condition is a boolean expression: \"did the hero touch the star?\" — true or false, nothing in between. When it's true, we show a victory message and stop everything. This pattern is behind every achievement, goal state, and success screen in every game ever built.",
        scratchArea: 'scripts',
        previewStep: 7,
        actions: [
          { text: 'Select the Star sprite.', area: 'Sprite Panel' },
          { text: 'Add a SECOND script: "when 🏁 clicked" → "forever" loop. (This runs in parallel with the spin script!)', area: 'Events Palette' },
          { text: 'Inside the loop, add "if < > then" from Control.', area: 'Control Palette' },
          { text: 'From "Sensing", drag "touching [Hero]?" into the ◇ diamond — choose your hero sprite\'s name.', area: 'Sensing Palette' },
          { text: 'Inside the if: "say [You escaped! 🎉] for (3) seconds" from Looks.', area: 'Looks Palette' },
          { text: 'Below the say: "stop [all]" from Control — freezes everything on victory!', area: 'Control Palette' },
          { text: 'Green flag → navigate the maze and reach the star. Victory! 🎊', area: 'Stage' },
        ],
        blocks: [
          { text: '— STAR: when 🏁 clicked (win script) →', cat: 'events',  indent: 0, shape: 'hat',  note: true },
          { text: 'forever',                                  cat: 'control', indent: 0, shape: 'c'     },
          { text: 'if ‹touching [Hero]?› then',              cat: 'sensing', indent: 1, shape: 'c'     },
          { text: 'say [You escaped! 🎉] for (3) seconds',   cat: 'looks',   indent: 2, shape: 'stack' },
          { text: 'stop [all]',                               cat: 'control', indent: 2, shape: 'cap'   },
        ],
        tip: 'The star now has TWO scripts — one spinning forever, one watching for the hero. Both run at the same time!',
        didYouKnow: 'Achievement systems, form validation, access control — all evaluate a boolean condition, then branch to a reward or error path.',
      },

      /* ── Step 9 ── */
      {
        id: 9,
        title: 'Race the Clock',
        emoji: '⏱️',
        xp: 60,
        concept: { name: 'Variables · Countdown Timer', color: '#f59e0b' },
        goal: 'Add a 30-second countdown; game over if time runs out',
        description:
          "The final challenge: beat the maze before time runs out! A Timer variable starts at 30 and counts down 1 every second. When it hits zero, the game is over — a state transition from PLAYING to TIME_UP.",
        scratchArea: 'scripts',
        previewStep: 8,
        actions: [
          { text: 'Create a "Timer" variable (Variables → Make a Variable → "Timer").', area: 'Variables Palette' },
          { text: 'On the HERO sprite, add a second script: "when 🏁 clicked".', area: 'Events Palette' },
          { text: 'Add "set [Timer] to (30)".', area: 'Variables Palette' },
          { text: 'Add "repeat (30)" from Control — this loops exactly 30 times.', area: 'Control Palette' },
          { text: 'Inside the repeat loop, add "wait (1) seconds" then "change [Timer] by (-1)".', area: 'Control Palette' },
          { text: 'After the repeat loop (outside it), add "say [Time\'s up! ⏰] for (2) seconds".', area: 'Looks Palette' },
          { text: 'Then add "stop [all]".', area: 'Control Palette' },
          { text: 'Click the green flag and race to escape in 30 seconds! 🏃', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked  (timer script)',     cat: 'events',    indent: 0, shape: 'hat',  note: true },
          { text: 'set [Timer] to (30)',                  cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'repeat (30)',                          cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'wait (1) seconds',                     cat: 'control',   indent: 1, shape: 'stack' },
          { text: 'change [Timer] by (-1)',                cat: 'variables', indent: 1, shape: 'stack' },
          { text: 'say [Time\'s up! ⏰] for (2) seconds', cat: 'looks',     indent: 0, shape: 'stack' },
          { text: 'stop [all]',                           cat: 'control',   indent: 0, shape: 'cap'   },
        ],
        tip: 'To make it harder, reduce the timer to 20 or 15 seconds. To make it easier, increase it to 60.',
        didYouKnow: 'Login session timeouts, OTP codes, rate limiters, and cooking timers all work exactly like this countdown pattern.',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     MISSION 6 — SKY DRIFTER
  ══════════════════════════════════════════════════════ */
  {
    id: 'sky-drifter',
    title: 'Sky Drifter',
    emoji: '🐦',
    tagline: 'Tap to flap — dodge the pipes and fly as far as you can!',
    description:
      'Guide a bird through an endless stream of pipe obstacles using only the spacebar. Simulate real gravity, generate infinite pipes with clones, and count how many you survive.',
    difficulty: 'Advanced',
    difficultyColor: 'purple',
    xpReward: 600,
    timeEstimate: '45 min',
    color: 'from-sky-500 to-blue-600',
    gradientBg: 'from-sky-900/30 to-blue-900/20',
    badge: {
      id: 'sky-ace',
      name: 'Sky Ace',
      emoji: '🏅',
      description: 'Mastered Sky Drifter!',
      color: 'from-sky-400 to-blue-500',
    },
    concepts: ['Physics', 'Clones', 'Sensing', 'Variables', 'Timers'],
    programmingSkills: [
      {
        emoji: '🌍',
        skill: 'Physics Simulation',
        color: '#f59e0b',
        detail: 'Gravity is just math: subtract 1 from y velocity every frame. Real physics engines — Box2D, Bullet, Havok — do exactly this, just with floating-point vectors instead of integers.',
      },
      {
        emoji: '🧬',
        skill: 'Clone Infinite Loop',
        color: '#a855f7',
        detail: 'A forever loop on the Pipe master creates an endless stream of pipe clones. Each clone lives independently, scrolls left, checks for collision, and destroys itself — the infinite-scroller pattern.',
      },
      {
        emoji: '🎯',
        skill: 'Collision Detection',
        color: '#5CB1D6',
        detail: '"touching [Bird]?" inside each pipe clone checks overlap every frame. One true result ends the game instantly — the same collision-kills mechanic used in every endless runner.',
      },
      {
        emoji: '📦',
        skill: 'State Variables',
        color: '#6366f1',
        detail: '"y velocity" stores physics state that changes every frame. Managing continuously-updating state is the core challenge of real-time simulation and game programming.',
      },
      {
        emoji: '⚡',
        skill: 'Input Events',
        color: '#FFAB19',
        detail: '"when [space] key pressed" fires an event handler that overrides gravity with a jump impulse. In real game engines this is an input callback — zero-delay, high-priority event handling.',
      },
      {
        emoji: '🎲',
        skill: 'Random Generation',
        color: '#10b981',
        detail: '"pick random (-60) to (60)" gives each pipe gap a different height. Procedural generation — creating infinite content from code — is the technique behind Minecraft worlds and roguelike dungeons.',
      },
    ],
    steps: [

      /* ── Step 1 ── */
      {
        id: 1,
        title: 'Set the Sky Scene',
        emoji: '🌤️',
        xp: 15,
        concept: { name: 'Asset Loading · Scene Setup', color: '#6366f1' },
        goal: 'Choose a blue sky backdrop and delete the default cat',
        description:
          'A bright daytime sky sets the perfect tone for an aerial adventure. We also delete the cat so the stage is clean for our bird and pipe sprites.',
        scratchArea: 'backdrop',
        previewStep: 0,
        actions: [
          { text: 'Open Scratch and create a new project (File → New).', area: 'File Menu' },
          { text: 'Right-click the cat sprite and choose "Delete".', area: 'Sprite Panel' },
          { text: 'Click "Choose a Backdrop" → search "Blue Sky" → click to add.', area: 'Backdrop Selector' },
          { text: 'The stage now shows a bright sky. We\'ll fill it with a scrolling bird and pipes!', area: 'Stage' },
        ],
        blocks: [],
        tip: 'Any bright sky backdrop works. "Blue Sky 2" has clouds already painted in — saves you one step!',
        didYouKnow: 'Loading assets and configuring the scene before the game loop starts is called scene setup or initialisation — every game engine has this explicit phase.',
      },

      /* ── Step 2 ── */
      {
        id: 2,
        title: 'Add the Bird',
        emoji: '🐦',
        xp: 20,
        concept: { name: 'Object Properties · Positioning', color: '#d946ef' },
        goal: 'Add a parrot or bird sprite, size it to 50, and position it on the left of the stage',
        description:
          "The bird is the player character. We set its size and starting position. Next step we'll give it gravity so it falls — then let the player fight that gravity with the spacebar.",
        scratchArea: 'sprites',
        previewStep: 1,
        actions: [
          { text: 'Click "Choose a Sprite" and search "Parrot" or "Bird" — add it.', area: 'Sprite Library' },
          { text: 'Set Size to 50 in the Sprite Info panel.', area: 'Sprite Info' },
          { text: 'Click the Code tab while the Bird is selected.', area: 'Code Tab' },
          { text: 'From "Events", add "when 🏁 clicked" → from "Motion", snap "go to x:(-180) y:(0)".', area: 'Motion Palette' },
          { text: 'Green flag — the bird appears on the left side of the screen.', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',          cat: 'events', indent: 0, shape: 'hat'   },
          { text: 'go to x: (-180) y: (0)',    cat: 'motion', indent: 0, shape: 'stack' },
        ],
        tip: 'Placing the bird at x=-180 gives it room to navigate. Pipes will come from the right side.',
        didYouKnow: 'Every game object starts with an initialization block that sets position, size, and velocity to known values before the game loop begins.',
      },

      /* ── Step 3 ── */
      {
        id: 3,
        title: 'Gravity Pulls Down',
        emoji: '⬇️',
        xp: 60,
        concept: { name: 'Variables · Physics Simulation', color: '#a855f7' },
        goal: 'Create a "y velocity" variable; every frame subtract 1 (gravity) and apply it to y position',
        description:
          "The secret to realistic falling: a velocity variable. Every frame, gravity subtracts 1 from velocity; velocity then changes position. This accumulation is exactly how real physics engines — Box2D, Havok, Unity — model gravity.",
        scratchArea: 'palette-variables',
        previewStep: 2,
        actions: [
          { text: 'Click "Variables" → "Make a Variable" → "y velocity" → OK.', area: 'Variables Palette' },
          { text: 'In the Bird\'s "when 🏁 clicked" script, add "set [y velocity] to (0)" right after the go-to block.', area: 'Scripts Area' },
          { text: 'Below that, add a "forever" loop.', area: 'Control Palette' },
          { text: 'Inside forever: "change [y velocity] by (-1)".', area: 'Variables Palette' },
          { text: 'Next: "change y by (y velocity)" — drag the y velocity reporter into the slot.', area: 'Motion Palette' },
          { text: 'Inside forever, after change-y: add "if ‹(y position) < (-170)› then / set y to (-170) / set [y velocity] to (0)".', area: 'Control Palette' },
          { text: 'Green flag — the bird should fall to the bottom and stop (no floor bounce).', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                      cat: 'events',    indent: 0, shape: 'hat'   },
          { text: 'go to x: (-180) y: (0)',                cat: 'motion',    indent: 0, shape: 'stack' },
          { text: 'set [y velocity] to (0)',               cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'forever',                               cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'change [y velocity] by (-1)',            cat: 'variables', indent: 1, shape: 'stack' },
          { text: 'change y by (y velocity)',              cat: 'motion',    indent: 1, shape: 'stack' },
          { text: 'if ‹(y position) < (-170)› then',       cat: 'control',   indent: 1, shape: 'c'     },
          { text: 'set y to (-170)',                       cat: 'motion',    indent: 2, shape: 'stack' },
          { text: 'set [y velocity] to (0)',               cat: 'variables', indent: 2, shape: 'stack' },
        ],
        tip: 'Try "change [y velocity] by (-2)" for stronger gravity — the game gets much harder immediately!',
        didYouKnow: 'Velocity accumulation under constant acceleration is Newtonian mechanics — F=ma in code. Every physics engine from Box2D to Unreal uses this exact loop every frame.',
      },

      /* ── Step 4 ── */
      {
        id: 4,
        title: 'Flap! Press Space',
        emoji: '🦅',
        xp: 35,
        concept: { name: 'Event Handling · Input Polling', color: '#FFAB19' },
        goal: 'Press SPACE to set y velocity to +8 — fighting gravity with a flap impulse',
        description:
          "The gameplay in a nutshell: gravity pulls the bird down, SPACE fires an upward impulse. Add a separate \"when [space] key pressed\" hat block on the Bird. This event handler overrides gravity for exactly one frame — the classic flap mechanic.",
        scratchArea: 'scripts',
        previewStep: 3,
        actions: [
          { text: 'On the Bird sprite, add a NEW separate script: "when [space] key pressed".', area: 'Events Palette' },
          { text: 'Snap "set [y velocity] to (8)" inside it.', area: 'Variables Palette' },
          { text: 'Green flag → press SPACE rapidly. The bird flaps upward each time!', area: 'Stage' },
          { text: 'Hold SPACE to see what happens when you fight gravity continuously.', area: 'Stage' },
        ],
        blocks: [
          { text: '— separate script on BIRD →',    cat: 'events',    indent: 0, shape: 'hat',  note: true },
          { text: 'when [space] key pressed',        cat: 'events',    indent: 0, shape: 'hat'   },
          { text: 'set [y velocity] to (8)',         cat: 'variables', indent: 0, shape: 'stack' },
        ],
        tip: 'Try values like 6, 10, or 15 to find the feel you want. Higher = easier to stay aloft but harder to aim through gaps.',
        didYouKnow: '"when [space] key pressed" is a hardware interrupt wrapper — the operating system tells Scratch the instant the key is pressed, with no polling delay.',
      },

      /* ── Step 5 ── */
      {
        id: 5,
        title: 'Add the Pipe',
        emoji: '🟩',
        xp: 30,
        concept: { name: 'Object Templates · Hiding', color: '#a855f7' },
        goal: 'Draw a green pipe sprite in the Paint Editor and hide it on flag click',
        description:
          "Just like the bullet in Space Shooter, the Pipe sprite is a template that hides itself. All the real action happens in its clones. We'll draw it as a simple tall green rectangle.",
        scratchArea: 'paint-editor',
        previewStep: 4,
        actions: [
          { text: 'Click "Choose a Sprite" → "Paint" (pencil icon) to draw from scratch.', area: 'Sprite Library' },
          { text: 'In the Paint Editor, select the Rectangle tool. Pick a bright green fill colour.', area: 'Paint Editor' },
          { text: 'Draw a tall thin rectangle (about 30px wide, 100px tall) centred in the canvas.', area: 'Paint Editor' },
          { text: 'Name the sprite "Pipe" in the Sprite Info panel.', area: 'Sprite Info' },
          { text: 'Click the Code tab while Pipe is selected.', area: 'Code Tab' },
          { text: 'From "Events", add "when 🏁 clicked" → from "Looks", snap "hide".', area: 'Looks Palette' },
          { text: 'Green flag — only the bird and sky are visible. Pipe is ready to be cloned!', area: 'Stage' },
        ],
        blocks: [
          { text: '— PIPE: when 🏁 clicked →', cat: 'events', indent: 0, shape: 'hat',  note: true },
          { text: 'hide',                        cat: 'looks',  indent: 0, shape: 'stack' },
        ],
        tip: 'Make the pipe width about 28–32 pixels. Too wide = impossible game. Too thin = too easy.',
        didYouKnow: 'The Pipe sprite is a class. Its clones are instances. OOP in action — one template, infinite objects.',
      },

      /* ── Step 6 ── */
      {
        id: 6,
        title: 'Pipes Scroll Left',
        emoji: '⬅️',
        xp: 50,
        concept: { name: 'Repeat-Until · Destruction', color: '#4C97FF' },
        goal: 'A pipe clone scrolls from right to left and deletes itself when offscreen',
        description:
          "The clone lifecycle for pipes: show → scroll left (changing x by -4 each frame) → delete when x < -240. This repeat-until-destroy pattern is how every endless runner scroll mechanic is built.",
        scratchArea: 'scripts',
        previewStep: 5,
        actions: [
          { text: 'On the Pipe sprite, add a "when I start as a clone" script.', area: 'Control Palette' },
          { text: 'Snap "show".', area: 'Looks Palette' },
          { text: 'Add "repeat until ‹(x position) < (-240)›" from Control.', area: 'Control Palette' },
          { text: 'Inside the repeat-until: "change x by (-4)".', area: 'Motion Palette' },
          { text: 'After the loop: "delete this clone".', area: 'Control Palette' },
          { text: 'To test, add a temporary "when 🏁 clicked → create clone of [myself]" on Pipe. Green flag — pipe scrolls left!', area: 'Stage' },
        ],
        blocks: [
          { text: '— PIPE: when I start as a clone →',          cat: 'control', indent: 0, shape: 'hat',  note: true },
          { text: 'show',                                         cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'repeat until ‹(x position) < (-240)›',        cat: 'control', indent: 0, shape: 'c'     },
          { text: 'change x by (-4)',                             cat: 'motion',  indent: 1, shape: 'stack' },
          { text: 'delete this clone',                            cat: 'control', indent: 0, shape: 'cap'   },
        ],
        tip: 'Increase the scroll speed to -6 or -8 for a harder game. This one number controls overall game difficulty!',
        didYouKnow: 'Parallax scrolling, endless runners, and side-scrollers all use this pattern: spawn off-screen right → scroll left → destroy off-screen left → repeat.',
      },

      /* ── Step 7 ── */
      {
        id: 7,
        title: 'Random Pipe Heights',
        emoji: '🎲',
        xp: 55,
        concept: { name: 'Random Numbers · Procedural Generation', color: '#10b981' },
        goal: 'Make the master Pipe spawn clones at random heights in a forever loop',
        description:
          "Procedural generation! The Pipe master's forever loop positions each new clone at a random y before creating it. This gives every session a unique layout — infinite content from a handful of blocks.",
        scratchArea: 'scripts',
        previewStep: 6,
        actions: [
          { text: 'Remove the temporary test "when 🏁 clicked → create clone" you added in the last step.', area: 'Scripts Area' },
          { text: 'On the Pipe sprite, add a proper "when 🏁 clicked" → "forever" script.', area: 'Events Palette' },
          { text: 'Inside forever: "go to x:(240) y:(pick random (-60) to (60))".', area: 'Motion Palette' },
          { text: 'Then: "create clone of [myself]".', area: 'Control Palette' },
          { text: 'Then: "wait (2.5) seconds" — this controls how often new pipes appear.', area: 'Control Palette' },
          { text: 'Green flag → pipes stream in from the right at varying heights!', area: 'Stage' },
        ],
        blocks: [
          { text: '— PIPE master: when 🏁 clicked →',                         cat: 'events',  indent: 0, shape: 'hat',  note: true },
          { text: 'hide',                                                        cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'forever',                                                     cat: 'control', indent: 0, shape: 'c'     },
          { text: 'go to x: (240) y: (pick random (-60) to (60))',              cat: 'motion',  indent: 1, shape: 'stack' },
          { text: 'create clone of [myself]',                                    cat: 'control', indent: 1, shape: 'stack' },
          { text: 'wait (2.5) seconds',                                          cat: 'control', indent: 1, shape: 'stack' },
        ],
        tip: 'Lower the wait to 1.5 secs for a rapid-fire challenge. Wider pick-random range creates more extreme height differences.',
        didYouKnow: 'Procedural generation — Minecraft biomes, Spelunky levels, No Man\'s Sky planets — is all "pick random" at different scales. The idea is identical.',
      },

      /* ── Step 8 ── */
      {
        id: 8,
        title: 'Dodge or Crash',
        emoji: '💥',
        xp: 60,
        concept: { name: 'Collision Detection · Game Over', color: '#5CB1D6' },
        goal: 'Detect when the Bird touches a Pipe — stop the game immediately',
        description:
          "Inside each pipe clone's scroll loop, check every frame whether it's touching the Bird. One collision = game over. This is the core mechanical consequence that makes the game tense.",
        scratchArea: 'palette-sensing',
        previewStep: 7,
        actions: [
          { text: 'On the Pipe sprite, find the "when I start as a clone" script.', area: 'Scripts Area' },
          { text: 'Inside the repeat-until loop (after "change x by (-4)"), add "if < > then".', area: 'Control Palette' },
          { text: 'From Sensing, drag "touching [Bird]?" (choose your bird\'s name) into the ◇ diamond.', area: 'Sensing Palette' },
          { text: 'Inside the if: "stop [all]" from Control.', area: 'Control Palette' },
          { text: 'Green flag → flap through pipes — hit one and the game freezes!', area: 'Stage' },
        ],
        blocks: [
          { text: '(inside the repeat-until scroll loop)',     cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'change x by (-4)',                          cat: 'motion',  indent: 1, shape: 'stack' },
          { text: 'if ‹touching [Bird]?› then',               cat: 'sensing', indent: 1, shape: 'c'     },
          { text: 'stop [all]',                               cat: 'control', indent: 2, shape: 'cap'   },
        ],
        tip: 'Before "stop [all]", add "say [Game Over! 💥] for (1) secs" on the Bird sprite for a dramatic ending.',
        didYouKnow: '"touching [Bird]?" checks pixel-by-pixel overlap 30 times per second — the same AABB collision test behind every hitbox, trigger zone, and collision mesh in game development.',
      },

      /* ── Step 9 ── */
      {
        id: 9,
        title: 'Count the Score',
        emoji: '🏅',
        xp: 50,
        concept: { name: 'Variables · Score State', color: '#6366f1' },
        goal: 'Add a Score variable that increments each time the bird passes a pipe',
        description:
          "The final reward mechanic: score 1 point for each pipe cleared. Inside the pipe clone's loop, check when x crosses x=-180 (bird's x position) — that's the moment the bird clears the pipe. Increment score then to avoid counting twice.",
        scratchArea: 'palette-variables',
        previewStep: 8,
        actions: [
          { text: 'Click "Variables" → "Make a Variable" → "Score" → OK.', area: 'Variables Palette' },
          { text: 'On the Bird\'s "when 🏁 clicked" script, add "set [Score] to (0)".', area: 'Scripts Area' },
          { text: 'In the Pipe clone\'s repeat-until loop, add another "if < > then".', area: 'Control Palette' },
          { text: 'Build the condition: "(x position) < (-180)" using Operators.', area: 'Operators Palette' },
          { text: 'Inside the if: "change [Score] by (1)" then "wait (0.1) secs" (prevents double-counting).', area: 'Variables Palette' },
          { text: 'Green flag → flap through pipes → Score climbs with each pipe you clear! 🏅', area: 'Stage' },
        ],
        blocks: [
          { text: '(inside the pipe clone scroll loop)',        cat: 'control',   indent: 0, shape: 'stack', note: true },
          { text: 'if ‹(x position) < (-180)› then',           cat: 'control',   indent: 1, shape: 'c'     },
          { text: 'change [Score] by (1)',                      cat: 'variables', indent: 2, shape: 'stack' },
          { text: 'wait (0.1) seconds',                         cat: 'control',   indent: 2, shape: 'stack' },
          { text: 'if ‹touching [Bird]?› then',                cat: 'sensing',   indent: 1, shape: 'c'     },
          { text: 'stop [all]',                                 cat: 'control',   indent: 2, shape: 'cap'   },
        ],
        tip: 'Share your game on Scratch — click "Share" at the top and challenge friends to beat your high score! 🏅',
        didYouKnow: 'Threshold-crossing detection ("x < -180") is used in games, finance (stop-loss triggers), IoT (sensor alarms), and analytics (funnel drop-off). The same pattern, everywhere.',
      },
    ],
  },

  /* ════════════════════════════════════════════════════════════════
     CUBE JUMPER — Intermediate, one-button rhythm runner
  ════════════════════════════════════════════════════════════════ */
  {
    id: 'cube-jumper',
    title: 'Cube Jumper',
    emoji: '🟦',
    tagline: 'Hop the cube over endless spikes — one button to win!',
    description:
      'A one-button rhythm runner inspired by Geometry Dash. Spikes slide toward your cube from the right; tap SPACE to leap over them. Survive longer to climb the score and watch the speed ramp up!',
    difficulty: 'Intermediate',
    difficultyColor: 'blue',
    xpReward: 380,
    timeEstimate: '30 min',
    color: 'from-blue-500 to-cyan-500',
    gradientBg: 'from-blue-900/30 to-cyan-900/20',
    badge: {
      id: 'cube-master',
      name: 'Cube Master',
      emoji: '🟦',
      description: 'Built Cube Jumper — a one-button rhythm runner!',
      color: 'from-blue-400 to-cyan-500',
    },
    concepts: ['Sprites', 'Events', 'Motion', 'Variables', 'Sensing', 'Operators'],
    programmingSkills: [
      {
        emoji: '⚡',
        skill: 'Single-Input Design',
        color: '#FFAB19',
        detail: 'One-button games are an entire genre — Flappy Bird, Geometry Dash, Crossy Road. Removing choices forces tight timing and is a real game-design technique pros use.',
      },
      {
        emoji: '🌍',
        skill: 'Jump Physics',
        color: '#10b981',
        detail: 'A "y power" variable + gravity loop creates an arcing jump that feels natural. It is the same recipe used in every 2D platformer ever made.',
      },
      {
        emoji: '➡️',
        skill: 'Auto-Scrolling',
        color: '#4C97FF',
        detail: 'The cube stays still; the world moves. This illusion of running is used in endless runners (Subway Surfers, Temple Run) and side-scrollers (Mario, Sonic).',
      },
      {
        emoji: '🎯',
        skill: 'Collision Detection',
        color: '#5CB1D6',
        detail: '"touching [Spike]?" instantly decides the game is over. The same hit-test pattern powers every action game and even VR.',
      },
      {
        emoji: '📦',
        skill: 'Game State',
        color: '#a855f7',
        detail: '"Score" and "Speed" are variables that change over time. Managing state cleanly is the core of every multiplayer game, simulation, and live app.',
      },
      {
        emoji: '📈',
        skill: 'Difficulty Curves',
        color: '#FF6680',
        detail: 'Increasing speed as score climbs is called a difficulty ramp. Tetris, Pac-Man, every casino slot — all use the same trick to keep players hooked.',
      },
    ],
    steps: [

      /* ── Step 1 ── */
      {
        id: 1,
        title: 'Set the Stage',
        emoji: '🌃',
        xp: 20,
        concept: { name: 'Backdrops · Setup', color: '#6366f1' },
        goal: 'Open Scratch with a dark "night" backdrop and a glowing horizon line',
        description:
          'Cube Jumper has a clean, neon look — a dark sky with a single bright ground line. We will pick a dark backdrop and get rid of the cat to start fresh.',
        scratchArea: 'overview',
        previewStep: 0,
        actions: [
          { text: 'Go to scratch.mit.edu and click "Create".', highlight: 'scratch.mit.edu' },
          { text: 'Right-click the cat sprite → Delete.', area: 'Sprite Panel' },
          { text: 'Click "Choose a Backdrop" → search "Stars" or "Neon Tunnel" → click to add.', area: 'Backdrop Library' },
          { text: '(Optional) Click the Backdrops tab → use the line tool to draw a bright neon horizon line across the middle.', area: 'Backdrop Editor' },
        ],
        blocks: [],
        tip: 'A dark backdrop makes neon-coloured sprites pop — that\'s why Geometry Dash and Tetris use them.',
        didYouKnow: 'In Scratch the stage is 480×360. The Y-axis goes from -180 (bottom) to +180 (top). A horizon line around y=-100 leaves room for jumps.',
      },

      /* ── Step 2 ── */
      {
        id: 2,
        title: 'Design the Cube',
        emoji: '🟦',
        xp: 30,
        concept: { name: 'Sprites · Costumes', color: '#d946ef' },
        goal: 'Paint a simple blue cube sprite with a tiny face',
        description:
          'Cube Jumper\'s hero is a single coloured square. Use the Paint Editor to draw it from scratch so the kid owns the design.',
        scratchArea: 'costumes',
        previewStep: 1,
        actions: [
          { text: 'In the sprite panel, hover the blue "Choose a Sprite" button and pick "Paint" (the brush icon).', area: 'Sprite Panel' },
          { text: 'Make sure you\'re in the Costumes tab. Pick the Rectangle tool with Fill = bright blue, no outline.', area: 'Paint Editor' },
          { text: 'Drag a square about 50 × 50 pixels in the centre of the canvas.', area: 'Paint Canvas' },
          { text: 'Pick the Brush tool → black → add two dots for eyes and a tiny smile.', area: 'Paint Canvas' },
          { text: 'Rename the sprite "Cube" in the sprite info panel.', area: 'Sprite Info' },
        ],
        blocks: [],
        tip: 'Keep the cube small (≈ 50 px) so jumps look snappy and spikes feel close to the action.',
        didYouKnow: 'Geometry Dash characters started as one-colour squares because the designer drew them in 10 minutes. Simple shapes are easy to animate and recognise.',
      },

      /* ── Step 3 ── */
      {
        id: 3,
        title: 'Stand on the Ground',
        emoji: '⬇️',
        xp: 25,
        concept: { name: 'Motion · Events', color: '#4C97FF' },
        goal: 'On green flag, the cube starts at the left of the screen sitting on the ground',
        description:
          'Before the cube moves at all, put it in its starting spot. We park it on the left side, sitting just above the horizon line.',
        scratchArea: 'scripts',
        previewStep: 2,
        actions: [
          { text: 'Click the Code tab. Drag in "when 🏁 clicked" from Events.', area: 'Events Palette' },
          { text: 'Add "go to x: (-150) y: (-100)" from Motion — this is the cube\'s starting spot.', area: 'Motion Palette' },
          { text: 'Add "set size to (80) %" from Looks so the cube isn\'t huge.', area: 'Looks Palette' },
          { text: 'Click 🏁 — the cube snaps to the left side of the stage.', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',            cat: 'events', indent: 0, shape: 'hat'   },
          { text: 'go to x: (-150) y: (-100)',  cat: 'motion', indent: 0, shape: 'stack' },
          { text: 'set size to (80) %',         cat: 'looks',  indent: 0, shape: 'stack' },
        ],
        tip: 'Always reset position in the green-flag script. Players love restarting and your game must reset cleanly.',
        didYouKnow: '"go to x y" is teleportation. There\'s no smooth animation — the sprite jumps instantly. This is faster than gliding when you just need to reset.',
      },

      /* ── Step 4 ── */
      {
        id: 4,
        title: 'Simple Jump',
        emoji: '🦘',
        xp: 40,
        concept: { name: 'Events · Loops', color: '#FFAB19' },
        goal: 'Press SPACE → the cube rises then falls back to the ground',
        description:
          'Time for the first taste of jumping. We use a "repeat" loop to push the cube up, then another to bring it down. No variables yet — just movement that feels great.',
        scratchArea: 'scripts',
        previewStep: 3,
        actions: [
          { text: 'Add a new "when [space▼] key pressed" hat block from Events.', area: 'Events Palette' },
          { text: 'Wrap it with an "if" so double-jumping is blocked. From Control: "if < > then".', area: 'Control Palette' },
          { text: 'In Operators build "(y position) < (-95)". Snap it into the if diamond.', area: 'Operators Palette' },
          { text: 'Inside the if: "repeat (10)" with "change y by (12)" inside — the upward leap.', area: 'Control Palette' },
          { text: 'Below the first repeat (still inside the if): "repeat (10)" with "change y by (-12)" — the fall.', area: 'Control Palette' },
          { text: 'Click 🏁 → tap SPACE → the cube hops! 🎉', area: 'Stage' },
        ],
        blocks: [
          { text: 'when [space▼] key pressed',           cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'if ‹(y position) < (-95)› then',      cat: 'control', indent: 0, shape: 'c'     },
          { text: 'repeat (10)',                          cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change y by (12)',                     cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'end',                                  cat: 'control', indent: 1, shape: 'cap'   },
          { text: 'repeat (10)',                          cat: 'control', indent: 1, shape: 'c'     },
          { text: 'change y by (-12)',                    cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'end',                                  cat: 'control', indent: 1, shape: 'cap'   },
          { text: 'end',                                  cat: 'control', indent: 0, shape: 'cap'   },
        ],
        tip: 'The "if (y position) < (-95)" check stops mid-air double-jumping. It says "only jump if I\'m near the ground".',
        didYouKnow: 'This is a "block-based" jump — the script pauses while it runs. Step 5 will upgrade to a smarter version that never pauses, so the spike can still scroll while you jump.',
      },

      /* ── Step 5 ── */
      {
        id: 5,
        title: 'Add Gravity (Smoother Jump)',
        emoji: '🌍',
        xp: 50,
        concept: { name: 'Variables · Physics', color: '#a855f7' },
        goal: 'Replace the simple jump with a "y power" variable + gravity so the cube can jump while spikes still move',
        description:
          'The simple jump was great but it pauses the script. We need a jump that runs in parallel — so spikes can scroll smoothly. Enter the y power variable and a forever-gravity loop.',
        scratchArea: 'scripts',
        previewStep: 4,
        actions: [
          { text: 'Click "Variables" → "Make a Variable" → name it "y power" → OK.', area: 'Variables Palette' },
          { text: 'DELETE the SPACE-key script you wrote in Step 4 — we are replacing it.', area: 'Scripts Area' },
          { text: 'On the green-flag script, add "set [y power▼] to (0)" right after "go to".', area: 'Variables Palette' },
          { text: 'Add a new "forever" loop below "set size".', area: 'Control Palette' },
          { text: 'Inside forever: "change [y power▼] by (-1)" then "change y by (y power)".', area: 'Variables Palette' },
          { text: 'Also inside forever: "if (y position) < (-100) then" → "set y to (-100)" + "set [y power▼] to (0)". This is the ground.', area: 'Control Palette' },
          { text: 'Now add a NEW hat: "when [space▼] key pressed" → "if (y position) < (-95) then" → "set [y power▼] to (12)".', area: 'Events Palette' },
          { text: 'Click 🏁 → tap SPACE → smooth arcing jump that doesn\'t pause anything! 🚀', area: 'Stage' },
        ],
        blocks: [
          { text: '— inside the green-flag forever —',   cat: 'control',   indent: 0, shape: 'stack', note: true },
          { text: 'change [y power▼] by (-1)',           cat: 'variables', indent: 1, shape: 'stack' },
          { text: 'change y by (y power)',                cat: 'motion',    indent: 1, shape: 'stack' },
          { text: 'if ‹(y position) < (-100)› then',     cat: 'control',   indent: 1, shape: 'c'     },
          { text: 'set y to (-100)',                      cat: 'motion',    indent: 2, shape: 'stack' },
          { text: 'set [y power▼] to (0)',               cat: 'variables', indent: 2, shape: 'stack' },
          { text: '— separate jump script —',             cat: 'control',   indent: 0, shape: 'stack', note: true },
          { text: 'when [space▼] key pressed',            cat: 'events',    indent: 0, shape: 'hat'   },
          { text: 'if ‹(y position) < (-95)› then',      cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'set [y power▼] to (12)',              cat: 'variables', indent: 1, shape: 'stack' },
        ],
        tip: 'In Scratch, positive y = up. Setting y power to 12 launches up; gravity subtracts 1 each frame so it arcs back down naturally.',
        didYouKnow: 'Two separate scripts running at once is called "parallel programming". Real games use threads or async functions to do exactly this — input handling and physics in parallel.',
      },

      /* ── Step 6 ── */
      {
        id: 6,
        title: 'Make a Spike',
        emoji: '🔺',
        xp: 25,
        concept: { name: 'Sprites · Paint Editor', color: '#d946ef' },
        goal: 'Paint a red triangle obstacle sprite',
        description:
          'Time to add danger. Spikes are simple triangles. We paint one in the Paint Editor — small, sharp, scary.',
        scratchArea: 'costumes',
        previewStep: 5,
        actions: [
          { text: 'In the sprite panel, hover "Choose a Sprite" → click "Paint".', area: 'Sprite Panel' },
          { text: 'In Costumes, pick the Line tool with bright red and thickness 6.', area: 'Paint Editor' },
          { text: 'Draw three lines that form an upward-pointing triangle, about 40 px wide.', area: 'Paint Canvas' },
          { text: 'Use the Fill tool 🪣 to fill the inside red.', area: 'Paint Canvas' },
          { text: 'Rename the sprite "Spike".', area: 'Sprite Info' },
        ],
        blocks: [],
        tip: 'Make the spike\'s base sit on the bottom of the canvas — that way "go to y: -110" will place its base on the ground nicely.',
        didYouKnow: 'Geometry Dash uses just a few obstacle shapes — spike, block, jump-pad — repeated in patterns. Limited art + clever rhythm = endless levels.',
      },

      /* ── Step 7 ── */
      {
        id: 7,
        title: 'Spikes Scroll Left',
        emoji: '➡️',
        xp: 50,
        concept: { name: 'Motion · Loops', color: '#4C97FF' },
        goal: 'The Spike enters from the right, slides left across the screen, then reappears on the right',
        description:
          'Now we make the world move. The spike marches from right to left. When it goes off-screen it teleports back to the right edge so a new spike "appears" — endlessly.',
        scratchArea: 'scripts',
        previewStep: 6,
        actions: [
          { text: 'Click the Spike sprite, then the Code tab.', area: 'Scripts Area' },
          { text: 'Drag "when 🏁 clicked" → "go to x: (240) y: (-110)" → starts at the right edge on the ground.', area: 'Motion Palette' },
          { text: 'Add "forever" and inside it: "change x by (-6)".', area: 'Control Palette' },
          { text: 'Inside the forever (after change-x): "if (x position) < (-240) then" → "set x to (240)".', area: 'Control Palette' },
          { text: 'Click 🏁 → the spike sails left then loops back. Endless spikes!', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',                     cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'go to x: (240) y: (-110)',            cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'forever',                              cat: 'control', indent: 0, shape: 'c'     },
          { text: 'change x by (-6)',                     cat: 'motion',  indent: 1, shape: 'stack' },
          { text: 'if ‹(x position) < (-240)› then',     cat: 'control', indent: 1, shape: 'c'     },
          { text: 'set x to (240)',                       cat: 'motion',  indent: 2, shape: 'stack' },
        ],
        tip: '"change x by (-6)" is the scroll speed. Bigger negatives = faster scroll = harder game. Step 10 will make this speed grow!',
        didYouKnow: 'Auto-scrolling is the heart of every endless runner. The character never actually moves forward — the world moves past it. Same trick used in Subway Surfers and Mario.',
      },

      /* ── Step 8 ── */
      {
        id: 8,
        title: 'Game Over on Hit',
        emoji: '💥',
        xp: 50,
        concept: { name: 'Sensing · Control', color: '#5CB1D6' },
        goal: 'If the cube touches a spike, the game stops everything',
        description:
          'Without consequences a game isn\'t a game. We add collision detection: when the cube hits a spike, we stop all scripts and the action freezes.',
        scratchArea: 'scripts',
        previewStep: 7,
        actions: [
          { text: 'Click the Cube sprite. Find the green-flag forever loop (the one with gravity).', area: 'Scripts Area' },
          { text: 'Inside the forever, after the gravity blocks, add "if < > then" from Control.', area: 'Control Palette' },
          { text: 'From Sensing drag "touching [Spike▼]?" into the diamond.', area: 'Sensing Palette' },
          { text: 'Inside the if, add "say [Game Over!] for (2) secs" from Looks → then "stop [all▼]" from Control.', area: 'Control Palette' },
          { text: 'Click 🏁 → don\'t jump → wait for the spike → 💥 GAME OVER!', area: 'Stage' },
        ],
        blocks: [
          { text: '— inside cube\'s forever loop —',     cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'if ‹touching [Spike▼]?› then',         cat: 'control', indent: 1, shape: 'c'     },
          { text: 'say [Game Over!] for (2) secs',        cat: 'looks',   indent: 2, shape: 'stack' },
          { text: 'stop [all▼]',                          cat: 'control', indent: 2, shape: 'cap'   },
        ],
        tip: '"stop all" is the nuclear option — it stops every script in every sprite. Perfect for game over.',
        didYouKnow: 'In professional games this is called a "hitbox check". The CPU compares two rectangles 60 times a second to decide if you live or die.',
      },

      /* ── Step 9 ── */
      {
        id: 9,
        title: 'Score Counter',
        emoji: '🏆',
        xp: 45,
        concept: { name: 'Variables · Loops', color: '#FF8C1A' },
        goal: 'Score climbs by 1 every second you stay alive',
        description:
          'Reward the player for survival. We make a Score variable that ticks up automatically every second. Longer = higher score.',
        scratchArea: 'scripts',
        previewStep: 8,
        actions: [
          { text: 'Click Variables → "Make a Variable" → "Score" → OK. The Score readout appears top-left of the stage.', area: 'Variables Palette' },
          { text: 'On the Cube sprite, drag a NEW "when 🏁 clicked" hat.', area: 'Events Palette' },
          { text: 'Below it: "set [Score▼] to (0)".', area: 'Variables Palette' },
          { text: 'Then add "forever" → inside it: "wait (1) secs" then "change [Score▼] by (1)".', area: 'Control Palette' },
          { text: 'Click 🏁 → don\'t hit a spike → watch the score tick! 1… 2… 3…', area: 'Stage' },
        ],
        blocks: [
          { text: 'when 🏁 clicked',           cat: 'events',    indent: 0, shape: 'hat'   },
          { text: 'set [Score▼] to (0)',       cat: 'variables', indent: 0, shape: 'stack' },
          { text: 'forever',                    cat: 'control',   indent: 0, shape: 'c'     },
          { text: 'wait (1) secs',              cat: 'control',   indent: 1, shape: 'stack' },
          { text: 'change [Score▼] by (1)',    cat: 'variables', indent: 1, shape: 'stack' },
        ],
        tip: 'Adding multiple "when 🏁 clicked" scripts is fine — Scratch runs them all in parallel. Each script handles one job.',
        didYouKnow: 'A time-based score is called "survival scoring". Subway Surfers, Temple Run, and Fall Guys all use it.',
      },

      /* ── Step 10 ── */
      {
        id: 10,
        title: 'Speed Climb',
        emoji: '📈',
        xp: 75,
        concept: { name: 'Variables · Operators', color: '#FF6680' },
        goal: 'The spike scrolls faster as your Score grows — difficulty ramps up automatically',
        description:
          'The boss touch. Replace the fixed scroll speed with a formula: speed = (6 + Score / 5). Every 5 points the spike gets faster — the game gets harder the longer you live!',
        scratchArea: 'scripts',
        previewStep: 9,
        actions: [
          { text: 'Click the Spike sprite → find the forever loop with "change x by (-6)".', area: 'Scripts Area' },
          { text: 'Drag the "(-6)" number out of the block (trash it).', area: 'Scripts Area' },
          { text: 'From Operators drag the "( ) - ( )" subtraction reporter into the slot.', area: 'Operators Palette' },
          { text: 'In the first slot of subtract, drop "(0)". In the second slot drop another Operators block: "( ) + ( )".', area: 'Operators Palette' },
          { text: 'In the addition slots: 6 in the left, and "(Score) / (5)" (using the divide reporter) in the right.', area: 'Operators Palette' },
          { text: 'The final block reads: change x by ( 0 - ( 6 + (Score / 5) ) ). Click 🏁 → as Score grows, spikes get faster! 🏁', area: 'Stage' },
        ],
        blocks: [
          { text: '— replace "change x by (-6)" with —',  cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'change x by ( 0 - (6 + ((Score) / (5))) )',  cat: 'motion', indent: 1, shape: 'stack' },
        ],
        tip: 'Start the speed formula gently (6 + Score/5). If it feels too easy, try (6 + Score/3). Too hard? (6 + Score/10).',
        didYouKnow: 'This is called a "difficulty curve". Tetris speeds up every 10 lines, Pac-Man ghosts roam faster each maze, slots get tighter near jackpot. Same pattern, everywhere.',
      },

      /* ── Step 11 — Ceiling Spikes ── */
      {
        id: 11,
        title: 'Ceiling Spikes',
        emoji: '🔻',
        xp: 60,
        concept: { name: 'Sprites · Costumes', color: '#FF6680' },
        goal: 'Add a TopSpike hanging from the ceiling — don\'t jump when it\'s overhead!',
        description:
          'One spike is too easy. Duplicate the Spike sprite, flip it upside down, park it at the top. Now you must choose: jump (to clear the ground spike) or stay grounded (to avoid the ceiling spike). Strategy!',
        scratchArea: 'scripts',
        previewStep: 10,
        actions: [
          { text: 'Right-click the Spike sprite in the Sprite Panel → "duplicate". Rename the copy "TopSpike".', area: 'Sprite Panel' },
          { text: 'Click TopSpike → Costumes tab. Use the "Flip Vertical" tool ↕ to turn the triangle upside down (pointing down).', area: 'Costumes Tab' },
          { text: 'Click the Code tab. Find TopSpike\'s "go to" block — change y to (110). Now it hangs from the ceiling.', area: 'Motion Palette' },
          { text: '(Optional) Offset its timing — change the starting x to (120) instead of 240, so it appears at a different time than the ground spike.', area: 'Motion Palette' },
          { text: 'On the Cube\'s collision script, change "touching [Spike]?" to: "touching [Spike]? OR touching [TopSpike]?" using the Operators "or" block.', area: 'Sensing Palette' },
          { text: 'Click 🏁 → time your jumps! Ground spike = jump. Ceiling spike = stay down!', area: 'Stage' },
        ],
        blocks: [
          { text: '— TopSpike sprite —',                    cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'when 🏁 clicked',                        cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'go to x: (120) y: (110)',                cat: 'motion',  indent: 0, shape: 'stack' },
          { text: 'forever',                                 cat: 'control', indent: 0, shape: 'c'     },
          { text: 'change x by ( 0 - (6 + ((Score) / (5))) )', cat: 'motion', indent: 1, shape: 'stack' },
          { text: 'if ‹(x position) < (-240)› then',        cat: 'control', indent: 1, shape: 'c'     },
          { text: 'set x to (240)',                          cat: 'motion',  indent: 2, shape: 'stack' },
          { text: '— Cube collision update —',              cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'if ‹‹touching [Spike▼]?› or ‹touching [TopSpike▼]?›› then', cat: 'control', indent: 0, shape: 'c' },
          { text: 'stop [all▼]',                             cat: 'control', indent: 1, shape: 'cap'   },
        ],
        tip: 'Make sure the TopSpike\'s starting x is DIFFERENT from the ground Spike (try 120 vs 240) — otherwise both arrive together and the game becomes unfair.',
        didYouKnow: 'Geometry Dash uses "fly-through-gap" sections that mix ground and ceiling hazards — same principle. The strategy of "two threats, pick one" is core to action-game design.',
      },

      /* ── Step 12 — Spike Costume Variety ── */
      {
        id: 12,
        title: 'Spike Costume Variety',
        emoji: '🎨',
        xp: 55,
        concept: { name: 'Looks · Operators', color: '#9966FF' },
        goal: 'Give the Spike 3 different looks; each time it respawns, pick a random costume',
        description:
          'Endless games feel fresh when art changes. Paint 3 spike costumes — red triangle, purple saw, golden lightning. When the spike resets to the right edge, it picks a random costume — so every pass looks new.',
        scratchArea: 'costumes',
        previewStep: 11,
        actions: [
          { text: 'Click the Spike sprite → Costumes tab. Right-click the costume → duplicate. You now have "spike1" and "spike2".', area: 'Costumes Tab' },
          { text: 'On spike2, use the Fill tool to change the colour to purple. Add tiny zig-zag spikes around the edge.', area: 'Paint Editor' },
          { text: 'Duplicate again → spike3. Change colour to gold. Replace the triangle shape with a lightning bolt or star.', area: 'Paint Editor' },
          { text: 'Click the Code tab. Find the "if (x position) < (-240)" block (the respawn check).', area: 'Scripts Area' },
          { text: 'Inside that if (after "set x to (240)"), add "switch costume to (pick random 1 to 3)" — from Looks + Operators.', area: 'Looks Palette' },
          { text: 'Click 🏁 → every time a spike loops back, it has a new look! Endless visual variety.', area: 'Stage' },
        ],
        blocks: [
          { text: '— inside Spike\'s forever loop —',         cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'if ‹(x position) < (-240)› then',          cat: 'control', indent: 1, shape: 'c'     },
          { text: 'set x to (240)',                            cat: 'motion',  indent: 2, shape: 'stack' },
          { text: 'switch costume to (pick random (1) to (3))', cat: 'looks',   indent: 2, shape: 'stack' },
          { text: 'end',                                       cat: 'control', indent: 1, shape: 'cap'   },
        ],
        tip: 'Costume numbers are 1-based. "pick random 1 to 3" picks 1, 2, or 3 — matching your 3 painted spikes.',
        didYouKnow: 'Game artists call this "asset variation" — same shape, many skins. Subway Surfers, Crossy Road, even Among Us all randomise visuals from a small art library.',
      },

      /* ── Step 13 — Scene Cycle ── */
      {
        id: 13,
        title: 'Scene Cycle',
        emoji: '🌌',
        xp: 70,
        concept: { name: 'Looks · Backdrops', color: '#5CB1D6' },
        goal: 'Add 3 backdrops; the scene rotates every 10 seconds — your world keeps changing',
        description:
          'A long run feels longer when the world stays the same. We add 3 backdrops (night → forest → lava) and a script that auto-switches to the next one every 10 seconds. Now every run feels like a journey.',
        scratchArea: 'backdrops',
        previewStep: 12,
        actions: [
          { text: 'Hover over the Backdrop thumbnail (bottom-right) → click "Choose a Backdrop" → pick "Forest".', area: 'Backdrop Library' },
          { text: 'Repeat → search "Volcano" or "Underwater" → add a third backdrop.', area: 'Backdrop Library' },
          { text: 'Click the Stage thumbnail itself (bottom-right) to select it. Click the Code tab.', area: 'Scripts Area' },
          { text: 'Drag a NEW "when 🏁 clicked" hat block onto the Stage.', area: 'Events Palette' },
          { text: 'Below it: from Looks add "switch backdrop to (Stars▼)" — set it to your first dark backdrop.', area: 'Looks Palette' },
          { text: 'Add "forever" → inside: "wait (10) secs" then "next backdrop". 🏁 → watch the world cycle every 10 seconds!', area: 'Control Palette' },
        ],
        blocks: [
          { text: '— Stage script (click Stage thumbnail) —',  cat: 'control', indent: 0, shape: 'stack', note: true },
          { text: 'when 🏁 clicked',                            cat: 'events',  indent: 0, shape: 'hat'   },
          { text: 'switch backdrop to (Stars▼)',               cat: 'looks',   indent: 0, shape: 'stack' },
          { text: 'forever',                                    cat: 'control', indent: 0, shape: 'c'     },
          { text: 'wait (10) secs',                             cat: 'control', indent: 1, shape: 'stack' },
          { text: 'next backdrop',                              cat: 'looks',   indent: 1, shape: 'stack' },
        ],
        tip: 'Want scenes tied to score instead of time? Replace "wait (10) secs" with: "wait until <(Score) mod (5) = (0)>" — every 5 points the scene advances.',
        didYouKnow: 'In big games this is called "biome cycling" — Minecraft has biomes, Geometry Dash has level themes, Super Mario Galaxy has galaxies. Variety keeps the player engaged for hours.',
      },
    ],
  },
]
