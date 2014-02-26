var glyphs = [
    { name: ['Abandon'], points: [2, 4, 5, 6, 8, 10], family:'sq'},
    { name: ['Adapt'], points: [1, 6, 5, 7], family:'sq'},
    { name: ['Advance'], points: [0, 3, 8], family:'w'},
    { name: ['Again', 'Repeat'], points: [8, 3, 6, 5, 4, 7], family:'sq'},
    { name: ['All'], points: [0, 2, 9, 10, 8, 1, 0], family:'o'},
    { name: ['Answer'], points: [3, 4, 7, 5], family:'c2'},
    { name: ['Attack', 'War'], points: [8, 3, 0, 4, 9], family:'w'},
    { name: ['Avoid', 'Struggle'], points: [1, 0, 4, 2, 9], family:'sq'},
    { name: ['Barrier', 'Obstacle'], points: [0, 5, 7, 9], family:'cl'},
    { name: ['Begin'], points: [0, 6, 10, 7], family:'s'},
    { name: ['Being', 'Human'], points: [3, 4, 7, 10, 6, 3], family:'s'},
    { name: ['Body', 'Shell'], points: [3, 4, 5, 3], family:'c1'},
    { name: ['Breathe'], points: [1, 3, 5, 4, 2], family:'cl'},
    { name: ['Capture'], points: [2, 7, 5, 6, 8, 10], family:'sq'},
    { name: ['Change', 'Modify'], points: [6, 5, 10, 7], family:'sq'},
    { name: ['Chaos', 'Disorder'], points: [8, 1, 0, 2, 4, 5, 6, 10], family:'cx'},
    { name: ['Clear'], points: [0, 5, 10], family:'o'},
    { name: ['Close All'], points: [0, 1, 8, 10, 5, 0, 2, 9, 10], family:'o'},
    { name: ['Complex'], points: [4, 3, 5, 6], family:'c2'},
    { name: ['Conflict'], points: [8, 3, 6, 7, 4, 9], family:'h'},
    { name: ['Contemplate'], points: [0, 2, 9, 10, 6, 3, 5, 4], family:'cx'},
    { name: ['Contract'], points: [7, 4, 9], family:'h'},
    { name: ['Courage'], points: [8, 3, 6, 7], family:'h'},
    { name: ['Create', 'Creation'], points: [8, 6, 5, 4, 2], family:'cl'},
    { name: ['Creativity', 'Mind', 'Thought', 'Idea'], points: [4, 2, 9, 7, 5, 3, 1, 8, 6], family:'cx'},
    { name: ['Danger'], points: [0, 3, 5, 10], family:'sq'},
    { name: ['Data', 'Signal', 'Message'], points: [0, 4, 5, 6, 10], family:'sq'},
    { name: ['Defend'], points: [1, 6, 10, 7, 2], family:'w'},
    { name: ['Destiny'], points: [3, 5, 4, 7, 6, 10], family:'cx'},
    { name: ['Destroy', 'Destruction'], points: [1, 3, 5, 7, 9], family:'cl'},
    { name: ['Deteriorate', 'Erode'], points: [3, 5, 6, 8], family:'cl'},
    { name: ['Die'], points: [8, 6, 5, 7, 9], family:'cl'},
    { name: ['Difficult'], points: [2, 4, 7, 5, 6], family:'sq'},
    { name: ['Discover'], points: [2, 9, 10, 8], family:'o'},
    { name: ['Distance', 'Outside'], points: [0, 1, 8], family:'o'},
    { name: ['End', 'Close'], points: [0, 2, 7, 10, 5, 0], family:'s'},
    { name: ['Enlightened'], points: [3, 4, 5, 3, 0, 2, 9, 10], family:'cx'},
    { name: ['Equal'], points: [6, 3, 4, 7], family:'c1'},
    { name: ['Escape'], points: [0, 2, 4, 3, 6], family:'sq'},
    { name: ['Evolution'], points: [0, 5, 3, 6], family:'p'},
    { name: ['Failure'], points: [0, 5, 4, 7], family:'p'},
    { name: ['Fear'], points: [3, 4, 7, 2], family:'h'},
    { name: ['Follow'], points: [0, 4, 2, 9], family:'sq'},
    { name: ['Forget'], points: [6, 8], family:'t'},
    { name: ['Future', 'Forward-Time'], points: [2, 4, 7, 9], family:'t'},
    { name: ['Gain'], points: [1, 6], family:'t'},
    { name: ['Government', 'City', 'Civilization', 'Structure'], points: [1, 3, 6, 7, 4, 2], family:'h'},
    { name: ['Harm'], points: [5, 4, 0, 3, 5, 7, 9], family:'cx'},
    { name: ['Harmony', 'Peace'], points: [0, 3, 5, 6, 10, 7, 5, 4, 0], family:'s'},
    { name: ['Help'], points: [1, 3, 5, 6, 7], family:'sq'},
    { name: ['Hide'], points: [3, 4, 2, 7, 6], family:'sq'},
    { name: ['I', 'Me', 'Self'], points: [3, 4, 10, 3], family:'s'},
    { name: ['Ignore'], points: [7, 9], family:'t'},
    { name: ['Improve'], points: [2, 4, 5, 7], family:'cl'},
    { name: ['Impure'], points: [5, 3, 6, 5, 10], family:'p'},
    { name: ['Journey'], points: [2, 4, 5, 3, 1, 8, 10], family:'cx'},
    { name: ['Knowledge'], points: [3, 5, 4, 10, 3], family:'s'},
    { name: ['Lead'], points: [0, 1, 8, 6, 10], family:'sq'},
    { name: ['Less'], points: [3, 5, 4], family:'c1'},
    { name: ['Liberate'], points: [0, 2, 4, 5, 3, 8], family:'sq'},
    { name: ['Lie'], points: [5, 4, 7, 5, 3, 6], family:'c2'},
    { name: ['Lose'], points: [2, 7], family:'t'},
    { name: ['Message'], points: [2, 7, 5, 3, 8], family:'sq'},
    { name: ['Mind', 'Idea', 'Thought'], points: [3, 5, 10, 6, 3], family:'s'},
    { name: ['More'], points: [6, 5, 7], family:'c1'},
    { name: ['Nature'], points: [8, 6, 3, 4, 7, 9], family:'h'},
    { name: ['New'], points: [4, 7, 9], family:'t'},
    { name: ['No', 'Not', 'Absent', 'Inside'], points: [3, 4, 7], family:'c1'},
    { name: ['Nourish'], points: [5, 10, 8, 6, 5], family:'s'},
    { name: ['Old'], points: [1, 3, 6], family:'t'},
    { name: ['Open', 'Accept'], points: [6, 7, 10, 6], family:'s'},
    { name: ['Open All'], points: [0, 1, 8, 10, 6, 7, 10, 9, 2, 0], family:'o'},
    { name: ['Opening', 'Doorway', 'Portal'], points: [1, 3, 4, 2, 9, 7, 6, 8, 1], family:'cx'},
    { name: ['Past'], points: [1, 3, 6, 8], family:'t'},
    { name: ['Perfection', 'Balance'], points: [0, 5, 6, 8, 10, 9, 7, 5], family:'cx'},
    { name: ['Potential'], points: [0, 5, 7, 9, 2], family:'sq'},
    { name: ['Present', 'Now'], points: [3, 6, 7, 4], family:'c1'},
    { name: ['Pure', 'Purity'], points: [0, 5, 4, 7, 5], family:'p'},
    { name: ['Pursue'], points: [1, 3, 0, 4], family:'sq'},
    { name: ['Pursue', 'Chase'], points: [0, 5, 3, 6, 8], family:'sq'},
    { name: ['Question'], points: [0, 4, 3, 6], family:'sq'},
    { name: ['React'], points: [4, 3, 5, 7, 9], family:'sq'},
    { name: ['Rebel'], points: [1, 6, 5, 4, 2, 9], family:'sq'},
    { name: ['Recharge'], points: [0, 1, 3, 5, 0], family:'s'},
    { name: ['Resist', 'Resistance', 'Struggle'], points: [4, 3, 0, 5, 10, 6], family:'cx'},
    { name: ['Restraint'], points: [1, 3, 5, 7, 9, 10], family:'sq'},
    { name: ['Retreat'], points: [0, 4, 9], family:'w'},
    { name: ['Safety'], points: [8, 3, 4, 9], family:'h'},
    { name: ['Save', 'Rescue'], points: [2, 7, 5, 6], family:'sq'},
    { name: ['See'], points: [0, 3], family:'t'},
    { name: ['Seek', 'Search'], points: [5, 4, 3, 6, 7], family:'c2'},
    { name: ['Self'], points: [8, 10, 9], family:'o'},
    { name: ['Separate'], points: [1, 3, 6, 5, 4, 7, 9], family:'sq'},
    { name: ['Shaper', 'Collective'], points: [8, 6, 3, 0, 4, 7, 9], family:'cx'},
    { name: ['Shaper/Human', 'Collective/Being'], points: [8, 6, 10, 7, 9, 7, 4, 0, 3, 4, 3, 6], family:'cx'},
    { name: ['Share'], points: [9, 7, 6, 8, 10], family:'sq'},
    { name: ['Simple'], points: [6, 7], family:'c1'},
    { name: ['Soul', 'Spirit', 'Life Force'], points: [4, 5, 10, 7, 4], family:'s'},
    { name: ['Stability'], points: [8, 6, 7, 9], family:'h'},
    { name: ['Strong'], points: [3, 4, 7, 6, 3], family:'c2'},
    { name: ['Together'], points: [5, 3, 4, 5, 6, 8], family:'cx'},
    { name: ['Truth'], points: [3, 5, 4, 7, 5, 6, 3], family:'c2'},
    { name: ['Use'], points: [2, 7, 5], family:'t'},
    { name: ['Victory'], points: [0, 3, 10, 4, 0], family:'s'},
    { name: ['Want'], points: [8, 6, 10, 7], family:'sq'},
    { name: ['We', 'Us'], points: [3, 4, 10], family:'t'},
    { name: ['Weak'], points: [1, 3, 4, 7], family:'sq'},
    { name: ['XM'], points: [3, 4, 7, 5, 6, 3], family:'c2'},
    { name: ['You', 'Other'], points: [0, 6, 7, 0], family:'s'}
];