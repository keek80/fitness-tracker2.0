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
    // ── SHOULDERS ──
    { name: 'Seated Machine Shoulder Press',  category: 'Shoulders',   equipment: 'Machine',    notes: 'Keep shoulder blades down and back' },
    { name: 'Seated Overhead Dumbbell Press', category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Control descent, avoid locking out elbows' },
    { name: 'Barbell Overhead Press',         category: 'Shoulders',   equipment: 'Barbell',    notes: 'Brace core, press straight up' },
    { name: 'Arnold Press',                   category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Rotate palms outward as you press up' },
    { name: 'Dumbbell Lateral Raises',        category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Light weight, strict form for side delts' },
    { name: 'Cable Lateral Raises',           category: 'Shoulders',   equipment: 'Cable',      notes: 'Constant cable tension for side delts' },
    { name: 'Machine Lateral Raises',         category: 'Shoulders',   equipment: 'Machine',    notes: 'Consistent tension, control the eccentric' },
    { name: 'Face Pulls (Cable)',             category: 'Shoulders',   equipment: 'Cable',      notes: 'Pull to face level, rear delts and external rotation' },
    { name: 'Machine Pec Deck Reverse Fly',   category: 'Shoulders',   equipment: 'Machine',    notes: 'Focus on rear delts, slow and controlled' },
    { name: 'Rear Delt Fly Machine',          category: 'Shoulders',   equipment: 'Machine',    notes: 'Posture correction, squeeze rear delts' },
    { name: 'Dumbbell Front Raises',          category: 'Shoulders',   equipment: 'Dumbbell',   notes: 'Raise to shoulder height, control the descent' },
    { name: 'Cable Front Raises',             category: 'Shoulders',   equipment: 'Cable',      notes: 'Constant tension, raise to shoulder height' },
    { name: 'Upright Rows (Barbell)',         category: 'Shoulders',   equipment: 'Barbell',    notes: 'Pull to chin, elbows lead the movement' },
    // ── BICEPS ──
    { name: 'Barbell Bicep Curls',            category: 'Biceps',      equipment: 'Barbell',    notes: 'Keep elbows tucked, avoid swinging' },
    { name: 'Dumbbell Bicep Curls',           category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Alternate arms or together, full range' },
    { name: 'Dumbbell Hammer Curls',          category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Thumb up grip, targets brachialis and forearms' },
    { name: 'Machine Preacher Curls',         category: 'Biceps',      equipment: 'Machine',    notes: 'Isolate biceps, focus on peak contraction' },
    { name: 'Cable Bicep Curls',              category: 'Biceps',      equipment: 'Cable',      notes: 'Constant tension throughout, squeeze at top' },
    { name: 'Reverse Grip Cable Curls',       category: 'Biceps',      equipment: 'Cable',      notes: 'Targets brachialis and forearm flexors' },
    { name: 'Concentration Curls',            category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Elbow on thigh, full squeeze at top' },
    { name: 'Incline Dumbbell Curls',         category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Full stretch at bottom, great for peak' },
    { name: 'EZ Bar Curls',                   category: 'Biceps',      equipment: 'Barbell',    notes: 'Easier on wrists than straight bar' },
    { name: 'Spider Curls',                   category: 'Biceps',      equipment: 'Dumbbell',   notes: 'Face down on incline bench, full contraction' },
    // ── TRICEPS ──
    { name: 'Cable Tricep Pushdowns (Rope)',  category: 'Triceps',     equipment: 'Cable',      notes: 'Keep elbows pinned, squeeze at bottom' },
    { name: 'Cable Tricep Pushdowns (Bar)',   category: 'Triceps',     equipment: 'Cable',      notes: 'Straight bar, elbows pinned to sides' },
    { name: 'Overhead Cable Tricep Extension',category: 'Triceps',     equipment: 'Cable',      notes: 'Full stretch at top, extend fully' },
    { name: 'Skull Crushers (EZ Bar)',        category: 'Triceps',     equipment: 'Barbell',    notes: 'Lower to forehead, extend fully at top' },
    { name: 'Overhead Dumbbell Tricep Ext.', category: 'Triceps',     equipment: 'Dumbbell',   notes: 'Full stretch overhead, keep elbows in' },
    { name: 'Tricep Dip Machine',             category: 'Triceps',     equipment: 'Machine',    notes: 'Upright posture emphasizes triceps' },
    { name: 'Close-Grip Bench Press',         category: 'Triceps',     equipment: 'Barbell',    notes: 'Hands shoulder-width, elbows close to body' },
    { name: 'Tricep Kickbacks (Cable)',       category: 'Triceps',     equipment: 'Cable',      notes: 'Hinge at hips, extend arm fully back, squeeze' },
    { name: 'Tricep Kickbacks (Dumbbell)',    category: 'Triceps',     equipment: 'Dumbbell',   notes: 'Hinge at hips, extend arm fully back, squeeze' },
    // ── QUADS ──
    { name: 'Leg Press Machine',              category: 'Quads',       equipment: 'Machine',    notes: "Feet shoulder-width, don't lock knees" },
    { name: 'Leg Extension Machine',          category: 'Quads',       equipment: 'Machine',    notes: 'Squeeze quads hard at the top' },
    { name: 'Barbell Back Squat',             category: 'Quads',       equipment: 'Barbell',    notes: 'Chest up, knees track over toes, squat to parallel' },
    { name: 'Barbell Front Squat',            category: 'Quads',       equipment: 'Barbell',    notes: 'More quad-dominant, keep elbows high' },
    { name: 'Goblet Squat (DB/KB)',           category: 'Quads',       equipment: 'Dumbbell',   notes: 'Squat to comfortable depth, chest up' },
    { name: 'Hack Squat Machine',             category: 'Quads',       equipment: 'Machine',    notes: 'Feet low on platform for more quad emphasis' },
    { name: 'Smith Machine Squat',            category: 'Quads',       equipment: 'Machine',    notes: 'Feet slightly forward, controlled descent' },
    { name: 'Lunges (Dumbbell)',              category: 'Quads',       equipment: 'Dumbbell',   notes: 'Step forward, knee to 90°, push back up' },
    { name: 'Walking Lunges',                 category: 'Quads',       equipment: 'Bodyweight', notes: 'Controlled steps, knee not past toes' },
    { name: 'Bulgarian Split Squat',          category: 'Quads',       equipment: 'Dumbbell',   notes: 'Rear foot elevated, front foot forward, drive through heel' },
    { name: 'Step-Ups (Dumbbell)',            category: 'Quads',       equipment: 'Dumbbell',   notes: 'Drive through heel of lead foot' },
    // ── HAMSTRINGS ──
    { name: 'Leg Curl Machine (Seated/Lying)',category: 'Hamstrings',  equipment: 'Machine',    notes: 'Slow and controlled negative' },
    { name: 'Romanian Deadlift (DB/Barbell)', category: 'Hamstrings',  equipment: 'Barbell',    notes: 'Hinge at hips, slight knee bend, feel hamstring stretch' },
    { name: 'Stiff-Leg Deadlift',            category: 'Hamstrings',  equipment: 'Barbell',    notes: 'Minimal knee bend, full hip hinge' },
    { name: 'Good Mornings',                  category: 'Hamstrings',  equipment: 'Barbell',    notes: 'Hinge at hips with bar on back, slight knee bend' },
    { name: 'Nordic Hamstring Curl',          category: 'Hamstrings',  equipment: 'Bodyweight', notes: 'Slow eccentric is key, very challenging' },
    { name: 'Kettlebell Swings',              category: 'Hamstrings',  equipment: 'Dumbbell',   notes: 'Explosive hip hinge, power from glutes and hamstrings' },
    // ── GLUTES ──
    { name: 'Hip Thrust (Barbell)',           category: 'Glutes',      equipment: 'Barbell',    notes: 'Upper back on bench, drive hips up, squeeze glutes at top' },
    { name: 'Hip Thrust Machine',             category: 'Glutes',      equipment: 'Machine',    notes: 'Drive through heels, squeeze glutes hard at top for 2 sec' },
    { name: 'Cable Pull-Through',             category: 'Glutes',      equipment: 'Cable',      notes: 'Stand facing away from low pulley, hinge at hips, drive hips forward' },
    { name: 'Glute Bridge (Dumbbell)',        category: 'Glutes',      equipment: 'Dumbbell',   notes: 'Lie on floor, drive hips up, squeeze glutes 2 sec at top' },
    { name: 'Cable Kickbacks',               category: 'Glutes',      equipment: 'Cable',      notes: 'Kick leg back and up, squeeze glute at top' },
    { name: 'Machine Kickbacks',              category: 'Glutes',      equipment: 'Machine',    notes: 'Pad on lower leg, extend hip back and up, squeeze' },
    { name: 'Sumo Deadlift',                  category: 'Glutes',      equipment: 'Barbell',    notes: 'Wide stance, toes out, targets inner thighs and glutes' },
    { name: 'Abductor Machine',              category: 'Glutes',      equipment: 'Machine',    notes: 'Push knees outward, targets glute medius' },
    { name: 'Adductor Machine',              category: 'Glutes',      equipment: 'Machine',    notes: 'Squeeze knees inward, targets inner thighs' },
    // ── CALVES ──
    { name: 'Standing Calf Raises Machine',   category: 'Calves',      equipment: 'Machine',    notes: 'Full range of motion, pause 1 sec at top and bottom' },
    { name: 'Seated Calf Raises Machine',     category: 'Calves',      equipment: 'Machine',    notes: 'Targets soleus, hold at top 2 seconds' },
    { name: 'Leg Press Calf Raises',          category: 'Calves',      equipment: 'Machine',    notes: 'Press through balls of feet, full range' },
    { name: 'Standing Dumbbell Calf Raises',  category: 'Calves',      equipment: 'Dumbbell',   notes: 'Hold dumbbell in one hand, other holds for balance' },
    // ── CORE ──
    { name: 'Seated Abdominal Crunch Machine',category: 'Core',        equipment: 'Machine',    notes: 'Focus on spinal flexion, control the eccentric' },
    { name: 'Machine Oblique Crunch',         category: 'Core',        equipment: 'Machine',    notes: 'Weak side first, complete all reps L then R before resting' },
    { name: 'Cable Wood Chop High-to-Low',    category: 'Core',        equipment: 'Cable',      notes: 'Weak side first, rotate torso, pivot hips, control the return' },
    { name: 'Cable Wood Chop Low-to-High',    category: 'Core',        equipment: 'Cable',      notes: 'Weak side first, start low, pull diagonally upward' },
    { name: 'Kneeling Cable Anti-Extension',  category: 'Core',        equipment: 'Cable',      notes: 'Resist arching lower back, maintain straight torso throughout' },
    { name: 'Cable Pallof Press',             category: 'Core',        equipment: 'Cable',      notes: 'Anti-rotation, hold at full extension for 2 sec each rep' },
    { name: 'Ab Wheel Rollout',               category: 'Core',        equipment: 'Bodyweight', notes: 'Brace core, roll out as far as possible maintaining neutral spine' },
    { name: 'Plank Hold',                     category: 'Core',        equipment: 'Bodyweight', notes: 'Squeeze glutes and abs, keep hips level' },
    { name: 'Side Plank Hold',                category: 'Core',        equipment: 'Bodyweight', notes: 'Weak side first, keep hips elevated' },
    { name: 'Dead Bugs',                      category: 'Core',        equipment: 'Bodyweight', notes: 'Keep lower back pressed to floor throughout' },
    { name: 'Hanging Leg Raises',             category: 'Core',        equipment: 'Bodyweight', notes: 'Control the eccentric, avoid swinging' },
    { name: 'Cable Crunch',                   category: 'Core',        equipment: 'Cable',      notes: 'Kneel facing cable, crunch elbows to knees' },
    { name: 'Decline Sit-Ups',               category: 'Core',        equipment: 'Bodyweight', notes: 'Control descent, avoid pulling on neck' },
    { name: 'Russian Twists',                 category: 'Core',        equipment: 'Bodyweight', notes: 'Keep feet off floor for extra challenge' },
    // ── CARDIO ──
    { name: 'Treadmill Walk (Incline)',        category: 'Cardio',      equipment: 'Machine',    notes: '10-15% incline, 3.0-3.5 mph for steady state cardio' },
    { name: 'Stationary Bike (Steady State)', category: 'Cardio',      equipment: 'Machine',    notes: 'Moderate resistance, maintain 70-80 RPM' },
    { name: 'Rowing Machine',                 category: 'Cardio',      equipment: 'Machine',    notes: '60% legs, 20% core, 20% arms — drive with legs first' },
    { name: 'Stair Climber',                  category: 'Cardio',      equipment: 'Machine',    notes: 'Full steps, avoid leaning on rails' },
    { name: 'Elliptical',                     category: 'Cardio',      equipment: 'Machine',    notes: 'Push and pull handles for full body engagement' },
];

// All unique categories in display order
const DB_CATEGORIES = ['All','Chest','Back','Shoulders','Biceps','Triceps','Quads','Hamstrings','Glutes','Calves','Core','Cardio'];

// Equipment color map for badges
const EQUIPMENT_COLORS = {
    'Machine':    '#0095ff',
    'Cable':      '#00d68f',
    'Barbell':    '#e94560',
    'Dumbbell':   '#ffaa00',
    'Bodyweight': '#a855f7',
    'Smith Machine': '#06b6d4',
};
