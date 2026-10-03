/**
 * Injects Comprehensive Anna University R2025 Solved Examination Question Papers into pyqAnalysisData.js
 */

const fs = require('fs');
const path = require('path');

const pyqFile = path.resolve(__dirname, '..', 'public', 'js', 'data', 'pyqAnalysisData.js');
let content = fs.readFileSync(pyqFile, 'utf8');

// The new R2025 question papers data
const r2025Papers = [
  {
    "qpCode": "70101",
    "subjectCode": "UC25H01",
    "subjectName": "Heritage of Tamils",
    "regulation": "R2025",
    "examSession": "January/February 2025",
    "semester": 1,
    "commonBranches": [
      "All Branches of Engineering and Technology (R2025 First Year)"
    ],
    "maxMarks": 100,
    "timeDuration": "3 Hours",
    "analysis": {
      "difficultyRating": "Moderate (Culture, Archaeological Inscriptions & Literature Focus)",
      "unitWeightage": [
        { "unit": "Unit 1: Language and Literature", "marks": 20, "percentage": "20%" },
        { "unit": "Unit 2: Heritage - Rock Art and Sculptures", "marks": 20, "percentage": "20%" },
        { "unit": "Unit 3: Folk and Martial Arts", "marks": 20, "percentage": "20%" },
        { "unit": "Unit 4: Thinai Concept and Social Life", "marks": 20, "percentage": "20%" },
        { "unit": "Unit 5: Contribution of Tamils to Indian Culture", "marks": 20, "percentage": "20%" }
      ],
      "highFrequencyQuestions": [
        "Significance of Keezhadi excavations and Tamil-Brahmi script",
        "Thinai classification and ecological harmony in Sangam literature",
        "Bronze metallurgy and lost-wax casting technique in Chola period",
        "Martial arts traditions: Silambam, Varma Kalai, and Kalaripayattu"
      ],
      "examinerTips": "Include specific Sangam anthology references (Purananuru, Kuruntokai), Keezhadi/Adichanallur carbon dates (6th century BCE), and architectural terminology of Dravidian temple art."
    },
    "questions": {
      "partA": [
        { "qNo": 1, "unit": 1, "question": "What is the antiquity of the Tamil-Brahmi (Tamili) script established at Keezhadi excavations?", "answer": "Carbon dating of charcoal samples associated with Tamil-Brahmi inscribed potsherds at Keezhadi established the antiquity of the script back to the 6th century BCE (580 BCE), proving widespread urban literacy in the Vaigai river valley." },
        { "qNo": 2, "unit": 1, "question": "Name the Eight Anthologies (Ettuthokai) of Sangam literature.", "answer": "The Ettuthokai works are: Natrinai, Kuruntokai, Ainkurunuru, Pathitrupathu, Paripadal, Kalithokai, Ahananuru, and Purananuru." },
        { "qNo": 3, "unit": 2, "question": "Mention two prominent megalithic urn-burial sites discovered in Tamil Nadu.", "answer": "Adichanallur in Thoothukudi district (featuring urns with bronze artefacts and iron weapons) and Kodumanal in Erode district (industrial gem-cutting and iron smelting center)." },
        { "qNo": 4, "unit": 2, "question": "Define the 'Hero Stone' (Nadukal) tradition in ancient Tamil society.", "answer": "Nadukal is a memorial stone erected in honour of warriors who sacrificed their lives in cattle raids (Aakol poosal) or battlefield defense, inscribed with the warrior's name and heroic deeds." },
        { "qNo": 5, "unit": 3, "question": "Distinguish between Silambam and Varma Kalai martial traditions.", "answer": "Silambam is an ancient weapon-based martial art using a flexible bamboo staff with footwork techniques (Kaaladi), whereas Varma Kalai is a specialized pressure-point science targeting vital nervous centers (Varma points) for self-defense and therapeutic healing." },
        { "qNo": 6, "unit": 3, "question": "What is 'Therukoothu' and how does it preserve folk cultural heritage?", "answer": "Therukoothu is an open-air traditional street theatre combining classical music, dance, elaborate face makeup, and dramatic dialogue, historically staged to narrate episodes from the Mahabharata and local epics." },
        { "qNo": 7, "unit": 4, "question": "List the five geographical landscapes (Ainthinai) and their presiding deities.", "answer": "Kurinji (Mountain - Murugan), Mullai (Forest - Mayon/Thirumal), Marutham (Agricultural plains - Vendan/Indra), Neithal (Seashore - Varunan), and Palai (Arid wasteland - Korravai)." },
        { "qNo": 8, "unit": 4, "question": "Explain the concept of 'Aram' in ancient Tamil ethical philosophy.", "answer": "Aram signifies righteousness, moral duty, and cosmic justice as articulated in Tirukkural; it emphasizes unselfish living, hospitality (Virundhombal), truthfulness, and non-violence (Kollaamai)." },
        { "qNo": 9, "unit": 5, "question": "Describe the 'Lost-Wax Casting' (Cire Perdue) method used in Chola bronze sculptures.", "answer": "A detailed model is sculpted in bee-wax, coated with multiple layers of fine alluvial clay, heated so the wax melts out, leaving a hollow cavity into which molten panchaloha alloy is poured to create seamless solid metal statuettes." },
        { "qNo": 10, "unit": 5, "question": "Identify two ancient ports of the Tamil country engaged in Greco-Roman and Southeast Asian maritime trade.", "answer": "Poompuhar (Kaveripoompattinam) on the Coromandel coast and Korkai (famous for natural pearl fisheries) in the Pandya realm, along with Muziris (Pattanam) on the western coast." }
      ],
      "partB": [
        {
          "qNo": "11(a)",
          "unit": 1,
          "question": "Elaborate on the classification, themes, and societal values reflected in Sangam Literature, with specific emphasis on Akam and Puram poetry.",
          "solutionOutline": "1. Classification Scheme: Sangam corpus divided into Pathinen Melkanakku (Ettuthokai, Pattupattu) and Pathinen Kilkanakku.\n2. Akam (Interior) Poetry: Focuses on subjective emotional experiences, love, and interpersonal relationships mapped to natural landscapes without naming historical individuals.\n3. Puram (Exterior) Poetry: Deals with valour, ethics, charity, governance, and heroics of kings and chieftains, documenting real historical figures and societal norms.\n4. Universal Humanism: Analysis of Kaniyan Pungundranar's 'Yaadhum Oore Yaavarum Kelir' (All the world is our home, and all people our kin).\n5. Reflection of Democratic Ethics: Free speech of court poets, patronage of artisans, and respect for agriculture ('Uzhave Thalai')."
        },
        {
          "qNo": "11(b)",
          "unit": 1,
          "question": "Discuss the archaeological discoveries at Keezhadi, Porunai (Thamirabarani civilization), and Kodumanal, and their role in rewriting ancient Indian history.",
          "solutionOutline": "1. Keezhadi Findings: Brick structures, drainage channels, ring wells, woven fabric remnants, bone dice, and Tamil-Brahmi script dated to 580 BCE.\n2. Porunai Valley (Sivagalai & Korkai): Carbon dating of paddy husks inside burial urns pushing cultural dates to 3200 BCE (1155 BCE for Sivagalai).\n3. Kodumanal Discoveries: High-tech industrial bead-making from quartz, sapphire, beryl, and high-carbon crucible wootz steel export.\n4. Historiographical Shift: Proves an independent urban civilization concurrent with Gangetic urbanization, with universal literacy among working classes."
        },
        {
          "qNo": "12(a)",
          "unit": 2,
          "question": "Explain the evolution of temple architecture in Tamil Nadu from the rock-cut cave temples of the Pallavas to the majestic vimanas of the Imperial Cholas.",
          "solutionOutline": "1. Pallava Phase 1: Mahendravarman rock-cut mandapas (Mandagapattu, Tiruchirappalli) without brick, timber, or metal.\n2. Pallava Phase 2: Narasimhavarman monolithic Rathas and bas-reliefs at Mamallapuram ('Arjuna's Penance').\n3. Pallava Structural Phase: Rajasimha's Shore Temple and Kanchipuram Kailasanathar Temple using cut stone masonry.\n4. Imperial Chola Zenith: Brihadisvara Temple (Thanjavur) built by Rajaraja I; 216-ft soaring vimana, monolithic 80-tonne kumbam, and Gangaikonda Cholapuram.\n5. Architectural Elements: Upapeedam, Adhishthanam, Garbhagriha, Antarala, Ardhamandapa, and Gopuram dynamics."
        },
        {
          "qNo": "12(b)",
          "unit": 2,
          "question": "Assess the artistic, iconographical, and theological excellence of the Chola Bronzes, particularly the Nataraja idol in Ananda Tandava posture.",
          "solutionOutline": "1. Historical Context: 9th to 12th century Chola royal patronage (Queen Sembiyan Mahadevi).\n2. Panchaloha Composition: Sacred alloy of Copper, Brass, Gold, Silver, and Lead for resonant durability.\n3. Iconography of Nataraja: Upper right hand holds Damaru (Cosmic creation), upper left hand holds Agni (Destruction/transformation), lower right hand in Abhaya Mudra (Protection), lower left hand pointing diagonally to raised left foot (Salvation/Anugraha).\n4. Subjugation of Ignorance: Right foot trampling dwarf demon Apasmara (Muyalakan).\n5. Prabhamandala: Flaming arch symbolizing the rhythmic continuum of the universe."
        },
        {
          "qNo": "13(a)",
          "unit": 3,
          "question": "Analyze the historical significance and cultural mechanics of Jallikattu (Eru Thazhuval) and explain how traditional cattle breeds are conserved through this sporting festival.",
          "solutionOutline": "1. Antiquity: Indus Valley seals depicting bull jumping and Sangam references to 'Eru Thazhuval' in Kalithokai Mullai Thinai.\n2. Cultural Symbolism: Display of youthful valour without harming the bull; embracing the hump (Thimiru) across a designated run.\n3. Biodiversity Preservation: Ensures preservation of indigenous drought-resistant cattle breeds (Kangayam, Pulikulam, Umblachery, Alambadi).\n4. Community Ritual: Integral part of Mattu Pongal celebrating rural agrarian gratitude and ecological interdependence."
        },
        {
          "qNo": "13(b)",
          "unit": 3,
          "question": "Describe the traditional musical instruments of Tamil Nadu, classifying them into Tholkaruvi, Thulaikaruvi, Narambukaruvi, and Kanchakaruvi.",
          "solutionOutline": "1. Tholkaruvi (Membranophones): Thavil, Parai, Urumi, Mattalam, Idakka (leather percussion creating diverse acoustic rhythms).\n2. Thulaikaruvi (Aerophones): Nadaswaram, Pullanguzhal (bamboo flute), Magudi, Kombu (brass wind instruments).\n3. Narambukaruvi (Chordophones): Yaazh (ancient multi-stringed harp mentioned in Silappathikaram) and Saraswati Veena.\n4. Kanchakaruvi (Idiophones): Jalra, Thaalam, Kanjira, Brammathalam (metallic cymbals and resonance gongs)."
        },
        {
          "qNo": "14(a)",
          "unit": 4,
          "question": "Explain the ecological and societal framework of the Thinai concept in Tolkappiyam, detailing Mutha Porul, Karuporul, and Uriporul.",
          "solutionOutline": "1. Tripartite Thinai Framework:\n   - Muthal Porul: Primary elements of Space (Nilam) and Time (Pozhudhu - season and hour of day).\n   - Karuporul: Environmental endowments including deity, food, fauna, flora, occupation, and musical mode (Yazh/Pann).\n   - Uriporul: Psychological states of human experience (Union, Separation, Patient Waiting, Lamentation, Discord).\n2. Environmental Determinism & Sustainability: How occupational divisions harmonized with regional biospheres without ecological degradation.\n3. Modern Relevance: Thinai theory as an early forerunner to modern cultural landscape ecology."
        },
        {
          "qNo": "14(b)",
          "unit": 4,
          "question": "Discuss the position of women in ancient Tamil society, highlighting their participation in education, poetry, economy, and decision-making.",
          "solutionOutline": "1. Female Literacy: Over 30 revered women poets in the Sangam canon (Avvaiyar, Kakkaipadiniyar, Okkur Masathiyar, Velli Veethiyar).\n2. Political Diplomacy: Avvaiyar serving as royal ambassador between King Adhiyaman and Thondaiman preventing catastrophic war.\n3. Matrilineal Remains & Economic Roles: Active participation in weaving, pearl diving, agriculture, and marketplace commerce (Allangadi/Nalangadi).\n4. Marriage Practices: Choice in courtship (Kalavu) transitioning into institutional household life (Karpu) with equality in moral responsibility."
        },
        {
          "qNo": "15(a)",
          "unit": 5,
          "question": "Evaluate the maritime trade routes and naval expeditions of the Chola Empire under Rajaraja I and Rajendra I across the Indian Ocean and Southeast Asia.",
          "solutionOutline": "1. Geopolitical Strategy: Controlling the Malacca Strait to secure lucrative trade corridors between China (Song Dynasty) and the Mediterranean.\n2. Srivijaya Campaign (1025 CE): Rajendra Chola's naval armada conquering Kadaram (Kedah), Pannai, and Sumatra without establishing colonial oppression.\n3. Merchant Guilds: Ainnurruvar (The 500 of Ayyavole), Manigramam, and Nanadesi establishing self-regulated trading posts overseas.\n4. Cultural Diffusion: Spread of Tamil epigraphy, Hindu-Buddhist architecture (Angkor Wat, Prambanan), and culinary practices across Southeast Asia."
        },
        {
          "qNo": "15(b)",
          "unit": 5,
          "question": "Describe the traditional water management systems of ancient Tamil Nadu, focusing on the Grand Anicut (Kallanai), tank cascades (Eris), and percolation ponds.",
          "solutionOutline": "1. Kallanai Engineering (2nd Century CE): Built by Karikala Cholan on River Kaveri; world's oldest functional unplastered boulder dam utilizing hydraulic curve diversion.\n2. Cascade Tank System (Kudimaramathu): Topographical linking of village tanks where surplus water from upstream tanks flows automatically into downstream reservoirs.\n3. sluice gates (Madagu and Kumizhi Thoompu): Submerged scour sluices flushing silt out while irrigating paddy crops.\n4. Social Ownership: Village assemblies (Sabhai) levying water maintenance duties, ensuring drought resilience."
        }
      ],
      "partC": [
        {
          "qNo": "16(a)",
          "unit": 5,
          "question": "Critically analyze how the traditional ecological wisdom embedded in Sangam literature and ancient water conservation systems can provide sustainable solutions to modern urban water scarcity, climate change, and environmental degradation in Tamil Nadu.",
          "solutionOutline": "Comprehensive Engineering and Environmental Blueprint:\n1. De-silting & Cascade Restoration: Reconnecting disrupted flood carrier channels and revitalizing the 39,000 historic irrigation tanks (Eris) around metropolitan Chennai and Coimbatore to absorb monsoon surges.\n2. Kallanai Hydrodynamic Principles: Implementing modern check dams utilizing Karikala Chola's boulder-bed scouring design to capture sediment while preventing riverbed erosion.\n3. Thinai-Specific Urban Planning: Designing urban biophilic zones according to Marutham (agrarian buffers) and Neithal (mangrove/salt-marsh protection against sea-level rise).\n4. Revitalizing Community Stewardship (Kudimaramathu): Decentralizing micro-watershed management to panchayats with GIS sensor mapping.\n5. Cultural Heritage as Green Policy: Embedding ethical restraint ('Aram') and ecological equilibrium into civil infrastructure blueprints."
        }
      ]
    }
  },
  {
    "qpCode": "70102",
    "subjectCode": "CS25C02",
    "subjectName": "Computer Programming: Python",
    "regulation": "R2025",
    "examSession": "January/February 2025",
    "semester": 1,
    "commonBranches": [
      "Computer Science and Engineering",
      "Information Technology",
      "Artificial Intelligence and Data Science",
      "Electronics and Communication Engineering",
      "Mechanical Engineering"
    ],
    "maxMarks": 100,
    "timeDuration": "3 Hours",
    "analysis": {
      "difficultyRating": "Moderate (Data Structures, File I/O & Algorithmic Problem Solving)",
      "unitWeightage": [
        { "unit": "Unit 1: Computational Thinking and Python Basics", "marks": 20, "percentage": "20%" },
        { "unit": "Unit 2: Control Flow, Functions & Modules", "marks": 22, "percentage": "22%" },
        { "unit": "Unit 3: Compound Data Structures (Lists, Tuples, Dictionaries)", "marks": 24, "percentage": "24%" },
        { "unit": "Unit 4: File Handling and Exception Handling", "marks": 18, "percentage": "18%" },
        { "unit": "Unit 5: Scientific Packages and GUI Programming", "marks": 16, "percentage": "16%" }
      ],
      "highFrequencyQuestions": [
        "Difference between mutable and immutable objects with memory diagrams",
        "List comprehension vs Map/Filter lambda constructs",
        "Dictionary operations and nested JSON data parsing",
        "Custom exception classes and context manager (with statement)",
        "Binary search and merge sort implementation in Python"
      ],
      "examinerTips": "Always write syntactically correct Python 3 code with proper indentation, time complexity notations, and docstrings."
    },
    "questions": {
      "partA": [
        { "qNo": 1, "unit": 1, "question": "What is the difference between an interpreter and a compiler in Python execution?", "answer": "Python source code (.py) is first compiled into intermediate bytecode (.pyc) by the Python compiler, and then executed line-by-line by the Python Virtual Machine (PVM) interpreter, enabling cross-platform portability." },
        { "qNo": 2, "unit": 1, "question": "Explain the concept of dynamic typing with a code illustration.", "answer": "In Python, variable types are determined at runtime based on the assigned value rather than explicit declaration: `x = 10` (int), then `x = 'Anna Univ'` (str) is fully valid without type errors." },
        { "qNo": 3, "unit": 2, "question": "What are *args and **kwargs in Python functions?", "answer": "`*args` allows a function to accept an arbitrary number of positional arguments as a tuple, while `**kwargs` allows variable numbers of keyword arguments passed as a dictionary." },
        { "qNo": 4, "unit": 2, "question": "Write a one-line lambda function to check whether a given number is even.", "answer": "`is_even = lambda n: n % 2 == 0`" },
        { "qNo": 5, "unit": 3, "question": "Why are dictionary keys required to be immutable types?", "answer": "Python dictionaries use a hash table implementation. Keys must be hashable and their hash values must remain constant throughout their lifetime so they can be looked up in O(1) time." },
        { "qNo": 6, "unit": 3, "question": "What is the output of `[x**2 for x in range(10) if x % 3 == 0]`?", "answer": "`[0, 9, 36, 81]` (squares of 0, 3, 6, 9)." },
        { "qNo": 7, "unit": 4, "question": "Differentiate between `read()` and `readlines()` methods in file objects.", "answer": "`read()` reads the entire file content into a single string, whereas `readlines()` reads all lines and returns them as a list of strings, each terminated by a newline." },
        { "qNo": 8, "unit": 4, "question": "What is the purpose of the `finally` block in exception handling?", "answer": "The `finally` block always executes regardless of whether an exception occurred or was handled, making it essential for cleanup tasks like closing database connections and file handles." },
        { "qNo": 9, "unit": 5, "question": "How does NumPy vectorized computation outperform standard Python lists?", "answer": "NumPy arrays are stored in contiguous C-memory blocks with homogeneous data types, executing parallel SIMD compiled C-loops without the pointer-chasing and dynamic type-checking overhead of Python lists." },
        { "qNo": 10, "unit": 5, "question": "State the role of Matplotlib `plt.subplot()` function.", "answer": "`plt.subplot(nrows, ncols, index)` divides the graphical plotting canvas into a grid of sub-axes, enabling multiple independent visualizations within a single figure window." }
      ],
      "partB": [
        {
          "qNo": "11(a)",
          "unit": 1,
          "question": "Explain the fundamental control structures in Python with syntax and complete code examples: sequential, selection (if-elif-else), and iteration (while, for with else).",
          "solutionOutline": "1. Selection Architecture: `if`, `elif`, `else` blocks with indentation scoping; ternary expressions `val = a if cond else b`.\n2. For Loop Mechanics: Sequence iteration over strings, lists, range objects; for-else construct executing only if loop completes without `break`.\n3. While Loop & Loop Control: Sentinel loops, `break`, `continue`, `pass`.\n4. Sample Program: Prime number generation in a range using for-else and trial division."
        },
        {
          "qNo": "11(b)",
          "unit": 1,
          "question": "Develop a modular Python program to compute the Greatest Common Divisor (GCD) using Euclid's algorithm and generate the Fibonacci series up to N terms using recursion.",
          "solutionOutline": "1. Euclid's GCD Formulation:\n```python\ndef gcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n```\n2. Recursive Fibonacci with Memoization:\n```python\nmemo = {}\ndef fib(n):\n    if n <= 1: return n\n    if n not in memo:\n        memo[n] = fib(n-1) + fib(n-2)\n    return memo[n]\n```\n3. Driver Code and Complexity Analysis: GCD is O(log(min(a, b))), Memoized Fibonacci is O(n) time and O(n) space."
        },
        {
          "qNo": "12(a)",
          "unit": 2,
          "question": "Discuss Python scope rules (LEGB rule) and demonstrate the usage of `global` and `nonlocal` keywords with suitable test cases.",
          "solutionOutline": "1. LEGB Scope Hierarchy: Local -> Enclosing -> Global -> Built-in resolution order.\n2. Global Keyword: Modifying module-level state from within inner functions.\n3. Nonlocal Keyword: Mutating variables residing in enclosing outer scopes in closures.\n4. Code Illustration with nested counter function showing state persistence without OOP classes."
        },
        {
          "qNo": "12(b)",
          "unit": 2,
          "question": "Write a Python script to perform binary search on a sorted list of numbers and evaluate its best, average, and worst-case time complexities.",
          "solutionOutline": "1. Algorithm Logic: Divide and conquer; compare search key with middle index (low + high) // 2.\n2. Code Implementation:\n```python\ndef binary_search(arr, key):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == key:\n            return mid\n        elif arr[mid] < key:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n```\n3. Complexity Analysis: Best Case O(1), Average and Worst Case O(log n)."
        },
        {
          "qNo": "13(a)",
          "unit": 3,
          "question": "Compare Lists, Tuples, Sets, and Dictionaries in Python in terms of syntax, mutability, duplicate handling, indexing, and typical applications.",
          "solutionOutline": "1. Tabular Comparison Matrix: Syntax brackets [], (), {}, {k:v}; Mutability; Duplication; Indexing/Slicing; Internal Hash/Array layout.\n2. Memory Footprint: `sys.getsizeof()` analysis showing tuples are more memory-efficient than lists.\n3. Common Operations: List comprehension, set union/intersection/difference, dictionary inversion and merging using `**` or `|` operator in Python 3.9+."
        },
        {
          "qNo": "13(b)",
          "unit": 3,
          "question": "Write a Python program to read a text file, count the frequency of each unique word, and print the top 10 most frequent words in descending order.",
          "solutionOutline": "1. Text Preprocessing: Reading with context manager `with open()`, lowercase conversion, removing punctuation using `str.maketrans()`.\n2. Frequency Counting: Using dictionary or `collections.Counter`.\n```python\nfrom collections import Counter\nimport string\ndef top_words(filename, top_n=10):\n    with open(filename, 'r', encoding='utf-8') as f:\n        text = f.read().lower()\n        clean_text = text.translate(str.maketrans('', '', string.punctuation))\n        words = clean_text.split()\n        counter = Counter(words)\n        return counter.most_common(top_n)\n```\n3. Output Presentation: Formatted table with rank, word, and occurrence count."
        },
        {
          "qNo": "14(a)",
          "unit": 4,
          "question": "Explain file modes in Python ('r', 'w', 'a', 'r+', 'b') and illustrate how to safely parse and serialize JSON data using the `json` module.",
          "solutionOutline": "1. File Access Modes: read, overwrite write, append, update, and binary modes.\n2. Context Manager `with` Statement: Automatic file descriptor teardown preventing memory leaks.\n3. JSON Operations: `json.dump()` vs `json.dumps()` (serializing Python dict to JSON), `json.load()` vs `json.loads()` (deserializing JSON string to dict).\n4. Error Handling: Catching `json.JSONDecodeError` on malformed payload."
        },
        {
          "qNo": "14(b)",
          "unit": 4,
          "question": "Demonstrate the complete exception handling syntax (`try`, `except`, `else`, `finally`, `raise`) and write a user-defined custom exception class `NegativeMarksError`.",
          "solutionOutline": "1. Exception Lifecycle: Propagation through call stack until matching handler.\n2. Custom Exception Class:\n```python\nclass NegativeMarksError(Exception):\n    def __init__(self, mark, message=\"Marks cannot be negative\"):\n        self.mark = mark\n        self.message = f\"{message}: Received {mark}\"\n        super().__init__(self.message)\n\ndef validate_marks(m):\n    if m < 0:\n        raise NegativeMarksError(m)\n    return f\"Valid marks: {m}\"\n```\n3. Driver Execution with Try-Except-Else-Finally blocks showing graceful error recovery."
        },
        {
          "qNo": "15(a)",
          "unit": 5,
          "question": "Explain NumPy array creation, multidimensional slicing, broadcasting rules, and universal mathematical functions.",
          "solutionOutline": "1. Array Creation: `np.array()`, `np.zeros()`, `np.ones()`, `np.arange()`, `np.linspace()`, `np.eye()`.\n2. Multidimensional Slicing: Step indexing on rows and columns `arr[0:2, 1:4]`.\n3. Broadcasting Rules: Compatible dimensions when either dimensions are equal or one of them is 1.\n4. Universal Functions: `np.mean()`, `np.std()`, `np.dot()`, `np.linalg.inv()` with matrix multiplication."
        },
        {
          "qNo": "15(b)",
          "unit": 5,
          "question": "Develop a complete Python program using Pandas to load a CSV dataset of student marks, filter students who scored above 75, calculate class averages, and export the summary to a new CSV file.",
          "solutionOutline": "1. Program Implementation:\n```python\nimport pandas as pd\ndef process_student_records(input_csv, output_csv):\n    df = pd.read_csv(input_csv)\n    high_achievers = df[df['TotalMarks'] > 75]\n    dept_avg = df.groupby('Department')['TotalMarks'].mean().reset_index()\n    dept_avg.rename(columns={'TotalMarks': 'AverageMarks'}, inplace=True)\n    dept_avg.to_csv(output_csv, index=False)\n    print(f\"Processed {len(df)} records. Top students: {len(high_achievers)}\")\n    return high_achievers, dept_avg\n```\n2. Key Operations: Boolean masking, `.groupby()`, aggregation, CSV export."
        }
      ],
      "partC": [
        {
          "qNo": "16(a)",
          "unit": 3,
          "question": "Design an automated Student Academic Performance and CGPA Management System in Python using Object-Oriented Programming (OOP) and File Persistence. The system must support Student profiles, Course enrollments, Semester grade computations according to Anna University 10-point credit scale (O=10, A+=9, A=8, B+=7, B=6, C=5, RA=0), GPA/CGPA calculation, and persistent storage using JSON or CSV.",
          "solutionOutline": "Comprehensive System Architecture & Implementation:\n1. Grade Point Mapping Dictionary: `GRADE_POINTS = {'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'RA': 0, 'SA': 0, 'W': 0}`.\n2. Class Design:\n   - `Course`: Attributes `code`, `name`, `credits`, `grade`.\n   - `Student`: Attributes `roll_no`, `name`, `department`, `regulation`, `courses = []`.\n   - Methods: `add_course()`, `calculate_gpa()`, `export_report_card()`.\n3. Formula Implementation: `GPA = sum(Credits * GradePoint) / sum(Credits)`.\n4. File Persistence: Methods `save_to_json(filename)` and `load_from_json(filename)` utilizing `with open()`.\n5. Error Validation: Handling invalid grade inputs and division-by-zero on zero registered credits."
        }
      ]
    }
  },
  {
    "qpCode": "70103",
    "subjectCode": "MA25C01",
    "subjectName": "Applied Calculus",
    "regulation": "R2025",
    "examSession": "January/February 2025",
    "semester": 1,
    "commonBranches": [
      "All Engineering Branches (R2025 First Year)"
    ],
    "maxMarks": 100,
    "timeDuration": "3 Hours",
    "analysis": {
      "difficultyRating": "High (Rigorous Multi-variable Integrals and Vector Calculus)",
      "unitWeightage": [
        { "unit": "Unit 1: Differential Calculus & Evolutes", "marks": 20, "percentage": "20%" },
        { "unit": "Unit 2: Functions of Several Variables & Maxima/Minima", "marks": 20, "percentage": "20%" },
        { "unit": "Unit 3: Integral Calculus & Applications", "marks": 20, "percentage": "20%" },
        { "unit": "Unit 4: Multiple Integrals (Double & Triple)", "marks": 20, "percentage": "20%" },
        { "unit": "Unit 5: Vector Calculus (Green's, Stokes' and Gauss Divergence)", "marks": 20, "percentage": "20%" }
      ],
      "highFrequencyQuestions": [
        "Curvature and evolute of parabola and astroid",
        "Taylor series expansion of two variables and Lagrange multipliers",
        "Change of order of integration in double integrals",
        "Evaluation of volume using triple integrals in spherical coordinates",
        "Verification of Gauss Divergence Theorem and Green's Theorem"
      ],
      "examinerTips": "Draw neat 2D/3D region diagrams for integration bounds; show every substitution step in vector surface integrals."
    },
    "questions": {
      "partA": [
        { "qNo": 1, "unit": 1, "question": "Define radius of curvature in Cartesian coordinates.", "answer": "The radius of curvature rho is given by rho = [1 + (dy/dx)^2]^(3/2) / |d^2y/dx^2| where d^2y/dx^2 != 0." },
        { "qNo": 2, "unit": 1, "question": "Find the envelope of the family of straight lines y = mx + a/m where m is the parameter.", "answer": "Differentiating with respect to m: 0 = x - a/m^2 => m = sqrt(a/x). Substituting back: y = x*sqrt(a/x) + a/sqrt(a/x) = 2*sqrt(ax) => y^2 = 4ax (a parabola)." },
        { "qNo": 3, "unit": 2, "question": "State Euler's Theorem on homogeneous functions.", "answer": "If u = f(x, y) is a homogeneous function of degree n in x and y, then: x * (du/dx) + y * (du/dy) = n * u." },
        { "qNo": 4, "unit": 2, "question": "State the conditions for a function f(x, y) to have a local minimum at (a, b).", "answer": "At stationary point (a, b) where fx = 0, fy = 0: rt - s^2 > 0 and r > 0 (where r = fxx, s = fxy, t = fyy)." },
        { "qNo": 5, "unit": 3, "question": "Evaluate the definite integral of x * e^(-x) from 0 to infinity.", "answer": "Using integration by parts or Gamma function Gamma(2) = 1! = 1." },
        { "qNo": 6, "unit": 3, "question": "Write the reduction formula for the integral of sin^n(x) dx.", "answer": "I_n = - (sin^(n-1)(x) * cos(x)) / n + ((n - 1) / n) * I_(n-2)." },
        { "qNo": 7, "unit": 4, "question": "Change the order of integration for the double integral from x=0 to 1 and y=0 to x of f(x,y) dy dx.", "answer": "In the new order: y varies from 0 to 1, and x varies from y to 1. Hence: Integral(y=0 to 1) Integral(x=y to 1) f(x, y) dx dy." },
        { "qNo": 8, "unit": 4, "question": "What is the Jacobian for transformation from Cartesian (x, y) to polar coordinates (r, theta)?", "answer": "J = d(x, y)/d(r, theta) = det([[cos theta, -r sin theta], [sin theta, r cos theta]]) = r." },
        { "qNo": 9, "unit": 5, "question": "State Green's Theorem in a plane.", "answer": "Contour_Integral(P dx + Q dy) = Double_Integral_R ((dQ/dx) - (dP/dy)) dx dy where C is a closed piecewise smooth curve enclosing region R." },
        { "qNo": 10, "unit": 5, "question": "Find the unit normal vector to the surface x^2 + y^2 + z^2 = 3 at (1, 1, 1).", "answer": "grad(phi) = 2xi + 2yj + 2zk. At (1,1,1), grad(phi) = 2i + 2j + 2k. |grad| = sqrt(4+4+4) = 2*sqrt(3). Unit normal n = (i + j + k) / sqrt(3)." }
      ],
      "partB": [
        {
          "qNo": "11(a)",
          "unit": 1,
          "question": "Find the radius of curvature and the coordinates of the center of curvature for the parabola y^2 = 4ax at any point (x, y). Hence deduce the evolute.",
          "solutionOutline": "1. Derivatives: 2y y' = 4a => y' = 2a/y. y'' = -2a/y^2 * y' = -4a^2 / y^3.\n2. Radius of Curvature: rho = [1 + 4a^2/y^2]^(3/2) / | -4a^2/y^3 | = 2*(a + x)^(3/2) / sqrt(a).\n3. Center of Curvature: X = x - y'(1+y'^2)/y'' = 3x + 2a; Y = y + (1+y'^2)/y'' = -y^3 / (4a^2).\n4. Eliminating parameter x and y yields the Evolute: 27 a Y^2 = 4 (X - 2a)^3 (Semi-cubical parabola)."
        },
        {
          "qNo": "11(b)",
          "unit": 1,
          "question": "Determine the envelope of the family of ellipses x^2/a^2 + y^2/b^2 = 1 where the parameters a and b are related by a + b = c (constant).",
          "solutionOutline": "1. Given f(x, y, a, b) = x^2/a^2 + y^2/b^2 - 1 = 0 and g(a, b) = a + b - c = 0.\n2. Differentiating with respect to parameter a (with db/da = -1):\n   -2x^2/a^3 - 2y^2/b^3 * (db/da) = 0 => x^2/a^3 = y^2/b^3.\n3. Expressing a and b: a = c * x^(2/3) / (x^(2/3) + y^(2/3)), b = c * y^(2/3) / (x^(2/3) + y^(2/3)).\n4. Substituting into ellipse equation yields the Astroid: x^(2/3) + y^(2/3) = c^(2/3)."
        },
        {
          "qNo": "12(a)",
          "unit": 2,
          "question": "Find the maximum and minimum values of the function f(x, y) = x^3 + y^3 - 3axy.",
          "solutionOutline": "1. First partial derivatives: fx = 3x^2 - 3ay = 0 => y = x^2/a. fy = 3y^2 - 3ax = 0 => x = y^2/a.\n2. Stationary Points: (0, 0) and (a, a).\n3. Second derivatives: r = fxx = 6x, s = fxy = -3a, t = fyy = 6y. Delta = rt - s^2 = 36xy - 9a^2.\n4. At (0, 0): Delta = -9a^2 < 0 => Saddle point (neither max nor min).\n5. At (a, a): For a > 0, Delta = 27a^2 > 0 and r = 6a > 0 => Local Minimum with value f(a, a) = -a^3."
        },
        {
          "qNo": "12(b)",
          "unit": 2,
          "question": "A rectangular box open at the top is to have a volume of 32 cubic centimeters. Find the dimensions of the box requiring the least material for its construction using Lagrange's method of undetermined multipliers.",
          "solutionOutline": "1. Objective Function (Surface Area): S = xy + 2yz + 2xz.\n2. Constraint Equation: V = xyz = 32 => phi(x, y, z) = xyz - 32 = 0.\n3. Lagrange Function: F(x, y, z, lambda) = xy + 2yz + 2xz + lambda*(xyz - 32).\n4. Partial Derivatives set to zero:\n   Fx = y + 2z + lambda*yz = 0\n   Fy = x + 2z + lambda*xz = 0\n   Fz = 2y + 2x + lambda*xy = 0\n5. Solving equations: x = y = 2z. Substituting into volume: (2z)*(2z)*z = 32 => 4z^3 = 32 => z = 2 cm.\n6. Dimensions: Length x = 4 cm, Breadth y = 4 cm, Height z = 2 cm."
        },
        {
          "qNo": "13(a)",
          "unit": 3,
          "question": "Find the area of the region enclosed between the parabolas y^2 = 4ax and x^2 = 4ay.",
          "solutionOutline": "1. Intersection Points: Solving x^4/(16a^2) = 4ax => x(x^3 - 64a^3) = 0 => x = 0, x = 4a. Corresponding y = 0, y = 4a.\n2. Area formulation: A = Integral(x=0 to 4a) [ y_upper - y_lower ] dx = Integral(0 to 4a) [ 2*sqrt(ax) - x^2/(4a) ] dx.\n3. Evaluation:\n   = [ 2*sqrt(a) * (2/3) * x^(3/2) - (1/(12a)) * x^3 ] from 0 to 4a\n   = (4/3)*sqrt(a)*(8 a^(3/2)) - (64 a^3) / (12 a) = (32/3) a^2 - (16/3) a^2 = 16 a^2 / 3 square units."
        },
        {
          "qNo": "13(b)",
          "unit": 3,
          "question": "Determine the volume of the solid generated by revolving the cardioid r = a(1 + cos theta) about the initial line.",
          "solutionOutline": "1. Volume Formula for polar revolution about theta = 0: V = (2/3) * pi * Integral(theta=0 to pi) r^3 * sin(theta) d(theta).\n2. Substituting r: V = (2/3) * pi * a^3 * Integral(0 to pi) (1 + cos theta)^3 * sin(theta) d(theta).\n3. Substitution: Let u = 1 + cos theta => du = -sin theta d(theta). When theta=0, u=2; when theta=pi, u=0.\n4. V = (2/3) * pi * a^3 * Integral(u=0 to 2) u^3 du = (2/3) * pi * a^3 * [ u^4 / 4 ]_0^2 = (2/3) * pi * a^3 * (4) = 8 pi a^3 / 3 cubic units."
        },
        {
          "qNo": "14(a)",
          "unit": 4,
          "question": "Evaluate the double integral of e^(-(x^2 + y^2)) dx dy over the positive quadrant of the circle x^2 + y^2 <= a^2 by transforming into polar coordinates.",
          "solutionOutline": "1. Coordinate Transformation: x = r cos theta, y = r sin theta; dx dy = r dr d(theta); x^2 + y^2 = r^2.\n2. Integration Limits for first quadrant: r from 0 to a, theta from 0 to pi/2.\n3. Integral I = Integral(theta=0 to pi/2) d(theta) * Integral(r=0 to a) e^(-r^2) * r dr.\n4. Evaluation: [ theta ]_0^(pi/2) * [ - (1/2) e^(-r^2) ]_0^a = (pi/2) * (1/2) * (1 - e^(-a^2)) = (pi/4) * (1 - e^(-a^2))."
        },
        {
          "qNo": "14(b)",
          "unit": 4,
          "question": "By changing the order of integration, evaluate the double integral: Integral(x=0 to a) Integral(y=x^2/a to 2a-x) x*y dy dx.",
          "solutionOutline": "1. Curves bounding region: Parabola y = x^2/a and line y = 2a - x. Intersection: x^2/a + x - 2a = 0 => (x + 2a)(x - a) = 0 => x = a, y = a.\n2. Splitting into two horizontal regions: For y in [0, a], x from 0 to sqrt(ay); For y in [a, 2a], x from 0 to 2a - y.\n3. Computing both double integrals and summing values yields: I = 3 a^4 / 8."
        },
        {
          "qNo": "15(a)",
          "unit": 5,
          "question": "Verify Gauss Divergence Theorem for vector field F = 4x i - 2y^2 j + z^2 k over the cylindrical region x^2 + y^2 <= 4, z = 0 and z = 3.",
          "solutionOutline": "1. Divergence of F: div(F) = d(4x)/dx + d(-2y^2)/dy + d(z^2)/dz = 4 - 4y + 2z.\n2. Volume Integral: Triple_Integral (4 - 4y + 2z) dV. Transforming to cylindrical coordinates (r, theta, z): r in [0, 2], theta in [0, 2pi], z in [0, 3].\n   - Triple_Integral (4 - 4r sin theta + 2z) * r dr d(theta) dz.\n   - Integration over theta removes sin(theta) term (periodicity).\n   - Results in Volume Integral = 84 pi.\n3. Surface Integrals: Sum over bottom disc S1 (z=0, n=-k), top disc S2 (z=3, n=+k), curved wall S3 (r=2, n=(x i + y j)/2).\n4. Total Flux = 0 + 36 pi + 48 pi = 84 pi. Hence Gauss Divergence Theorem is verified."
        },
        {
          "qNo": "15(b)",
          "unit": 5,
          "question": "Verify Stokes' Theorem for F = (2x - y) i - y z^2 j - y^2 z k over the upper half of the sphere x^2 + y^2 + z^2 = 1 bounded by the circle in the xy-plane (z = 0).",
          "solutionOutline": "1. Curl of F: curl(F) = det([[i, j, k], [d/dx, d/dy, d/dz], [2x-y, -yz^2, -y^2z]]) = i(-2yz - (-2yz)) - j(0) + k(0 - (-1)) = k.\n2. Surface Integral: Double_Integral curl(F) . n dS = Double_Integral k . ((x i + y j + z k)/1) dS = Double_Integral z dS.\n   - Using projection on xy-plane where n . k = z: Double_Integral z * (dx dy / z) = Double_Integral dx dy = Area of unit circle = pi * (1)^2 = pi.\n3. Line Integral along boundary C (unit circle x = cos t, y = sin t, z = 0, t from 0 to 2pi):\n   - Contour_Integral F . dr = Integral (2x - y) dx = Integral(0 to 2pi) (2 cos t - sin t)(-sin t dt) = Integral(0 to 2pi) sin^2(t) dt = pi.\n4. Both sides equal pi; Stokes' Theorem verified."
        }
      ],
      "partC": [
        {
          "qNo": "16(a)",
          "unit": 5,
          "question": "In fluid dynamics and electromagnetic power transmission, the electrostatic potential and vector magnetic fields within a subterranean transformer conduit are governed by Maxwell's curl equations and the Poisson equation. Formulate a mathematical boundary-value model utilizing Green's Theorem and Gauss's Divergence Theorem to calculate the total electric flux leakage and net magnetic circulation through a toroidal cable conduit cross-section.",
          "solutionOutline": "Mathematical & Engineering Formulation:\n1. Flux Leakage Formulation: Total electric flux Phi_E = Closed_Surface_Integral E . dA = (1/epsilon_0) * Triple_Integral rho_charge dV by Gauss Divergence Theorem.\n2. Circulation Formulation: Magnetic circulation Gamma = Contour_Integral B . dr = mu_0 * (I_enc + epsilon_0 * d(Phi_E)/dt) by Ampere-Maxwell Stokes Theorem.\n3. Boundary Value Problem in Cylindrical Coordinates: Laplace equation (1/r) d/dr (r dV/dr) + (1/r^2) d^2V/d(theta)^2 = 0 with Dirichlet boundary conditions V(r=a) = V0 and V(r=b) = 0.\n4. Numerical Solution & Vector Field: Radial electric field E_r = -dV/dr = V0 / (r * ln(b/a)).\n5. Verification: Total leakage flux per unit axial length evaluates to 2 * pi * epsilon_0 * V0 / ln(b/a), verifying zero divergence outside conductors."
        }
      ]
    }
  }
];

// Check if these qpCodes already exist
let appendList = [];
for (const p of r2025Papers) {
  if (!content.includes(p.qpCode)) {
    appendList.push(p);
  }
}

if (appendList.length > 0) {
  console.log(`Adding ${appendList.length} R2025 question papers to pyqAnalysisData.js...`);
  // Insert before the closing `];`
  const lastBracketIndex = content.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const formatted = appendList.map(item => '  ' + JSON.stringify(item, null, 2).replace(/\n/g, '\n  ')).join(',\n');
    const prefix = content.slice(0, lastBracketIndex).trimEnd();
    const needsComma = !prefix.endsWith('[');
    const newContent = prefix + (needsComma ? ',\n' : '\n') + formatted + '\n];\n';
    fs.writeFileSync(pyqFile, newContent, 'utf8');
    console.log('Successfully added R2025 question papers to pyqAnalysisData.js!');
  }
} else {
  console.log('R2025 question papers already present in pyqAnalysisData.js.');
}
