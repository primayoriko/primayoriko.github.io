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
      type: 'full-time',
      durationMonths: 20,
    },
    {
      title: 'Software Engineer',
      company: 'GoTo Group',
      companyUrl: 'https://www.gotocompany.com',
      period: 'Oct 2022 – May 2024',
      location: 'Jakarta, Indonesia',
      description: 'Worked as a software engineer at one of the largest technology groups in Southeast Asia.',
      type: 'full-time',
      durationMonths: 19,
    },

    // --- Part-time ---
    {
      title: 'Software Engineer',
      company: 'AdaKerja',
      companyUrl: 'https://adakerja.com',
      period: 'Jul 2022 – Sep 2022',
      description: [
        'Reduce database cost by around 75% by fixing database issues.',
        'Reduce several endpoint latency by around 50% by optimizing the process and code.',
        'Improve services\' security by patching vulnerable dependencies that are used by back-end systems.',
      ],
      type: 'part-time',
      durationMonths: 2,
    },

    // --- Internship ---
    {
      title: 'DevOps Engineer',
      company: 'Traveloka',
      companyUrl: 'https://www.traveloka.com',
      period: 'Aug 2021 – Jan 2022',
      location: 'Tangerang, Indonesia',
      description: [
        'Reduce AWS RDS database migration time significantly by creating an automated migration and upgrading tool.',
        'Reduce manual steps in committing to Git by creating dependabot files generator in CI pipeline in Github with JavaScript.',
        'Enhance the payment system\'s security by providing a more secure gateway with AWS stack and external tools.',
      ],
      type: 'internship',
      durationMonths: 5,
    },
    {
      title: 'Software Development Engineer (FUTURE Program Batch V)',
      company: 'Blibli.com',
      companyUrl: 'https://www.blibli.com',
      period: 'Jan 2021 – Sep 2021',
      location: 'Indonesia',
      description: 'Improve skills (both hard skill and soft skill) by boot camping and creating a web-based Restaurant App.',
      type: 'internship',
      durationMonths: 8,
    },
    {
      title: 'Software Development Engineer',
      company: 'Blibli.com',
      companyUrl: 'https://www.blibli.com',
      period: 'Jun 2021 – Aug 2021',
      location: 'Indonesia',
      description: 'Improve the existing back-end of the trade-in system by implementing and enhancing features that are integrated with the ML system to adapt to new business needs.',
      type: 'internship',
      durationMonths: 2,
    },
    {
      title: 'Software Engineer',
      company: 'Pinhome',
      companyUrl: 'https://www.pinhome.id',
      period: 'Jan 2021 – Mar 2021',
      location: 'Jakarta, Indonesia',
      description: 'Help internal organization processes by creating an internal content management system.',
      type: 'internship',
      durationMonths: 2,
    },
    {
      title: 'Fullstack Web Programmer',
      company: 'Agate International',
      companyUrl: 'https://agate.id',
      period: 'Jun 2020 – Aug 2020',
      location: 'Bandung, Indonesia',
      description: 'Improving skills by creating a RESTful Web App with ASP .NET Core. In the App, I implement authentication, localization-globalization, middlewares, OData Protocol, design view with bootstrap, and also documenting the API with Swagger.',
      type: 'internship',
      durationMonths: 2,
    },

    // --- Voluntary ---
    {
      title: 'Assistant Coordinator of Distributed Systems Course',
      company: 'Institut Teknologi Bandung',
      period: 'Jan 2022 – Jun 2022',
      location: 'Bandung, Indonesia',
      type: 'voluntary',
      durationMonths: 5,
    },
    {
      title: 'Distributed Systems Laboratory Assistant',
      company: 'Institut Teknologi Bandung',
      period: 'Jul 2020 – Jun 2022',
      location: 'Bandung, Indonesia',
      description: 'Success in assisting students in distributed system lab courses (Computer Network, Operating Systems, Distributed Systems, and Organization and Architecture of Computer) by formulating practical tasks, tutoring, and grading.',
      type: 'voluntary',
      durationMonths: 23,
    },
    {
      title: 'Staff of IT',
      company: 'ARKAVIDIA',
      period: 'Sep 2020 – Mar 2021',
      location: 'Bandung, Indonesia',
      description: 'Success in delivering various features for Arkavidia web, like playing games, scoreboard, mailing, and checking out items with points.',
      type: 'voluntary',
      durationMonths: 6,
    },
    {
      title: 'Development Director of Anmategra',
      company: 'Kabinet KM ITB',
      period: 'Aug 2020 – Mar 2021',
      location: 'Bandung, Indonesia',
      description: 'Success in delivering a web application for student data collection by leading a team of six people, formulate the requirements to features, and taking part in the implementation.',
      type: 'voluntary',
      durationMonths: 7,
    },
    {
      title: 'Staff of Tech Career And Issues Division',
      company: 'HMIF Tech',
      period: 'Apr 2020 – Apr 2021',
      location: 'Bandung, Indonesia',
      type: 'voluntary',
      durationMonths: 12,
    },
    {
      title: 'Staff of Tech Career And Development Division',
      company: 'HMIF Tech',
      period: 'Oct 2019 – Mar 2020',
      location: 'Bandung, Indonesia',
      description: 'Organizing tech events and products, such as podcasts and workshops.',
      type: 'voluntary',
      durationMonths: 5,
    },
    {
      title: 'Deputy Head of Data Center Division',
      company: 'P3RI Salman ITB',
      period: 'Dec 2019 – Jul 2020',
      location: 'Bandung, Indonesia',
      type: 'voluntary',
      durationMonths: 7,
    },
    {
      title: 'Committee of CTF Competition',
      company: 'ARKAVIDIA',
      period: 'Nov 2019 – Feb 2020',
      location: 'Bandung, Indonesia',
      description: 'Help to organize the event, test the competition\'s platform, and create a rule book for this competition.',
      type: 'voluntary',
      durationMonths: 3,
    },
    {
      title: 'Staff of IT Division',
      company: 'TechoEntrepreneur Club (TEC) Internship 2019',
      period: 'Jul 2019 – Sep 2019',
      location: 'Bandung, Indonesia',
      description: 'Success in supporting various event agendas and data collection of the TEC Internship by creating IT-based stuff, such as forms and databases.',
      type: 'voluntary',
      durationMonths: 2,
    },
    {
      title: 'Instructor (OSN Astronomy)',
      company: 'Kementerian Agama Republik Indonesia',
      period: 'Jun 2019',
      location: 'Tangsel, Indonesia',
      description: 'Help and facilitate national olympiad students from Madrasah in Indonesia to learn by teaching and sharing my knowledge in astronomy and astrophysics at National Olympiad (OSN).',
      type: 'voluntary',
      durationMonths: 1,
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
      title: 'Top 20 Winner, Kalibrr CodeFest 2022',
      issuer: 'Kalibrr',
      year: '2022',
      description:
        'Selected as one of 20 winners of a programming competition from tens of thousands of participants.',
      level: 'national',
    },
    {
      title: 'Silver-Tiered Coder, Indonesian Young Coder League (IYCL) Vol. 2',
      issuer: 'Mekari x Money Forward',
      year: '2021',
      description:
        '19th place from all participants in the second edition of IYCL.',
      level: 'national',
    },
    {
      title: 'Finalist ACM ICPC Asia Jakarta Regional Contest 2021',
      issuer: 'ICPC Foundation',
      year: '2021',
      description:
        'Qualified after placing 9th out of ~600 teams at the national qualifier (Indonesia National Contest). Placed 33rd at the Asia-Pacific Jakarta Regional.',
      level: 'regional',
    },
    {
      title: 'Top 200 Global & 9th National, IEEExtreme 15.0',
      issuer: 'IEEE',
      year: '2021',
      description:
        'Ranked 156th worldwide from 5561 teams and 9th nationally in the 24-hour global programming challenge.',
      level: 'international',
    },
    {
      title: '3rd Place, Pra-Gemastik Programming Competition',
      issuer: 'Institut Teknologi Bandung',
      year: '2021',
      description:
        '3rd place at competitive programming competition at campus level.',
      level: 'campus',
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
      title: 'Candidate of Informatics Best Students 2020',
      issuer: 'ITB Informatics Undergraduate Study Program',
      year: '2021',
      description:
        'Selected as candidate of Most Outstanding Student based on academics, non-academics, innovation, and communication skills.',
      level: 'campus',
    },
    {
      title: 'Silver-Tiered Coder, Indonesian Young Coder League (IYCL) 2021',
      issuer: 'Mekari x Money Forward',
      year: '2021',
      description:
        '17th place from about 1000 participants.',
      level: 'national',
    },
    {
      title: 'Finalist ACM ICPC Asia Jakarta Regional Contest 2020',
      issuer: 'ICPC Foundation',
      year: '2020',
      description:
        'Qualified after placing 21st out of ~600 teams at the national qualifier.',
      level: 'regional',
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
      title: 'Top 200 Global & 6th National, IEEExtreme 14.0',
      issuer: 'IEEE',
      year: '2020',
      description:
        'Ranked 196th worldwide from 3701 teams and 6th nationally in the 24-hour global programming challenge.',
      level: 'international',
    },
    {
      title: 'Top 10 Finalists, Hult Prize at ITB',
      issuer: 'Hult Prize Foundation',
      year: '2019',
      description:
        'Top 10 in ITB qualification rounds for the international Hult Prize competition, in collaboration with the United Nations.',
      level: 'campus',
    },
    {
      title: 'Top 11, Slashroot CTF (Capture the Flag)',
      issuer: 'STIKOM Bali',
      year: '2019',
      description:
        'Top 11 from about 30 university teams in Jeopardy format CTF Competition covering web exploitation, cryptography, and forensics.',
      level: 'national',
    },
    {
      title: 'Top 8 Finalists, Competitive Programming Techphoria',
      issuer: 'Universitas Sriwijaya',
      year: '2019',
      description:
        '5th place in semifinal from about 20 university teams in competitive programming.',
      level: 'national',
    },
    {
      title: 'Gold Medal, Olimpiade Sains Nasional (OSN) Astronomi',
      issuer: 'Ministry of Education and Culture, Indonesia',
      year: '2017',
      description:
        '4th place among thousands of participants in Indonesia\'s biggest annual science competition in Astronomy.',
      level: 'national',
    },
    {
      title: 'Finalist, Olimpiade Sains Nasional (OSN) Astronomi',
      issuer: 'Ministry of Education and Culture, Indonesia',
      year: '2016',
      description:
        'Top 80 finalists among thousands of participants in Indonesia\'s national science olympiad.',
      level: 'national',
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
      name: 'Note App',
      period: 'May – Jun 2021',
      description:
        'Android-based app written in Kotlin to write notes, categorize them, and classify into favorites. Notes are editable and deletable.',
      url: 'https://github.com/primayoriko/android-note-app',
    },
    {
      name: '3D Model Animation Web',
      period: 'Apr 2021',
      description:
        'Single-page application using WebGL in JavaScript to animate 3D articulated models (Zebra, Crocodile, Robot).',
      url: 'https://github.com/primayoriko/webgl-animation-3d',
    },
    {
      name: 'Sport App',
      period: 'Apr 2021',
      description:
        'Android-based sport app showing online news, compass, training tracker on Google Maps, history, and schedule reminders.',
      url: 'https://github.com/primayoriko/android-sport-app',
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
      name: 'Tour Place App',
      period: 'Jan – Feb 2021',
      description:
        'Multi-platform application of tourism attraction places created with Dart and Flutter.',
      url: 'https://github.com/primayoriko/tour-place-app',
    },
    {
      name: 'Willy Wangky Chocolate Online Shop',
      period: 'Oct – Nov 2020',
      description:
        'Chocolate shop web app with vanilla PHP, JS, and CSS. Features authentication, CRUD items with images, checkout, and transaction history.',
      url: 'https://github.com/primayoriko/choco-shop-web',
    },
    {
      name: 'ASPNetCore Web App Template',
      period: 'Aug 2020',
      description:
        'A template to start an ASP.NET Core project already structured into MVC web and uses the main features of ASP.NET Core.',
      url: 'https://github.com/primayoriko/ASPNetCore-Template',
    },
    {
      name: 'Sorting Animation Web',
      period: 'Aug 2020',
      description:
        'Web app generating animations of sorting algorithms using React.js and plain CSS.',
      url: 'https://github.com/primayoriko/Sorting-Animation-Web',
    },
    {
      name: 'School System App',
      period: 'Jun – Aug 2020',
      description:
        'A CRUD app with Web MVC and API (REST + OData). Created using ASP.NET Core in C#.',
      url: 'https://github.com/primayoriko/aspnet-core-school-app',
    },
    {
      name: 'Simple Sundanese Translator',
      period: 'Jun 2020',
      description:
        'Web translator of Indonesia-Sunda and Sunda-Indonesia using various pattern matching algorithms with Flask.',
      url: 'https://github.com/primayoriko/indo-sundanese-translator',
    },
    {
      name: 'TextFile Search Engine',
      period: 'Apr 2020',
      description:
        'Web-based news search engine from text files using Boyer-Moore, KMP, and Regex. Built with Python + Flask.',
      url: 'https://github.com/primayoriko/textfile-search-engine',
    },
    {
      name: 'Calculator App',
      period: 'Mar 2020',
      description:
        'Desktop calculator application created with Kotlin, GUI with TornadoFX, and Gradle.',
      url: 'https://github.com/primayoriko/kotlin-calculator',
    },
    {
      name: 'COVID-19 Spread Modeller App',
      period: 'Feb – Mar 2020',
      description:
        'Desktop-based COVID-19 virus spread modeler using BFS graph model, built with C# and WPF Form.',
      url: 'https://github.com/primayoriko/COVID-19_SpreadModeller',
    },
  ],

  publications: [
    {
      title: 'Worker Balancing Implementation on DRAGON Scheduler for Distributed Deep Learning in Kubernetes',
      date: '2022',
      description:
        'Implemented a worker-balancing approach on the DRAGON scheduler for distributed deep learning in Kubernetes, reducing training duration by 16.31% compared to the original without reducing prediction accuracy.',
    },
    {
      title: 'Earley Algorithm as Evaluator for the Correctness of Language Expression',
      date: 'May 2020',
      description:
        'Explored the usage of Earley\'s algorithm as one way to validate the expression of a language.',
      url: 'https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2019-2020/Makalah/stima2020k2-004.pdf',
    },
    {
      title: 'Penggunaan Algoritma Edmonds-Karp dalam Mencari Debit Air Maksimum dari Sistem Kanal Bawah Tanah',
      date: 'Dec 2019',
      description:
        'Investigated the usage of the maxflow algorithm using the Edmonds-Karp approach to find the maximum debit of an underground canal system.',
      url: 'https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2019-2020/Makalah2019/13518146.pdf',
    },
  ],

  certifications: [
    {
      name: 'Docker Course for Beginners',
      issuer: 'Udemy (EdYoda Digital University)',
      issued: 'May 2021',
      url: 'https://udemy.com/certificate/UC-06eb7b51-3e60-4d15-86e3-aaec11d91abe',
    },
    {
      name: 'The Complete Front-End Web Development Course',
      issuer: 'Udemy (EdYoda Digital University)',
      issued: 'May 2021',
      url: 'https://udemy.com/certificate/UC-1504c31a-1ee9-4f62-81a9-747436897217',
    },
    {
      name: 'ICPCID',
      issuer: 'ICPC Foundation',
      issued: 'Nov 2020',
      url: 'https://icpc.global/ICPCID/V2PPTT16N99G',
    },
    {
      name: 'Pelatihan Nasional Tahap III',
      issuer: 'Kementerian Pendidikan dan Kebudayaan',
      issued: 'Aug 2018',
    },
    {
      name: 'Belajar Dasar Visualisasi Data',
      issuer: 'Dicoding Indonesia',
      issued: 'May 2021',
      expires: 'May 2024',
      url: 'https://dicoding.com/certificates/N9ZODR40DPG5',
    },
    {
      name: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)',
      issuer: 'Dicoding Indonesia',
      issued: 'Apr 2021',
      expires: 'Apr 2024',
      url: 'https://dicoding.com/certificates/L4PQMWJV7ZO1',
    },
    {
      name: 'Belajar Membuat Aplikasi Flutter untuk Pemula',
      issuer: 'Dicoding Indonesia',
      issued: 'Feb 2021',
      expires: 'Feb 2024',
      url: 'https://dicoding.com/certificates/0LZ0D6JQ3X65',
    },
    {
      name: 'Belajar Machine Learning untuk Pemula',
      issuer: 'Dicoding Indonesia',
      issued: 'Nov 2020',
      expires: 'Nov 2023',
      url: 'https://dicoding.com/certificates/72ZD293N6ZYW',
    },
    {
      name: 'Memulai Pemrograman Dengan Python',
      issuer: 'Dicoding Indonesia',
      issued: 'Apr 2020',
      expires: 'Apr 2023',
      url: 'https://dicoding.com/certificates/KEXL49WRMXG2',
    },
    {
      name: 'Belajar Dasar Pemrograman Web',
      issuer: 'Dicoding Indonesia',
      issued: 'Sep 2019',
      expires: 'Sep 2022',
      url: 'https://dicoding.com/certificates/GRX5G917RX0M',
    },
  ],

  courses: [
    { name: 'Algorithm & Data Structure', code: 'IF2110' },
    { name: 'Algorithm Strategies', code: 'IF2211' },
    { name: 'Artificial Intelligence', code: 'IF3170' },
    { name: 'Computational Logic', code: 'IF2121' },
    { name: 'Computer Graphics', code: 'IF3260' },
    { name: 'Computer Networks', code: 'IF3130' },
    { name: 'Computer Organization and Architecture', code: 'IF2130' },
    { name: 'Database', code: 'IF2240' },
    { name: 'Database Management', code: 'IF3140' },
    { name: 'Discrete Mathematics', code: 'IF2120' },
    { name: 'Distributed Application Development', code: 'IF4031' },
    { name: 'Formal Language Theory and Automata', code: 'IF2124' },
    { name: 'Geometric and Linear Algebra', code: 'IF2123' },
    { name: 'Human Computer Interaction', code: 'IF3151' },
    { name: 'Information System', code: 'IF3141' },
    { name: 'Machine Learning', code: 'IF3270' },
    { name: 'Modeling and Simulation', code: 'IF4021' },
    { name: 'Natural Language Processing', code: 'IF4072' },
    { name: 'Object Oriented Programming', code: 'IF2210' },
    { name: 'Operating System', code: 'IF2230' },
    { name: 'Parallel and Distributed Systems', code: 'IF3230' },
    { name: 'Platform-based Application Development', code: 'IF3210' },
    { name: 'Probability and Statistics', code: 'IF2220' },
    { name: 'Programming Fundamentals', code: 'IF1210' },
    { name: 'Socio-informatics and Professionalism', code: 'IF3280' },
    { name: 'Software Engineering', code: 'IF2250' },
    { name: 'Software Project', code: 'IF3250' },
    { name: 'Software Project Management', code: 'IF3150' },
    { name: 'Web based Application Development', code: 'IF3110' },
  ],

  languages: [
    { language: 'English', proficiency: 'Professional working proficiency' },
    { language: 'Indonesian', proficiency: 'Native or bilingual proficiency' },
    { language: 'Arabic', proficiency: 'Limited working proficiency' },
  ],
}
