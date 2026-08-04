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

// ========== SPLIT TEMPLATES (Workout Builder) ==========
const SPLIT_TEMPLATES = {
    fullbody: {
        id: 'fullbody',
        name: 'Full Body',
        description: '3 days/week • Each muscle 3× per week. Best for beginners & fat loss.',
        daysPerWeek: 3,
        days: [
            {
                id: 'fb_a', name: 'Full Body A', dayOfWeek: 'Monday', color: '#e94560',
                exercises: [
                    { name: 'Barbell Bench Press', sets: 3, repsTarget: '6-10', rest: '120s', notes: 'Primary horizontal press' },
                    { name: 'Barbell Rows (Bent-Over)', sets: 3, repsTarget: '6-10', rest: '120s', notes: 'Primary horizontal pull' },
                    { name: 'Leg Press Machine', sets: 3, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Seated Overhead Dumbbell Press', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Romanian Deadlift (DB/Barbell)', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Cable Tricep Pushdowns (Rope)', sets: 2, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Barbell Bicep Curls', sets: 2, repsTarget: '10-12', rest: '60s', notes: '' },
                    { name: 'Seated Abdominal Crunch Machine', sets: 2, repsTarget: '12-15', rest: '45s', notes: 'Core finisher' }
                ]
            },
            {
                id: 'fb_b', name: 'Full Body B', dayOfWeek: 'Wednesday', color: '#0095ff',
                exercises: [
                    { name: 'Incline Dumbbell Press', sets: 3, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Lat Pulldown (Wide Grip)', sets: 3, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Romanian Deadlift (DB/Barbell)', sets: 3, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Dumbbell Lateral Raises', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Leg Extension Machine', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Leg Curl Machine (Seated/Lying)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Overhead Cable Tricep Extension', sets: 2, repsTarget: '10-12', rest: '60s', notes: '' },
                    { name: 'Dumbbell Hammer Curls', sets: 2, repsTarget: '10-12', rest: '60s', notes: '' }
                ]
            },
            {
                id: 'fb_c', name: 'Full Body C', dayOfWeek: 'Friday', color: '#00d68f',
                exercises: [
                    { name: 'Dumbbell Bench Press', sets: 3, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Seated Cable Rows (Close Grip)', sets: 3, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Leg Press Machine', sets: 4, repsTarget: '10-15', rest: '120s', notes: '' },
                    { name: 'Seated Machine Shoulder Press', sets: 3, repsTarget: '10-12', rest: '90s', notes: '' },
                    { name: 'Standing Calf Raises Machine', sets: 3, repsTarget: '12-20', rest: '45s', notes: '' },
                    { name: 'Cable Tricep Pushdowns (Rope)', sets: 2, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Machine Preacher Curls', sets: 2, repsTarget: '10-12', rest: '60s', notes: '' },
                    { name: 'Cable Wood Chop High-to-Low (Both Sides)', sets: 2, repsTarget: '10-12/side', rest: '45s', notes: 'Core finisher' }
                ]
            }
        ]
    },

    upperlower: {
        id: 'upperlower',
        name: 'Upper / Lower',
        description: '4 days/week • Each muscle 2×. Excellent balance of volume & recovery.',
        daysPerWeek: 4,
        days: [
            {
                id: 'ul_upper_a', name: 'Upper A', dayOfWeek: 'Monday', color: '#e94560',
                exercises: [
                    { name: 'Barbell Bench Press', sets: 4, repsTarget: '6-10', rest: '120s', notes: '' },
                    { name: 'Barbell Rows (Bent-Over)', sets: 4, repsTarget: '6-10', rest: '120s', notes: '' },
                    { name: 'Seated Overhead Dumbbell Press', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Lat Pulldown (Wide Grip)', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Dumbbell Lateral Raises', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Cable Tricep Pushdowns (Rope)', sets: 3, repsTarget: '10-15', rest: '60s', notes: '' },
                    { name: 'Barbell Bicep Curls', sets: 3, repsTarget: '10-12', rest: '60s', notes: '' }
                ]
            },
            {
                id: 'ul_lower_a', name: 'Lower A', dayOfWeek: 'Tuesday', color: '#00d68f',
                exercises: [
                    { name: 'Leg Press Machine', sets: 4, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Romanian Deadlift (DB/Barbell)', sets: 3, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Leg Extension Machine', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Leg Curl Machine (Seated/Lying)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Standing Calf Raises Machine', sets: 4, repsTarget: '12-20', rest: '45s', notes: '' },
                    { name: 'Seated Abdominal Crunch Machine', sets: 3, repsTarget: '12-15', rest: '45s', notes: '' }
                ]
            },
            {
                id: 'ul_upper_b', name: 'Upper B', dayOfWeek: 'Thursday', color: '#ffaa00',
                exercises: [
                    { name: 'Incline Dumbbell Press', sets: 4, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Seated Cable Rows (Close Grip)', sets: 4, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Seated Machine Shoulder Press', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Assisted Pull-Up Machine', sets: 3, repsTarget: '6-10', rest: '90s', notes: '' },
                    { name: 'Machine Pec Deck Reverse Fly', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Overhead Cable Tricep Extension', sets: 3, repsTarget: '10-12', rest: '60s', notes: '' },
                    { name: 'Dumbbell Hammer Curls', sets: 3, repsTarget: '10-12', rest: '60s', notes: '' }
                ]
            },
            {
                id: 'ul_lower_b', name: 'Lower B', dayOfWeek: 'Friday', color: '#a855f7',
                exercises: [
                    { name: 'Leg Press Machine', sets: 4, repsTarget: '10-15', rest: '120s', notes: '' },
                    { name: 'Barbell Hip Thrust', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Leg Extension Machine', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Leg Curl Machine (Seated/Lying)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Standing Calf Raises Machine', sets: 4, repsTarget: '15-20', rest: '45s', notes: '' },
                    { name: 'Cable Wood Chop High-to-Low (Both Sides)', sets: 3, repsTarget: '10-12/side', rest: '45s', notes: '' }
                ]
            }
        ]
    },

    // Keep the existing DEFAULT as one of the options
    ppl5: {
        id: 'ppl5',
        name: 'Push / Pull / Legs (5-day)',
        description: 'Current default. Good volume with a built-in recovery day.',
        daysPerWeek: 5,
        days: DEFAULT_TRAINING_PROGRAM.days   // reuse existing
    },

    ppl6: {
        id: 'ppl6',
        name: 'Push / Pull / Legs (6-day)',
        description: 'Classic high-frequency PPL. Each muscle 2× per week.',
        daysPerWeek: 6,
        days: [
            // You can expand this with Push A/B, Pull A/B, Legs A/B using the same style as current default
            // (I can flesh this out fully if you want)
        ]
    },

    bro: {
        id: 'bro',
        name: 'Classic Bro Split',
        description: '5 days • One major muscle group per day. High volume per session.',
        daysPerWeek: 5,
        days: [
            {
                id: 'bro_chest', name: 'Chest', dayOfWeek: 'Monday', color: '#e94560',
                exercises: [
                    { name: 'Barbell Bench Press', sets: 4, repsTarget: '6-10', rest: '120s', notes: '' },
                    { name: 'Incline Dumbbell Press', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Pec Deck Fly Machine', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Cable Chest Fly (High-to-Low)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Machine Dips', sets: 3, repsTarget: '10-15', rest: '60s', notes: '' }
                ]
            },
            {
                id: 'bro_back', name: 'Back', dayOfWeek: 'Tuesday', color: '#0095ff',
                exercises: [
                    { name: 'Lat Pulldown (Wide Grip)', sets: 4, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Barbell Rows (Bent-Over)', sets: 4, repsTarget: '6-10', rest: '120s', notes: '' },
                    { name: 'Seated Cable Rows (Close Grip)', sets: 3, repsTarget: '10-12', rest: '90s', notes: '' },
                    { name: 'Straight Arm Pulldowns (Cable)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Machine Pec Deck Reverse Fly', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' }
                ]
            },
            {
                id: 'bro_shoulders', name: 'Shoulders', dayOfWeek: 'Wednesday', color: '#ffaa00',
                exercises: [
                    { name: 'Seated Overhead Dumbbell Press', sets: 4, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Dumbbell Lateral Raises', sets: 4, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Machine Pec Deck Reverse Fly', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Cable Lateral Raises', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' }
                ]
            },
            {
                id: 'bro_legs', name: 'Legs', dayOfWeek: 'Thursday', color: '#00d68f',
                exercises: [
                    { name: 'Leg Press Machine', sets: 4, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Romanian Deadlift (DB/Barbell)', sets: 3, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Leg Extension Machine', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Leg Curl Machine (Seated/Lying)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Standing Calf Raises Machine', sets: 4, repsTarget: '12-20', rest: '45s', notes: '' },
                    { name: 'Barbell Hip Thrust', sets: 3, repsTarget: '10-12', rest: '90s', notes: '' }
                ]
            },
            {
                id: 'bro_arms', name: 'Arms', dayOfWeek: 'Friday', color: '#a855f7',
                exercises: [
                    { name: 'Close-Grip Bench Press (Smith Machine)', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Cable Tricep Pushdowns (Rope)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Overhead Cable Tricep Extension', sets: 3, repsTarget: '10-12', rest: '60s', notes: '' },
                    { name: 'Barbell Bicep Curls', sets: 3, repsTarget: '8-12', rest: '60s', notes: '' },
                    { name: 'Machine Preacher Curls', sets: 3, repsTarget: '10-12', rest: '60s', notes: '' },
                    { name: 'Dumbbell Hammer Curls', sets: 3, repsTarget: '10-12', rest: '60s', notes: '' }
                ]
            }
        ]
    },

    modifiedbro: {
        id: 'modifiedbro',
        name: 'Modified Bro Split',
        description: '5 days • Pairs agonist/antagonist or related groups for better recovery & pump.',
        daysPerWeek: 5,
        days: [
            {
                id: 'mb_chest_tri', name: 'Chest + Triceps', dayOfWeek: 'Monday', color: '#e94560',
                exercises: [
                    { name: 'Barbell Bench Press', sets: 4, repsTarget: '6-10', rest: '120s', notes: '' },
                    { name: 'Incline Dumbbell Press', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Pec Deck Fly Machine', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Cable Tricep Pushdowns (Rope)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Overhead Cable Tricep Extension', sets: 3, repsTarget: '10-12', rest: '60s', notes: '' }
                ]
            },
            {
                id: 'mb_back_bi', name: 'Back + Biceps', dayOfWeek: 'Tuesday', color: '#0095ff',
                exercises: [
                    { name: 'Lat Pulldown (Wide Grip)', sets: 4, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Barbell Rows (Bent-Over)', sets: 3, repsTarget: '6-10', rest: '120s', notes: '' },
                    { name: 'Seated Cable Rows (Close Grip)', sets: 3, repsTarget: '10-12', rest: '90s', notes: '' },
                    { name: 'Barbell Bicep Curls', sets: 3, repsTarget: '8-12', rest: '60s', notes: '' },
                    { name: 'Dumbbell Hammer Curls', sets: 3, repsTarget: '10-12', rest: '60s', notes: '' }
                ]
            },
            {
                id: 'mb_legs', name: 'Legs', dayOfWeek: 'Wednesday', color: '#00d68f',
                exercises: [
                    { name: 'Leg Press Machine', sets: 4, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Romanian Deadlift (DB/Barbell)', sets: 3, repsTarget: '8-12', rest: '120s', notes: '' },
                    { name: 'Leg Extension Machine', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Leg Curl Machine (Seated/Lying)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Standing Calf Raises Machine', sets: 4, repsTarget: '12-20', rest: '45s', notes: '' }
                ]
            },
            {
                id: 'mb_shoulders', name: 'Shoulders + Traps', dayOfWeek: 'Thursday', color: '#ffaa00',
                exercises: [
                    { name: 'Seated Overhead Dumbbell Press', sets: 4, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Dumbbell Lateral Raises', sets: 4, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Machine Pec Deck Reverse Fly', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Cable Lateral Raises', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' }
                ]
            },
            {
                id: 'mb_arms', name: 'Arms + Core', dayOfWeek: 'Friday', color: '#a855f7',
                exercises: [
                    { name: 'Close-Grip Bench Press (Smith Machine)', sets: 3, repsTarget: '8-12', rest: '90s', notes: '' },
                    { name: 'Cable Tricep Pushdowns (Rope)', sets: 3, repsTarget: '12-15', rest: '60s', notes: '' },
                    { name: 'Barbell Bicep Curls', sets: 3, repsTarget: '8-12', rest: '60s', notes: '' },
                    { name: 'Machine Preacher Curls', sets: 3, repsTarget: '10-12', rest: '60s', notes: '' },
                    { name: 'Seated Abdominal Crunch Machine', sets: 3, repsTarget: '12-15', rest: '45s', notes: '' },
                    { name: 'Cable Wood Chop High-to-Low (Both Sides)', sets: 3, repsTarget: '10-12/side', rest: '45s', notes: '' }
                ]
            }
        ]
    }

    // You can easily add arnold, pushpull, etc. following the same pattern
};



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
    setActiveProgramName(null);               // clear active name
    if (typeof SupabaseSync !== 'undefined') SupabaseSync.deleteCustomProgram();
}

function isCustomProgram() {
    return localStorage.getItem('flt_custom_program') !== null;
}

// ========== SAVED PROGRAMS (multiple named programs) ==========
function getSavedPrograms() {
    try {
        const raw = localStorage.getItem('flt_saved_programs');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') return parsed;
        }
    } catch (e) { console.warn('Error loading saved programs:', e); }
    return {};
}

function saveSavedPrograms(programs) {
    try {
        localStorage.setItem('flt_saved_programs', JSON.stringify(programs));
    } catch (e) { console.error('Error saving programs list:', e); }
}

function saveCurrentProgramAs(name) {
    if (!name || !name.trim()) return false;
    const nameClean = name.trim();
    const current = getTrainingProgram();
    const programs = getSavedPrograms();
    programs[nameClean] = JSON.parse(JSON.stringify(current)); // deep clone
    saveSavedPrograms(programs);
    setActiveProgramName(nameClean);
    return true;
}

function loadSavedProgram(name) {
    const programs = getSavedPrograms();
    if (!programs[name]) return false;
    saveTrainingProgram(JSON.parse(JSON.stringify(programs[name])));
    setActiveProgramName(name);
    return true;
}

function deleteSavedProgram(name) {
    const programs = getSavedPrograms();
    if (!programs[name]) return false;
    delete programs[name];
    saveSavedPrograms(programs);
    return true;
}

// ========== ACTIVE PROGRAM NAME ==========
function getActiveProgramName() {
    try {
        return localStorage.getItem('flt_active_program_name') || null;
    } catch {
        return null;
    }
}

function setActiveProgramName(name) {
    try {
        if (name) {
            localStorage.setItem('flt_active_program_name', name);
        } else {
            localStorage.removeItem('flt_active_program_name');
        }
    } catch (e) {
        console.warn('Error setting active program name:', e);
    }
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

// ========== EXERCISE DATABASE (with videoUrl for ALL exercises) ==========
// Replace the existing EXERCISE_DATABASE in js/data.js with this block.

const EXERCISE_DATABASE = [
    // ── CHEST ──
    { name: 'Barbell Bench Press', category: 'Chest', equipment: 'Barbell', notes: 'Control the negative (3 sec down), retract shoulder blades', videoUrl: 'https://www.youtube.com/watch?v=hWbUlkb5Ms4' },
    { name: 'Dumbbell Bench Press', category: 'Chest', equipment: 'Dumbbell', notes: 'Full stretch at bottom, squeeze chest at top', videoUrl: 'https://www.youtube.com/watch?v=VmB1G1K7v94' },
    { name: 'Incline Barbell Press', category: 'Chest', equipment: 'Barbell', notes: '30-45° incline, focus on upper chest', videoUrl: 'https://www.youtube.com/watch?v=DbFgADa2PL8' },
    { name: 'Incline Dumbbell Press', category: 'Chest', equipment: 'Dumbbell', notes: '30° incline angle, focus on upper chest contraction', videoUrl: 'https://www.youtube.com/watch?v=8iPEno-62eY' },
    { name: 'Decline Barbell Press', category: 'Chest', equipment: 'Barbell', notes: 'Targets lower chest, keep feet locked in', videoUrl: 'https://www.youtube.com/watch?v=LfyQBUKR8SE' },
    { name: 'Chest Press Machine', category: 'Chest', equipment: 'Machine', notes: 'Control the negative (3 sec down)', videoUrl: 'https://www.youtube.com/watch?v=xUm0BiZCWlQ' },
    { name: 'Incline Chest Press Machine', category: 'Chest', equipment: 'Machine', notes: 'Focus on upper chest, pause at contraction', videoUrl: 'https://www.youtube.com/watch?v=DbFgADa2PL8' },
    { name: 'Pec Deck Fly Machine', category: 'Chest', equipment: 'Machine', notes: 'Squeeze chest hard at peak contraction, slow return', videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0' },
    { name: 'Cable Chest Fly (High-to-Low)', category: 'Chest', equipment: 'Cable', notes: 'Arms slightly bent, focus on chest stretch and contraction', videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o' },
    { name: 'Cable Chest Fly (Low-to-High)', category: 'Chest', equipment: 'Cable', notes: 'Targets upper chest, squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o' },
    { name: 'Dumbbell Chest Fly', category: 'Chest', equipment: 'Dumbbell', notes: 'Slight bend in elbows, feel the stretch, squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0' },
    { name: 'Push-Ups', category: 'Chest', equipment: 'Bodyweight', notes: 'Keep core tight, full range of motion', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
    { name: 'Smith Machine Bench Press', category: 'Chest', equipment: 'Machine', notes: 'Controlled movement, good for beginners', videoUrl: 'https://www.youtube.com/watch?v=hWbUlkb5Ms4' },
    { name: 'Machine Dips', category: 'Chest', equipment: 'Machine', notes: 'Lean forward for chest emphasis, upright for triceps', videoUrl: 'https://www.youtube.com/watch?v=2W4ZNSwoW_4' },
    { name: 'Svend Press', category: 'Chest', equipment: 'Bodyweight', notes: 'Press hands together at chest level, squeeze hard', videoUrl: 'https://www.youtube.com/watch?v=cIoUZOnypS8' },
    { name: 'Smith Machine Incline Bench Press', category: 'Chest', equipment: 'Smith Machine', notes: 'Set bench at 30-45°, lower to upper chest, drive straight up', videoUrl: 'https://www.youtube.com/watch?v=DbFgADa2PL8' },
    { name: 'Smith Machine Decline Press', category: 'Chest', equipment: 'Smith Machine', notes: 'Lower chest emphasis, control the eccentric', videoUrl: 'https://www.youtube.com/watch?v=LfyQBUKR8SE' },
    { name: 'Cable Chest Press (Standing)', category: 'Chest', equipment: 'Cable', notes: 'Standing press, keep core braced and press inward', videoUrl: 'https://www.youtube.com/watch?v=YW_bpL2Eewk' },
    { name: 'Single-Arm Cable Chest Press', category: 'Chest', equipment: 'Cable', notes: 'Unilateral pressing, great for anti-rotation stability', videoUrl: 'https://www.youtube.com/watch?v=uVmRqrTcHyc' },
    { name: 'Cable Fly (Low to High)', category: 'Chest', equipment: 'Cable', notes: 'Targets upper chest, bring handles up and inward', videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o' },
    { name: 'Cable Fly (High to Low)', category: 'Chest', equipment: 'Cable', notes: 'Targets lower chest, pull down and inward', videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o' },
    { name: 'Cable Press-Around', category: 'Chest', equipment: 'Cable', notes: 'Arc arm across body for shortened-position chest work', videoUrl: 'https://www.youtube.com/watch?v=FXw1HDVOOh8' },
    { name: 'Decline Dumbbell Press', category: 'Chest', equipment: 'Dumbbell', notes: 'Targets lower chest, full stretch at bottom', videoUrl: 'https://www.youtube.com/watch?v=LfyQBUKR8SE' },
    { name: 'Incline Smith Machine Press', category: 'Chest', equipment: 'Machine', notes: 'Upper chest focus with guided path', videoUrl: 'https://www.youtube.com/watch?v=DbFgADa2PL8' },
    { name: 'Cable Crossover (High to Low)', category: 'Chest', equipment: 'Cable', notes: 'Constant tension, cross hands at bottom', videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o' },
    { name: 'Cable Crossover (Low to High)', category: 'Chest', equipment: 'Cable', notes: 'Upper chest emphasis', videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o' },
    { name: 'Dumbbell Pullover', category: 'Chest', equipment: 'Dumbbell', notes: 'Lying on bench, stretch lats/chest at bottom', videoUrl: 'https://www.youtube.com/watch?v=FK4rHfKo97U' },
    { name: 'Floor Press (Barbell or DB)', category: 'Chest', equipment: 'Dumbbell', notes: 'Limited range, heavy tricep + chest work', videoUrl: 'https://www.youtube.com/watch?v=uUGDRwdaC58' },
    { name: 'Guillotine Press', category: 'Chest', equipment: 'Barbell', notes: 'Wide grip to neck level — advanced upper chest', videoUrl: 'https://www.youtube.com/watch?v=hWbUlkb5Ms4' },
    { name: 'Hex Press (Svend Variation)', category: 'Chest', equipment: 'Dumbbell', notes: 'Dumbbells pressed together, constant inner chest squeeze', videoUrl: 'https://www.youtube.com/watch?v=cIoUZOnypS8' },
    { name: 'Incline Push-Ups', category: 'Chest', equipment: 'Bodyweight', notes: 'Hands elevated — easier variation', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
    { name: 'Decline Push-Ups', category: 'Chest', equipment: 'Bodyweight', notes: 'Feet elevated — harder variation', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
    { name: 'Chest Dips (Weighted)', category: 'Chest', equipment: 'Bodyweight', notes: 'Lean forward, full range', videoUrl: 'https://www.youtube.com/watch?v=2W4ZNSwoW_4' },
    { name: 'Pec Deck Fly (Single Arm)', category: 'Chest', equipment: 'Machine', notes: 'Unilateral for imbalances', videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0' },
    { name: 'Resistance Band Chest Fly', category: 'Chest', equipment: 'Band', notes: 'Home-friendly constant tension', videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o' },
    { name: 'Landmine Chest Press', category: 'Chest', equipment: 'Barbell', notes: 'Unilateral or bilateral pressing', videoUrl: 'https://www.youtube.com/watch?v=YW_bpL2Eewk' },
    { name: 'Deficit Push-Ups', category: 'Chest', equipment: 'Bodyweight', notes: 'Hands on elevated surfaces for deeper stretch', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
    { name: 'Incline Dumbbell Fly', category: 'Chest', equipment: 'Dumbbell', notes: '30° incline angle, focus on upper chest contraction', videoUrl: 'https://www.youtube.com/watch?v=bDa6DnFmerY' },

    // ── BACK ──
    { name: 'Barbell Rows (Bent-Over)', category: 'Back', equipment: 'Barbell', notes: 'Maintain flat back, pull to lower chest', videoUrl: 'https://www.youtube.com/watch?v=kBWAon7ItDw' },
    { name: 'Lat Pulldown (Wide Grip)', category: 'Back', equipment: 'Cable', notes: 'Pull to upper chest, squeeze lats at bottom', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
    { name: 'Lat Pulldown (Close Grip)', category: 'Back', equipment: 'Cable', notes: 'Full stretch at top, squeeze at bottom', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
    { name: 'Lat Pulldown (Underhand)', category: 'Back', equipment: 'Cable', notes: 'Supinated grip targets lower lats more', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
    { name: 'Seated Cable Rows (Close Grip)', category: 'Back', equipment: 'Cable', notes: 'Pull to lower abs, squeeze shoulder blades', videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74' },
    { name: 'Seated Cable Rows (Wide Grip)', category: 'Back', equipment: 'Cable', notes: 'Pull to upper abs, elbows flared out', videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74' },
    { name: 'Straight Arm Pulldowns (Cable)', category: 'Back', equipment: 'Cable', notes: 'Isolate lats, keep arms straight throughout', videoUrl: 'https://www.youtube.com/watch?v=kiuVAacC4iI' },
    { name: 'Assisted Pull-Up Machine', category: 'Back', equipment: 'Machine', notes: 'Use assistance to hit target reps, full stretch at bottom', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { name: 'Chest-Supported Row Machine', category: 'Back', equipment: 'Machine', notes: 'Chest on pad removes lower back stress', videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74' },
    { name: 'T-Bar Row', category: 'Back', equipment: 'Barbell', notes: 'Keep chest on pad or brace core, squeeze at contraction', videoUrl: 'https://www.youtube.com/watch?v=j3Igk5nyZE4' },
    { name: 'Single Arm Dumbbell Row', category: 'Back', equipment: 'Dumbbell', notes: 'Pull elbow to hip, full range of motion', videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo' },
    { name: 'Back Extension Machine', category: 'Back', equipment: 'Machine', notes: 'Focus on lower back contraction at top', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Hyperextensions (45°)', category: 'Back', equipment: 'Bodyweight', notes: 'Hinge at hips, squeeze glutes at top', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Plate Loaded Row', category: 'Back', equipment: 'Machine', notes: 'Chest-supported or T-bar style plate loaded row', videoUrl: 'https://www.youtube.com/watch?v=j3Igk5nyZE4' },
    { name: 'Plate Loaded Pulldown Machine', category: 'Back', equipment: 'Machine', notes: 'Neutral or wide grip — full stretch at top', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
    { name: 'Pull-Ups (Wide Grip)', category: 'Back', equipment: 'Bodyweight', notes: 'Full range, pull chest to bar if possible; use assistance if needed', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { name: 'Chin-Ups (Supinated Grip)', category: 'Back', equipment: 'Bodyweight', notes: 'Underhand grip, emphasizes lower lats and biceps', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { name: 'Neutral Grip Pull-Ups', category: 'Back', equipment: 'Machine', notes: 'Palms facing each other — joint friendly', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { name: 'Bent-Over Dumbbell Rows', category: 'Back', equipment: 'Dumbbell', notes: 'Both arms or single-arm supported on bench', videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo' },
    { name: 'Pendlay Rows', category: 'Back', equipment: 'Barbell', notes: 'Reset bar on floor each rep, explosive pull', videoUrl: 'https://www.youtube.com/watch?v=axoeDmW0oAY' },
    { name: 'Seal Rows', category: 'Back', equipment: 'Dumbbell', notes: 'Lying face down on elevated bench — strict form', videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo' },
    { name: 'Meadows Rows', category: 'Back', equipment: 'Barbell', notes: 'Single-arm landmine-style row', videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo' },
    { name: 'Cable Face Pulls', category: 'Back', equipment: 'Cable', notes: 'Rear delts + upper back, high pulley', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Inverted Rows', category: 'Back', equipment: 'Bodyweight', notes: 'Under a bar or rings, pull chest up', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { name: 'Single-Arm Cable Rows', category: 'Back', equipment: 'Cable', notes: 'Seated or standing, focus on one side', videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo' },
    { name: 'Dumbbell Pullovers', category: 'Back', equipment: 'Dumbbell', notes: 'Lying on bench, stretch lats at bottom', videoUrl: 'https://www.youtube.com/watch?v=FK4rHfKo97U' },
    { name: 'Rack Pulls', category: 'Back', equipment: 'Barbell', notes: 'Partial deadlift from knee height — heavy upper back focus', videoUrl: 'https://www.youtube.com/watch?v=ZaTM37cfiDs' },
    { name: 'Deadlift (Conventional)', category: 'Back', equipment: 'Barbell', notes: 'Full body, maintain neutral spine', videoUrl: 'https://www.youtube.com/watch?v=ZaTM37cfiDs' },
    { name: 'Romanian Deadlift', category: 'Back', equipment: 'Barbell', notes: 'Hamstring and lower back emphasis', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Good Mornings', category: 'Back', equipment: 'Barbell', notes: 'Hinge at hips with light bar on back', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Band Pull-Aparts', category: 'Back', equipment: 'Band', notes: 'Great for upper back posture and warm-up', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Y-T-I Raises (Prone)', category: 'Back', equipment: 'Bodyweight', notes: 'Lying face down, form letters Y-T-I for rear delts/upper back', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Cable Seated Rows (Neutral Grip)', category: 'Back', equipment: 'Cable', notes: 'V-bar or rope grip', videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74' },
    { name: 'Lat-Focused Pulldowns (Narrow Grip)', category: 'Back', equipment: 'Cable', notes: 'Emphasize lat stretch and contraction', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
    { name: 'Machine Low Row', category: 'Back', equipment: 'Machine', notes: 'Chest supported variation', videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74' },
    { name: 'Farmer\\', category: 'Back', equipment: 'Dumbbell', notes: 'Heavy walks for grip and upper back endurance', videoUrl: 'https://www.youtube.com/watch?v=Fkzk_RqlYig' },
    { name: 'Trap Bar Deadlift', category: 'Back', equipment: 'Trap Bar', notes: 'More quad-friendly deadlift variation', videoUrl: 'https://www.youtube.com/watch?v=ZaTM37cfiDs' },
    { name: 'Smith Machine Bent-Over Row', category: 'Back', equipment: 'Smith Machine', notes: 'Brace core and pull bar toward lower abs', videoUrl: 'https://www.youtube.com/watch?v=kBWAon7ItDw' },
    { name: 'Cable Pullover', category: 'Back', equipment: 'Cable', notes: 'Lat-focused movement, pull in an arc', videoUrl: 'https://www.youtube.com/watch?v=FK4rHfKo97U' },
    { name: 'Half-Kneeling Single-Arm Pulldown', category: 'Back', equipment: 'Cable', notes: 'Drive elbow down, excellent unilateral lat work', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
    { name: 'Cable High Row', category: 'Back', equipment: 'Cable', notes: 'Pull high toward face/upper chest for rear delts and upper back', videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74' },
    { name: 'Cable Low Row', category: 'Back', equipment: 'Cable', notes: 'Pull toward lower torso, focus on contraction', videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74' },

    // ── TRAPS ──
    { name: 'Dumbbell Shrugs', category: 'Traps', equipment: 'Dumbbell', notes: 'Traps + upper shoulders, hold squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=c3ZGl4pAwZ4' },
    { name: 'Cable Y-Raise', category: 'Traps', equipment: 'Cable', notes: 'Great for upper traps and shoulder stability', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Barbell Shrugs', category: 'Traps', equipment: 'Dumbbell', notes: 'Traps and upper back, hold squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=c3ZGl4pAwZ4' },
    { name: 'Smith Machine Shrugs', category: 'Traps', equipment: 'Smith Machine', notes: 'Guided heavy shrugs', videoUrl: 'https://www.youtube.com/watch?v=c3ZGl4pAwZ4' },
    { name: 'Face Pulls (Cable)', category: 'Traps', equipment: 'Cable', notes: 'Upper traps + rear delts', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },

    // ── SHOULDERS ──
    { name: 'Seated Machine Shoulder Press', category: 'Shoulders', equipment: 'Machine', notes: 'Keep shoulder blades down and back', videoUrl: 'https://www.youtube.com/watch?v=Wqq43dKW1TU' },
    { name: 'Seated Overhead Dumbbell Press', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Control descent, avoid locking out elbows', videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
    { name: 'Barbell Overhead Press', category: 'Shoulders', equipment: 'Barbell', notes: 'Brace core, press straight up', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
    { name: 'Arnold Press', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Rotate palms outward as you press up', videoUrl: 'https://www.youtube.com/watch?v=6Z15_WdXmVw' },
    { name: 'Dumbbell Lateral Raises', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Light weight, strict form for side delts', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { name: 'Cable Lateral Raises', category: 'Shoulders', equipment: 'Cable', notes: 'Constant cable tension for side delts', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { name: 'Machine Lateral Raises', category: 'Shoulders', equipment: 'Machine', notes: 'Consistent tension, control the eccentric', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { name: 'Rear Delt Fly Machine', category: 'Shoulders', equipment: 'Machine', notes: 'Focus on rear delts, slow and controlled', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Dumbbell Front Raises', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Raise to shoulder height, control the descent', videoUrl: 'https://www.youtube.com/watch?v=gzMrK2CSpWU' },
    { name: 'Standing Dumbbell Shoulder Press', category: 'Shoulders', equipment: 'Dumbbell', notes: 'More core engagement, press overhead with control', videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
    { name: 'Single-Arm Dumbbell Shoulder Press', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Seated or standing, alternate arms or focus on one side', videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
    { name: 'Landmine Press', category: 'Shoulders', equipment: 'Barbell', notes: 'Unilateral, great for shoulder stability', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
    { name: 'Z-Press', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Seated on floor with no back support — advanced core + shoulder', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
    { name: 'Pike Push-Ups', category: 'Shoulders', equipment: 'Bodyweight', notes: 'Elevate feet for more difficulty, hips high', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
    { name: 'Leaning Lateral Raises', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Lean away from working side for better range', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { name: 'Y-Raises (Scaption)', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Thumbs up, 45-degree angle — rotator cuff friendly', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Band Lateral Raises', category: 'Shoulders', equipment: 'Band', notes: 'Constant tension, excellent for warm-up or home', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { name: 'Dumbbell Rear Delt Fly', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Bent-over or prone on incline bench, squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Cable Rear Delt Fly', category: 'Shoulders', equipment: 'Cable', notes: 'High pulley crossover or rear fly motion', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Bent-Over Rear Delt Rows', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Elbows high, pull like a wide row', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Dumbbell Upright Rows', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Elbows lead, keep below shoulder height', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { name: 'Cable Front Raises', category: 'Shoulders', equipment: 'Cable', notes: 'Single or dual arm, controlled movement', videoUrl: 'https://www.youtube.com/watch?v=gzMrK2CSpWU' },
    { name: 'Incline Dumbbell Front Raises', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Lying on incline bench for support', videoUrl: 'https://www.youtube.com/watch?v=gzMrK2CSpWU' },
    { name: 'Dumbbell Overhead Carry', category: 'Shoulders', equipment: 'Dumbbell', notes: 'One or two arms overhead while walking', videoUrl: 'https://www.youtube.com/watch?v=Fkzk_RqlYig' },
    { name: 'Dumbbell Halo', category: 'Shoulders', equipment: 'Dumbbell', notes: 'Circle around head for mobility and stability', videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
    { name: 'Band Overhead Pull-Aparts', category: 'Shoulders', equipment: 'Band', notes: 'External rotation and shoulder mobility', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Wall Angels', category: 'Shoulders', equipment: 'Bodyweight', notes: 'Back against wall, slide arms up and down for mobility', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Machine Pec Deck Reverse Fly', category: 'Shoulders', equipment: 'Machine', notes: 'Rear delt focus (already in program but good to keep)', videoUrl: 'https://www.youtube.com/watch?v=rep-aKOi4iI' },
    { name: 'Egyptian Lateral Raises', category: 'Shoulders', equipment: 'Cable', notes: 'Lean into cable for stretch (already partially covered)', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { name: 'Smith Machine Upright Row', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Pull elbows high, lead with elbows, avoid excessive height', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { name: 'Cable Lateral Raise', category: 'Shoulders', equipment: 'Cable', notes: 'Constant tension, raise with control', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { name: 'Cable Front Raise', category: 'Shoulders', equipment: 'Cable', notes: 'Lift forward smoothly without swinging', videoUrl: 'https://www.youtube.com/watch?v=gzMrK2CSpWU' },
    { name: 'Smith Machine Seated Overhead Press', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Use bench support, press straight up with control', videoUrl: 'https://www.youtube.com/watch?v=Wqq43dKW1TU' },
    { name: 'Smith Machine Standing Overhead Press', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Brace core and keep bar path vertical', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
    { name: 'Smith Machine High Incline Press', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Bench at high incline to bias front delts', videoUrl: 'https://www.youtube.com/watch?v=DbFgADa2PL8' },
    { name: 'Smith Machine Front Raise', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Raise bar to shoulder height with controlled tempo', videoUrl: 'https://www.youtube.com/watch?v=gzMrK2CSpWU' },
    { name: 'Smith Machine Wide-Grip Upright Row', category: 'Shoulders', equipment: 'Smith Machine', notes: 'Wider grip can bias side delts more than a narrow grip', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },

    // ── BICEPS ──
    { name: 'Barbell Bicep Curls', category: 'Biceps', equipment: 'Barbell', notes: 'Keep elbows tucked, avoid swinging', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Dumbbell Bicep Curls', category: 'Biceps', equipment: 'Dumbbell', notes: 'Alternate arms or together, full range', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Dumbbell Hammer Curls', category: 'Biceps', equipment: 'Dumbbell', notes: 'Thumb up grip, targets brachialis and forearms', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEhin0' },
    { name: 'Machine Preacher Curls', category: 'Biceps', equipment: 'Machine', notes: 'Isolate biceps, focus on peak contraction', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Cable Bicep Curls', category: 'Biceps', equipment: 'Cable', notes: 'Constant tension throughout, squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Concentration Curls', category: 'Biceps', equipment: 'Dumbbell', notes: 'Elbow on thigh, full squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Incline Dumbbell Curls', category: 'Biceps', equipment: 'Dumbbell', notes: 'Full stretch at bottom, great for peak', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'EZ-Bar Bicep Curls', category: 'Biceps', equipment: 'Barbell', notes: 'EZ grip reduces wrist strain', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Preacher Barbell Curls', category: 'Biceps', equipment: 'Barbell', notes: 'Strict form on preacher bench', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Cable Hammer Curls (Rope)', category: 'Biceps', equipment: 'Cable', notes: 'Neutral grip for brachialis', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEhin0' },
    { name: 'Spider Curls', category: 'Biceps', equipment: 'Dumbbell', notes: 'Lying face down on incline bench', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: '21s (Barbell or DB)', category: 'Biceps', equipment: 'Dumbbell', notes: '7 bottom half, 7 top half, 7 full reps', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Cable Concentration Curls', category: 'Biceps', equipment: 'Cable', notes: 'Single arm, peak contraction', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Zottman Curls', category: 'Biceps', equipment: 'Dumbbell', notes: 'Supinated up, pronated down', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEhin0' },
    { name: 'Chin-Ups (Supinated)', category: 'Biceps', equipment: 'Bodyweight', notes: 'Underhand grip, full range', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { name: 'Band Bicep Curls', category: 'Biceps', equipment: 'Band', notes: 'Constant tension, great finisher', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Drag Curls', category: 'Biceps', equipment: 'Barbell', notes: 'Bar drags up body, elbows back', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Cable Curl', category: 'Biceps', equipment: 'Cable', notes: 'Constant tension, curl with elbows fixed', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Bayesian Curl', category: 'Biceps', equipment: 'Cable', notes: 'Arm set behind torso for a big biceps stretch', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Cable Preacher Curl', category: 'Biceps', equipment: 'Cable', notes: 'Use preacher bench with low pulley for constant tension', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'High Cable Curl', category: 'Biceps', equipment: 'Cable', notes: 'Double-biceps style curl, elbows high', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Single-Arm Cable Bicep Curl', category: 'Biceps', equipment: 'Cable', notes: 'Stand sideways to cable, full stretch at bottom, squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Single-Arm Cable Hammer Curl', category: 'Biceps', equipment: 'Cable', notes: 'Neutral grip with rope attachment, targets brachialis', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEhin0' },
    { name: 'Single-Arm Cable Preacher Curl', category: 'Biceps', equipment: 'Cable', notes: 'Use bench for support, strict isolation', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'High Cable Bicep Curl', category: 'Biceps', equipment: 'Cable', notes: 'High pulley, arms out to sides, curl hands toward head for peak contraction', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Overhead Cable Curl (High Pulley)', category: 'Biceps', equipment: 'Cable', notes: 'Stand between high pulleys, curl across body or directly — great stretch', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },

    // ── TRICEPS ──
    { name: 'Cable Tricep Pushdowns (Rope)', category: 'Triceps', equipment: 'Cable', notes: 'Keep elbows pinned, squeeze at bottom', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
    { name: 'Overhead Cable Tricep Extension', category: 'Triceps', equipment: 'Cable', notes: 'Full stretch at top, extend fully', videoUrl: 'https://www.youtube.com/watch?v=1u18yJELsh0' },
    { name: 'Skull Crushers (EZ Bar)', category: 'Triceps', equipment: 'Barbell', notes: 'Lower to forehead, extend fully at top', videoUrl: 'https://www.youtube.com/watch?v=d_KBjGOaC8E' },
    { name: 'Overhead Dumbbell Tricep Ext.', category: 'Triceps', equipment: 'Dumbbell', notes: 'Full stretch overhead, keep elbows in', videoUrl: 'https://www.youtube.com/watch?v=YbX7WdG1gpg' },
    { name: 'Tricep Kickbacks (Dumbbell)', category: 'Triceps', equipment: 'Dumbbell', notes: 'Hinge at hips, extend arm fully back, squeeze', videoUrl: 'https://www.youtube.com/watch?v=6Jz0Wc-jJY4' },
    { name: 'Close-Grip Bench Press', category: 'Triceps', equipment: 'Barbell', notes: 'Elbows close to body, tricep emphasis', videoUrl: 'https://www.youtube.com/watch?v=hWbUlkb5Ms4' },
    { name: 'Tricep Dips (Machine or Bench)', category: 'Triceps', equipment: 'Machine', notes: 'Upright torso for tricep focus', videoUrl: 'https://www.youtube.com/watch?v=2W4ZNSwoW_4' },
    { name: 'Cable Overhead Tricep Extension (Single Arm)', category: 'Triceps', equipment: 'Cable', notes: 'Unilateral, full stretch', videoUrl: 'https://www.youtube.com/watch?v=1u18yJELsh0' },
    { name: 'JM Press', category: 'Triceps', equipment: 'Barbell', notes: 'Hybrid skull crusher + close grip', videoUrl: 'https://www.youtube.com/watch?v=d_KBjGOaC8E' },
    { name: 'Tricep Pushdowns (Straight Bar)', category: 'Triceps', equipment: 'Cable', notes: 'Pronated grip variation', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
    { name: 'Diamond Push-Ups', category: 'Triceps', equipment: 'Bodyweight', notes: 'Hands in diamond shape', videoUrl: 'https://www.youtube.com/watch?v=J0DnG1_S92I' },
    { name: 'French Press (EZ or DB)', category: 'Triceps', equipment: 'Dumbbell', notes: 'Seated or lying overhead extension', videoUrl: 'https://www.youtube.com/watch?v=YbX7WdG1gpg' },
    { name: 'Bench Dips', category: 'Triceps', equipment: 'Bodyweight', notes: 'Feet elevated for progression', videoUrl: 'https://www.youtube.com/watch?v=2W4ZNSwoW_4' },
    { name: 'Cable Tricep Kickbacks', category: 'Triceps', equipment: 'Cable', notes: 'Constant tension version', videoUrl: 'https://www.youtube.com/watch?v=6Jz0Wc-jJY4' },
    { name: 'Single-Arm Overhead DB Extension', category: 'Triceps', equipment: 'Dumbbell', notes: 'One arm at a time, focus on stretch', videoUrl: 'https://www.youtube.com/watch?v=YbX7WdG1gpg' },
    { name: 'Resistance Band Pushdowns', category: 'Triceps', equipment: 'Band', notes: 'Home or travel friendly', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
    { name: 'Lying Tricep Extension (DB)', category: 'Triceps', equipment: 'Dumbbell', notes: 'Skull crusher variation with dumbbells', videoUrl: 'https://www.youtube.com/watch?v=d_KBjGOaC8E' },
    { name: 'Cable Rope Pushdown', category: 'Triceps', equipment: 'Cable', notes: 'Spread rope at bottom and fully extend elbows', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
    { name: 'Cable Straight-Bar Pushdown', category: 'Triceps', equipment: 'Cable', notes: 'Keep elbows pinned and press straight down', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
    { name: 'Cable Overhead Triceps Extension', category: 'Triceps', equipment: 'Cable', notes: 'Stretch long head fully, keep elbows steady', videoUrl: 'https://www.youtube.com/watch?v=1u18yJELsh0' },
    { name: 'Cable Skull Crusher', category: 'Triceps', equipment: 'Cable', notes: 'Keep elbows fixed and extend fully', videoUrl: 'https://www.youtube.com/watch?v=d_KBjGOaC8E' },
    { name: 'Cable Reverse-Grip Pushdown', category: 'Triceps', equipment: 'Cable', notes: 'Underhand grip, targets medial head', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
    { name: 'Cross-Body Cable Tricep Extension', category: 'Triceps', equipment: 'Cable', notes: 'Single-arm variation with strong lockout', videoUrl: 'https://www.youtube.com/watch?v=1u18yJELsh0' },
    { name: 'Single-Arm Cable Tricep Pushdown', category: 'Triceps', equipment: 'Cable', notes: 'Elbow pinned, extend arm down and squeeze tricep', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
    { name: 'Single-Arm Overhead Cable Tricep Extension', category: 'Triceps', equipment: 'Cable', notes: 'Full stretch overhead, one arm at a time', videoUrl: 'https://www.youtube.com/watch?v=1u18yJELsh0' },
    { name: 'Single-Arm Cable Tricep Pressdown (Overhand)', category: 'Triceps', equipment: 'Cable', notes: 'Straight bar or rope, focus on outer tricep head', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
    { name: 'Tate Press', category: 'Triceps', equipment: 'Dumbbell', notes: 'Lying on bench, elbows flared out, lower dumbbells to chest then press up — great tricep isolation', videoUrl: 'https://www.youtube.com/watch?v=d_KBjGOaC8E' },

    // ── FOREARMS ──
    { name: 'Dumbbell Wrist Curl (Palms Up)', category: 'Forearms', equipment: 'Dumbbell', notes: 'Seated or over bench, full range, squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=3XLXkdgeIck' },
    { name: 'Barbell Wrist Curl', category: 'Forearms', equipment: 'Barbell', notes: 'Behind back or over bench variation for flexors', videoUrl: 'https://www.youtube.com/watch?v=3XLXkdgeIck' },
    { name: 'Dumbbell Reverse Wrist Curl', category: 'Forearms', equipment: 'Dumbbell', notes: 'Palms down — targets extensors on top of forearm', videoUrl: 'https://www.youtube.com/watch?v=3XLXkdgeIck' },
    { name: 'Reverse Grip Barbell Curl', category: 'Forearms', equipment: 'Barbell', notes: 'Overhand grip biases brachioradialis', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Farmers walk', category: 'Forearms', equipment: 'Dumbbell', notes: 'Heavy DBs or trap bar, walk with strong grip and upright posture', videoUrl: 'https://www.youtube.com/watch?v=Fkzk_RqlYig' },
    { name: 'Plate Pinch Hold', category: 'Forearms', equipment: 'Other', notes: 'Pinch smooth plates together and hold for time', videoUrl: 'https://www.youtube.com/watch?v=Fkzk_RqlYig' },
    { name: 'Dead Hang from Pull-Up Bar', category: 'Forearms', equipment: 'Bodyweight', notes: 'Grip strength + lat stretch', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { name: 'Hammer Curl (Neutral Grip)', category: 'Forearms', equipment: 'Dumbbell', notes: 'Thick forearm and brachialis builder', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEhin0' },
    { name: 'Zottman Curl', category: 'Forearms', equipment: 'Dumbbell', notes: 'Curl up supinated, rotate and lower pronated', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEhin0' },
    { name: 'Wrist Pronation/Supination Rotations', category: 'Forearms', equipment: 'Dumbbell', notes: 'Hold light dumbbell, rotate wrist from palm up to palm down — excellent for forearm rotators and grip', videoUrl: 'https://www.youtube.com/watch?v=3XLXkdgeIck' },
    { name: 'Single-Arm Wrist Pronation/Supination', category: 'Forearms', equipment: 'Dumbbell', notes: 'One arm at a time, controlled rotations for balanced development', videoUrl: 'https://www.youtube.com/watch?v=3XLXkdgeIck' },
    { name: 'Barbell Reverse Curl', category: 'Forearms', equipment: 'Barbell', notes: 'Overhand (pronated) grip, elbows tucked, control the eccentric — strong brachioradialis builder', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'EZ-Bar Reverse Curl', category: 'Forearms', equipment: 'Barbell', notes: 'EZ bar is easier on the wrists than a straight bar while still targeting brachioradialis', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Dumbbell Reverse Curl', category: 'Forearms', equipment: 'Dumbbell', notes: 'Palms facing down throughout, curl with control, avoid swinging', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Cable Reverse Curl', category: 'Forearms', equipment: 'Cable', notes: 'Use straight bar or EZ attachment, constant tension, overhand grip', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Cable Reverse Curl (Rope)', category: 'Forearms', equipment: 'Cable', notes: 'Rope attachment with overhand grip, slight outward rotation at the top', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Preacher Reverse Curl (EZ-Bar)', category: 'Forearms', equipment: 'Barbell', notes: 'Strict isolation on preacher bench, overhand grip, slow negatives', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Machine Reverse Curl', category: 'Forearms', equipment: 'Machine', notes: 'If available, overhand grip on preacher or seated curl machine', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Single-Arm Dumbbell Reverse Curl', category: 'Forearms', equipment: 'Dumbbell', notes: 'One arm at a time for better focus and imbalance correction', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },

    // ── QUADS ──
    { name: 'Leg Press Machine', category: 'Quads', equipment: 'Machine', notes: 'Feet shoulder-width, don\'t lock knees', videoUrl: 'https://youtu.be/ETOAyWM6i6A?si=Wn07Z6AUzFK18Sbq' },
    { name: 'Leg Extension Machine', category: 'Quads', equipment: 'Machine', notes: 'Squeeze quads hard at the top', videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0' },
    { name: 'Barbell Back Squat', category: 'Quads', equipment: 'Barbell', notes: 'Chest up, knees track over toes', videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
    { name: 'Goblet Squat (DB)', category: 'Quads', equipment: 'Dumbbell', notes: 'Squat to comfortable depth, chest up', videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
    { name: 'Bulgarian Split Squat', category: 'Quads', equipment: 'Dumbbell', notes: 'Rear foot elevated, drive through heel', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Lunges (Dumbbell)', category: 'Quads', equipment: 'Dumbbell', notes: 'Step forward, knee to 90°, push back up', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Smith Machine Back Squat', category: 'Quads', equipment: 'Smith Machine', notes: 'Feet slightly forward if needed, descend under control', videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
    { name: 'Smith Machine Front Squat', category: 'Quads', equipment: 'Smith Machine', notes: 'More upright torso, strong quad emphasis', videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
    { name: 'Smith Machine Split Squat', category: 'Quads', equipment: 'Smith Machine', notes: 'Staggered stance, drive through front heel', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Smith Machine Reverse Lunge', category: 'Quads', equipment: 'Smith Machine', notes: 'Step back smoothly, keep front knee tracking over toes', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Smith Machine Bulgarian Split Squat', category: 'Quads', equipment: 'Smith Machine', notes: 'Rear foot elevated, strong quad and glute stimulus', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Hack Squat Machine', category: 'Quads', equipment: 'Machine', notes: 'Great quad isolation with back support', videoUrl: 'https://www.youtube.com/watch?v=rYgNArpwE7E' },
    { name: 'Step-Ups (High Box)', category: 'Quads', equipment: 'Dumbbell', notes: 'Drive through heel, squeeze glute at top', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },

    // ── HAMSTRINGS ──
    { name: 'Romanian Deadlift (DB/Barbell)', category: 'Hamstrings', equipment: 'Barbell', notes: 'Hinge at hips, slight knee bend, feel hamstring stretch', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Leg Curl Machine', category: 'Hamstrings', equipment: 'Machine', notes: 'Slow and controlled negative', videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuQ4' },
    { name: 'Smith Machine Romanian Deadlift', category: 'Hamstrings', equipment: 'Smith Machine', notes: 'Hinge at hips, slight knee bend, feel hamstring stretch', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Smith Machine Good Morning', category: 'Hamstrings', equipment: 'Smith Machine', notes: 'Use light-moderate load, hinge carefully, keep spine neutral', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Cable Hamstring Curl', category: 'Hamstrings', equipment: 'Cable', notes: 'Use ankle strap, prone or standing setup', videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuQ4' },
    { name: 'Dumbbell Romanian Deadlift', category: 'Hamstrings', equipment: 'Dumbbell', notes: 'Hinge at hips with slight knee bend, feel deep hamstring stretch, drive through heels', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Single-Leg Romanian Deadlift (DB)', category: 'Hamstrings', equipment: 'Dumbbell', notes: 'Balance on one leg, hinge forward, keep back flat — great for stability', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Glute Ham Raise (Machine or Bodyweight)', category: 'Hamstrings', equipment: 'Machine', notes: 'Controlled eccentric, squeeze hamstrings and glutes at top', videoUrl: 'https://www.youtube.com/watch?v=DAwJCKwMUIg' },
    { name: 'Lying Dumbbell Leg Curl', category: 'Hamstrings', equipment: 'Dumbbell', notes: 'Place DB between feet/ankles, curl toward glutes with control', videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuQ4' },
    { name: 'Good Morning (Dumbbell or Barbell)', category: 'Hamstrings', equipment: 'Dumbbell', notes: 'Hinge at hips with flat back, light weight to start, feel hamstring stretch', videoUrl: 'https://www.youtube.com/watch?v=_oyxCn2iSjU' },
    { name: 'Nordic Hamstring Curl (Assisted)', category: 'Hamstrings', equipment: 'Bodyweight', notes: 'Kneel and lower slowly under control — advanced, use assistance if needed', videoUrl: 'https://www.youtube.com/watch?v=DAwJCKwMUIg' },
    { name: 'Swiss Ball Leg Curl', category: 'Hamstrings', equipment: 'Bodyweight', notes: 'Bridge position, curl ball toward glutes with heels on ball', videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuQ4' },

    // ── GLUTES ──
    { name: 'Barbell Hip Thrust', category: 'Glutes', equipment: 'Barbell', notes: 'Drive hips up, squeeze glutes hard at top, chin tucked', videoUrl: 'https://www.youtube.com/watch?v=xDmFkJ1vY1E' },
    { name: 'Smith Machine Hip Thrust', category: 'Glutes', equipment: 'Smith Machine', notes: 'Drive hips hard and pause at the top', videoUrl: 'https://www.youtube.com/watch?v=xDmFkJ1vY1E' },
    { name: 'Smith Machine Glute Bridge', category: 'Glutes', equipment: 'Smith Machine', notes: 'Shorter range than hip thrust, squeeze hard at lockout', videoUrl: 'https://www.youtube.com/watch?v=xDmFkJ1vY1E' },
    { name: 'Cable Glute Kickback', category: 'Glutes', equipment: 'Cable', notes: 'Use ankle strap and extend with control', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Cable Hip Abduction', category: 'Glutes', equipment: 'Cable', notes: 'Move leg outward for glute medius focus', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Hip Thrust (Barbell)', category: 'Glutes', equipment: 'Barbell', notes: 'Drive hips up, squeeze glutes at top', videoUrl: 'https://www.youtube.com/watch?v=xDmFkJ1vY1E' },
    { name: 'Single-Leg Hip Thrust', category: 'Glutes', equipment: 'Dumbbell', notes: 'One foot on bench — fix imbalances', videoUrl: 'https://www.youtube.com/watch?v=xDmFkJ1vY1E' },
    { name: 'Glute Bridge (Bodyweight or DB)', category: 'Glutes', equipment: 'Bodyweight', notes: 'Drive hips up, squeeze at top', videoUrl: 'https://www.youtube.com/watch?v=xDmFkJ1vY1E' },
    { name: 'Step-Ups (High Box for Glutes)', category: 'Glutes', equipment: 'Dumbbell', notes: 'Drive through heel, full hip extension at top', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Bulgarian Split Squat (Glute Focus)', category: 'Glutes', equipment: 'Dumbbell', notes: 'Lean slightly forward for more glute', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Sumo Deadlift (Barbell)', category: 'Glutes', equipment: 'Barbell', notes: 'Wide stance, drive through heels', videoUrl: 'https://www.youtube.com/watch?v=ZaTM37cfiDs' },
    { name: 'Curtsy Lunge', category: 'Glutes', equipment: 'Dumbbell', notes: 'Cross leg behind for outer glute', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Fire Hydrants (Bodyweight)', category: 'Glutes', equipment: 'Bodyweight', notes: 'Lift knee out to side', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Donkey Kicks', category: 'Glutes', equipment: 'Bodyweight', notes: 'Kick heel toward ceiling', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Hip Abduction Machine', category: 'Glutes', equipment: 'Machine', notes: 'Controlled reps for glute medius', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Machine Glute Kickback', category: 'Glutes', equipment: 'Machine', notes: 'Lean into pad, kick heel back and up, squeeze glute at top, control the return', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },

    // ── CALVES ──
    { name: 'Smith Machine Standing Calf Raise', category: 'Calves', equipment: 'Smith Machine', notes: 'Use block for full ROM and pause at the bottom', videoUrl: 'https://www.youtube.com/watch?v=YMmgqO8Jo-k' },
    { name: 'Standing Calf Raises Machine', category: 'Calves', equipment: 'Machine', notes: 'Full range of motion, pause at top', videoUrl: 'https://www.youtube.com/watch?v=YMmgqO8Jo-k' },
    { name: 'Seated Calf Raise (Machine or DB)', category: 'Calves', equipment: 'Machine', notes: 'Knees bent, full stretch at bottom and pause at top contraction', videoUrl: 'https://www.youtube.com/watch?v=YMmgqO8Jo-k' },
    { name: 'Dumbbell Standing Calf Raise', category: 'Calves', equipment: 'Dumbbell', notes: 'Hold DBs at sides or one DB, use step/block for full ROM, slow eccentric', videoUrl: 'https://www.youtube.com/watch?v=YMmgqO8Jo-k' },
    { name: 'Single-Leg Standing Calf Raise (Bodyweight or DB)', category: 'Calves', equipment: 'Dumbbell', notes: 'Balance on one foot, use wall for support if needed, full stretch and pause', videoUrl: 'https://www.youtube.com/watch?v=YMmgqO8Jo-k' },
    { name: 'Donkey Calf Raise (Machine or Partner)', category: 'Calves', equipment: 'Machine', notes: 'Hips hinged, focus on deep stretch and powerful contraction', videoUrl: 'https://www.youtube.com/watch?v=YMmgqO8Jo-k' },
    { name: 'Calf Raise on Leg Press Machine', category: 'Calves', equipment: 'Machine', notes: 'Feet low on platform, knees straight but soft, full range', videoUrl: 'https://youtu.be/M4FojyRAcuE?si=0gVAVDh7hXzc1jta' },

    // ── ADDUCTORS ──
    { name: 'Cable Hip Adduction', category: 'Adductors', equipment: 'Cable', notes: 'Cross leg inward against resistance and control return', videoUrl: 'https://www.youtube.com/watch?v=YRRnnZsRs9U' },
    { name: 'Side-Lying Adductor Lift', category: 'Adductors', equipment: 'Bodyweight', notes: 'Lie on side, lift bottom leg upward against gravity, slow and controlled', videoUrl: 'https://www.youtube.com/watch?v=YRRnnZsRs9U' },
    { name: 'Sumo Squat (Dumbbell)', category: 'Adductors', equipment: 'Dumbbell', notes: 'Wide stance, toes out, squat deep while keeping chest up — great adductor emphasis', videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
    { name: 'Cossack Squat (Bodyweight or DB)', category: 'Adductors', equipment: 'Dumbbell', notes: 'Side lunge with one leg extended, shift weight laterally, alternate sides', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Lateral Lunge (Dumbbell)', category: 'Adductors', equipment: 'Dumbbell', notes: 'Step wide to side, bend one knee and sit back into hip, push back to start', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Seated Hip Adduction (Machine)', category: 'Adductors', equipment: 'Machine', notes: 'Squeeze thighs together, control the return for full stretch', videoUrl: 'https://www.youtube.com/watch?v=YRRnnZsRs9U' },
    { name: 'Cable Hip Adduction (Standing)', category: 'Adductors', equipment: 'Cable', notes: 'Cross working leg in front of body, focus on inner thigh squeeze', videoUrl: 'https://www.youtube.com/watch?v=YRRnnZsRs9U' },
    { name: ' Copenhagen Plank/Adductor Bridge', category: 'Adductors', equipment: 'Bodyweight', notes: 'Side plank with top leg on bench/elevated, drive bottom hip up', videoUrl: 'https://www.youtube.com/watch?v=YRRnnZsRs9U' },

    // ── ABDUCTORS ──
    { name: 'Side-Lying Hip Abduction', category: 'Abductors', equipment: 'Bodyweight', notes: 'Lie on side, lift top leg upward, keep foot parallel or toes slightly down', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Clamshells (Bodyweight or Band)', category: 'Abductors', equipment: 'Bodyweight', notes: 'Side-lying with knees bent, open top knee while keeping feet together', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Dumbbell Lateral Lunge', category: 'Abductors', equipment: 'Dumbbell', notes: 'Emphasizes glute medius on the working leg — step out and push back', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
    { name: 'Fire Hydrants (Bodyweight or Band)', category: 'Abductors', equipment: 'Bodyweight', notes: 'On all fours, lift bent leg out to side like a dog at a hydrant', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Standing Hip Abduction (Cable or Band)', category: 'Abductors', equipment: 'Cable', notes: 'Move leg outward away from midline, control return', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Banded Lateral Walks', category: 'Abductors', equipment: 'Band', notes: 'Band around knees/ankles, small steps sideways in slight squat', videoUrl: 'https://www.youtube.com/watch?v=SqOymxeq0Ys' },
    { name: 'Single-Leg Glute Bridge with Abduction', category: 'Abductors', equipment: 'Bodyweight', notes: 'Bridge on one leg, then abduct the raised leg outward at top', videoUrl: 'https://www.youtube.com/watch?v=xDmFkJ1vY1E' },

    // ── CORE ──
    { name: 'Seated Abdominal Crunch Machine', category: 'Core', equipment: 'Machine', notes: 'Focus on spinal flexion, control the eccentric', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
    { name: 'Cable Wood Chop High-to-Low', category: 'Core', equipment: 'Cable', notes: 'Weak side first, rotate torso, pivot hips', videoUrl: 'https://www.youtube.com/watch?v=pApl94jM3Sc' },
    { name: 'Cable Wood Chop Low-to-High', category: 'Core', equipment: 'Cable', notes: 'Weak side first, start low, pull diagonally upward', videoUrl: 'https://www.youtube.com/watch?v=pApl94jM3Sc' },
    { name: 'Kneeling Cable Anti-Extension', category: 'Core', equipment: 'Cable', notes: 'Resist arching lower back, maintain straight torso', videoUrl: 'https://www.youtube.com/watch?v=ASdqtxKPXE8' },
    { name: 'Plank Hold', category: 'Core', equipment: 'Bodyweight', notes: 'Squeeze glutes and abs, keep hips level', videoUrl: 'https://www.youtube.com/watch?v=ASdqtxKPXE8' },
    { name: 'Side Plank Hold', category: 'Core', equipment: 'Bodyweight', notes: 'Weak side first, keep hips elevated', videoUrl: 'https://www.youtube.com/watch?v=ASdqtxKPXE8' },
    { name: 'Cable Pallof Press', category: 'Core', equipment: 'Cable', notes: 'Anti-rotation press, keep shoulders square', videoUrl: 'https://www.youtube.com/watch?v=AH_QZLm_6-k' },
    { name: 'Cable Woodchop', category: 'Core', equipment: 'Cable', notes: 'Rotate through torso under control', videoUrl: 'https://www.youtube.com/watch?v=pApl94jM3Sc' },
    { name: 'Cable Kneeling Lift', category: 'Core', equipment: 'Cable', notes: 'Diagonal lift pattern for shoulders/core', videoUrl: 'https://www.youtube.com/watch?v=pApl94jM3Sc' },
    { name: 'Cable Crunch', category: 'Core', equipment: 'Cable', notes: 'Crunch by pulling ribs toward pelvis', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
    { name: 'Dumbbell Side Bend', category: 'Core', equipment: 'Dumbbell', notes: 'Hold dumbbell in one hand, bend sideways, control the return', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
    { name: 'Dumbbell Russian Twist', category: 'Core', equipment: 'Dumbbell', notes: 'Sit with knees bent, twist side to side holding dumbbell', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
    { name: 'Dumbbell Dead Bug', category: 'Core', equipment: 'Dumbbell', notes: 'Press dumbbell toward ceiling while extending opposite arm/leg', videoUrl: 'https://www.youtube.com/watch?v=ASdqtxKPXE8' },
    { name: 'Dumbbell Woodchopper', category: 'Core', equipment: 'Dumbbell', notes: 'High to low diagonal chop motion', videoUrl: 'https://www.youtube.com/watch?v=pApl94jM3Sc' },
    { name: 'Dumbbell Suitcase Carry', category: 'Core', equipment: 'Dumbbell', notes: 'Walk while holding heavy dumbbell at side (anti-lateral flexion)', videoUrl: 'https://www.youtube.com/watch?v=Fkzk_RqlYig' },
    { name: 'Dumbbell Renegade Row', category: 'Core', equipment: 'Dumbbell', notes: 'Plank position with alternating rows - excellent anti-rotation', videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo' },

    // ── CARDIO ──
    { name: 'Treadmill Walk (Incline)', category: 'Cardio', equipment: 'Machine', notes: '10-15% incline, 3.0-3.5 mph for steady state cardio', videoUrl: 'https://www.youtube.com/watch?v=aYKqF4h-9pE' },
    { name: 'Stationary Bike (Steady State)', category: 'Cardio', equipment: 'Machine', notes: 'Moderate resistance, maintain 70-80 RPM', videoUrl: 'https://www.youtube.com/watch?v=aYKqF4h-9pE' },
    { name: 'Rowing Machine', category: 'Cardio', equipment: 'Machine', notes: '60% legs, 20% core, 20% arms', videoUrl: 'https://www.youtube.com/watch?v=zQ82RYIFLN8' },

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
