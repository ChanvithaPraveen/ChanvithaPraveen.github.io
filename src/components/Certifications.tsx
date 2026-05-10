import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import TerminalWindow from './ui/TerminalWindow';
import VerifiedIcon from '@mui/icons-material/Verified';
import LaunchIcon from '@mui/icons-material/Launch';
import { useSfx } from '../hooks/useSfx';

interface Cert {
  logo: string;
  courseName: string;
  description: string;
  link: string;
}

const certifications: Cert[] = [
  {
    logo: '/coursera.png',
    courseName: 'Python Data Structures — University of Michigan',
    description: '',
    link: 'https://www.coursera.org/account/accomplishments/verify/XNZC76Q72C3R',
  },
  {
    logo: '/kaggle.png',
    courseName: 'Introduction To Machine Learning',
    description: '',
    link: 'https://www.kaggle.com/learn/certification/chanvithapraveen/intro-to-machine-learning',
  },
  {
    logo: '/coursera.png',
    courseName: 'React Basics — Meta',
    description: '',
    link: 'https://www.coursera.org/account/accomplishments/verify/6K8KHLAPUYH5',
  },
  {
    logo: '/awss.png',
    courseName: 'AWS Educate Introduction to Cloud',
    description: '',
    link: 'https://www.credly.com/badges/210bb767-b183-4f4a-84ee-e16f331aff77/linked_in_profile',
  },
  {
    logo: '/coursera.png',
    courseName: 'SQL For Data Science — UC Davis',
    description: '',
    link: 'https://www.coursera.org/account/accomplishments/certificate/6F8ABW67RB2S',
  },
  {
    logo: '/cisco.jpg',
    courseName: 'Introduction To Cybersecurity — Cisco',
    description: '',
    link: 'https://www.credly.com/badges/6cba6cba-ac08-4715-9a89-920c307ebe89?source=linked_in_profile',
  },
];

const Certifications = () => {
  const { play } = useSfx();
  return (
    <section id="certifications" className="py-12 md:py-16">
      <SectionHeader
        index="06"
        command="ls ./certs --signed --verified"
        title="certifications.dat"
        subtitle="Hash-verified academic & technical credentials"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certifications.map((c, i) => (
          <motion.a
            key={i}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => play('beep')}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
            className="block hover-lift"
            style={{ textDecoration: 'none' }}
          >
            <TerminalWindow title={`cert_0x${(i + 1).toString(16).padStart(2, '0')}`}>
              <div className="p-4 flex flex-col gap-3 font-mono">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 border border-[var(--border-color)] grid place-items-center p-1.5"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={c.courseName} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-[10px] text-[var(--neon-green)]">
                      <VerifiedIcon style={{ fontSize: 12 }} />
                      VERIFIED
                    </div>
                    <div className="text-[12.5px] text-[var(--text-primary)] leading-tight">
                      {c.courseName}
                    </div>
                  </div>
                </div>
                <div className="border-t border-[var(--border-color)] pt-2 flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-muted)]">hash: {(0xb1f2e30 + i * 0x451).toString(16)}</span>
                  <span className="text-[var(--neon-cyan)] flex items-center gap-1">
                    open <LaunchIcon style={{ fontSize: 11 }} />
                  </span>
                </div>
              </div>
            </TerminalWindow>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
