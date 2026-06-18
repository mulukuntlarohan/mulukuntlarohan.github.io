import { Education, Experience, Project, Certification, BlogPost } from './types';

export const PERSONAL_INFO = {
  name: "Rohan Mulukuntla",
  title: "Machine Learning Engineer & MS CS Student",
  subtitle: "Specializing in Computer Vision, LLMs & Agentic AI",
  email: "rohanmulukuntla1@gmail.com",
  phone: "(361) 510-9935",
  location: "Corpus Christi, TX",
  linkedin: "https://www.linkedin.com/in/mulukuntla-rohan",
  github: "https://github.com/mulukuntlarohan",
  bio: "A graduate-level Machine Learning Engineer pursuing a Master's in Computer Science at Texas A&M University-Corpus Christi with a strong focus on Computer Vision, Deep Learning, and Agentic AI. Possesses hands-on research experience in developing robust adversarial defenses for Intelligent Transportation Systems and building contextual conversational agents.",
  interests: [
    { name: "Swimming", icon: "Waves", description: "Enthusiastic swimmer, utilizing aquatic training for cardio condition, endurance, and mental clarity." },
    { name: "Gym & Fitness", icon: "Dumbbell", description: "Dedicated to strength training and progressive overload, focusing on biomechanics and disciplined routine." },
    { name: "Community Service", icon: "HeartHandshake", description: "Active volunteer coordinating outreach with National Service Scheme (NSS), organizing local educational drives and blood donation camps." }
  ],
  skills: {
    languages: ["Python", "C", "C++", "CUDA", "C#", "SQL", "Java", "Bash/Shell"],
    mlAndAi: ["PyTorch", "TensorFlow", "Ollama", "Agentic AI", "LangChain", "LangGraph", "Scikit-learn", "CatBoost", "Hugging Face", "NumPy", "Pandas"],
    computerVision: ["OpenCV", "PIL", "Image Classification", "Object Detection", "Image Segmentation", "Adversarial Attacks (FGSM, PGD)", "CNNs", "RNNs", "Vision Transformers (ViT)"],
    nlpAndLlm: ["Claude", "Gemini", "SOTA LLMs (GLM, Kimi, Qwen)", "Google AI Studio", "LLM Tokens", "Context Window", "Quantization", "Distillation", "JEPA"],
    cloudAndDevOps: ["AWS (EKS, S3)", "GCP", "Big Data Scale", "Docker", "Git", "GitHub", "CI/CD", "Linux/Unix"],
    databases: ["MongoDB", "Oracle PL/SQL", "PostgreSQL"],
    tools: ["Unity", "Vuforia", "Visual Studio", "VS Code", "Jupyter Notebook", "LaTeX/Overleaf", "Android Studio"]
  }
};

export const EDUCATION_DATA: Education[] = [
  {
    id: "tamu",
    institution: "Texas A&M University – Corpus Christi",
    degree: "Master of Science in Computer Science",
    gpa: "3.45 / 4.0",
    period: "Aug 2024 – May 2026",
    location: "Corpus Christi, TX",
    details: [
      "Currently serving as a Graduate Research and Teaching Assistant.",
      "Specialized coursework in Machine Learning, Deep Learning, Computer Vision, Human Computer Interface, Advanced Algorithms, and Autonomous Agents."
    ],
    coursework: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing", "Advanced Algorithms", "Data Mining"]
  },
  {
    id: "mgit",
    institution: "Mahatma Gandhi Institute of Technology",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    gpa: "3.5 / 4.0 (7.33 / 10)",
    period: "Dec 2020 – Jun 2024",
    location: "Hyderabad, India",
    details: [
      "Head Coordinator of QUBIT FEST 2024, managing collegiate technology events.",
      "Active member and volunteer of the National Service Scheme (NSS) NGO."
    ],
    coursework: ["C Programming", "Data Structures", "Database Management Systems", "Software Engineering", "Operating Systems", "Object Oriented Programming"]
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-tamu",
    role: "Graduate Research and Teaching Assistant",
    company: "Texas A&M University – Corpus Christi",
    location: "Corpus Christi, TX",
    period: "Aug 2024 – Present",
    type: "academic",
    bullets: [
      "Mentored and guided 90+ students in machine learning and image processing by designing 5+ end-to-end laboratory assignments in Python, PyTorch, and TensorFlow, which achieved a 95% project completion rate.",
      "Reduced average student debugging times by 30% by building reusable CNN and Vision Transformer code templates and structured reference documentation using NumPy.",
      "Guided 10+ capstone project teams through full machine learning pipelines by advising on dataset curation, model training, and deployment, enabling 100% of advised teams to meet and exceed all design milestones."
    ],
    skills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Computer Vision", "Vision Transformers (ViT)", "NumPy"]
  },
  {
    id: "exp-drdl",
    role: "Software Engineering Intern",
    company: "Defence Research and Development Laboratory (DRDL), Govt. of India",
    location: "Hyderabad, India (DWST Division)",
    period: "Apr 2023 – Jul 2023",
    type: "industry",
    bullets: [
      "Built a browser-based real-time radar data visualization system in Python with Pandas, Plotly, and Dash adopted by 15+ scientists, directly improving situational awareness in mission-critical defense operations.",
      "Collaborated with cross-functional teams, including scientists and software engineers, to integrate dynamic plotting techniques, reducing latency in radar signal updates by 35%.",
      "Authored clean, modular code to streamline visualization workflows, enhancing maintainability and enabling future integration with simulation platforms.",
      "Reported directly under Scientist 'Pravin F', contributing to a live government defense R&D project with industrial-strength stability."
    ],
    skills: ["Python", "Pandas", "Plotly", "Dash", "Signal Ingestion", "System Optimization"]
  },
  {
    id: "exp-mgit",
    role: "Undergraduate Teaching Assistant – C Programming & Data Structures",
    company: "Mahatma Gandhi Institute of Technology",
    location: "Hyderabad, India",
    period: "Aug 2022 – May 2024",
    type: "academic",
    bullets: [
      "Conducted lab sessions and practical instruction for 60+ undergraduate students by creating structured debugging exercises, which improved average student performance by 20% in core programming modules.",
      "Simplified complex algorithmic concepts by designing visual learning aids and real-world analogies, achieving a 95% student feedback approval rating.",
      "Mentored 15+ junior students through one-on-one sessions, resolving technical blockages and fostering a collaborative learning environment that improved course retention."
    ],
    skills: ["C", "C++", "Data Structures", "Algorithms", "Mentoring", "Pedagogy"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-h2o-ai",
    title: "Project H2O-AI: Circular Water-Compute Nexus for Data Centers",
    category: "ML/CV",
    technologies: ["Python", "Optimization Modeling", "Cost-Benefit Analytics", "RO/NF Treatment Simulation"],
    year: "2026",
    award: "Featured Presentation: TAMUCC SVRICA Research Symposium",
    bullets: [
      "Formulated a circular thermodynamic water reuse framework modeling 52 Houston data centers against 4 municipal treatment plants, aiming to replace potable water with purified household effluent.",
      "Calculated cost-efficiency curves showing that on-site UF+RO filtration achieves a sub-6-month payback timeline for hyperscale computing, slashing bulk cooling costs by up to 40%.",
      "Presented co-led research project 'Turning Wastewater Into Cooling Water for Houston Data Centers' under faculty mentor Dr. Ruby Mehrubeoglu.",
      "Project repository and interactive calculations publicly released on GitHub for environmental computing advancements."
    ],
    githubUrl: "https://github.com/mulukuntlarohan/Project-H2O-AI",
    image: "/src/assets/images/Data center presentation.jpeg",
    pdfUrl: "/src/assets/images/Houston_DC_Water_Reuse_Presentation.pdf"
  },
  {
    id: "proj-agentic",
    title: "Long-Term Memory AI Agent (RAG & Agentic AI)",
    category: "Agentic AI",
    technologies: ["Python", "LangChain", "LangGraph", "OpenAI API", "ChromaDB", "Vector DB"],
    year: "2024",
    award: "Winner: Best Graduate Capstone Project (CSRIL/SSM)",
    bullets: [
      "Developed a conversational AI agent capable of maintaining long-term memory and context by implementing a semantic state management system.",
      "Sustained context-aware dialogues up to 100+ turns with zero context loss by orchestrating LangGraph state management and ChromaDB vector storage for retrieval-augmented generation.",
      "Reduced semantic retrieval latency by 45% and boosted response relevance by 60% over a stateless GPT-4 baseline by designing optimized chunking strategies, vector indexing, and custom prompt evaluation rubrics."
    ],
    githubUrl: "https://github.com/mulukuntlarohan/SSM-Project",
    image: "/src/assets/images/ssm copy.jpeg"
  },
  {
    id: "proj-adversarial",
    title: "Adversarial Attack & Defense for Traffic Sign Recognition",
    category: "ML/CV",
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "CNNs", "Vision Transformers (ViT)"],
    year: "2024",
    bullets: [
      "Investigated deep learning vulnerabilities in safety-critical transportation systems by implementing adversarial Fast Gradient Sign Method (FGSM) and Projected Gradient Descent (PGD) attack pipelines on traffic recognition classifiers.",
      "Engineered a novel hybrid defense mechanism combining temporal analysis and Dual Field-of-View (Dual-FoV) inputs, improving model robustness by 27% versus undefended baselines on held-out adversarial test sets.",
      "Created defenses highly applicable to real-world Intelligent Transportation Systems (ITS) and autonomous vehicle safety pipelines."
    ],
    githubUrl: "https://github.com/abhishekjoshi007/Dual-FoV-Temporal-Robustness-for-Traffic-Light-and-Sign-Recognition-Hybrid-Attack-Defense"
  },
  {
    id: "proj-asd",
    title: "ASD Prediction – Early Detection Using Machine Learning",
    category: "ML/CV",
    technologies: ["Python", "Scikit-Learn", "CatBoost", "NumPy", "StratifiedKFold"],
    year: "2023",
    bullets: [
      "Built a predictive model to detect early signs of Autism Spectrum Disorder (ASD) from behavioral and physiological data, promoting early intervention clinical use cases.",
      "Achieved 93% classification accuracy with CatBoostClassifier – outperforming KNN, decision trees, and Random Forest by 4.7% – validated with StratifiedKFold cross-validation (k=10) on a 1,054-record dataset.",
      "Reduced the false negative rate to 4.2%, prioritizing recall as the key metric for medical screening where missed diagnoses carry the highest real-world cost."
    ],
    githubUrl: "https://github.com/mulukuntlarohan/MLforASDprediction"
  },
  {
    id: "proj-edu-ar",
    title: "EDU AR – Augmented Reality for Education",
    category: "AR/Systems",
    technologies: ["Unity", "Vuforia", "C#", "Android SDK"],
    year: "2023",
    award: "Outstanding Unique Project Award (EduAR)",
    bullets: [
      "Designed an AR-based mobile learning tool for school students, combining interactive 3D models with descriptive audio feeds to simplify complex scientific STEM concepts.",
      "Achieved 95% learning retention improvement and visual engagement scores through interactive tactile experiences built using Vuforia image targets.",
      "Delivered a guest lecture at MGIT on AR engineering which inspired interdisciplinary engagement amongst junior engineering students."
    ],
    githubUrl: "https://github.com/mulukuntlarohan/Eduar"
  },
  {
    id: "proj-microservices",
    title: "Microservices-Based E-Commerce Platform",
    category: "AR/Systems",
    technologies: ["ReactJS", "Spring Boot", "Docker", "MongoDB", "AWS EKS"],
    year: "2023",
    bullets: [
      "Engineered a full-stack cloud-native e-commerce system using modular Java-based microservices styled with React on the client end.",
      "Containerized modular services using Docker and orchestrated deployments on AWS Elastic Kubernetes Service (EKS), establishing auto-scaling and zero-downtime updates.",
      "Integrated secure token authentication and isolated databases per microservice to guarantee fault tolerance and high security."
    ],
    githubUrl: "https://github.com/mulukuntlarohan/Microservicebasedecommorce"
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "cert-cirtl",
    name: "Certified CIRTL Associate",
    issuer: "Center for the Integration of Research, Teaching and Learning (TAMUCC)",
    year: "2024",
    description: "Awarded for excellence in evidence-based teaching, pedagogical research, and active learning strategies in higher computer science education.",
    badgeType: "teaching",
    credentialUrl: "/src/assets/images/CIRTL12025 Certificates_Mulukuntla_page-0001.jpg"
  },
  {
    id: "cert-csril",
    name: "CSRIL Outstanding Graduate Capstone Project",
    issuer: "Cybersecurity Research and Innovation Lab (CSRIL), Department of CS, TAMU-CC",
    year: "2026",
    description: "Honored with a physical achievement certificate for developing 'Sequential-State Management: An Agentic Framework for Preventing Semantic Drift in Multi-Turn Generative Workflows' under Dr. Carlos Rubio-Medrano.",
    badgeType: "research",
    credentialUrl: "/src/assets/images/ssm copy.jpeg"
  },
  {
    id: "cert-forage",
    name: "Software Engineering Job Simulation Certificate",
    issuer: "JPMorgan Chase & Co. | Forage",
    year: "2026",
    description: "Simulated software work tasks including project setup, H2 backend database integration, REST API routes construction, and Kafka real-time streaming integration.",
    badgeType: "enterprise",
    credentialUrl: "/src/assets/images/JP Morgan Software developer_page-0001.jpg"
  },
  {
    id: "cert-drdl",
    name: "Defence Research and Development Lab Intern Certification",
    issuer: "Defence Research and Development Laboratory (DRDL), Gov. of India",
    year: "2023",
    description: "Validating industrial software development contribution in Python, Dash, and multi-thread radar data plotting in target defense labs.",
    badgeType: "research",
    credentialUrl: "/src/assets/images/DRDL internship_page-0001.jpg"
  },
  {
    id: "cert-oracle",
    name: "Java Programming Oracle Professional Certification",
    issuer: "Oracle Academy",
    year: "2023",
    description: "Professional certification validating core concepts of object-oriented design, modular compilation structures, and advanced core Java programming.",
    badgeType: "java",
    credentialUrl: "/src/assets/images/programjava_page-0001.jpg"
  },
  {
    id: "cert-oracle-sql",
    name: "SQL Database Fundamentals Oracle Course",
    issuer: "Oracle Academy",
    year: "2023",
    description: "Professional certification validating schema structures, database query tuning, indices construction, and PL/SQL procedures.",
    badgeType: "java",
    credentialUrl: "/src/assets/images/coursesql_page-0001.jpg"
  },
  {
    id: "cert-nptel",
    name: "Cloud Computing Professional Certification",
    issuer: "IIT Kharagpur / NPTEL",
    year: "2023",
    description: "National-level professional training covering cloud architectures, virtualization, resource allocation, MapReduce frameworks, and SLA agreements.",
    badgeType: "cloud"
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "blog-semantic",
    title: "Preventing Semantic Drift in LangGraph: Stateful Architectures for Multi-Turn RAG",
    excerpt: "How I engineered state management and vector database indexing to support 100+ conversational turns with zero context degradation, winning the TAMUCC Capstone Award.",
    date: "May 12, 2026",
    readTime: "7 min read",
    category: "Agentic AI",
    tags: ["LangGraph", "ChromaDB", "LLMs", "RAG"],
    content: `
Retrieval-Augmented Generation (RAG) is transforming how we build conversational assistants. However, traditional stateless RAG models struggle when carrying out deep, multi-turn dialogues. By turn 10 or 15, semantic drift occurs: the agent loses track of the core user constraints, starts hallucinating, or pollutes the workspace with redundant summaries.

This was the exact challenge we solved in the **Cybersecurity Research and Innovation Lab (CSRIL)** in Spring 2026, leading to our award-winning graduate project *Sequential-State Management*.

### The Problem of Semantic accumulation
In standard RAG, each user query retrieves context based on the current string. If a user asks a follow-up ("How does that compare to the first option?"), the system searches the vector database using "How does that compare..." which has no semantic connection to the historical entities. Feeding the entire 20-turn chat history directly into LLM prompts quickly breaks the model's token limits and leads to the 'lost in the middle' phenomenon.

### Re-architecting with LangGraph State Nodes
Rather than a linear loop, we built an agentic graph using **LangGraph**. The workflow decomposes conversational state into three structured components:
1. **Dynamic Working Focus**: A sliding window of active entities updated via a semantic summarization node.
2. **Global Fact Cache**: Key assertions declared by the user, stored in structured key-value state.
3. **Retrieval History Map**: ChromaDB document references tagged with temporal indicators.

The transitions in our graph look like this:
\`\`\`
User Query ──> [Semantic Router] ──> [State Update Node]
                                              │
                                              ▼
[LLM Inference] <── [Context Synthesis] <── [ChromaDB Vector Retrieval]
\`\`\`

### Sliding Semantic Router
By checking semantic overlap using cosine similarities of current and historical embeddings, our custom router determines if the user is *shifting context* or *refining search*.
- If they are **refining**, the router appends historical constraint vectors to the current query embedding.
- If they are **shifting**, the global facts are saved to ChromaDB, the active constraints are flushed, and a fresh vector retrieval is triggered.

### Experimental Outcomes
This state coordination enabled:
*   **100+ Turn Stability**: Verified dialogue tests maintained strict compliance with original system prompts.
*   **Latency Drop**: Vector query size was reduced since we only searched for active constraints, cutting retrieval latency by **45%**.
*   **Relevance Boost**: Manual human evaluation scored the stateful RAG system **60% higher** in follow-up precision compared to a stateless GPT-4 baseline.
    `
  },
  {
    id: "blog-adversarial",
    title: "Defending Vision Systems against Adversarial PGD and FGSM Attacks",
    excerpt: "Deep dive into adversarial machine learning, proving how we constructed a hybrid temporal-analysis and Dual Field-of-View pipeline to defend traffic models.",
    date: "Mar 05, 2026",
    readTime: "5 min read",
    category: "Computer Vision",
    tags: ["PyTorch", "Adversarial ML", "OpenCV", "CNNs"],
    content: `
With autonomous driving becoming a key goal of modern robotics, the reliability of Computer Vision models is paramount. Yet, deep neural networks are notoriously brittle. A tiny, imperceptible noise signature added to a stop sign image can trick a state-of-the-art CNN into reading it as a "Speed Limit 80" sign.

In this article, we outline our research on implementing adversarial **FGSM (Fast Gradient Sign Method)** and **PGD (Projected Gradient Descent)** attacks, and our novel defense technique: **Dual-FoV Temporal Analysis**.

### The Vulnerability: Gradient Exploits
Adversarial attacks exploit the local gradient of the loss function with respect to the input image. 
FGSM calculates the noise in a single step matching the sign of the model gradient:
$$x_{adv} = x + \\epsilon \\cdot \\text{sign}(\\nabla_x L(\\theta, x, y))$$

PGD takes this further, performing iterative steps of small gradient perturbations and projecting the result back into an $\\epsilon$-ball around the source image. In our tests using PyTorch, standard ResNet and Vision Transformer models trained on traffic datasets dropped from **98% classification confidence to less than 32%** when subjected to PGD perturbations under $\\epsilon = 0.03$.

### Introducing Dual-FoV (Field-of-View) Defense
To protect safety-critical Intelligent Transportation Systems (ITS), we engineered a two-pronged defense architecture:

1.  **Dual Field-of-View Inputs**:
    Our network processes two streams of the incoming video feed. Stream A is a tightly-cropped bounding box of the localized traffic sign. Stream B is a wide-angle, context-aware feed. Since adversarial noise is optimized on the specific pixels of the target sign crop, the background context in the wide-angle feed serves as a regularizer. The system combines features from both streams before making final bounding predictions.
    
2.  **Temporal Analysis Pipeline**:
    Instead of classifying frame-by-frame, our classifier tracks the sign across 5 consecutive frames in a sliding temporal buffer. A voting ensemble supported by a custom Kalman filter detects if the classifier output jumps unrealistically (e.g., from "Stop Sign" to "Speed Limit" in 0.03 seconds), triggering an anomaly defense flag.

### Benchmarked Protection
By implementing this hybrid defense, our model's traffic sign classification accuracy under active PGD attack jumped from **32% back to 84%**, reducing general classifier misclassification rates by **27%**. This research paves the way for designing vision-based autonomous systems that can survive both physical weather noise and malicious digital pixel manipulation.
    `
  },
  {
    id: "blog-asd",
    title: "Early Autism Screening Optimization: Prioritizing Recall using CatBoost",
    excerpt: "How a behavioral healthcare dataset of 1,054 records was analyzed using advanced tree models to achieve 93% accuracy and reduce false negatives to 4.2%.",
    date: "Jan 18, 2026",
    readTime: "6 min read",
    category: "Machine Learning",
    tags: ["CatBoost", "Scikit-Learn", "Healthcare AI", "Cross-Validation"],
    content: `
When applying machine learning to clinical healthcare, the optimization metric must be chosen with extreme care. In general applications, developers default to optimizing overall **Accuracy** or **F1-Score**. But in medical screening, a **False Negative** is infinitely more dangerous than a False Positive. Missing an early diagnosis means delaying therapeutic intervention for a child, which carries massive real-world costs.

Our study designed a highly optimized screening classifier using **CatBoost** to prioritize high-recall early screening of Autism Spectrum Disorder (ASD).

### Preprocessing Behavioral Indicators
The dataset consists of 1,054 behavioral records compiled from quantitative pediatric evaluations. Feature variables included specific diagnostic indicators (Q-chat questions detailing social looking, gestures, joint attention), age, gender, and regional indicators.

Using **Scikit-learn**, we addressed missing values and standardized categorical features. Since CatBoost natively handles categorical parameters with outstanding efficiency (using dynamic symmetric trees to capture permutations), we fed the variables directly without extensive one-hot encoding which reduces high-dimensional sparsity.

### The Algorithm of Choice: CatBoost
We benchmarked 5 distinct classifiers: KNN, Decision Trees, Random Forests, Support Vector Machines (SVM), and **CatBoost**.

While Random Forests performed respectably, CatBoost outperformed all of them. CatBoost's symmetric tree structures make it remarkably robust to overfitting, especially on moderately sized datasets ($N=1054$). 

### Addressing Screen Recall
To minimize false negatives, we adjusted the classification threshold of our tree leaf predictions. Instead of the default $P \ge 0.5$ threshold, we computed the ROC curve and adjusted our operational threshold to optimize the True Positive Rate (Recall) while maintaining acceptable false alarm numbers:

*   **Overall Classification Accuracy**: **93.2%** (outperforming Random Forest by **4.7 percentage points**).
*   **Recall (Sensitivity) on Target ASD Class**: **95.8%**.
*   **False Negative Rate**: Dropped to just **4.2%**!

This model proves that simple, accessible digital questionnaires processed via tree-based machine learning can serve as a dependable, highly scalable frontline screening tool for primary care pediatricians, matching children with the specialized support they need early in their development.
    `
  }
];

export const SKILLS_CATEGORIES = [
  {
    id: "ml-ai",
    title: "Core ML, NLP & Deep Architectures",
    description: "Expertise in training, optimizing, and deploying complex neural structures, intelligent language agents, and high-performance neural modules.",
    image: "/src/assets/images/ml_model_bg_1781727956457.jpg",
    skills: ["PyTorch", "TensorFlow", "Ollama", "Agentic AI", "LangChain", "LangGraph", "Claude", "Gemini", "SOTA LLMs (GLM, Kimi, Qwen)", "Google AI Studio"],
    concepts: ["LLM Tokens", "Context Window Limits", "Quantization", "Distillation", "Transformers", "CNNs & RNNs"]
  },
  {
    id: "cv-vis",
    title: "Computer Vision & Spatial Systems",
    description: "Engineering advanced computer vision detection models, robust defensive pipelines, and highly visual immersive spatial configurations.",
    image: "/src/assets/images/cv_model_bg_1781727968594.jpg",
    skills: ["OpenCV", "PIL (Imaging Library)", "Image Classification", "Object Detection", "Image Segmentation", "Adversarial Attacks (FGSM, PGD)", "Vision Transformers (ViT)", "Unity", "Vuforia (AR)"],
    concepts: ["Dual Field-of-View Defense", "Adversarial Robustness", "Temporal Voting", "Filter-based Tracking", "Interactive Spatial UX"]
  },
  {
    id: "hpc-infra",
    title: "HPC Accelerators & Enterprise Computing",
    description: "Optimizing code compilation for highly parallel GPU execution kernels, big data processing pipelines, and resilient cloud structures.",
    image: "/src/assets/images/sys_cuda_bg_1781727992826.jpg",
    skills: ["CUDA Parallel C/C++", "C and C++", "C# Visual Studio", "GCP (Google Cloud Platform)", "AWS (Amazon Web Services)", "Big Data Processing", "Docker & Kubernetes"],
    concepts: ["Parallel Reduction", "GPU Kernel Execution", "Shared Memory Optimization", "Cloud Elasticity Orchestration", "Big Data Analytics Structure"]
  }
];
