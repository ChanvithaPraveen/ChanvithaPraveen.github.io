import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import TerminalWindow from './ui/TerminalWindow';

const STATS = [
  { label: 'projects_built', value: '30+', accent: 'var(--neon-green)' },
  { label: 'years_coding', value: '6+', accent: 'var(--neon-cyan)' },
  { label: 'tech_stack', value: '40+', accent: 'var(--neon-amber)' },
  { label: 'microservices', value: '12', accent: 'var(--neon-pink)' },
];

const About = () => {
  return (
    <section id="about" className="py-12 md:py-16 relative">
      <SectionHeader
        index="01"
        command="cat ./about.md"
        title="whoami"
        subtitle="Decoding operator profile..."
      />

      <div className="grid lg:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <TerminalWindow title="~/about/profile.md" className="h-full">
            <div className="p-5 md:p-7 font-mono text-[14px] leading-relaxed">
              <div className="text-[var(--text-muted)] mb-3">{`# about.md`}</div>
              <p className="mb-4 text-[var(--text-primary)]">
                <span className="text-[var(--neon-cyan)]">const</span>{' '}
                <span className="text-[var(--neon-green)]">me</span>{' '}
                <span className="text-[var(--neon-amber)]">=</span>{' '}
                <span className="text-[var(--text-muted)]">{'{'}</span>
              </p>
              <div className="pl-5 space-y-2">
                <p>
                  <span className="text-[var(--neon-pink)]">name</span>:{' '}
                  <span className="text-[var(--neon-green)]">{`"Chanvitha Praveen"`}</span>,
                </p>
                <p>
                  <span className="text-[var(--neon-pink)]">title</span>:{' '}
                  <span className="text-[var(--neon-green)]">{`"Computer Engineer"`}</span>,
                </p>
                <p>
                  <span className="text-[var(--neon-pink)]">passions</span>:{' '}
                  [<span className="text-[var(--neon-green)]">{`"Full-Stack Web"`}</span>,{' '}
                  <span className="text-[var(--neon-green)]">{`"Microservices"`}</span>,{' '}
                  <span className="text-[var(--neon-green)]">{`"Machine Learning"`}</span>,{' '}
                  <span className="text-[var(--neon-green)]">{`"Generative AI"`}</span>,{' '}
                  <span className="text-[var(--neon-green)]">{`"Computer Vision"`}</span>],
                </p>
                <p>
                  <span className="text-[var(--neon-pink)]">mission</span>:{' '}
                  <span className="text-[var(--neon-green)]">{`"Solving real-world problems with code"`}</span>,
                </p>
                <p>
                  <span className="text-[var(--neon-pink)]">currently</span>:{' '}
                  <span className="text-[var(--neon-green)]">{`"Software Engineer @ Singapore-based Logistics SaaS"`}</span>,
                </p>
                <p>
                  <span className="text-[var(--neon-pink)]">stack</span>:{' '}
                  <span className="text-[var(--neon-green)]">{`"Angular · NestJS · Java/Spring · Python · MongoDB · GCloud · K8s"`}</span>,
                </p>
              </div>
              <p className="text-[var(--text-muted)] mb-4">{'};'}</p>

              <div className="border-t border-[var(--border-color)] pt-4 mt-2 text-[var(--text-secondary)]">
                <div className="text-[var(--text-muted)] mb-2">{`# bio`}</div>
                <p>
                  As a Computer Engineer, I&apos;m passionate about Full Stack Web Development, Machine Learning &amp;
                  exploring emerging technologies. Currently shipping a 12-microservice logistics platform that
                  serves 7 major clients and 20+ operations — building KPI dashboards, revamping the GPS module,
                  and stabilising L1 issues with unit tests. Off-hours: generative AI, vision-transformer research,
                  and photography. Hardworking, responsible team player and eager to contribute &amp; learn within
                  dynamic environments.
                </p>
              </div>

              <div className="mt-5 text-[var(--neon-green)]">
                <span className="text-[var(--neon-amber)]">~$ </span>
                <span>echo $STATUS</span>
              </div>
              <div className="text-[var(--text-secondary)] pl-3">
                &gt; ready_for_collaboration: <span className="text-[var(--neon-green)]">true</span>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          <TerminalWindow title="~/stats --json">
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="border border-[var(--border-color)] p-3 hover-lift"
                    style={{ background: 'rgba(0,0,0,0.4)' }}
                  >
                    <div
                      className="text-2xl md:text-3xl font-bold font-mono"
                      style={{ color: s.accent, textShadow: `0 0 6px ${s.accent}` }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-1 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TerminalWindow>

          <TerminalWindow title="./mission --print">
            <div className="p-5 font-mono text-[13.5px] text-[var(--text-secondary)] space-y-2">
              <div>
                <span className="text-[var(--neon-amber)]">[01]</span> Build secure, scalable systems.
              </div>
              <div>
                <span className="text-[var(--neon-amber)]">[02]</span> Train models that ship to production.
              </div>
              <div>
                <span className="text-[var(--neon-amber)]">[03]</span> Reverse-engineer hard problems.
              </div>
              <div>
                <span className="text-[var(--neon-amber)]">[04]</span> Never stop learning, never stop shipping.
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
