
const projects = [
    { 
      title: 'AR/VR based simulator for custom made garments', 
      description: 'A project for garment field that users input basic body measurements & the scratch Deep Learning model gives complex body measurements. Users can wear custom garments designed by super admins in virtual wardrobe before purchasing.', 
      image: '/clothcraftar.png', 
      video: 'https://www.youtube.com/embed/ww1HgdMpJdU',  
      link: 'https://github.com/Nilupa-Illangarathna/FYP-ClothCraftAR_NodeBackend', 
      github: 'https://github.com/rusirugunaratne/clothcraft-ar',
      technologies: ['React', 'Node.js', 'MongoDB', 'fastapi', 'python', 'supabase']
    },
  
    { 
      title: 'Micro Serviced Online Airline Reservation System', 
      description: 'Developing separate services for User, Reservations, Flight Information, Frontend. Having Eureka service, load balancers, separate databases to have the microservice architecture. Try to maintain zero downtime with multi-servers (Blue/Green). ', 
      image: '/airline.png', 
      video: 'https://www.youtube.com/embed/YK4zwzHYapc', 
      link: '', 
      github: 'https://github.com/Binary-Clan/Airline-Reservation-System',
      technologies: [ 'Java', 'SpringBoot', 'Eureka Server', 'React', 'Docker', 'Microservices Architecture']
    },
  
    { 
      title: 'Advanced Vision Sudoku Puzzle Detector & Solver ', 
      description: 'This project is a 9x9 & 16x16 Sudoku Puzzle Solver application. Detect the puzzle via a camera & OCR by Easy OCR. Then pass the puzzle and solve in C++ because fast execution. For 9x9 puzzle it takes ~2.6ms & for 16x16 puzzle it takes only ~16.5ms.', 
      image: '/sudokuLogo.png', 
      video: 'https://www.youtube.com/embed/_oYP-ygDMoI',  
      link: '', 
      github: 'https://github.com/rusirugunaratne/VisualSudoku.git',
      technologies: [  'C++', 'Python', 'React', 'OpenCV', 'OCR', 'Computer Vision', 'ML', 'Heuristic Backtracking Algorithm' ]
    },
  
    { 
      title: 'elCare Mobile Application', 
      description: '\‘Elcare\’ is developed for senior citizens to assist effectively. They will get digital assistance through this application to easily manage their medical routines, sleep deprivation, emergencies, and to reach the family doctor and share their medical info. ', 
      image: '/elcare.png', 
      video: 'https://www.youtube.com/embed/rWGxdHvS8Sc',  
      link: '', 
      github: 'https://github.com/ChanvithaPraveen/elCare-Mobile-Application.git',
      technologies: [  'Flutter', 'Dart', 'Firebase', 'SQLite', 'Android', 'Hive' ]
    },
  
    { 
      title: 'IPL Twitter Hashtags Analysis & Forecaster', 
      description: 'This project Analyzes Twitter hashtags data to understand user engagement trends over time & across cities for analyzing past macro-data, past micro-data, forecasting future data. Initial dataset had 11 columns, after feature engineering, could be able to have 22 columns. Hope to add real time data stream analysis part also using Kafka as further improvements.', 
      image: '/iplAnalyzer.png', 
      video: 'https://www.youtube.com/embed/CakPpIzxALU',  
      link: '', 
      github: 'https://github.com/ChanvithaPraveen/IPL-Twitter-Hashtags-Analysis.git',
      technologies: [ 'Python', 'Streamlit', 'CSS', 'FASTAPI', 'TensorFlow', 'Data Mining', 'Deep Learning', 'GEO-API' ]
    },
  
    { 
      title: 'Realtime Chat Translator', 
      description: 'A Web Application with translation functionality for improve the ethnic cohesion. Users can send messages in their language, then translated and displayed to the recipient\'s chosen language. All messages show in a common chat lobby.', 
      image: '/realtimetranslator.png', 
      video: 'https://www.youtube.com/embed/S0fOuCCc3Q8',  
      link: '', 
      github: 'https://github.com/ChanvithaPraveen/Realtime-Message-Translator.git',
      technologies: [ 'Python', 'Streamlit', 'MyMemoryTranslation API', 'Realtime Firebase' ]
    },
  
    { 
      title: 'Cryptanz Blockchain Transaction System', 
      description: ' The “Cryptanz” platform is developed for transferring digital currencies via the Ethereum chain and the Ropston network. Also can view the latest transactions. As future improvements hope to add sending messages via AES encrypted method and user login via a PGP mail server instead of google sign-in at the moment.', 
      image: '/cryptanz.png', 
      video: 'https://www.youtube.com/embed/oWBWL-DHr-c', 
      link: '', 
      github: 'https://github.com/ChanvithaPraveen/cryptanz-blockchain-transaction-system.git',
      technologies: [ 'JavaScript', 'solidity', 'react', 'tailwindcss', 'hardhat', 'vite', 'blockchain' ]
    },
  
    { 
      title: 'AI vs Real Human Images - Research', 
      description: 'Classify High Realistic Stable Diffusion AI generated images and Real photographs of Human Faces to protect online privacy. Trained a custom dataset that assembled ~17000 images on ViT (Vision Transformer) model & developed an API to integrate into image uploaders in social media apps, web sites, etc. Currently got 99.97% accuracy & doing more optimizations. ', 
      image: '/research.png', 
      video: '/',  
      link: '', 
      github: '#',
      technologies: [ 'Python', 'FastAPI', 'Google Collab', 'ViT(Vision Transformers)', 'Pandas', 'Image Processing' ]
    },

  ];

  export default projects;