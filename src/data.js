export const projects = [
  {
    title: 'Premier League Home Advantage Analysis',
    description:
      "I wanted to see if home advantage still matters in the Premier League, specifically whether the fans at Old Trafford and Anfield actually make a difference. I used SQL in BigQuery to analyze 8 seasons of match data, looking at win rates, goal differences, and how home performance varies across teams and stadiums. The results were visualized in Tableau to make the findings easy to explore interactively.",
    repo: 'https://github.com/Mahirrrr/premier-league-home-advantage',
    skills: ['SQL', 'BigQuery', 'Tableau', 'Data Cleaning', 'EDA', 'Data Visualization'],
    tools: ['Google BigQuery', 'Tableau Public'],
    status: 'live',
  },
  {
    title: 'Last.fm Performativity Tracker',
    description:
      'I exported 4.5 years of my Last.fm listening history (152,000+ scrobbles) and built an 8-dimension scoring system in Python to measure how "performative" my music taste is. I defined distinct archetypes — girl-appeal, tough-guy rap, drain/internet-core, and critical canon — then built scoring functions around listening depth, trend chasing, discovery rates, and artist categorization. The whole analysis runs in a single Jupyter Notebook with 15+ visualizations. Final score: 46.8/100, mostly authentic.',
    repo: 'https://github.com/Mahirrrr/Performativity-Tracker',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA', 'Data Visualization'],
    tools: ['VS Code', 'Jupyter Notebook'],
    status: 'live',
  },
  {
    title: 'R Studio Project',
    description:
      'Placeholder for an upcoming project using R for statistical analysis and visualization. Planning to use ggplot2 and dplyr for exploratory analysis on a dataset related to one of my personal interests.',
    repo: null,
    skills: ['R', 'ggplot2', 'dplyr', 'tidyverse', 'Statistical Analysis'],
    tools: ['RStudio'],
    status: 'soon',
  },
  {
    title: 'Excel Project',
    description:
      'Placeholder for an upcoming Excel project involving data analysis, pivot tables, dashboards, and financial modeling. Will include interactive dashboards and reports.',
    repo: null,
    skills: ['Excel', 'Pivot Tables', 'Formulas', 'Charts', 'Dashboards'],
    tools: ['Microsoft Excel'],
    status: 'soon',
  },
];

export const studyProjects = [
  {
    course: 'OPRE 3360',
    title: 'Operations Management Analytics',
    description:
      'Coursework and projects covering operations management concepts through a quantitative lens. Topics include process analysis, forecasting, inventory management, and optimization using Excel and analytical tools.',
    skills: ['Excel', 'Process Analysis', 'Forecasting', 'Optimization'],
    status: 'In Progress',
  },
  {
    course: 'ITSS 3311',
    title: 'Introduction to Data Management',
    description:
      'Coursework focused on database fundamentals, SQL querying, data modeling, and relational database design. Projects involved writing SQL queries to extract, filter, and aggregate data from relational databases.',
    skills: ['SQL', 'Database Design', 'ER Diagrams', 'Data Modeling'],
    status: 'In Progress',
  },
  {
    course: 'BUAN 4373',
    title: 'Predictive Analytics',
    description:
      'Coursework covering predictive modeling techniques including regression analysis, classification, clustering, and machine learning fundamentals. Projects involved building models in Python and R to make data-driven predictions.',
    skills: ['Python', 'R', 'Regression', 'Classification', 'Clustering', 'ML'],
    status: 'In Progress',
  },
];

export const certificates = [
  { title: 'Google Data Analytics Professional Certificate', issuer: 'Coursera', file: 'Foundations- Data, Data, Everywhere.pdf' },
  { title: 'IBM Data Analysis with Python', issuer: 'Coursera', file: 'Introduction to Data Analytics.pdf' },
  { title: 'Mastering Data Analysis with Pandas', issuer: 'Coursera', file: 'Mastering Data Analysis with Pandas.pdf' },
  { title: 'Python Data Analysis', issuer: 'LinkedIn Learning', file: 'Python Data Analysis.pdf' },
  { title: 'Excel Data Analysis', issuer: 'LinkedIn Learning', file: 'Introduction to Data Analysis using Microsoft Excel .pdf' },
  { title: 'ETL and Data Pipelines with Shell, Airflow and Kafka', issuer: 'Coursera', file: 'ETL and Data Pipelines with Shell, Airflow and Kafka.pdf' },
  { title: 'Intermediate SQL: Data Reporting and Analysis', issuer: 'LinkedIn Learning', file: null },
  { title: 'Prepare, Clean, Transform, and Load Data using Power BI', issuer: 'Coursera', file: 'Extract, Transform and Load Data in Power BI.pdf' },
  { title: 'Excel: Working Together with Power Query and Power Pivot', issuer: 'LinkedIn Learning', file: null },
  { title: 'Business Benefits Realization Foundations', issuer: 'LinkedIn Learning', file: null },
  { title: 'Business Analyst and Project Manager Collaboration', issuer: 'LinkedIn Learning', file: null },
  { title: 'Business Analysis Foundations', issuer: 'LinkedIn Learning', file: null },
  { title: 'Agile Requirements Foundations', issuer: 'LinkedIn Learning', file: null },
];

export const skillGroups = [
  { label: 'Languages & Query Tools', items: ['Python', 'SQL', 'R (learning)'] },
  { label: 'Data Analysis', items: ['Pandas', 'NumPy', 'BigQuery', 'EDA', 'Feature Engineering', 'Data Cleaning'] },
  { label: 'Visualization', items: ['Tableau', 'Matplotlib', 'Seaborn'] },
  { label: 'Other Tools', items: ['VS Code', 'Jupyter Notebook', 'RStudio', 'Power BI', 'Microsoft Excel', 'GitHub'] },
];

export const contacts = {
  linkedin: 'https://linkedin.com/in/mahirabdullah',
  github: 'https://github.com/Mahirrrr',
  email: 'mahir6728@gmail.com',
};
