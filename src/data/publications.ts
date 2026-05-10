export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  location: string;
  year: string;
  pages: string;
  doi: string;
  link: string;
  abstract: string;
  keywords: string[];
  publisher: string;
  citation: string;
}

const publications: Publication[] = [
  {
    title:
      'TryOnAI: Revolutionizing Online Shopping with Augmented Reality and Deep Learning for Virtual Try-Ons and Size Prediction',
    authors: [
      'U. B. R. A. Gunaratne',
      'A. N. L. Illangarathna',
      'E. D. C. Praveen',
      'N. H. Wanigasingha',
      'U. Wijenayake',
    ],
    venue:
      '2026 6th International Conference on Advanced Research in Computing (ICARC)',
    location: 'Belihuloya, Sri Lanka',
    year: '2026',
    pages: 'pp. 1–6',
    doi: '10.1109/ICARC68737.2026.11453617',
    link: 'https://ieeexplore.ieee.org/document/11453617',
    publisher: 'IEEE Xplore',
    abstract:
      'In the fashion industry, Augmented Reality (AR) is changing how customers experience garments; this holds good, especially in custom clothing. This research aims at resolving the problem of how a customer and a vendor can view the visualization of garment fitting correctly online. The research designs an interactive fitting room system using AR that allows customers to interactively visualize garments and find their size accurately for a vendor. This is achieved with the support of Marvelous Designer for the design of realistic 3D garment models and Lens Studio for the development of AR sessions in virtual try-ons. The main components of the system were precise garment modeling, integration of AR technologies, and development of a size prediction feature based on anthropometric measurements. The methods used in this research include data collection, 3D garment creation, AR session development, and integration of the back-end and front-end of the system. The results show a generally user-friendly experience with high accuracy of size recommendations and realism in garment visualization, which led to increased satisfaction among both customers and vendors. This approach has already indicated vast potential for improving online shopping experiences in the fashion industry.',
    keywords: [
      'Augmented Reality',
      'Body Size Prediction',
      'Deep Learning',
      'Virtual Try-Ons',
      'E-commerce',
      'Real-time Systems',
      '3D Displays',
      'Predictive Models',
    ],
    citation:
      'U. B. R. A. Gunaratne, A. N. L. Illangarathna, E. D. C. Praveen, N. H. Wanigasingha and U. Wijenayake, "TryOnAI: Revolutionizing Online Shopping with Augmented Reality and Deep Learning for Virtual Try-Ons and Size Prediction," 2026 6th International Conference on Advanced Research in Computing (ICARC), Belihuloya, Sri Lanka, 2026, pp. 1-6, doi: 10.1109/ICARC68737.2026.11453617.',
  },
];

export default publications;
