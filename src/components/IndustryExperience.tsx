import { motion } from 'framer-motion';
import experiences from '../data/experience';
import SectionHeader from './ui/SectionHeader';
import TerminalWindow from './ui/TerminalWindow';

const IndustryExperience = () => {
  return (
    <section id="experience" className="py-12 md:py-16">
      <SectionHeader
        index="02"
        command="git log --pretty=full --branch=career"
        title="experience.log"
        subtitle="Tracing operator's professional commits..."
      />

      <div className="space-y-5">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <TerminalWindow title={`commit ${(0xa1f4b3c + idx * 0x731).toString(16)}...`}>
              <div className="p-5 md:p-6 font-mono text-[14px]">
                <div className="grid lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-3 flex lg:flex-col items-start gap-4">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 border border-[var(--border-color)] p-1.5 grid place-items-center"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={exp.image} alt={exp.company} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <div className="text-[var(--neon-amber)] text-[12px]">[ DURATION ]</div>
                      <div className="text-[var(--text-primary)] text-[13px]">
                        {exp.startDate}
                        <span className="text-[var(--text-muted)] mx-1">→</span>
                        {exp.endDate}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-9 space-y-3">
                    <div>
                      <div className="text-[var(--text-muted)] text-[12px]">
                        Author: <span className="text-[var(--neon-cyan)]">chanvitha@{exp.company.split(' ')[0].toLowerCase()}</span>
                      </div>
                      <div className="text-[var(--neon-green)] text-lg md:text-xl font-bold mt-1 leading-tight">
                        {exp.title}
                      </div>
                      <div className="text-[var(--text-secondary)] text-[13px]">
                        @ {exp.company}
                      </div>
                    </div>

                    <p className="text-[var(--text-primary)] text-[13.5px] leading-6 border-l-2 border-[var(--neon-green)] pl-3">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.technologies.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IndustryExperience;
