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
    } catch (e) { console.error('Error saving custom program:', e); }
}

function resetTrainingProgram() {
    localStorage.removeItem('flt_custom_program');
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
