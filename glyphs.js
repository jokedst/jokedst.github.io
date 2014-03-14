var glyphs = [
    { name: ["Body", "Shell"], points: [3, 4, 5, 3], family: "1_c1" },
    { name: ["Equal"], points: [6, 3, 4, 7], family: "1_c1" },
    { name: ["Less"], points: [3, 5, 4], family: "1_c1" },
    { name: ["More"], points: [6, 5, 7], family: "1_c1" },
    { name: ["No", "Not", "Absent", "Inside"], points: [3, 4, 7], family: "1_c1" },
    { name: ["Present", "Now"], points: [3, 6, 7, 4], family: "1_c1" },
    { name: ["Simple"], points: [6, 7], family: "1_c1" },
    { name: ["Answer"], points: [3, 4, 7, 5], family: "2_c2" },
    { name: ["Complex"], points: [4, 3, 5, 6], family: "2_c2" },
    { name: ["Imperfect"], points: [4,5,6,3,5], family: "2_c2" },
    { name: ["Lie"], points: [5, 4, 7, 5, 3, 6], family: "2_c2" },
    { name: ["Seek", "Search"], points: [5, 4, 3, 6, 7], family: "2_c2" },
    { name: ["Strong"], points: [3, 4, 7, 6, 3], family: "2_c2" },
    { name: ["Truth"], points: [3, 5, 4, 7, 5, 6, 3], family: "2_c2" },
    { name: ["XM"], points: [3, 4, 7, 5, 6, 3], family: "2_c2" },
    { name: ["Barrier", "Obstacle"], points: [0, 5, 7, 9], family: "3_cl" },
    { name: ["Breathe"], points: [1, 3, 5, 4, 2], family: "3_cl" },
    { name: ["Create", "Creation"], points: [8, 6, 5, 4, 2], family: "3_cl" },
    { name: ["Destroy", "Destruction"], points: [1, 3, 5, 7, 9], family: "3_cl" },
    { name: ["Deteriorate", "Erode"], points: [3, 5, 6, 8], family: "3_cl" },
    { name: ["Die"], points: [8, 6, 5, 7, 9], family: "3_cl" },
    { name: ["Improve"], points: [2, 4, 5, 7], family: "3_cl" },
    { name: ["Path"], points: [0, 5, 6, 8], family: "3_cl" },
    { name: ["Forget"], points: [6, 8], family: "4_t" },
    { name: ["Future", "Forward-Time"], points: [2, 4, 7, 9], family: "4_t" },
    { name: ["Gain"], points: [1, 6], family: "4_t" },
    { name: ["Ignore"], points: [7, 9], family: "4_t" },
    { name: ["Lose"], points: [2, 7], family: "4_t" },
    { name: ["New"], points: [4, 7, 9], family: "4_t" },
    { name: ["Old"], points: [1, 3, 6], family: "4_t" },
    { name: ["Past"], points: [1, 3, 6, 8], family: "4_t" },
    { name: ["See"], points: [0, 3], family: "4_t" },
    { name: ["All"], points: [0, 2, 9, 10, 8, 1, 0], family: "5_o" },
    { name: ["Clear"], points: [0, 5, 10], family: "5_o" },
    { name: ["Close All"], points: [0, 1, 8, 10, 5, 0, 2, 9, 10], family: "5_o" },
    { name: ["Discover"], points: [2, 9, 10, 8], family: "5_o" },
    { name: ["Distance", "Outside"], points: [0, 1, 8], family: "5_o" },
    { name: ["Open All"], points: [0, 1, 8, 10, 6, 7, 10, 9, 2, 0], family: "5_o" },
    { name: ["Self"], points: [8, 10, 9], family: "5_o" },
    { name: ["Abandon"], points: [2, 4, 5, 6, 8, 10], family: "6_sq0" },
    { name: ["Begin"], points: [0, 6, 10, 7], family: "6_sq0" },
    { name: ["Danger"], points: [0, 3, 5, 10], family: "6_sq0" },
    { name: ["Data", "Signal"], points: [0, 4, 5, 6, 10], family: "6_sq0" },
    { name: ["Message"], points: [2, 7, 5, 3, 8], family: "6_sq0" },
    { name: ["Restraint"], points: [1, 3, 5, 7, 9, 10], family: "6_sq0" },
    { name: ["Use"], points: [2, 7, 5], family: "6_sq0" },
    { name: ["We", "Us"], points: [3, 4, 10], family: "6_sq0" },
    { name: ["Easy"], points: [4, 5, 6, 10], family: "6_sq0" },
    { name: ["Advance"], points: [0, 3, 8], family: "7_ssqw" },
    { name: ["Attack", "War"], points: [8, 3, 0, 4, 9], family: "7_ssqw" },
    { name: ["Defend"], points: [1, 6, 10, 7, 2], family: "7_ssqw" },
    { name: ["Harm"], points: [5, 4, 0, 3, 5, 7, 9], family: "7_ssqw" },
    { name: ["Impure"], points: [5, 3, 6, 5, 10], family: "7_ssqw" },
    { name: ["Perfection", "Balance"], points: [0, 5, 6, 8, 10, 9, 7, 5], family: "7_ssqw" },
    { name: ["Pure", "Purity"], points: [0, 5, 4, 7, 5], family: "7_ssqw" },
    { name: ["Retreat"], points: [0, 4, 9], family: "7_ssqw" },
    { name: ["Together"], points: [5, 3, 4, 5, 6, 8], family: "7_ssqw" },
    { name: ["Evolution"], points: [0, 5, 3, 6], family: "8_sq1" },
    { name: ["Failure"], points: [0, 5, 4, 7], family: "8_sq1" },
    { name: ["Have"], points: [7, 5, 6, 10], family: "8_sq1" },
    { name: ["Potential"], points: [0, 5, 7, 9, 2], family: "8_sq1" },
    { name: ["Pursue"], points: [1, 3, 0, 4], family: "8_sq1" },
    { name: ["Question"], points: [0, 4, 3, 6], family: "8_sq1" },
    { name: ["React"], points: [4, 3, 5, 7, 9], family: "8_sq1" },
    { name: ["Want"], points: [8, 6, 10, 7], family: "8_sq1" },
    { name: ["Weak"], points: [1, 3, 4, 7], family: "8_sq1" },
    { name: ["Conflict"], points: [8, 3, 6, 7, 4, 9], family: "9_h" },
    { name: ["Contract"], points: [7, 4, 9], family: "9_h" },
    { name: ["Courage"], points: [8, 3, 6, 7], family: "9_h" },
    { name: ["Fear"], points: [3, 4, 7, 2], family: "9_h" },
    { name: ["Government", "City", "Civilization", "Structure"], points: [1, 3, 6, 7, 4, 2], family: "9_h" },
    { name: ["Nature"], points: [8, 6, 3, 4, 7, 9], family: "9_h" },
    { name: ["Safety"], points: [8, 3, 4, 9], family: "9_h" },
    { name: ["Stability"], points: [8, 6, 7, 9], family: "9_h" },
    { name: ["Being", "Human"], points: [3, 4, 7, 10, 6, 3], family: "a_s" },
    { name: ["End", "Close"], points: [0, 2, 7, 10, 5, 0], family: "a_s" },
    { name: ["I", "Me", "Self"], points: [3, 4, 10, 3], family: "a_s" },
    { name: ["Knowledge"], points: [3, 5, 4, 10, 3], family: "a_s" },
    { name: ["Mind"], points: [3, 5, 10, 6, 3], family: "a_s" },
    { name: ["Nourish"], points: [5, 10, 8, 6, 5], family: "a_s" },
    { name: ["Open", "Accept"], points: [6, 7, 10, 6], family: "a_s" },
    { name: ["Recharge", "Repair"], points: [0, 1, 3, 5, 0], family: "a_s" },
    { name: ["Soul", "Spirit", "Life Force"], points: [4, 5, 10, 7, 4], family: "a_s" },
    { name: ["Victory"], points: [0, 3, 10, 4, 0], family: "a_s" },
    { name: ["You", "Other"], points: [0, 6, 7, 0], family: "a_s" },
    { name: ["Adapt"], points: [1, 6, 5, 7], family: "b_sq2" },
    { name: ["Change", "Modify"], points: [6, 5, 10, 7], family: "b_sq2" },
    { name: ["Difficult"], points: [2, 4, 7, 5, 6], family: "b_sq2" },
    { name: ["Hide"], points: [3, 4, 2, 7, 6], family: "b_sq2" },
    { name: ["Rebel"], points: [1, 6, 5, 4, 2, 9], family: "b_sq2" },
    { name: ["Save", "Rescue"], points: [2, 7, 5, 6], family: "b_sq2" },
    { name: ["Separate"], points: [1, 3, 6, 5, 4, 7, 9], family: "b_sq2" },
    { name: ["Share"], points: [9, 7, 6, 8, 10], family: "b_sq2" },
    { name: ["Chaos", "Disorder"], points: [8, 1, 0, 2, 4, 5, 6, 10], family: "cx" },
    { name: ["Contemplate"], points: [0, 2, 9, 10, 6, 3, 5, 4], family: "cx" },
    { name: ["Creativity", "Thought", "Idea"], points: [4, 2, 9, 7, 5, 3, 1, 8, 6], family: "cx" },
    { name: ["Destiny"], points: [3, 5, 4, 7, 6, 10], family: "cx" },
    { name: ["Enlightened"], points: [3, 4, 5, 3, 0, 2, 9, 10], family: "cx" },
    { name: ["Harmony", "Peace"], points: [0, 3, 5, 6, 10, 7, 5, 4, 0], family: "cx" },
    { name: ["Journey"], points: [2, 4, 5, 3, 1, 8, 10], family: "cx" },
    { name: ["Portal", "Opening", "Doorway"], points: [1, 3, 4, 2, 9, 7, 6, 8, 1], family: "cx" },
    { name: ["Resist", "Resistance", "Struggle"], points: [4, 3, 0, 5, 10, 6], family: "cx" },
    { name: ["Shaper", "Collective"], points: [8, 6, 3, 0, 4, 7, 9], family: "cx" },
    { name: ["Shaper/Human", "Collective/Being"], points: [8, 6, 10, 7, 9, 7, 4, 0, 3, 4, 3, 6], family: "cx" },
    { name: ["Again", "Repeat"], points: [8, 3, 6, 5, 4, 7], family: "d_sq3" },
    { name: ["Avoid", "Struggle"], points: [1, 0, 4, 2, 7], family: "d_sq3" },
    { name: ["Capture"], points: [2, 7, 5, 6, 8, 10], family: "d_sq3" },
    { name: ["Escape"], points: [0, 2, 4, 3, 6], family: "d_sq3" },
    { name: ["Follow"], points: [0, 4, 2, 9], family: "d_sq3" },
    { name: ["Help"], points: [1, 3, 5, 6, 7], family: "d_sq3" },
    { name: ["Lead"], points: [0, 1, 8, 6, 10], family: "d_sq3" },
    { name: ["Liberate"], points: [0, 2, 4, 5, 3, 8], family: "d_sq3" },
    { name: ["Pursue", "Chase"], points: [0, 5, 3, 6, 8], family: "d_sq3" }
];
var lessons = [
    { name: '1 - Centered and simple', family: '1_c1' },
    { name: "2 - More centered", family: '2_c2' },
    { name: '3 - Around the clock', family: '3_cl' },
    { name: '4 - Tiny Glyphs', family: '4_t' },
    { name: '5 - Around the edges', family: '5_o' },
    { name: '6 - Squiggly lines', family: '6_sq0' },
    { name: '7 - Short shapes', family: '7_ssqw' },
    { name: '8 - More squiggly lines', family: '8_sq1' },
    { name: '9 - Winged boxes', family: '9_h' },
    { name: '10 - Closed Shapes', family: 'a_s' },
    { name: '11 - Harder squigglies', family: 'b_sq2' },
    { name: '12 - Complex shapes', family: 'cx' },
    { name: '13 - Crazy squiggly lines', family: 'd_sq3' }
];
// A bunch of hack sequences. Perhaps use them to get how common each glyph is...
var sequenses = [
    "Attack Weak Shaper Lie",
    "Gain Portal Attack Weak",
    "Less Truth More Chaos",
    "Change Body Improve Being",
    "Shaper Past Present Future",
    "Advance Government Again Failure",
    "Shaper Mind Complex Harmony",
    "Path Restraint Strong Safety",
    "Less Chaos More Stability",
    "Strong Creativity Pursue Truth",
    "Simple Truth Breathe Nature",
    "Shaper Chaos Pure Harm",
    "Harm Evolution Pursue More Attack",
    "Simple Truth Shaper Destroy Government",
    "Present Chaos Create Future Government",
    "Rebel Creativity Evolution Destiny Present",
    "Avoid Chaos Avoid Shaper Lie",
    "Create Future Change Destiny",
    "Escape Impure Future",
    "Pursue Nature",
    "Question Truth Gain Future",
    "Soul Rebel Being Die",
    "Contemplate Self Path Truth",
    "Deteriorate Being Weak Rebel",
    "Forget Conflict Open Attack",
    "Ignore Being Chaos Lie",
    "Being Soul Strong Pure",
    "Separate Weak Ignore Truth",
    "Simple Message Complex Creativity",
    "Portal Potential Change Future",
    "Close All Open All Discover Truth",
    "Clear Mind Open Mind",
    "Seek Destiny Create Pure Future",
    "Breathe Again Journey Again",
    "All Chaos No Body",
    "Shaper Mind Complex Harmony",
    "Seek Data Discover Path",
    "Soul Rebel Being Die",
    "Being Past Present Future",
    "Being Past Present Future",
    "Contemplate Potential Perfection",
    "Hide Journey Truth",
    "Gain Government Harmony",
    "End Journey Discover Destiny",
    "Use Restraint Follow Easy Path",
    "Portal Change Government End",
    "XM Have Mind Journey",
    "Less Soul More Mind",
    "Complex Shaper Government Strong",
    "Deteriorate Being Weak Rebel",
    "Close All Open All Discover Truth",
    "Journey No Improve Soul",
    "Attack Create Danger",
    "Shaper Mind Complex Harmony",
    "Present Chaos Create Future Government",
    "Less Soul More Mind",
    "Shaper Mind Complex Harmony",
    "Discover Shaper Lie",
    "Shaper Message End Government",
    "See Truth See Future",
    "Strong Together Avoid Attack",
    "Lose Danger Gain Safety",
    "Nourish XM Create Creativity",
    "Contemplate Complex Shaper Truth",
    "Courage Attack Shaper Future",
    "Escape Shaper Harm",
    "Shaper Message End Government",
    "Resist Defend Shaper Danger",
    "Advance Government Again Failure",
    "Being Soul Strong Pure",
    "Lead Pursue React Defend",
    "Defend Message Answer Creativity",
    "Separate Weak Ignore Truth",
    "Courage Attack Shaper Future",
    "Complex Shaper Government Strong",
    "Strong Together Avoid Attack",
    "Strong Creativity Pursue Truth",
    "Change Body Improve Being",
    "Help Shaper Create Future",
    "Restraint Fear Avoid Danger",
    "Defend Destiny Defend Being Government",
    "Attack Enlightened Pursue Resist",
    "Capture Fear Discover Courage",
    "Restraint Path Gain Harmony",
    "Path Restraint Strong Safety",
    "Shaper See Potential Evolution",
    "Pursue Path Distance Shaper Lie",
    "Strong Together Attack Together Chaos",
    "Distance Self Avoid Being Lie",
    "Destroy Government End Conflict Attack",
    "All Chaos No Body",
    "Change Body Improve Being",
    "Resist Improve Being Soul",
    "Separate Weak Ignore Truth",
    "Shaper Portal Mind Restraint",
    "Help Enlightened Capture All Portal"
];
var targ = [{ x: 50, y: 14.4337567 },
    { x: 12.5, y: 36.0843918 },
    { x: 87.5, y: 36.0843918 },
    { x: 31.25, y: 46.9097094 },
    { x: 68.75, y: 46.9097094 },
    { x: 50, y: 57.7350269 },
    { x: 31.25, y: 68.5603445 },
    { x: 68.75, y: 68.5603445 },
    { x: 12.5, y: 79.385662 },
    { x: 87.5, y: 79.385662 },
    { x: 50, y: 101.0362971 }];