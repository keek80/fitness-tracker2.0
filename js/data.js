// ========== TRAINING PROGRAM DATA (Default Template) ==========
// 5-Day Push / Pull / Legs Split
const DEFAULT_TRAINING_PROGRAM = {
    days: [
        {
            id: 'push_a',
            name: 'Push A',
            dayOfWeek: 'Monday',
            color: '#e94560',
            exercises: [
                { name: 'Barbell Bench Press', sets: 3, repsTarget: '8-12', rest: '120s', notes: 'Control the negative (3 sec down)' },
                { name: 'Incline Dumbbell Press', sets: 3, repsTarget: '10-12', rest: '90s', notes: 'Focus on upper chest contraction' },
                { name: 'Seated Machine Shoulder Press', sets: 3, repsTarget: '10-15', rest: '90s', notes: 'Keep shoulder blades down and back' },
                { name: 'Dumbbell Lateral Raises', sets: 3, repsTarget: '12-15', rest: '60s', notes: 'Light weight, strict form for side delts' },
                { name: 'Cable Tricep Pushdowns (Rope)', sets: 3, repsTarget: '12-15', rest: '60s', notes: 'Keep elbows pinned, squeeze at bottom' },
                { name: 'Overhead Cable Tricep Extension', sets: 3, repsTarget: '10-12', rest: '60s', notes: 'Full stretch at top' },
                { name: 'Seated Abdominal Crunch Machine', sets: 3, repsTarget: '12-15', rest: '45s', notes: '🎯 CORE FINISHER — Focus on spinal flexion, control the eccentric' }
            ]
        },
        {
            id: 'pull_a',
            name: 'Pull A',
            dayOfWeek: 'Tuesday',
            color: '#0095ff',
            exercises: [
                { name: 'Lat Pulldown (Wide Grip)', sets: 3, repsTarget: '8-12', rest: '120s', notes: 'Pull to upper chest, squeeze lats at bottom' },
                { name: 'Seated Cable Rows (Close Grip)', sets: 3, repsTarget: '10-12', rest: '90s', notes: 'Pull to lower abs, squeeze shoulder blades' },
                { name: 'Machine Pec Deck Reverse Fly', sets: 3, repsTarget: '12-15', rest: '60s', notes: 'Focus on rear delts, slow and controlled' },
                { name: 'Barbell Bicep Curls', sets: 3, repsTarget: '10-12', rest: '60s', notes: 'Keep elbows tucked, avoid swinging' },
                { name: 'Machine Preacher Curls', sets: 3, repsTarget: '12-15', rest: '60s', notes: 'Isolate biceps, focus on peak contraction' },
                { name: 'Cable Wood Chop High-to-Low (Both Sides)', sets: 3, repsTarget: '10-12/side', rest: '60s', notes: '🎯 CORE FINISHER — Weak side first. Rotate torso, pivot hips, control the return. Complete all reps L then R before resting' }
            ]
        },
        {
            id: 'legs',
            name: 'Legs',
            dayOfWeek: 'Wednesday',
            color: '#00d68f',
            exercises: [
                { name: 'Leg Press Machine', sets: 4, repsTarget: '8-12', rest: '120s', notes: "Feet shoulder-width, don't lock knees" },
                { name: 'Romanian Deadlift (DB/Barbell)', sets: 3, repsTarget: '10-12', rest: '90s', notes: 'Hinge at hips, slight knee bend, feel hamstring stretch' },
                { name: 'Leg Extension Machine', sets: 3, repsTarget: '12-15', rest: '90s', notes: 'Squeeze quads hard at the top' },
                { name: 'Leg Curl Machine (Seated/Lying)', sets: 3, repsTarget: '12-15', rest: '90s', notes: 'Slow and controlled negative' },
                { name: 'Standing Calf Raises Machine', sets: 3, repsTarget: '15-20', rest: '45s', notes: 'Full range of motion, pause 1 sec at top and bottom' },
                { name: 'Cable Pull-Through', sets: 3, repsTarget: '15-20', rest: '60s', notes: 'Stand facing away from low cable pulley, hinge at hips, drive hips forward and squeeze glutes. Keep a flat back throughout' },
                { name: 'Kneeling Cable Anti-Extension', sets: 3, repsTarget: '10-15', rest: '45s', notes: '🎯 CORE FINISHER — Resist arching lower back, maintain straight torso throughout' }
            ]
        },
        {
            id: 'push_b',
            name: 'Push B',
            dayOfWeek: 'Thursday',
            color: '#ffaa00',
            exercises: [
                { name: 'Dumbbell Bench Press', sets: 3, repsTarget: '10-12', rest: '120s', notes: 'Focus on stability and full stretch at bottom' },
                { name: 'Pec Deck Fly Machine', sets: 3, repsTarget: '12-15', rest: '60s', notes: 'Squeeze chest hard at peak contraction' },
                { name: 'Seated Overhead Dumbbell Press', sets: 3, repsTarget: '8-12', rest: '90s', notes: 'Control descent, avoid locking out elbows' },
                { name: 'Cable Lateral Raises', sets: 3, repsTarget: '12-15', rest: '60s', notes: 'Constant cable tension for side delts' },
                { name: 'Close-Grip Bench Press (Smith Machine)', sets: 3, repsTarget: '8-12', rest: '90s', notes: 'Emphasize triceps, elbows close to body' },
                { name: 'Machine Dips', sets: 3, repsTarget: '10-15', rest: '60s', notes: 'Lean forward for chest, upright for triceps' },
                { name: 'Machine Oblique Crunch (Both Sides)', sets: 3, repsTarget: '12-15/side', rest: '45s', notes: '🎯 CORE FINISHER — Weak side first. Focus on side contraction. Complete all reps L then R before resting' }
            ]
        },
        {
            id: 'pull_b',
            name: 'Pull B',
            dayOfWeek: 'Friday',
            color: '#a855f7',
            exercises: [
                { name: 'Barbell Rows (Bent-Over)', sets: 3, repsTarget: '8-12', rest: '120s', notes: 'Maintain flat back, pull to lower chest' },
                { name: 'Assisted Pull-Up Machine', sets: 3, repsTarget: '8-12', rest: '90s', notes: 'Use assistance to hit target reps, full stretch at bottom' },
                { name: 'Straight Arm Pulldowns (Cable)', sets: 3, repsTarget: '12-15', rest: '60s', notes: 'Isolate lats, keep arms straight throughout' },
                { name: 'Dumbbell Hammer Curls', sets: 3, repsTarget: '10-12', rest: '60s', notes: 'Thumb up grip, targets brachialis and forearms' },
                { name: 'Reverse Grip Cable Curls', sets: 3, repsTarget: '12-15', rest: '60s', notes: 'Targets brachialis and forearm flexors' },
                { name: 'Cable Wood Chop Low-to-High (Both Sides)', sets: 3, repsTarget: '10-12/side', rest: '60s', notes: '🎯 CORE FINISHER — Variation: start low, pull diagonally upward. Weak side first. Complete all reps L then R before resting' }
            ]
        }
    ]
};

// Backward compatibility alias
const TRAINING_PROGRAM = DEFAULT_TRAINING_PROGRAM;

// ========== DYNAMIC TRAINING PROGRAM ==========
function getTrainingProgram() {
    try {
        const custom = localStorage.getItem('flt_custom_program');
        if (custom) {
            const parsed = JSON.parse(custom);
            if (parsed && parsed.days && parsed.days.length > 0) return parsed;
        }
    } catch (e) { console.warn('Error loading custom program:', e); }
    return DEFAULT_TRAINING_PROGRAM;
}

function saveTrainingProgram(program) {
    try {
        localStorage.setItem('flt_custom_program', JSON.stringify(program));
        if (typeof SupabaseSync !== 'undefined') SupabaseSync.customProgram(program);
    } catch (e) { console.error('Error saving custom program:', e); }
}

function resetTrainingProgram() {
    localStorage.removeItem('flt_custom_program');
    if (typeof SupabaseSync !== 'undefined') SupabaseSync.deleteCustomProgram();
}

function isCustomProgram() {
    return localStorage.getItem('flt_custom_program') !== null;
}

// ========== MEAL PLAN DATA ==========
const MEAL_PLAN = {
    dailyTargets: { calories: 2500, protein: 250, carbs: 150, fat: 75 },
    dailyActual: { calories: 2126, protein: 217, carbs: 155, fat: 74, fiber: 32, sugar: 30 },
    meals: [
        {
            id: 'meal1',
            name: 'Meal 1 — Protein Coffee Shake',
            emoji: '☕',
            time: 'Morning',
            calories: 230, protein: 29, carbs: 6, fat: 9.5,
            items: ['1 scoop Colossal Labs Whey', '8-12 oz brewed coffee', '1 tbsp natural peanut butter'],
            tip: 'Blend into cooled coffee or shake with ice for a "proffee."'
        },
        {
            id: 'meal2',
            name: 'Meal 2 — Turkey Breakfast Burrito',
            emoji: '🌯',
            time: 'Mid-Morning',
            calories: 506, protein: 46, carbs: 39, fat: 17.5,
            items: ['4 oz lean ground turkey (93/7)', '4 scrambled egg whites', '1 whole wheat tortilla (10")', '¼ diced avocado', '¼ cup diced tomatoes', '2 tbsp nonfat Greek yogurt', 'Salsa (2 tbsp)'],
            tip: 'Pre-roll and wrap in foil — refrigerate up to 3 days.'
        },
        {
            id: 'meal3',
            name: 'Meal 3 — Protein Coffee #2',
            emoji: '☕',
            time: 'Afternoon',
            calories: 135, protein: 25, carbs: 3, fat: 1.5,
            items: ['1 scoop Colossal Labs Whey', '8-12 oz brewed coffee'],
            tip: 'Consider decaf later in the day to protect sleep.'
        },
        {
            id: 'meal4',
            name: 'Meal 4 — Turkey Power Burrito',
            emoji: '🌯',
            time: 'Mid-Afternoon',
            calories: 560, protein: 43, carbs: 59, fat: 18.7,
            items: ['4 oz lean ground turkey', '1 whole wheat tortilla (10")', '½ cup corn kernels', '¼ avocado, sliced', '½ cup diced tomatoes', '1 cup salad greens', '100g nonfat Greek yogurt', 'Hot sauce / lime juice'],
            tip: 'Add ½ cup black beans for +8g protein and +7g fiber.'
        },
        {
            id: 'meal5',
            name: 'Meal 5 — Turkey & Avocado Wrap',
            emoji: '🥗',
            time: 'Dinner',
            calories: 395, protein: 41, carbs: 26, fat: 16.2,
            items: ['4 oz lean ground turkey', '1 low-carb tortilla (8")', '½ cup diced tomatoes', '1 cup salad greens', '½ avocado', '100g nonfat Greek yogurt', 'Seasonings'],
            tip: 'Swap turkey for salmon 2x/week for Omega-3s.'
        },
        {
            id: 'meal6',
            name: 'Meal 6 — Protein Brownie Mug Cake',
            emoji: '🍫',
            time: 'Dessert',
            calories: 300, protein: 33, carbs: 22, fat: 11,
            items: ['1 scoop chocolate protein powder', '1 tbsp cocoa powder', '½ banana, mashed', '1 tbsp almond butter', '1 egg white', 'Baking powder + vanilla'],
            tip: 'Microwave 60-90 seconds — tastes like a warm brownie!'
        }
    ]
};

// ========== CLIENT PROFILE ==========
const CLIENT_PROFILE = {
    height: "6'0\" (183 cm)",
    startWeight: 385,
    goalWeight: 250,
    totalToLose: 135,
    weeklyRateLoss: 1.5,
    timelineMonths: '18-24',
    bmr: 2800,
    tdee: 3360,
    deficit: 0.25
};

// ========== MILESTONES ==========
const MILESTONES = [
    { name: 'Start', weight: 385, month: 0 },
    { name: 'Phase 1 Start', weight: 355, month: 4 },
    { name: 'Phase 2 Start', weight: 320, month: 8 },
    { name: 'Phase 3 Start', weight: 285, month: 13 },
    { name: 'Goal!', weight: 250, month: 20 }
];

// ========== PHASE PROGRESSION ==========
const PHASES = [
    { phase: 1, range: '385-345 lbs', focus: 'Machines & dumbbells, learn movements, build base' },
    { phase: 2, range: '345-310 lbs', focus: 'Introduce barbell movements, increase intensity' },
    { phase: 3, range: '310-275 lbs', focus: 'Push/Pull/Legs split option, add compound lifts' },
    { phase: 4, range: '275-250 lbs', focus: 'Advanced programming, periodization' }
];

// ========== COLOR PALETTE FOR CUSTOM DAYS ==========
const DAY_COLORS = [
    '#0095ff', '#00d68f', '#ffaa00', '#a855f7',
    '#e94560', '#06b6d4', '#f97316', '#ec4899',
    '#14b8a6', '#8b5cf6', '#ef4444', '#22c55e'
];

// ========== EXERCISE DATABASE ==========
const EXERCISE_DATABASE = [
    // ── CHEST ──
    { name: 'Barbell Bench Press',            category: 'Chest',       equipment: 'Barbell',    notes: 'Control the negative (3 sec down), retract shoulder blades' },
    { name: 'Dumbbell Bench Press',           category: 'Chest',       equipment: 'Dumbbell',   notes: 'Full stretch at bottom, squeeze chest at top' },
    { name: 'Incline Barbell Press',          category: 'Chest',       equipment: 'Barbell',    notes: '30-45° incline, focus on upper chest' },
    { name: 'Incline Dumbbell Press',         category: 'Chest',       equipment: 'Dumbbell',   notes: '30° incline angle, focus on upper chest contraction' },
    { name: 'Decline Barbell Press',          category: 'Chest',       equipment: 'Barbell',    notes: 'Targets lower chest, keep feet locked in' },
    { name: 'Chest Press Machine',            category: 'Chest',       equipment: 'Machine',    notes: 'Control the negative (3 sec down)' },
    { name: 'Incline Chest Press Machine',    category: 'Chest',       equipment: 'Machine',    notes: 'Focus on upper chest, pause at contraction' },
    { name: 'Pec Deck Fly Machine',           category: 'Chest',       equipment: 'Machine',    notes: 'Squeeze chest hard at peak contraction, slow return' },
    { name: 'Cable Chest Fly (High-to-Low)',  category: 'Chest',       equipment: 'Cable',      notes: 'Arms slightly bent, focus on chest stretch and contraction' },
    { name: 'Cable Chest Fly (Low-to-High)',  category: 'Chest',       equipment: 'Cable',      notes: 'Targets upper chest, squeeze at top' },
    { name: 'Dumbbell Chest Fly',             category: 'Chest',       equipment: 'Dumbbell',   notes: 'Slight bend in elbows, feel the stretch, squeeze at top' },
    { name: 'Push-Ups',                       category: 'Chest',       equipment: 'Bodyweight', notes: 'Keep core tight, full range of motion' },
    { name: 'Smith Machine Bench Press',      category: 'Chest',       equipment: 'Machine',    notes: 'Controlled movement, good for beginners' },
    { name: 'Machine Dips',                   category: 'Chest',       equipment: 'Machine',    notes: 'Lean forward for chest emphasis, upright for triceps' },
    { name: 'Svend Press',                    category: 'Chest',       equipment: 'Bodyweight', notes: 'Press hands together at chest level, squeeze hard' },
    { name: 'Smith Machine Incline Bench Press', category: 'Chest', equipment: 'Smith Machine', notes: 'Set bench at 30-45°, lower to upper chest, drive straight up' },
    { name: 'Smith Machine Decline Press', category: 'Chest', equipment: 'Smith Machine', notes: 'Lower chest emphasis, control the eccentric' },
    { name: 'Cable Chest Press (Standing)', category: 'Chest', equipment: 'Cable', notes: 'Standing press, keep core braced and press inward' },
    { name: 'Single-Arm Cable Chest Press', category: 'Chest', equipment: 'Cable', notes: 'Unilateral pressing, great for anti-rotation stability' },
    { name: 'Cable Fly (Low to High)', category: 'Chest', equipment: 'Cable', notes: 'Targets upper chest, bring handles up and inward' },
    { name: 'Cable Fly (High to Low)', category: 'Chest', equipment: 'Cable', notes: 'Targets lower chest, pull down and inward' },
    { name: 'Cable Press-Around', category: 'Chest', equipment: 'Cable', notes: 'Arc arm across body for shortened-position chest work' },
    { name: 'Decline Dumbbell Press',         category: 'Chest',       equipment: 'Dumbbell',   notes: 'Targets lower chest, full stretch at bottom' },
    { name: 'Incline Smith Machine Press',    category: 'Chest',       equipment: 'Machine',    notes: 'Upper chest focus with guided path' },
    { name: 'Cable Crossover (High to Low)',  category: 'Chest',       equipment: 'Cable',      notes: 'Constant tension, cross hands at bottom' },
    { name: 'Cable Crossover (Low to High)',  category: 'Chest',       equipment: 'Cable',      notes: 'Upper chest emphasis' },
    { name: 'Dumbbell Pullover',              category: 'Chest',       equipment: 'Dumbbell',   notes: 'Lying on bench, stretch lats/chest at bottom' },
    { name: 'Floor Press (Barbell or DB)',    category: 'Chest',       equipment: 'Dumbbell',   notes: 'Limited range, heavy tricep + chest work' },
    { name: 'Guillotine Press',               category: 'Chest',       equipment: 'Barbell',    notes: 'Wide grip to neck level — advanced upper chest' },
    { name: 'Hex Press (Svend Variation)',    category: 'Chest',       equipment: 'Dumbbell',   notes: 'Dumbbells pressed together, constant inner chest squeeze' },
    { name: 'Incline Push-Ups',               category: 'Chest',       equipment: 'Bodyweight', notes: 'Hands elevated — easier variation' },
    { name: 'Decline Push-Ups',               category: 'Chest',       equipment: 'Bodyweight', notes: 'Feet elevated — harder variation' },
    { name: 'Chest Dips (Weighted)',          category: 'Chest',       equipment: 'Bodyweight', notes: 'Lean forward, full range' },
    { name: 'Pec Deck Fly (Single Arm)',      category: 'Chest',       equipment: 'Machine',    notes: 'Unilateral for imbalances' },
    { name: 'Resistance Band Chest Fly',      category: 'Chest',       equipment: 'Band',       notes: 'Home-friendly constant tension' },
    { name: 'Landmine Chest Press',           category: 'Chest',       equipment: 'Barbell',    notes: 'Unilateral or bilateral pressing' },
    { name: 'Deficit Push-Ups',               category: 'Chest',       equipment: 'Bodyweight', notes: 'Hands on elevated surfaces for deeper stretch' },

    // ── BACK ──
    { name: 'Barbell Rows (Bent-Over)',       category: 'Back',        equipment: 'Barbell',    notes: 'Maintain flat back, pull to lower chest' },
    { name: 'Lat Pulldown (Wide Grip)',       category: 'Back',        equipment: 'Cable',      notes: 'Pull to upper chest, squeeze lats at bottom' },
    { name: 'Lat Pulldown (Close Grip)',      category: 'Back',        equipment: 'Cable',      notes: 'Full stretch at top, squeeze at bottom' },
    { name: 'Lat Pulldown (Underhand)',       category: 'Back',        equipment: 'Cable',      notes: 'Supinated grip targets lower lats more' },
    { name: 'Seated Cable Rows (Close Grip)', category: 'Back',        equipment: 'Cable',      notes: 'Pull to lower abs, squeeze shoulder blades' },
    { name: 'Seated Cable Rows (Wide Grip)',  category: 'Back',        equipment: 'Cable',      notes: 'Pull to upper abs, elbows flared out' },
    { name: 'Straight Arm Pulldowns (Cable)', category: 'Back',        equipment: 'Cable',      notes: 'Isolate lats, keep arms straight throughout' },
    { name: 'Assisted Pull-Up Machine',       category: 'Back',        equipment: 'Machine',    notes: 'Use assistance to hit target reps, full stretch at bottom' },
    { name: 'Chest-Supported Row Machine',    category: 'Back',        equipment: 'Machine',    notes: 'Chest on pad removes lower back stress' },
    { name: 'T-Bar Row',                      category: 'Back',        equipment: 'Barbell',    notes: 'Keep chest on pad or brace core, squeeze at contraction' },
    { name: 'Single Arm Dumbbell Row',        category: 'Back',        equipment: 'Dumbbell',   notes: 'Pull elbow to hip, full range of motion' },
    { name: 'Back Extension Machine',         category: 'Back',        equipment: 'Machine',    notes: 'Focus on lower back contraction at top' },
    { name: 'Hyperextensions (45°)',          category: 'Back',        equipment: 'Bodyweight', notes: 'Hinge at hips, squeeze glutes at top' },
    { name: 'Plate Loaded Row',               category: 'Back',        equipment: 'Machine',    notes: 'Chest-supported or T-bar style plate loaded row' },
    { name: 'Plate Loaded Pulldown Machine',  category: 'Back',        equipment: 'Machine',    notes: 'Neutral or wide grip — full stretch at top' },
    { name: 'Pull-Ups (Wide Grip)',           category: 'Back',        equipment: 'Bodyweight', notes: 'Full range, pull chest to bar if possible; use assistance if needed' },
    { name: 'Chin-Ups (Supinated Grip)',      category: 'Back',        equipment: 'Bodyweight', notes: 'Underhand grip, emphasizes lower lats and biceps' },
    { name: 'Neutral Grip Pull-Ups',          category: 'Back',        equipment: 'Machine',    notes: 'Palms facing each other — joint friendly' },
    { name: 'Bent-Over Dumbbell Rows',        category: 'Back',        equipment: 'Dumbbell',   notes: 'Both arms or single-arm supported on bench' },
    { name: 'Pendlay Rows',                   category: 'Back',        equipment: 'Barbell',    notes: 'Reset bar on floor each rep, explosive pull' },
    { name: 'Seal Rows',                      category: 'Back',        equipment: 'Dumbbell',   notes: 'Lying face down on elevated bench — strict form' },
    { name: 'Meadows Rows',                   category: 'Back',        equipment: 'Barbell',    notes: 'Single-arm landmine-style row' },
    { name: 'Cable Face Pulls',               category: 'Back',        equipment: 'Cable',      notes: 'Rear delts + upper back, high pulley' },
    { name: 'Inverted Rows',                  category: 'Back',        equipment: 'Bodyweight', notes: 'Under a bar or rings, pull chest up' },
    { name: 'Single-Arm Cable Rows',          category: 'Back',        equipment: 'Cable',      notes: 'Seated or standing, focus on one side' },
    { name: 'Dumbbell Pullovers',             category: 'Back',        equipment: 'Dumbbell',   notes: 'Lying on bench, stretch lats at bottom' },
    { name: 'Rack Pulls',                     category: 'Back',        equipment: 'Barbell',    notes: 'Partial deadlift from knee height — heavy upper back focus' },
    { name: 'Deadlift (Conventional)',        category: 'Back',        equipment: 'Barbell',    notes: 'Full body, maintain neutral spine' },
    { name: 'Romanian Deadlift',              category: 'Back',        equipment: 'Barbell',    notes: 'Hamstring and lower back emphasis' },
    { name: 'Good Mornings',                  category: 'Back',        equipment: 'Barbell',    notes: 'Hinge at hips with light bar on back' },
    { name: 'Band Pull-Aparts',               category: 'Back',        equipment: 'Band',       notes: 'Great for upper back posture and warm-up' },
    { name: 'Y-T-I Raises (Prone)',           category: 'Back',        equipment: 'Bodyweight', notes: 'Lying face down, form letters Y-T-I for rear delts/upper back' },
    { name: 'Cable Seated Rows (Neutral Grip)', category: 'Back',      equipment: 'Cable',      notes: 'V-bar or rope grip' },
    { name: 'Lat-Focused Pulldowns (Narrow Grip)', category: 'Back',  equipment: 'Cable',      notes: 'Emphasize lat stretch and contraction' },
    { name: 'Machine Low Row',                category: 'Back',        equipment: 'Machine',    notes: 'Chest supported variation' },
    { name: 'Farmer\'s Carry',                category: 'Back',        equipment: 'Dumbbell',   notes: 'Heavy walks for grip and upper back endurance' },
    { name: 'Trap Bar Deadlift',              category: 'Back',        equipment: 'Trap Bar',   notes: 'More quad-friendly deadlift variation' },
    { name: 'Smith Machine Bent-Over Row',    category: 'Back', equipment: 'Smith Machine', notes: 'Brace core and pull bar toward lower abs' },
    { name: 'Cable Pullover', category: 'Back', equipment: 'Cable', notes: 'Lat-focused movement, pull in an arc' },
    { name: 'Half-Kneeling Single-Arm Pulldown', category: 'Back', equipment: 'Cable', notes: 'Drive elbow down, excellent unilateral lat work' },
    { name: 'Cable High Row', category: 'Back', equipment: 'Cable', notes: 'Pull high toward face/upper chest for rear delts and upper back' },
    { name: 'Cable Low Row', category: 'Back', equipment: 'Cable', notes: 'Pull toward lower torso, focus on contraction' },

    // ── TRAPS ──
    { name: 'Dumbbell Shrugs',                category: 'Traps',   equipment: 'Dumbbell',   notes: 'Traps + upper shoulders, hold squeeze at top' },
    { name: 'Cable Y-Raise',                  category: 'Traps', equipment: 'Cable', notes: 'Great for upper traps and shoulder stability' },
    { name: 'Barbell Shrugs',                 category: 'Traps',        equipment: 'Dumbbell',   notes: 'Traps and upper back, hold squeeze at top' },
    { name: 'Smith Machine Shrugs',           category: 'Traps',       equipment: 'Smith Machine', notes: 'Guided heavy shrugs' },
    { name: 'Face Pulls (Cable)',             category: 'Traps',       equipment: 'Cable',      notes: 'Upper traps + rear delts' },

    // ── SHOULDERS ──
    { name: 'Seated Machine Shoulder Press',  category: 'Shoulders',   equipment: 'Machine',    notes: 'Keep shoulder blades down and back' },
    { name: 'Seated Overhead Dumbbell Press', category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Control descent, avoid locking out elbows' },
    { name: 'Barbell Overhead Press',         category: 'Shoulders',   equipment: 'Barbell',    notes: 'Brace core, press straight up' },
    { name: 'Arnold Press',                   category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Rotate palms outward as you press up' },
    { name: 'Dumbbell Lateral Raises',        category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Light weight, strict form for side delts' },
    { name: 'Cable Lateral Raises',           category: 'Shoulders',   equipment: 'Cable',      notes: 'Constant cable tension for side delts' },
    { name: 'Machine Lateral Raises',         category: 'Shoulders',   equipment: 'Machine',    notes: 'Consistent tension, control the eccentric' },
    { name: 'Face Pulls (Cable)',             category: 'Shoulders',   equipment: 'Cable',      notes: 'Pull to face level, rear delts and external rotation' },
    { name: 'Rear Delt Fly Machine',          category: 'Shoulders',   equipment: 'Machine',    notes: 'Focus on rear delts, slow and controlled' },
    { name: 'Dumbbell Front Raises',          category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Raise to shoulder height, control the descent' },
    { name: 'Standing Dumbbell Shoulder Press', category: 'Shoulders', equipment: 'Dumbbell',   notes: 'More core engagement, press overhead with control' },
    { name: 'Single-Arm Dumbbell Shoulder Press', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Seated or standing, alternate arms or focus on one side' },
    { name: 'Landmine Press',                 category: 'Shoulders',   equipment: 'Barbell',    notes: 'Unilateral, great for shoulder stability' },
    { name: 'Z-Press',                        category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Seated on floor with no back support — advanced core + shoulder' },
    { name: 'Pike Push-Ups',                  category: 'Shoulders',   equipment: 'Bodyweight', notes: 'Elevate feet for more difficulty, hips high' },
    { name: 'Leaning Lateral Raises',         category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Lean away from working side for better range' },
    { name: 'Y-Raises (Scaption)',            category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Thumbs up, 45-degree angle — rotator cuff friendly' },
    { name: 'Band Lateral Raises',            category: 'Shoulders',   equipment: 'Band',       notes: 'Constant tension, excellent for warm-up or home' },
    { name: 'Dumbbell Rear Delt Fly',         category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Bent-over or prone on incline bench, squeeze at top' },
    { name: 'Cable Rear Delt Fly',            category: 'Shoulders',   equipment: 'Cable',      notes: 'High pulley crossover or rear fly motion' },
    { name: 'Band Pull-Aparts',               category: 'Shoulders',   equipment: 'Band',       notes: 'Excellent rear delt / posture exercise' },
    { name: 'Bent-Over Rear Delt Rows',       category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Elbows high, pull like a wide row' },
    { name: 'Dumbbell Upright Rows',          category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Elbows lead, keep below shoulder height' },
    { name: 'Cable Front Raises',             category: 'Shoulders',   equipment: 'Cable',      notes: 'Single or dual arm, controlled movement' },
    { name: 'Incline Dumbbell Front Raises',  category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Lying on incline bench for support' },
    { name: 'Farmer\'s Carry',                category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Heavy DBs, walk with strong posture and shoulder stability' },
    { name: 'Dumbbell Overhead Carry',        category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'One or two arms overhead while walking' },
    { name: 'Dumbbell Halo',                  category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Circle around head for mobility and stability' },
    { name: 'Band Overhead Pull-Aparts',      category: 'Shoulders',   equipment: 'Band',       notes: 'External rotation and shoulder mobility' },
    { name: 'Wall Angels',                    category: 'Shoulders',   equipment: 'Bodyweight', notes: 'Back against wall, slide arms up and down for mobility' },
    { name: 'Machine Pec Deck Reverse Fly',   category: 'Shoulders',   equipment: 'Machine',    notes: 'Rear delt focus (already in program but good to keep)' },
    { name: 'Egyptian Lateral Raises',        category: 'Shoulders',   equipment: 'Cable',      notes: 'Lean into cable for stretch (already partially covered)' },
    { name: 'Smith Machine Upright Row',      category: 'Shoulders', equipment: 'Smith Machine', notes: 'Pull elbows high, lead with elbows, avoid excessive height' },
    { name: 'Cable Lateral Raise',            category: 'Shoulders', equipment: 'Cable', notes: 'Constant tension, raise with control' },
    { name: 'Cable Front Raise',              category: 'Shoulders', equipment: 'Cable', notes: 'Lift forward smoothly without swinging' },
    { name: 'Smith Machine Seated Overhead Press', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Use bench support, press straight up with control' },
    { name: 'Smith Machine Standing Overhead Press', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Brace core and keep bar path vertical' },
    { name: 'Smith Machine High Incline Press', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Bench at high incline to bias front delts' },
    { name: 'Smith Machine Front Raise', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Raise bar to shoulder height with controlled tempo' },
    { name: 'Smith Machine Wide-Grip Upright Row', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Wider grip can bias side delts more than a narrow grip' },


    // ── BICEPS ──
    { name: 'Barbell Bicep Curls',            category: 'Biceps',      equipment: 'Barbell',    notes: 'Keep elbows tucked, avoid swinging' },
    { name: 'Dumbbell Bicep Curls',           category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Alternate arms or together, full range' },
    { name: 'Dumbbell Hammer Curls',          category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Thumb up grip, targets brachialis and forearms' },
    { name: 'Machine Preacher Curls',         category: 'Biceps',      equipment: 'Machine',    notes: 'Isolate biceps, focus on peak contraction' },
    { name: 'Cable Bicep Curls',              category: 'Biceps',      equipment: 'Cable',      notes: 'Constant tension throughout, squeeze at top' },
    { name: 'Concentration Curls',            category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Elbow on thigh, full squeeze at top' },
    { name: 'Incline Dumbbell Curls',         category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Full stretch at bottom, great for peak' },
    { name: 'EZ-Bar Bicep Curls',             category: 'Biceps',      equipment: 'Barbell',    notes: 'EZ grip reduces wrist strain' },
    { name: 'Preacher Barbell Curls',         category: 'Biceps',      equipment: 'Barbell',    notes: 'Strict form on preacher bench' },
    { name: 'Cable Hammer Curls (Rope)',      category: 'Biceps',      equipment: 'Cable',      notes: 'Neutral grip for brachialis' },
    { name: 'Spider Curls',                   category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Lying face down on incline bench' },
    { name: '21s (Barbell or DB)',            category: 'Biceps',      equipment: 'Dumbbell',   notes: '7 bottom half, 7 top half, 7 full reps' },
    { name: 'Cable Concentration Curls',      category: 'Biceps',      equipment: 'Cable',      notes: 'Single arm, peak contraction' },
    { name: 'Zottman Curls',                  category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Supinated up, pronated down' },
    { name: 'Chin-Ups (Supinated)',           category: 'Biceps',      equipment: 'Bodyweight', notes: 'Underhand grip, full range' },
    { name: 'Band Bicep Curls',               category: 'Biceps',      equipment: 'Band',       notes: 'Constant tension, great finisher' },
    { name: 'Drag Curls',                     category: 'Biceps',      equipment: 'Barbell',    notes: 'Bar drags up body, elbows back' },
    { name: 'Cable Curl',                     category: 'Biceps',      equipment: 'Cable',      notes: 'Constant tension, curl with elbows fixed' },
    { name: 'Bayesian Curl',                  category: 'Biceps',      equipment: 'Cable',      notes: 'Arm set behind torso for a big biceps stretch' },
    { name: 'Cable Preacher Curl',            category: 'Biceps',      equipment: 'Cable',      notes: 'Use preacher bench with low pulley for constant tension' },
    { name: 'High Cable Curl',                category: 'Biceps',      equipment: 'Cable',      notes: 'Double-biceps style curl, elbows high' },
    { name: 'Single-Arm Cable Bicep Curl',    category: 'Biceps',      equipment: 'Cable',      notes: 'Stand sideways to cable, full stretch at bottom, squeeze at top' },
    { name: 'Single-Arm Cable Hammer Curl',   category: 'Biceps',      equipment: 'Cable',      notes: 'Neutral grip with rope attachment, targets brachialis' },
    { name: 'Single-Arm Cable Preacher Curl', category: 'Biceps',      equipment: 'Cable',      notes: 'Use bench for support, strict isolation' },
    { name: 'High Cable Bicep Curl',          category: 'Biceps',      equipment: 'Cable',      notes: 'High pulley, arms out to sides, curl hands toward head for peak contraction' },
    { name: 'Overhead Cable Curl (High Pulley)', category: 'Biceps',   equipment: 'Cable',      notes: 'Stand between high pulleys, curl across body or directly — great stretch' },

    // ── TRICEPS ──
    { name: 'Cable Tricep Pushdowns (Rope)',  category: 'Triceps',     equipment: 'Cable',      notes: 'Keep elbows pinned, squeeze at bottom' },
    { name: 'Overhead Cable Tricep Extension',category: 'Triceps',     equipment: 'Cable',      notes: 'Full stretch at top, extend fully' },
    { name: 'Skull Crushers (EZ Bar)',        category: 'Triceps',     equipment: 'Barbell',    notes: 'Lower to forehead, extend fully at top' },
    { name: 'Overhead Dumbbell Tricep Ext.', category: 'Triceps',     equipment: 'Dumbbell',   notes: 'Full stretch overhead, keep elbows in' },
    { name: 'Tricep Kickbacks (Dumbbell)',    category: 'Triceps',     equipment: 'Dumbbell',   notes: 'Hinge at hips, extend arm fully back, squeeze' },
    { name: 'Close-Grip Bench Press',         category: 'Triceps',     equipment: 'Barbell',    notes: 'Elbows close to body, tricep emphasis' },
    { name: 'Tricep Dips (Machine or Bench)', category: 'Triceps',     equipment: 'Machine',    notes: 'Upright torso for tricep focus' },
    { name: 'Cable Overhead Tricep Extension (Single Arm)', category: 'Triceps', equipment: 'Cable', notes: 'Unilateral, full stretch' },
    { name: 'JM Press',                       category: 'Triceps',     equipment: 'Barbell',    notes: 'Hybrid skull crusher + close grip' },
    { name: 'Tricep Pushdowns (Straight Bar)',category: 'Triceps',     equipment: 'Cable',      notes: 'Pronated grip variation' },
    { name: 'Diamond Push-Ups',               category: 'Triceps',     equipment: 'Bodyweight', notes: 'Hands in diamond shape' },
    { name: 'French Press (EZ or DB)',        category: 'Triceps',     equipment: 'Dumbbell',   notes: 'Seated or lying overhead extension' },
    { name: 'Bench Dips',                     category: 'Triceps',     equipment: 'Bodyweight', notes: 'Feet elevated for progression' },
    { name: 'Cable Tricep Kickbacks',         category: 'Triceps',     equipment: 'Cable',      notes: 'Constant tension version' },
    { name: 'Single-Arm Overhead DB Extension', category: 'Triceps',   equipment: 'Dumbbell',   notes: 'One arm at a time, focus on stretch' },
    { name: 'Resistance Band Pushdowns',      category: 'Triceps',     equipment: 'Band',       notes: 'Home or travel friendly' },
    { name: 'Lying Tricep Extension (DB)',    category: 'Triceps',     equipment: 'Dumbbell',   notes: 'Skull crusher variation with dumbbells' }, 
    { name: 'Cable Rope Pushdown', category: 'Triceps', equipment: 'Cable', notes: 'Spread rope at bottom and fully extend elbows' },
    { name: 'Cable Straight-Bar Pushdown', category: 'Triceps', equipment: 'Cable', notes: 'Keep elbows pinned and press straight down' },
    { name: 'Cable Overhead Triceps Extension', category: 'Triceps', equipment: 'Cable', notes: 'Stretch long head fully, keep elbows steady' },
    { name: 'Cable Skull Crusher', category: 'Triceps', equipment: 'Cable', notes: 'Keep elbows fixed and extend fully' },
    { name: 'Cable Reverse-Grip Pushdown', category: 'Triceps', equipment: 'Cable', notes: 'Underhand grip, targets medial head' },
    { name: 'Cross-Body Cable Tricep Extension', category: 'Triceps', equipment: 'Cable', notes: 'Single-arm variation with strong lockout' },
    { name: 'Single-Arm Cable Tricep Pushdown', category: 'Triceps', equipment: 'Cable', notes: 'Elbow pinned, extend arm down and squeeze tricep' },
    { name: 'Single-Arm Overhead Cable Tricep Extension', category: 'Triceps', equipment: 'Cable', notes: 'Full stretch overhead, one arm at a time' },
    { name: 'Single-Arm Cable Tricep Pressdown (Overhand)', category: 'Triceps', equipment: 'Cable', notes: 'Straight bar or rope, focus on outer tricep head' },
    
    // ── FOREARMS / GRIP ── (Added)
    { name: 'Dumbbell Wrist Curl (Palms Up)', category: 'Forearms',    equipment: 'Dumbbell',   notes: 'Seated or over bench, full range, squeeze at top' },
    { name: 'Barbell Wrist Curl',             category: 'Forearms',    equipment: 'Barbell',    notes: 'Behind back or over bench variation for flexors' },
    { name: 'Dumbbell Reverse Wrist Curl',    category: 'Forearms',    equipment: 'Dumbbell',   notes: 'Palms down — targets extensors on top of forearm' },
    { name: 'Reverse Grip Barbell Curl',      category: 'Forearms',    equipment: 'Barbell',    notes: 'Overhand grip biases brachioradialis' },
    { name: "Farmer's Walk / Carry",          category: 'Forearms',    equipment: 'Dumbbell',   notes: 'Heavy DBs or trap bar, walk with strong grip and upright posture' },
    { name: 'Plate Pinch Hold',               category: 'Forearms',    equipment: 'Other',      notes: 'Pinch smooth plates together and hold for time' },
    { name: 'Dead Hang from Pull-Up Bar',     category: 'Forearms',    equipment: 'Bodyweight', notes: 'Grip strength + lat stretch' },
    { name: 'Hammer Curl (Neutral Grip)',     category: 'Forearms',    equipment: 'Dumbbell',   notes: 'Thick forearm and brachialis builder' },
    { name: 'Zottman Curl',                   category: 'Forearms',    equipment: 'Dumbbell',   notes: 'Curl up supinated, rotate and lower pronated' },


    // ── QUADS / LEGS ──
    { name: 'Leg Press Machine',              category: 'Quads',       equipment: 'Machine',    notes: "Feet shoulder-width, don't lock knees" },
    { name: 'Leg Extension Machine',          category: 'Quads',       equipment: 'Machine',    notes: 'Squeeze quads hard at the top' },
    { name: 'Barbell Back Squat',             category: 'Quads',       equipment: 'Barbell',    notes: 'Chest up, knees track over toes' },
    { name: 'Goblet Squat (DB)',              category: 'Quads',       equipment: 'Dumbbell',   notes: 'Squat to comfortable depth, chest up' },
    { name: 'Bulgarian Split Squat',          category: 'Quads',       equipment: 'Dumbbell',   notes: 'Rear foot elevated, drive through heel' },
    { name: 'Lunges (Dumbbell)',              category: 'Quads',       equipment: 'Dumbbell',   notes: 'Step forward, knee to 90°, push back up' },
    { name: 'Smith Machine Back Squat', category: 'Quads', equipment: 'Smith Machine', notes: 'Feet slightly forward if needed, descend under control' },
    { name: 'Smith Machine Front Squat', category: 'Quads', equipment: 'Smith Machine', notes: 'More upright torso, strong quad emphasis' },
    { name: 'Smith Machine Split Squat', category: 'Quads', equipment: 'Smith Machine', notes: 'Staggered stance, drive through front heel' },
    { name: 'Smith Machine Reverse Lunge', category: 'Quads', equipment: 'Smith Machine', notes: 'Step back smoothly, keep front knee tracking over toes' },
    { name: 'Smith Machine Bulgarian Split Squat', category: 'Quads', equipment: 'Smith Machine', notes: 'Rear foot elevated, strong quad and glute stimulus' },
    { name: 'Hack Squat Machine',             category: 'Quads',       equipment: 'Machine',    notes: 'Great quad isolation with back support' },
    { name: 'Step-Ups (High Box)',            category: 'Quads',       equipment: 'Dumbbell',   notes: 'Drive through heel, squeeze glute at top' },
    

    // ── HAMSTRINGS ──
    { name: 'Romanian Deadlift (DB/Barbell)', category: 'Hamstrings',  equipment: 'Barbell',    notes: 'Hinge at hips, slight knee bend, feel hamstring stretch' },
    { name: 'Leg Curl Machine',               category: 'Hamstrings',  equipment: 'Machine',    notes: 'Slow and controlled negative' },
    { name: 'Smith Machine Romanian Deadlift', category: 'Hamstrings', equipment: 'Smith Machine', notes: 'Hinge at hips, slight knee bend, feel hamstring stretch' },
    { name: 'Smith Machine Good Morning', category: 'Hamstrings', equipment: 'Smith Machine', notes: 'Use light-moderate load, hinge carefully, keep spine neutral' },
    { name: 'Cable Hamstring Curl', category: 'Hamstrings', equipment: 'Cable', notes: 'Use ankle strap, prone or standing setup' },
    { name: 'Dumbbell Romanian Deadlift', category: 'Hamstrings', equipment: 'Dumbbell', notes: 'Hinge at hips with slight knee bend, feel deep hamstring stretch, drive through heels' },
    { name: 'Single-Leg Romanian Deadlift (DB)', category: 'Hamstrings', equipment: 'Dumbbell', notes: 'Balance on one leg, hinge forward, keep back flat — great for stability' },
    { name: 'Glute Ham Raise (Machine or Bodyweight)', category: 'Hamstrings', equipment: 'Machine', notes: 'Controlled eccentric, squeeze hamstrings and glutes at top' },
    { name: 'Lying Dumbbell Leg Curl', category: 'Hamstrings', equipment: 'Dumbbell', notes: 'Place DB between feet/ankles, curl toward glutes with control' },
    { name: 'Good Morning (Dumbbell or Barbell)', category: 'Hamstrings', equipment: 'Dumbbell', notes: 'Hinge at hips with flat back, light weight to start, feel hamstring stretch' },
    { name: 'Nordic Hamstring Curl (Assisted)', category: 'Hamstrings', equipment: 'Bodyweight', notes: 'Kneel and lower slowly under control — advanced, use assistance if needed' },
    { name: 'Swiss Ball Leg Curl', category: 'Hamstrings', equipment: 'Bodyweight', notes: 'Bridge position, curl ball toward glutes with heels on ball' },
    
    
    // ── GLUTES ──
    { name: 'Barbell Hip Thrust',             category: 'Glutes',      equipment: 'Barbell',    notes: 'Drive hips up, squeeze glutes hard at top, chin tucked' },
    { name: 'Smith Machine Hip Thrust',       category: 'Glutes',      equipment: 'Smith Machine', notes: 'Drive hips hard and pause at the top' },
    { name: 'Smith Machine Glute Bridge',     category: 'Glutes',      equipment: 'Smith Machine', notes: 'Shorter range than hip thrust, squeeze hard at lockout' },
    { name: 'Cable Glute Kickback',           category: 'Glutes',      equipment: 'Cable',      notes: 'Use ankle strap and extend with control' },
    { name: 'Cable Hip Abduction',            category: 'Glutes',      equipment: 'Cable',      notes: 'Move leg outward for glute medius focus' },
    { name: 'Hip Thrust (Barbell)',           category: 'Glutes',      equipment: 'Barbell',    notes: 'Drive hips up, squeeze glutes at top' },
    { name: 'Single-Leg Hip Thrust',          category: 'Glutes',      equipment: 'Dumbbell',   notes: 'One foot on bench — fix imbalances' },
    { name: 'Glute Bridge (Bodyweight or DB)', category: 'Glutes',     equipment: 'Bodyweight', notes: 'Drive hips up, squeeze at top' },
    { name: 'Step-Ups (High Box for Glutes)', category: 'Glutes',      equipment: 'Dumbbell',   notes: 'Drive through heel, full hip extension at top' },
    { name: 'Bulgarian Split Squat (Glute Focus)', category: 'Glutes', equipment: 'Dumbbell',   notes: 'Lean slightly forward for more glute' },
    { name: 'Sumo Deadlift (Barbell)',        category: 'Glutes',      equipment: 'Barbell',    notes: 'Wide stance, drive through heels' },
    { name: 'Curtsy Lunge',                   category: 'Glutes',      equipment: 'Dumbbell',   notes: 'Cross leg behind for outer glute' },
    { name: 'Fire Hydrants (Bodyweight)',     category: 'Glutes',      equipment: 'Bodyweight', notes: 'Lift knee out to side' },
    { name: 'Donkey Kicks',                   category: 'Glutes',      equipment: 'Bodyweight', notes: 'Kick heel toward ceiling' },
    { name: 'Hip Abduction Machine',          category: 'Glutes',      equipment: 'Machine',    notes: 'Controlled reps for glute medius' },

    
    // ── CALVES ──
    { name: 'Smith Machine Standing Calf Raise', category: 'Calves', equipment: 'Smith Machine', notes: 'Use block for full ROM and pause at the bottom' },
    { name: 'Standing Calf Raises Machine',   category: 'Calves',      equipment: 'Machine',    notes: 'Full range of motion, pause at top' },
    { name: 'Seated Calf Raise (Machine or DB)', category: 'Calves', equipment: 'Machine', notes: 'Knees bent, full stretch at bottom and pause at top contraction' },
    { name: 'Dumbbell Standing Calf Raise', category: 'Calves', equipment: 'Dumbbell', notes: 'Hold DBs at sides or one DB, use step/block for full ROM, slow eccentric' },
    { name: 'Single-Leg Standing Calf Raise (Bodyweight or DB)', category: 'Calves', equipment: 'Dumbbell', notes: 'Balance on one foot, use wall for support if needed, full stretch and pause' },
    { name: 'Donkey Calf Raise (Machine or Partner)', category: 'Calves', equipment: 'Machine', notes: 'Hips hinged, focus on deep stretch and powerful contraction' },
    { name: 'Calf Raise on Leg Press Machine', category: 'Calves', equipment: 'Machine', notes: 'Feet low on platform, knees straight but soft, full range' },

    
    // ── ADDUCTORS (Inner Thighs) ──
    { name: 'Cable Hip Adduction', category: 'Adductors', equipment: 'Cable', notes: 'Cross leg inward against resistance and control return' },
    { name: 'Side-Lying Adductor Lift', category: 'Adductors', equipment: 'Bodyweight', notes: 'Lie on side, lift bottom leg upward against gravity, slow and controlled' },
    { name: 'Sumo Squat (Dumbbell)', category: 'Adductors', equipment: 'Dumbbell', notes: 'Wide stance, toes out, squat deep while keeping chest up — great adductor emphasis' },
    { name: 'Cossack Squat (Bodyweight or DB)', category: 'Adductors', equipment: 'Dumbbell', notes: 'Side lunge with one leg extended, shift weight laterally, alternate sides' },
    { name: 'Lateral Lunge (Dumbbell)', category: 'Adductors', equipment: 'Dumbbell', notes: 'Step wide to side, bend one knee and sit back into hip, push back to start' },
    { name: 'Seated Hip Adduction (Machine)', category: 'Adductors', equipment: 'Machine', notes: 'Squeeze thighs together, control the return for full stretch' },
    { name: 'Cable Hip Adduction (Standing)', category: 'Adductors', equipment: 'Cable', notes: 'Cross working leg in front of body, focus on inner thigh squeeze' },
    { name: ' Copenhagen Plank/Adductor Bridge', category: 'Adductors', equipment: 'Bodyweight', notes: 'Side plank with top leg on bench/elevated, drive bottom hip up' },
    
    // ── ABDUCTORS (Outer Hips / Glute Medius) ──
    { name: 'Side-Lying Hip Abduction', category: 'Abductors', equipment: 'Bodyweight', notes: 'Lie on side, lift top leg upward, keep foot parallel or toes slightly down' },
    { name: 'Clamshells (Bodyweight or Band)', category: 'Abductors', equipment: 'Bodyweight', notes: 'Side-lying with knees bent, open top knee while keeping feet together' },
    { name: 'Dumbbell Lateral Lunge', category: 'Abductors', equipment: 'Dumbbell', notes: 'Emphasizes glute medius on the working leg — step out and push back' },
    { name: 'Fire Hydrants (Bodyweight or Band)', category: 'Abductors', equipment: 'Bodyweight', notes: 'On all fours, lift bent leg out to side like a dog at a hydrant' },
    { name: 'Standing Hip Abduction (Cable or Band)', category: 'Abductors', equipment: 'Cable', notes: 'Move leg outward away from midline, control return' },
    { name: 'Banded Lateral Walks', category: 'Abductors', equipment: 'Band', notes: 'Band around knees/ankles, small steps sideways in slight squat' },
    { name: 'Single-Leg Glute Bridge with Abduction', category: 'Abductors', equipment: 'Bodyweight', notes: 'Bridge on one leg, then abduct the raised leg outward at top' },


    // ── CORE (Updated with your requested dumbbell exercises) ──
    { name: 'Seated Abdominal Crunch Machine',category: 'Core',        equipment: 'Machine',    notes: 'Focus on spinal flexion, control the eccentric' },
    { name: 'Cable Wood Chop High-to-Low',    category: 'Core',        equipment: 'Cable',      notes: 'Weak side first, rotate torso, pivot hips' },
    { name: 'Cable Wood Chop Low-to-High',    category: 'Core',        equipment: 'Cable',      notes: 'Weak side first, start low, pull diagonally upward' },
    { name: 'Kneeling Cable Anti-Extension',  category: 'Core',        equipment: 'Cable',      notes: 'Resist arching lower back, maintain straight torso' },
    { name: 'Plank Hold',                     category: 'Core',        equipment: 'Bodyweight', notes: 'Squeeze glutes and abs, keep hips level' },
    { name: 'Side Plank Hold',                category: 'Core',        equipment: 'Bodyweight', notes: 'Weak side first, keep hips elevated' },
    { name: 'Cable Pallof Press', category: 'Core', equipment: 'Cable', notes: 'Anti-rotation press, keep shoulders square' },
    { name: 'Cable Woodchop', category: 'Core', equipment: 'Cable', notes: 'Rotate through torso under control' },
    { name: 'Cable Kneeling Lift', category: 'Core', equipment: 'Cable', notes: 'Diagonal lift pattern for shoulders/core' },
    { name: 'Cable Crunch', category: 'Core', equipment: 'Cable', notes: 'Crunch by pulling ribs toward pelvis' },
    { name: "Dumbbell Side Bend",             category: "Core",        equipment: "Dumbbell",   notes: "Hold dumbbell in one hand, bend sideways, control the return" },
    { name: "Dumbbell Russian Twist",         category: "Core",        equipment: "Dumbbell",   notes: "Sit with knees bent, twist side to side holding dumbbell" },
    { name: "Dumbbell Dead Bug",              category: "Core",        equipment: "Dumbbell",   notes: "Press dumbbell toward ceiling while extending opposite arm/leg" },
    { name: "Dumbbell Woodchopper",           category: "Core",        equipment: "Dumbbell",   notes: "High to low diagonal chop motion" },
    { name: "Dumbbell Suitcase Carry",        category: "Core",        equipment: "Dumbbell",   notes: "Walk while holding heavy dumbbell at side (anti-lateral flexion)" },
    { name: "Dumbbell Renegade Row",          category: "Core",        equipment: "Dumbbell",   notes: "Plank position with alternating rows - excellent anti-rotation" },
    { name: "Dumbbell Halo",                  category: "Core",        equipment: "Dumbbell",   notes: "Circle dumbbell around head for shoulder + core stability" },

    // ── CARDIO ──
    { name: 'Treadmill Walk (Incline)',       category: 'Cardio',      equipment: 'Machine',    notes: '10-15% incline, 3.0-3.5 mph for steady state cardio' },
    { name: 'Stationary Bike (Steady State)', category: 'Cardio',      equipment: 'Machine',    notes: 'Moderate resistance, maintain 70-80 RPM' },
    { name: 'Rowing Machine',                 category: 'Cardio',      equipment: 'Machine',    notes: '60% legs, 20% core, 20% arms' },

    

];

const DB_CATEGORIES = ['All','Chest','Back','Shoulders','Traps','Biceps','Forearms','Triceps','Quads','Hamstrings','Glutes','Calves',"Adductors",'Abductors','Core','Cardio'];

// Equipment color map for badges
const EQUIPMENT_COLORS = {
    'Machine':    '#0095ff',
    'Cable':      '#00d68f',
    'Barbell':    '#e94560',
    'Dumbbell':   '#ffaa00',
    'Bodyweight': '#a855f7',
    'Smith Machine': '#06b6d4',
};
