import type { ProfileData } from '@/types/profile'

export const profile: ProfileData = {
  name: 'Naufal Prima Yoriko',
  title: 'Software Engineer',
  location: 'Singapore',
  about:
    'A learner who is full of curiosity and strives to be a better person every day. Interested and focused on web development (especially backend), distributed systems & microservices, DevOps, and machine learning. Actively gaining working experiences at various companies and joining (winning/getting awards in some) various prestigious competitions at national and international levels.',
  githubUrl: 'https://github.com/primayoriko',
  linkedinUrl: 'https://www.linkedin.com/in/naufal-prima-yoriko/',

  experiences: [
    {
      title: 'Software Engineer',
      company: 'TikTok',
      companyUrl: 'https://www.tiktok.com',
      period: 'Jun 2024 – Present',
      location: 'Singapore',
      isCurrent: true,
    },
    {
      title: 'Software Engineer',
      company: 'GoTo Group',
      companyUrl: 'https://www.gotocompany.com',
      period: 'Oct 2022 – May 2024',
      location: 'Jakarta, Indonesia',
      description:
        'Worked as a software engineer at one of Southeast Asia\'s largest technology groups.',
    },
    {
      title: 'Software Engineer',
      company: 'AdaKerja',
      companyUrl: 'https://adakerja.com',
      period: 'Jul 2022 – Sep 2022',
      description:
        'Reduced database cost by ~75% by fixing database issues. Reduced several endpoint latency by ~50% by optimizing the process and code. Improved services\' security by patching vulnerable dependencies.',
    },
    {
      title: 'DevOps Engineer',
      company: 'Traveloka',
      companyUrl: 'https://www.traveloka.com',
      period: 'Aug 2021 – Jan 2022',
      location: 'Tangerang, Indonesia',
      description:
        'Reduced AWS RDS database migration time significantly by creating an automated migration and upgrading tool. Created dependabot files generator in CI pipeline. Enhanced payment system security with AWS stack.',
    },
    {
      title: 'Software Development Engineer',
      company: 'Blibli.com',
      companyUrl: 'https://www.blibli.com',
      period: 'Jun 2021 – Aug 2021',
      location: 'Indonesia',
      description:
        'Improved the existing back-end of the trade-in system by implementing and enhancing features integrated with the ML system to adapt to new business needs.',
    },
    {
      title: 'Software Engineer',
      company: 'Pinhome',
      companyUrl: 'https://www.pinhome.id',
      period: 'Jan 2021 – Mar 2021',
      location: 'Jakarta, Indonesia',
      description:
        'Helped internal organization processes by creating an internal content management system.',
    },
    {
      title: 'Fullstack Web Programmer',
      company: 'Agate International',
      companyUrl: 'https://agate.id',
      period: 'Jun 2020 – Aug 2020',
      location: 'Bandung, Indonesia',
      description:
        'Created a RESTful Web App with ASP .NET Core implementing authentication, localization, middlewares, OData Protocol, and Swagger documentation.',
    },
    {
      title: 'Distributed Systems Lab Assistant',
      company: 'Institut Teknologi Bandung',
      period: 'Jul 2020 – Jun 2022',
      location: 'Bandung, Indonesia',
      description:
        'Assisted students in distributed system lab courses (Computer Network, Operating Systems, Distributed Systems, and Computer Architecture) by formulating practical tasks, tutoring, and grading.',
    },
  ],

  education: [
    {
      degree: 'S1, Informatics Engineering',
      institution: 'Institut Teknologi Bandung',
      period: '2018 – 2022',
      location: 'Bandung, Indonesia',
    },
    {
      degree: 'High School, Science',
      institution: 'MAN Insan Cendekia Serpong',
      period: '2015 – 2018',
    },
  ],

  skills: [
    'Go',
    'Java',
    'Python',
    'JavaScript',
    'TypeScript',
    'C#',
    'Kotlin',
    'Dart',
    'Microservices',
    'Distributed Systems',
    'DevOps',
    'Docker',
    'Kubernetes',
    'AWS',
    'Git',
    'CI/CD',
    'REST API',
    'Spring Boot',
    'Django',
    'Flask',
    'Node.js',
    'React',
    'Vue',
    'Flutter',
    'PostgreSQL',
    'Machine Learning',
    'TensorFlow',
    'Problem Solving',
    'Web Development',
  ],

  awards: [
    {
      title: 'Gold Medal, Olimpiade Sains Nasional (OSN) Astronomi',
      issuer: 'Ministry of Education and Culture, Indonesia',
      year: '2017',
      description:
        '4th place among thousands of participants in Indonesia\'s biggest annual science competition in Astronomy.',
      level: 'national',
    },
    {
      title: 'Finalist ACM ICPC Asia Jakarta Regional Contest',
      issuer: 'ICPC Foundation',
      year: '2020 & 2021',
      description:
        'Qualified for the regional contest after placing 9th (2021) and 21st (2020) out of ~600 teams at the national qualifier.',
      level: 'regional',
    },
    {
      title: 'Top 200 Global & 6th/9th National, IEEExtreme Programming',
      issuer: 'IEEE',
      year: '2020 & 2021',
      description:
        'Ranked 156th worldwide (2021) from 5561 teams and 196th worldwide (2020) from 3701 teams in the 24-hour global programming challenge.',
      level: 'international',
    },
    {
      title: 'Top 20 Winner, Kalibrr CodeFest 2022',
      issuer: 'Kalibrr',
      year: '2022',
      description:
        'Selected as one of 20 winners from tens of thousands of participants.',
      level: 'national',
    },
    {
      title: '3rd Place, IFest Programming Competition',
      issuer: 'Universitas Atma Jaya Yogyakarta',
      year: '2021',
      description:
        '3rd place from dozens of teams in national competitive programming competition.',
      level: 'national',
    },
    {
      title: 'Silver-Tiered Coder, Indonesian Young Coder League (IYCL)',
      issuer: 'Mekari x Money Forward',
      year: '2021',
      description:
        'Achieved 17th and 19th place in two editions of the competition among ~1000 participants.',
      level: 'national',
    },
    {
      title: '9th Place, Shopee National Data Science Challenge',
      issuer: 'Shopee Indonesia',
      year: '2020',
      description:
        '9th place out of 150+ teams at national level data science competition.',
      level: 'national',
    },
    {
      title: 'Candidate of Informatics Best Students',
      issuer: 'ITB Informatics Undergraduate Study Program',
      year: '2021',
      description:
        'Selected as candidate of Most Outstanding Student based on academics, non-academics, innovation, and communication skills.',
      level: 'campus',
    },
  ],

  projects: [
    {
      name: 'Question Classifier WebApp',
      period: 'Nov 2021',
      description:
        'Web application prototype for Quora-like app implementing grammar corrector, question similarity checker, and topic classification using Deep Learning (BERT). Built with Django + TensorFlow.',
      url: 'https://github.com/primayoriko/question-classifier-webapp',
    },
    {
      name: 'Resto App (Backend)',
      period: 'Feb – Jul 2021',
      description:
        'Backend of a restaurant application for menu transactions and management using Java + Spring Boot with PostgreSQL.',
      url: 'https://github.com/primayoriko/resto-app-backend',
    },
    {
      name: '3D Model Animation Web',
      period: 'Apr 2021',
      description:
        'Single-page application using WebGL in JavaScript to animate 3D articulated models (Zebra, Crocodile, Robot).',
      url: 'https://github.com/primayoriko/webgl-animation-3d',
    },
    {
      name: 'Anmategra',
      period: 'Aug 2020 – Mar 2021',
      description:
        'Led a team of 6 to build a website storing student track records at ITB for better organization recruitment. Developed the backend with Node.js.',
      url: 'https://anmategra.com',
    },
    {
      name: 'Golang Forum API',
      period: 'Feb 2021',
      description:
        'An API for a Forum application built with Go, featuring an authenticated discussion system.',
      url: 'https://github.com/primayoriko/golang-forum-api',
    },
    {
      name: 'Willy Wangky Chocolate Online Shop',
      period: 'Oct – Nov 2020',
      description:
        'Chocolate shop web app with vanilla PHP, JS, and CSS. Features authentication, CRUD items with images, checkout, and transaction history.',
      url: 'https://github.com/primayoriko/choco-shop-web',
    },
    {
      name: 'Sorting Animation Web',
      period: 'Aug 2020',
      description:
        'Web app generating animations of sorting algorithms using React.js and plain CSS.',
      url: 'https://github.com/primayoriko/Sorting-Animation-Web',
    },
    {
      name: 'COVID-19 Spread Modeller App',
      period: 'Feb – Mar 2020',
      description:
        'Desktop-based COVID-19 virus spread modeler using BFS graph model, built with C# and WPF Form.',
      url: 'https://github.com/primayoriko/COVID-19_SpreadModeller',
    },
  ],

  languages: [
    { language: 'English', proficiency: 'Professional working proficiency' },
    { language: 'Indonesian', proficiency: 'Native or bilingual proficiency' },
    { language: 'Arabic', proficiency: 'Limited working proficiency' },
  ],
}
