import { motion } from 'framer-motion';
import educationData from '../data/education';
import SectionHeader from './ui/SectionHeader';
import TerminalWindow from './ui/TerminalWindow';
import SchoolIcon from '@mui/icons-material/School';

interface EduItem {
  institution: string;
  degree: string;
  duration: string;
  progress: number;
  description: string;
}

const Education = () => {
  const items = educationData as EduItem[];
  return (
    <section id="education" className="py-12 md:py-16">
      <SectionHeader
        index="05"
        command="tail -f ~/.bash_history | grep 'edu'"
        title="education.log"
        subtitle="Tracing knowledge acquisition pipeline..."
      />

      <div className="grid lg:grid-cols-3 gap-5">
        {items.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <TerminalWindow title={`./node_${i + 1}.edu`} className="h-full hover-lift">
              <div className="p-5 font-mono">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 grid place-items-center border border-[var(--neon-green)] text-[var(--neon-green)]"
                    style={{ background: 'rgba(0, 255, 65, 0.08)' }}
                  >
                    <SchoolIcon style={{ fontSize: 18 }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-[var(--text-muted)]">[ NODE_{String(i + 1).padStart(2, '0')} ]</div>
                    <div className="text-[var(--neon-green)] font-bold text-[14px] leading-tight">
                      {edu.institution}
                    </div>
                  </div>
                </div>
                <div className="text-[var(--text-secondary)] text-[12.5px] mb-2 leading-5">
                  <span className="text-[var(--neon-cyan)]">@</span> {edu.degree}
                </div>
                <div className="text-[var(--text-muted)] text-[11.5px] mb-3">
                  {edu.duration}
                </div>

                <div className="border-t border-[var(--border-color)] pt-3">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-[var(--text-muted)]">progress</span>
                    <span className="text-[var(--neon-green)]">{edu.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-[rgba(0,0,0,0.5)] border border-[var(--border-color)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${edu.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                      className="h-full"
                      style={{
                        background: 'linear-gradient(90deg, var(--neon-green), var(--neon-cyan))',
                        boxShadow: '0 0 6px var(--neon-green)',
                      }}
                    />
                  </div>
                </div>

                {edu.description && (
                  <div className="mt-3 text-[var(--text-secondary)] text-[12px] italic">
                    <span className="text-[var(--text-muted)]">{`// `}</span>{edu.description}
                  </div>
                )}
              </div>
            </TerminalWindow>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
