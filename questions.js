/* Question bank for GDGoC NDU Techverse.
   Keep each question self-contained: unique id, four options, answer index, explanation,
   difficulty, category and type. */
window.GAME_QUESTIONS = [
  // TECH EXPLORER — beginner-friendly, no technical background required
  {
    id: "exp-01", difficulty: "explorer", category: "Code", type: "code_output",
    question: "What will this tiny Python program print?",
    snippet: "x = 4\ny = 3\nprint(x + y)", language: "python",
    options: ["7", "12", "43", "1"], answer: 0,
    explanation: "The + operator adds the two numbers: 4 + 3 = 7."
  },
  {
    id: "exp-02", difficulty: "explorer", category: "AI", type: "ai_facts",
    question: "What does an AI model learn from during training?",
    options: ["Examples and data", "Only electricity", "A human's thoughts directly", "Nothing at all"], answer: 0,
    explanation: "AI models find patterns in examples and data. The quality of that data matters."
  },
  {
    id: "exp-03", difficulty: "explorer", category: "Cybersecurity", type: "myth_fact",
    question: "You receive a surprise message asking you to click a link and enter your password. What is the safest move?",
    options: ["Check the sender and website carefully; don't rush", "Click quickly before it expires", "Reply with your password", "Forward it to everyone"], answer: 0,
    explanation: "Urgent messages and unexpected login links can be phishing attempts. Verify them independently."
  },
  {
    id: "exp-04", difficulty: "explorer", category: "Web", type: "guess_technology",
    question: "On a website, which HTML element is commonly used to create a clickable link?",
    options: ["<a>", "<pic>", "<go>", "<linker>"], answer: 0,
    explanation: "The <a> element, short for anchor, creates links to pages and other destinations."
  },
  {
    id: "exp-05", difficulty: "explorer", category: "Hardware", type: "cs_trivia",
    question: "What is RAM mainly used for while your computer is running?",
    options: ["Temporarily holding data apps are using", "Printing documents", "Connecting your laptop to Wi-Fi by itself", "Keeping files forever when power is off"], answer: 0,
    explanation: "RAM is fast, temporary working memory. Your computer usually clears it when powered off."
  },
  {
    id: "exp-06", difficulty: "explorer", category: "Tech", type: "guess_technology",
    question: "When people say they saved files 'in the cloud', what do they usually mean?",
    options: ["The files are stored on internet-connected servers", "The files are floating above the city", "The files are only in the laptop's keyboard", "The files were turned into weather data"], answer: 0,
    explanation: "Cloud services store or process data on remote servers that you access over a network."
  },
  {
    id: "exp-07", difficulty: "explorer", category: "Cybersecurity", type: "myth_fact",
    question: "What does HTTPS help provide when you visit a website?",
    options: ["An encrypted connection between your browser and the site", "A guarantee that every page is honest", "Unlimited free mobile data", "Protection from every possible scam"], answer: 0,
    explanation: "HTTPS encrypts traffic in transit, but it does not automatically make a website trustworthy."
  },
  {
    id: "exp-08", difficulty: "explorer", category: "Data", type: "cs_trivia",
    question: "You want to compare the number of votes for four club ideas. Which is a good way to start?",
    options: ["Make a simple bar chart", "Delete the numbers", "Convert every vote into a password", "Guess without looking"], answer: 0,
    explanation: "A bar chart makes it easy to compare amounts across different categories."
  },
  {
    id: "exp-09", difficulty: "explorer", category: "AI", type: "ai_facts",
    question: "Sometimes an AI chatbot confidently gives an incorrect answer. What is this often called?",
    options: ["A hallucination", "A keyboard shortcut", "A software update", "A screen refresh"], answer: 0,
    explanation: "An AI hallucination is generated information that may sound convincing but is false or unsupported."
  },
  {
    id: "exp-10", difficulty: "explorer", category: "Logic", type: "cs_trivia",
    question: "In computing, what is an algorithm?",
    options: ["A set of steps for solving a problem", "A type of laptop screen", "A computer's battery", "A social media account"], answer: 0,
    explanation: "An algorithm is a defined sequence of steps used to complete a task or solve a problem."
  },
  {
    id: "exp-11", difficulty: "explorer", category: "Cybersecurity", type: "myth_fact",
    question: "What does multi-factor authentication (MFA) add to a login?",
    options: ["Another proof of identity, such as an app approval", "A longer username only", "A public list of your passwords", "An automatic internet upgrade"], answer: 0,
    explanation: "MFA asks for more than one kind of proof, making an account harder to access with a stolen password alone."
  },
  {
    id: "exp-12", difficulty: "explorer", category: "Networking", type: "cs_trivia",
    question: "Which device commonly helps connect devices in your home to a Wi-Fi network and the internet?",
    options: ["A router", "A microphone", "A webcam", "A projector"], answer: 0,
    explanation: "A router directs traffic between your local network and other networks, often including the internet."
  },
  {
    id: "exp-13", difficulty: "explorer", category: "Tech", type: "cs_trivia",
    question: "How many different values can a single binary digit (bit) represent?",
    options: ["2: zero or one", "5", "10", "100"], answer: 0,
    explanation: "A bit is the smallest common unit of digital information and can be 0 or 1."
  },
  {
    id: "exp-14", difficulty: "explorer", category: "AI", type: "ai_facts",
    question: "What is a common use of generative AI?",
    options: ["Creating draft text, images, music, or code", "Making every answer guaranteed correct", "Replacing the need to check information", "Charging a phone without power"], answer: 0,
    explanation: "Generative AI can create new content from learned patterns, but people should still review the output."
  },
  {
    id: "exp-15", difficulty: "explorer", category: "Innovation", type: "tech_myth",
    question: "What does 'open-source software' generally mean?",
    options: ["Its source code is available under a license that permits specified use and modification", "It can only run while the computer is open", "It never contains bugs", "It must always be paid software"], answer: 0,
    explanation: "Open-source licenses allow people to inspect, use, and often modify or share code under stated conditions."
  },

  // CODE ENTHUSIAST — familiar concepts and approachable problem-solving
  {
    id: "enth-01", difficulty: "enthusiast", category: "Code", type: "code_output",
    question: "In JavaScript, what is the result of this expression?",
    snippet: "console.log(\"2\" + 3);", language: "javascript",
    options: ["23", "5", "Error every time", "32"], answer: 0,
    explanation: "Here the + operator joins the string \"2\" with the number converted to text, producing \"23\"."
  },
  {
    id: "enth-02", difficulty: "enthusiast", category: "Code", type: "code_output",
    question: "Python lists use zero-based indexing. What does this print?",
    snippet: "colors = [\"red\", \"blue\", \"green\"]\nprint(colors[1])", language: "python",
    options: ["blue", "red", "green", "1"], answer: 0,
    explanation: "Index 0 is the first item, so index 1 refers to the second item: \"blue\"."
  },
  {
    id: "enth-03", difficulty: "enthusiast", category: "Web", type: "guess_technology",
    question: "Which CSS property changes the text color of an element?",
    options: ["color", "font-style-only", "text-paint", "foreground-font"], answer: 0,
    explanation: "The CSS color property sets the foreground color used for text."
  },
  {
    id: "enth-04", difficulty: "enthusiast", category: "AI", type: "ai_facts",
    question: "In supervised machine learning, training examples usually include what?",
    options: ["Inputs paired with known labels or answers", "Only random numbers with no context", "Only the final computer monitor", "A guarantee of perfect predictions"], answer: 0,
    explanation: "Supervised learning uses example inputs together with target labels or values to learn a mapping."
  },
  {
    id: "enth-05", difficulty: "enthusiast", category: "Cybersecurity", type: "cs_trivia",
    question: "Why is a reputable password manager useful?",
    options: ["It can create and store unique strong passwords", "It makes every password public", "It means you never need account security", "It automatically removes all malware"], answer: 0,
    explanation: "Password managers help generate and keep track of distinct passwords so you don't have to reuse one."
  },
  {
    id: "enth-06", difficulty: "enthusiast", category: "Networking", type: "cs_trivia",
    question: "What does DNS mainly do?",
    options: ["Maps domain names such as example.com to network addresses", "Encrypts every file on a computer", "Makes images higher resolution", "Checks whether a keyboard works"], answer: 0,
    explanation: "The Domain Name System helps translate human-readable domain names into IP addresses."
  },
  {
    id: "enth-07", difficulty: "enthusiast", category: "Code", type: "code_output",
    question: "What value is printed by this Python function call?",
    snippet: "def double(n):\n    return n * 2\n\nprint(double(6))", language: "python",
    options: ["12", "8", "6", "36"], answer: 0,
    explanation: "The function returns its argument multiplied by two: 6 × 2 = 12."
  },
  {
    id: "enth-08", difficulty: "enthusiast", category: "Data", type: "cs_trivia",
    question: "A CSV file is commonly used to store what kind of information?",
    options: ["Tabular data separated into values, often by commas", "Only audio recordings", "Animated 3D models only", "Encrypted passwords only"], answer: 0,
    explanation: "CSV stands for comma-separated values and is a simple format for rows and columns of data."
  },
  {
    id: "enth-09", difficulty: "enthusiast", category: "Code", type: "guess_technology",
    question: "What is Git most commonly used for by software teams?",
    options: ["Tracking changes to files and collaborating on code", "Increasing a laptop's RAM", "Designing physical circuit boards automatically", "Blocking every security threat"], answer: 0,
    explanation: "Git is a version-control system that tracks changes and helps developers work together."
  },
  {
    id: "enth-10", difficulty: "enthusiast", category: "Hardware", type: "cs_trivia",
    question: "Why are GPUs useful for many AI workloads?",
    options: ["They can perform many similar calculations in parallel", "They only store long-term documents", "They replace all software", "They are designed only for printing"], answer: 0,
    explanation: "GPUs contain many processing units that can handle parallel operations efficiently, which suits many AI calculations."
  },
  {
    id: "enth-11", difficulty: "enthusiast", category: "Code", type: "code_output",
    question: "How many times does this loop print \"Hi\"?",
    snippet: "for (let i = 0; i < 3; i++) {\n  console.log(\"Hi\");\n}", language: "javascript",
    options: ["3 times", "2 times", "4 times", "It never runs"], answer: 0,
    explanation: "The loop runs with i equal to 0, 1, and 2. When i reaches 3, the condition is false."
  },
  {
    id: "enth-12", difficulty: "enthusiast", category: "Web", type: "cs_trivia",
    question: "What is an API commonly used for?",
    options: ["Letting software systems communicate through defined rules", "Cooling down a graphics card", "Making a web page load without any code", "Converting Wi-Fi into a battery"], answer: 0,
    explanation: "An API defines how one piece of software can request data or actions from another."
  },
  {
    id: "enth-13", difficulty: "enthusiast", category: "Cybersecurity", type: "myth_fact",
    question: "Is it a good idea to use the same password for every account?",
    options: ["No — one exposed password could put several accounts at risk", "Yes — it is safer because it is easier to remember", "Yes, but only on weekends", "It makes multi-factor authentication unnecessary"], answer: 0,
    explanation: "Unique passwords limit the damage if one service suffers a data breach."
  },
  {
    id: "enth-14", difficulty: "enthusiast", category: "Logic", type: "cs_trivia",
    question: "When debugging, what is usually the best first step after noticing a bug?",
    options: ["Reproduce the problem and inspect the relevant evidence", "Rewrite the entire app immediately", "Assume the computer is haunted", "Delete all tests"], answer: 0,
    explanation: "Reproducing the issue and narrowing down when it occurs makes the cause much easier to find."
  },
  {
    id: "enth-15", difficulty: "enthusiast", category: "Data", type: "guess_technology",
    question: "Which SQL command is commonly used to retrieve rows from a database table?",
    options: ["SELECT", "PAINT", "LAUNCH", "REWIND"], answer: 0,
    explanation: "A SELECT query requests data from one or more database tables."
  },

  // TECH GEEK — more technical, but still fair and fun
  {
    id: "geek-01", difficulty: "geek", category: "Code", type: "code_output",
    question: "What does this Python expression print?",
    snippet: "print(sum(range(1, 4)))", language: "python",
    options: ["6", "10", "3", "7"], answer: 0,
    explanation: "range(1, 4) produces 1, 2, and 3. Their sum is 6; the stop value 4 is excluded."
  },
  {
    id: "geek-02", difficulty: "geek", category: "Code", type: "code_output",
    question: "What is the final value of total?",
    snippet: "total = 0\nfor i in range(3):\n    total += i\nprint(total)", language: "python",
    options: ["3", "6", "2", "0"], answer: 0,
    explanation: "The loop adds 0, then 1, then 2. The final total is 0 + 1 + 2 = 3."
  },
  {
    id: "geek-03", difficulty: "geek", category: "Logic", type: "cs_trivia",
    question: "A search checks each item in a list one by one. What is its worst-case time complexity for n items?",
    options: ["O(n)", "O(1)", "O(n²) in every case", "O(2ⁿ) in every case"], answer: 0,
    explanation: "A linear search may inspect all n items, so its worst-case time grows linearly: O(n)."
  },
  {
    id: "geek-04", difficulty: "geek", category: "AI", type: "ai_facts",
    question: "What does overfitting mean in machine learning?",
    options: ["A model learns training examples too specifically and generalizes poorly", "A model has no training data", "A model always predicts correctly on new data", "A model uses a monitor that is too large"], answer: 0,
    explanation: "An overfit model may perform very well on training data but poorly on unseen examples."
  },
  {
    id: "geek-05", difficulty: "geek", category: "Cybersecurity", type: "cs_trivia",
    question: "What is a key difference between hashing and encryption?",
    options: ["Encryption is designed to be reversible with a key; hashes are generally one-way", "Hashing always hides data using a reversible secret key", "They are identical terms", "Encryption only works on images"], answer: 0,
    explanation: "Encryption can be reversed by an authorized party with the right key. Secure hash functions are designed to be one-way."
  },
  {
    id: "geek-06", difficulty: "geek", category: "Networking", type: "cs_trivia",
    question: "What does HTTP status code 404 normally indicate?",
    options: ["The requested resource was not found", "The request succeeded with no content", "The server is permanently shut down", "The user's password has expired"], answer: 0,
    explanation: "A 404 response means the server could not find the requested resource at that address."
  },
  {
    id: "geek-07", difficulty: "geek", category: "Data", type: "cs_trivia",
    question: "What is the median of the sorted values 2, 3, 9, 12, 20?",
    options: ["9", "3", "12", "46"], answer: 0,
    explanation: "There are five sorted values, so the middle (third) value is the median: 9."
  },
  {
    id: "geek-08", difficulty: "geek", category: "Code", type: "code_output",
    question: "What does this JavaScript code print?",
    snippet: "const nums = [2, 4, 6];\nconsole.log(nums.length);", language: "javascript",
    options: ["3", "2", "6", "12"], answer: 0,
    explanation: "The length property counts the elements in the array. There are three elements."
  },
  {
    id: "geek-09", difficulty: "geek", category: "Code", type: "guess_technology",
    question: "In Git, what does a merge conflict mean?",
    options: ["Git needs help reconciling overlapping changes", "The internet is disconnected permanently", "The repository has become an image file", "A commit was automatically published as a website"], answer: 0,
    explanation: "A conflict can occur when Git cannot automatically reconcile competing edits; a developer resolves the affected files."
  },
  {
    id: "geek-10", difficulty: "geek", category: "Data", type: "cs_trivia",
    question: "What is the main purpose of a primary key in a relational database table?",
    options: ["Uniquely identify each row", "Store every password in plain text", "Sort rows alphabetically in all queries", "Replace every column in the table"], answer: 0,
    explanation: "A primary key provides a unique identifier for each record in a table."
  },
  {
    id: "geek-11", difficulty: "geek", category: "AI", type: "ai_facts",
    question: "In a neural network, what do learned weights generally control?",
    options: ["How strongly signals influence computations", "The physical weight of the computer", "How many users can connect to Wi-Fi", "The brightness of the monitor"], answer: 0,
    explanation: "Weights are learned numerical parameters that influence how inputs and intermediate signals affect a network's output."
  },
  {
    id: "geek-12", difficulty: "geek", category: "Data", type: "code_output",
    question: "Which rows does this SQL query return?",
    snippet: "SELECT name\nFROM students\nWHERE year = 2;", language: "sql",
    options: ["Rows for students whose year equals 2", "Every row where name is missing", "Only rows where year is greater than 2", "No rows can ever be returned"], answer: 0,
    explanation: "The WHERE clause filters results to rows where the year column equals 2."
  },
  {
    id: "geek-13", difficulty: "geek", category: "Tech", type: "cs_trivia",
    question: "What decimal number is represented by the binary value 1010?",
    options: ["10", "8", "12", "5"], answer: 0,
    explanation: "Binary 1010 equals 1×8 + 0×4 + 1×2 + 0×1, which is 10."
  },
  {
    id: "geek-14", difficulty: "geek", category: "Networking", type: "cs_trivia",
    question: "A computer has an IP address but cannot resolve a domain name. Which service is especially relevant to check?",
    options: ["DNS", "CSS", "GPU rendering", "The keyboard driver"], answer: 0,
    explanation: "DNS resolves domain names to IP addresses. A DNS problem can prevent a domain from resolving even when basic connectivity exists."
  },
  {
    id: "geek-15", difficulty: "geek", category: "Code", type: "cs_trivia",
    question: "In object-oriented programming, polymorphism most directly allows what?",
    options: ["Different object types to respond to the same interface in type-specific ways", "All variables to have identical values", "A program to run without data", "A class to contain only one method"], answer: 0,
    explanation: "Polymorphism lets code use a common interface while different implementations provide type-specific behavior."
  }
];
