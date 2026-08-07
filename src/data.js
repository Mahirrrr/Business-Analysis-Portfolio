import { asset } from './asset.js';

export const projects = [
  {
    title: 'Premier League Home Advantage Analysis',
    description:
      "I wanted to see if home advantage still matters in the Premier League, specifically whether the fans at Old Trafford and Anfield actually make a difference. I used SQL in BigQuery to analyze 8 seasons of match data, looking at win rates, goal differences, and how home performance varies across teams and stadiums. The results were visualized in Tableau to make the findings easy to explore interactively.",
    repo: 'https://github.com/Mahirrrr/premier-league-home-advantage',
    skills: ['SQL', 'BigQuery', 'Tableau', 'Data Cleaning', 'EDA', 'Data Visualization'],
    tools: ['Google BigQuery', 'Tableau Public'],
  },
  {
    title: 'Last.fm Performativity Tracker',
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
  { title: 'Soccer Club', icon: asset('/uni/soccer-club.png') },
];

export const skillGroups = [
  { label: 'Languages & Query Tools', items: ['Python', 'SQL', 'JavaScript', 'R (learning)'] },
  { label: 'Data Analysis', items: ['Pandas', 'NumPy', 'BigQuery', 'EDA', 'Feature Engineering', 'Data Cleaning'] },
  { label: 'Visualization', items: ['Tableau', 'Matplotlib', 'Seaborn'] },
  { label: 'Other Tools', items: ['VS Code', 'Jupyter Notebook', 'RStudio', 'Power BI', 'Microsoft Excel', 'GitHub', 'Salesforce', 'Bloomberg Terminal', 'MongoDB'] },
];

export const contacts = {
  linkedin: 'https://linkedin.com/in/mahirabdullah',
  github: 'https://github.com/Mahirrrr',
  email: 'mahir6728@gmail.com',
};
