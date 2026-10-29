import { asset } from './asset.js';

export const projectCategories = [
  { id: 'ai', label: 'AI and ML' },
  { id: 'analytics', label: 'Analytics and BI' },
  { id: 'engineering', label: 'Data engineering and ops' },
];

// featured: shown as a headline-number card at the top.
// series + node: grouped into the Sanguine stack card, labeled by `node`.
export const projects = [
  {
    title: 'Second Look: FEMA Disaster Aid Audit (IBM Z Datathon 2026)',
    category: 'ai',
    featured: true,
    metric: { value: '$385M', label: 'in aid likely never reached 94,395 households denied over fixable paperwork' },
    description:
      "Our team's entry for the IBM Z Datathon 2026 (Shooting Stars Foundation × IBM). After a disaster, FEMA confirms a household's damage with an inspector, then sometimes denies aid anyway over paperwork. Working through 26.2 million OpenFEMA records on an IBM z17 LinuxONE machine, we found 94,395 households denied for fixable reasons despite verified damage, an estimated $385M in aid that likely never reached them. An IBM Snap ML model ranks who a caseworker should call first (AUC 0.785 on 114 unseen disasters), a fairness audit measures who gets denied most, and IBM Granite writes call notes grounded in FEMA policy.",
    repo: 'https://github.com/Mahirrrr/ibm-z-datathon-2026',
    skills: ['Python', 'IBM Snap ML', 'Machine Learning', 'Fairness Audit', 'RAG', 'FastAPI', 'Big Data'],
    tools: ['IBM LinuxONE (z17)', 'IBM Granite', 'Podman'],
  },
  {
    title: 'Finance RAG over SEC Filings',
    category: 'ai',
    featured: true,
    metric: { value: '38.5% → 65.4%', label: 'answer accuracy once the model was grounded in retrieved filing pages' },
    description:
      'I built a retrieval-augmented generation (RAG) pipeline over 84 real SEC filings and tested it on 150 FinanceBench questions. Each question comes with the page that holds the answer, so I could score retrieval page by page and score answers strictly by whether the number matched, with no LLM judge. Grounding the model in retrieved pages cut wrong numbers from 32 to 3 out of 52 and raised accuracy from 38.5% to 65.4%. I also found that hybrid keyword + vector search did worse than plain dense search here, because filings word things differently from the questions.',
    skills: ['Python', 'RAG', 'Embeddings', 'Vector Search', 'BM25', 'LLM Evaluation'],
    tools: ['sqlite-vec', 'PyMuPDF', 'Qwen API'],
  },
  {
    title: 'Entity Matching LoRA Fine-Tune',
    category: 'ai',
    metric: { value: '0.35 → 0.91', label: 'F1 on the Abt-Buy product-matching benchmark after fine-tuning' },
    description:
      'I fine-tuned a small open model (Qwen2.5-0.5B) with LoRA to decide whether two records describe the same real-world thing. I wrote the training loop myself in plain PyTorch and trained it on my M4 MacBook in about 33 minutes. On the Abt-Buy product-matching benchmark, F1 went from 0.35 zero-shot to 0.91, well above a 0.62 TF-IDF baseline. I then tested it on 49 real artist-matching cases from Sanguine, where it turned out too overconfident to ship.',
    skills: ['Python', 'PyTorch', 'Fine-Tuning', 'LoRA', 'NLP', 'Model Evaluation'],
    tools: ['Hugging Face Transformers', 'PEFT'],
  },
  {
    title: 'Retention A/B Test Readout',
    category: 'analytics',
    metric: { value: '0.82 pts', label: 'drop in 7-day retention, called only after a sample-ratio mismatch was checked' },
    description:
      "A full experiment readout on a randomized test of 90,189 players in the mobile game Cookie Cats, comparing the first progress gate at level 30 versus level 40. The dataset is a well-known public one, so the focus here is method: I wrote the analysis plan and decision rule before looking at results, then ran validity checks first. That caught a sample-ratio mismatch (p = 0.009) that I investigated before trusting any lift. The final readout shows a 0.82-point drop in 7-day retention (Holm-adjusted p = 0.003) with an engagement guardrail held and the test validated by 1,000 A/A splits.",
    skills: ['Python', 'A/B Testing', 'Hypothesis Testing', 'Statistics', 'Power Analysis', 'Bootstrapping'],
    tools: ['SciPy', 'statsmodels'],
  },
  {
    title: 'Fuel Market Analytics & Price Forecast',
    category: 'analytics',
    featured: true,
    metric: { value: '2.7×', label: 'more of a wholesale price rise reached the pump in week one than of a cut' },
    description:
      'Using 979 weeks of public EIA data on Gulf Coast gasoline prices, inventories, and demand, I looked at how fast wholesale price moves reach the pump. In the first week, 2.7x more of a spot price rise was passed on to drivers than of a price cut. I also built a weekly pump price forecast and backtested it over 156 rolling weeks, lowering 1-week error versus a no-change baseline from 2.55% to 2.28% MAPE. Planned-vs-actual variance for demand and inventories and an Excel export round it out.',
    skills: ['Python', 'Time-Series Forecasting', 'Backtesting', 'scikit-learn', 'Variance Analysis', 'Excel'],
    tools: ['VS Code', 'EIA Open Data'],
  },
  {
    title: 'Sanguine Triage CRM & GA4 Funnel Analysis',
    category: 'analytics',
    series: 'sanguine',
    node: 'Salesforce triage',
    metric: { value: '56%', label: 'of GA4 purchases passed every tracked funnel step, pointing to a tracking gap' },
    description:
      "Two halves. In Salesforce, I built a triage workspace for 153 broken pipeline jobs across 125 artist accounts from my music app, with a custom object, a record-triggered Flow that sets priority, reports, a dashboard, and SOQL checks against expected totals. For GA4, I wrote BigQuery SQL against Google's public GA4 sample export to build a 6-step checkout funnel and conversion by channel and device, and found only 56% of purchases passed every tracked step, which points to an event-tracking gap.",
    skills: ['Salesforce', 'SOQL', 'Salesforce Flow', 'GA4', 'SQL', 'Funnel Analysis'],
    tools: ['Salesforce', 'Google BigQuery'],
  },
  {
    title: 'Sanguine Ops Automation (Alteryx & Power Platform)',
    category: 'engineering',
    series: 'sanguine',
    node: 'Ops automation',
    metric: { value: '35,041', label: 'pipeline jobs cleaned in Alteryx, matching a Python run row for row' },
    description:
      "Low-code operations tooling for my music app's catalog pipeline. An Alteryx workflow cleans 35,041 pipeline jobs, sorts their errors into 4 categories, and flags stuck jobs, matching an independent Python run row for row. A Power Automate flow emails a daily list of the 92 stuck jobs, and a Power Apps form lets a reviewer triage the 41 artist matches that need a human decision, writing each decision back to SharePoint.",
    skills: ['Alteryx', 'Power Automate', 'Power Apps', 'SharePoint', 'Workflow Automation', 'Python'],
    tools: ['Alteryx Designer Cloud', 'Microsoft 365'],
  },
  {
    title: 'Sanguine Catalog MCP Server & Slack Bot',
    category: 'ai',
    series: 'sanguine',
    node: 'MCP server',
    metric: { value: '100%', label: 'on a 25-question known-answer eval after fixing the tool layer' },
    description:
      "I built an MCP server that gives AI assistants read-only access to my music app's 964K-artist catalog through 8 parameterized SQL tools, plus a tool-calling agent and a Slack bot in front of it. Ask the bot \"how many pipeline jobs are stuck?\" and it calls the right tool and answers with the real number. A 25-question known-answer eval caught the agent reporting raw decimals instead of percentages; fixing that in the tool layer got it to 100% across 2 runs.",
    skills: ['Python', 'MCP', 'AI Agents', 'Tool Calling', 'SQL', 'LLM Evaluation'],
    tools: ['Slack API', 'SQLite', 'Qwen API'],
  },
  {
    title: 'Sanguine Catalog Pipeline Dashboard (Power BI)',
    category: 'analytics',
    series: 'sanguine',
    node: 'Power BI',
    metric: { value: '92%', label: 'of pending pipeline work sat in one identity backlog the report surfaced' },
    description:
      "A Power BI report on my music app's catalog pipeline: how far each stage has gotten, where jobs fail or get stuck, and how complete the catalog is. I modeled 35K pipeline jobs and 15.5K releases into a star schema (2 fact tables, 4 dimensions) with 26 DAX measures, and checked every measure against totals computed separately in Python. The report surfaced 92 stuck jobs that nothing was recovering and an identity backlog holding 92% of pending work.",
    skills: ['Power BI', 'DAX', 'Data Modeling', 'Star Schema', 'Python', 'Data Validation'],
    tools: ['Power BI', 'Microsoft Excel'],
  },
  {
    title: 'Sanguine Medallion Lakehouse (Databricks)',
    category: 'engineering',
    series: 'sanguine',
    node: 'Lakehouse',
    metric: { value: '13', label: 'data-quality rules gate the silver layer, with a quarantine table' },
    description:
      "A bronze, silver, and gold lakehouse for my music app's catalog data, built in PySpark and Delta Lake on Databricks over 964K artists and 35K pipeline jobs. The silver layer runs 13 data-quality rules with a quarantine table and loads jobs with an idempotent MERGE. I orchestrated the 5 notebooks as a Databricks Job and reconciled 14 gold-layer metrics against independently computed Python totals, using Delta time travel to audit loads.",
    skills: ['PySpark', 'Delta Lake', 'Data Engineering', 'Data Quality', 'SQL', 'ETL'],
    tools: ['Databricks', 'Docker'],
  },
  {
    title: 'Sanguine Artist Popularity Model',
    category: 'ai',
    series: 'sanguine',
    node: 'Popularity model',
    metric: { value: '10% → 21%', label: 'top-10% recall for single-release artists versus the production fallback' },
    description:
      "23% of the 964K artists in my music app's catalog have no listener data, so search had nothing but release count to rank them by. I trained a scikit-learn gradient boosting model on the 741K artists that do have listener data, using 13 metadata features and deliberately excluding columns that would leak the answer. On 148K held-out artists it beat the production fallback (R² 0.28 to 0.35), and for single-release artists it doubled top-10% recall from 10% to 21%.",
    skills: ['Python', 'scikit-learn', 'Machine Learning', 'Feature Engineering', 'Regression', 'Cross-Validation'],
    tools: ['VS Code', 'Supabase'],
  },
  {
    title: 'Sanguine AI Playbook: LLM Eval Harness',
    category: 'ai',
    series: 'sanguine',
    node: 'LLM eval',
    metric: { value: '6.1% → 2.0%', label: 'confidently-wrong rate after fixing a prompt bug the harness caught' },
    description:
      "I built an evaluation harness that scores an LLM's artist-matching decisions against 49 real ground-truth cases from my music app's pipeline. Finding and fixing a real bug between prompt v1 and v2 cut the confidently-wrong rate from 6.1% to 2.0%, and a second automation writes a changelog from git history. I later added a requirements doc, user stories, and workflow maps, and rebuilt the prompt as composable markdown skills, which (mostly by turning off hidden model reasoning) cut tokens per call 55% while holding 85.7% accuracy.",
    skills: ['LLM Evaluation', 'Prompt Engineering', 'Node.js', 'SQL', 'Requirements', 'User Stories'],
    tools: ['Qwen API', 'Supabase'],
  },
  {
    title: 'Sanguine API Uptime Monitoring',
    category: 'engineering',
    series: 'sanguine',
    node: 'Uptime monitoring',
    metric: { value: '15 min', label: 'to catch an outage in any of 3 third-party APIs, instead of whenever someone noticed' },
    description:
      "My music app's catalog pipeline depends on three third-party APIs (MusicBrainz, Cover Art Archive, and TheAudioDB) and nothing was measuring whether they were up. I built an Airflow pipeline, deployed with Docker Compose, that checks all three every 15 minutes and logs uptime and latency to a queryable database. I also kept a real incident log and wrote runbooks, so an outage is now caught within 15 minutes instead of whenever someone notices.",
    skills: ['Python', 'Apache Airflow', 'Monitoring', 'Incident Management', 'SQL', 'Runbooks'],
    tools: ['Docker Compose', 'SQLite'],
  },
  {
    title: 'Sanguine Business & Architecture Review',
    category: 'engineering',
    series: 'sanguine',
    node: 'Business review',
    metric: { value: '$30/mo', label: 'real infrastructure cost rebuilt from a usage export, modeled out to 10,000 users' },
    description:
      "I looked at my music app the way a business analyst would: what it costs, where it breaks, and where it should go next. I rebuilt its real infrastructure cost ($30/month) from a live usage export, catching a bug that treated a one-time trial credit as an ongoing free allowance, and modeled cost from 100 to 10,000 users. I also traced a production bug, where rate-limited requests silently dropped artist photos for good, with SQL against the live database, and wrote an architecture review with a proposal for where an AI agent could take over part of the workflow.",
    skills: ['FinOps', 'SQL', 'Root-Cause Analysis', 'Cost Modeling', 'Excel', 'Architecture Review'],
    tools: ['Supabase', 'Microsoft Excel'],
  },
  {
    title: 'Premier League Home Advantage Analysis',
    category: 'analytics',
    metric: { value: '8 seasons', label: 'of match data in BigQuery and Tableau, testing whether home crowds still matter' },
    description:
      "I wanted to see if home advantage still matters in the Premier League, specifically whether the fans at Old Trafford and Anfield actually make a difference. I used SQL in BigQuery to analyze 8 seasons of match data, looking at win rates, goal differences, and how home performance varies across teams and stadiums. The results were visualized in Tableau to make the findings easy to explore interactively.",
    repo: 'https://github.com/Mahirrrr/premier-league-home-advantage',
    skills: ['SQL', 'BigQuery', 'Tableau', 'Data Cleaning', 'EDA', 'Data Visualization'],
    tools: ['Google BigQuery', 'Tableau Public'],
  },
  {
    title: 'Last.fm Performativity Tracker',
    category: 'analytics',
    metric: { value: '46.8/100', label: 'performativity score across 152K scrobbles and 8 scoring dimensions' },
    description:
      'I exported 4.5 years of my Last.fm listening history (152,000+ scrobbles) and built an 8-dimension scoring system in Python to measure how "performative" my music taste is. I defined distinct archetypes (girl-appeal, tough-guy rap, drain/internet-core, and critical canon), then built scoring functions around listening depth, trend chasing, discovery rates, and artist categorization. The whole analysis runs in a single Jupyter Notebook with 15+ visualizations. Final score: 46.8/100, mostly authentic.',
    repo: 'https://github.com/Mahirrrr/Performativity-Tracker',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA', 'Data Visualization'],
    tools: ['VS Code', 'Jupyter Notebook'],
  },
];

export const studyProjects = [
  {
    course: 'OPRE 3360',
    title: 'Operations Management Analytics',
    description:
      'Coursework and projects covering operations management concepts through a quantitative lens. Topics include process analysis, forecasting, inventory management, and optimization using Excel and analytical tools.',
    skills: ['Excel', 'Process Analysis', 'Forecasting', 'Optimization'],
  },
  {
    course: 'ITSS 3311',
    title: 'Introduction to Data Management',
    description:
      'Coursework focused on database fundamentals, SQL querying, data modeling, and relational database design. Projects involved writing SQL queries to extract, filter, and aggregate data from relational databases.',
    skills: ['SQL', 'Database Design', 'ER Diagrams', 'Data Modeling'],
  },
  {
    course: 'BUAN 4373',
    title: 'Predictive Analytics',
    description:
      'Coursework covering predictive modeling techniques including regression analysis, classification, clustering, and machine learning fundamentals. Projects involved building models in Python and R to make data-driven predictions.',
    skills: ['Python', 'R', 'Regression', 'Classification', 'Clustering', 'ML'],
  },
];

export const featuredCertificates = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'AWS',
    link: 'https://www.credly.com/earner/earned/badge/1e2ff596-3827-4b01-a1da-78a2b5941e82',
    badge: asset('/certifications/badges/aws-cloud-practitioner.png'),
  },
  {
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    link: 'https://learn.microsoft.com/en-us/users/mahirabdullah-0441/credentials/35250a125013efb2',
    badge: asset('/certifications/badges/azure-ai-fundamentals.svg'),
  },
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'AWS',
    link: 'https://www.credly.com/badges/5950aa59-bc5e-4f28-8747-803f5a9087e3/public_url',
    badge: asset('/certifications/badges/aws-ai-practitioner.png'),
  },
];

export const certificates = [
  {
    title: 'Extract, Transform and Load Data in Power BI',
    issuer: 'Microsoft',
    icon: asset('/certifications/icons/microsoft.jpeg'),
    link: 'https://www.coursera.org/account/accomplishments/verify/NK459FPTGKDU',
  },
  {
    title: 'ETL and Data Pipelines with Shell, Airflow and Kafka',
    issuer: 'IBM',
    icon: asset('/certifications/icons/ibm.jpeg'),
    link: 'https://www.coursera.org/account/accomplishments/verify/1D4WT40S6SQL',
  },
  {
    title: 'Mastering Data Analysis with Pandas',
    issuer: 'Coursera',
    icon: asset('/certifications/icons/coursera.jpeg'),
    link: 'https://www.coursera.org/account/accomplishments/verify/I5OAEITXI2UH',
  },
  {
    title: 'Python Data Analysis',
    issuer: 'LinkedIn Learning',
    icon: asset('/certifications/icons/linkedin.jpeg'),
    link: 'https://www.linkedin.com/learning/certificates/6d48efd78b9a49d46dc0fba2f13e4a28f53e8176819cd29911da2a3d1b6a0acd?accountId=70198226&u=70198226&success=true&authUUID=pFtZNxMKSmOyHaLh82dA8Q%3D%3D',
  },
  {
    title: 'Introduction to Data Analytics',
    issuer: 'IBM',
    icon: asset('/certifications/icons/ibm.jpeg'),
    link: 'https://www.coursera.org/account/accomplishments/verify/2B5NDR2UFPM6',
  },
  {
    title: 'Foundations: Data, Data, Everywhere',
    issuer: 'Google',
    icon: asset('/certifications/icons/google.jpeg'),
    link: 'https://www.coursera.org/account/accomplishments/verify/4S17PLOKFWB5',
  },
];

export const uniInvolvement = [
  { title: 'Intramural Sports Staff', icon: asset('/uni/utd.png') },
  { title: 'Comet Call Engagement Ambassador', icon: asset('/uni/utd.png') },
  { title: 'Community Council', icon: asset('/uni/utd.png') },
  { title: 'Freshman Mentor', icon: asset('/uni/utd.png') },
  { title: 'Product@Dallas', icon: asset('/uni/product-at-dallas.png') },
  { title: 'Financial Leadership Association', icon: asset('/uni/financial-leadership-association.jpeg') },
  { title: 'Real Estate Club', icon: asset('/uni/real-estate-club.png') },
];

export const skillGroups = [
  { label: 'Languages & Query Tools', items: ['Python', 'SQL', 'JavaScript', 'R (learning)', 'DAX', 'SOQL'] },
  { label: 'Data Analysis', items: ['Pandas', 'NumPy', 'BigQuery', 'EDA', 'Feature Engineering', 'Data Cleaning', 'A/B Testing', 'Forecasting'] },
  { label: 'Visualization', items: ['Tableau', 'Matplotlib', 'Seaborn'] },
  { label: 'AI & Machine Learning', items: ['scikit-learn', 'PyTorch', 'Hugging Face', 'LoRA Fine-Tuning', 'RAG', 'MCP', 'LLM Evaluation', 'IBM Snap ML'] },
  { label: 'Data Engineering', items: ['Databricks', 'PySpark', 'Delta Lake', 'Apache Airflow', 'Docker'] },
  { label: 'Other Tools', items: ['VS Code', 'Jupyter Notebook', 'RStudio', 'Power BI', 'Microsoft Excel', 'GitHub', 'Salesforce', 'Bloomberg Terminal', 'MongoDB', 'Alteryx', 'Power Automate', 'Power Apps', 'SharePoint'] },
];

export const contacts = {
  linkedin: 'https://linkedin.com/in/mahirabdullah',
  github: 'https://github.com/Mahirrrr',
  email: 'mahir6728@gmail.com',
};
