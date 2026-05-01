import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import DownloadIcon from '@mui/icons-material/Download';
import Typewriter from './ui/Typewriter';
import GlitchText from './ui/GlitchText';
import TerminalWindow from './ui/TerminalWindow';

const bootLines = [
  { text: '[ OK ] Initializing kernel modules...', color: 'var(--text-secondary)' },
  { text: '[ OK ] Mounting /dev/portfolio at /home/chanvitha', color: 'var(--text-secondary)' },
  { text: '[ OK ] Loading neural network drivers...', color: 'var(--text-secondary)' },
  { text: '[ OK ] Establishing secure connection to grid...', color: 'var(--text-secondary)' },
  { text: '[ OK ] Decrypting profile.bin -> SUCCESS', color: 'var(--neon-green)' },
  { text: '[ >> ] Launching ./chanvitha --interactive', color: 'var(--neon-amber)' },
];

const ASCII = `
 ██████╗██╗  ██╗ █████╗ ███╗   ██╗██╗   ██╗██╗████████╗██╗  ██╗ █████╗ 
██╔════╝██║  ██║██╔══██╗████╗  ██║██║   ██║██║╚══██╔══╝██║  ██║██╔══██╗
██║     ███████║███████║██╔██╗ ██║██║   ██║██║   ██║   ███████║███████║
██║     ██╔══██║██╔══██║██║╚██╗██║╚██╗ ██╔╝██║   ██║   ██╔══██║██╔══██║
╚██████╗██║  ██║██║  ██║██║ ╚████║ ╚████╔╝ ██║   ██║   ██║  ██║██║  ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
                  [ S Y S T E M . O N L I N E ]   v.0x2026
`;

const Hero = () => {
  const [bootStep, setBootStep] = useState(0);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    if (bootStep < bootLines.length) {
      const t = setTimeout(() => setBootStep((s) => s + 1), 320);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBootDone(true), 600);
    return () => clearTimeout(t);
  }, [bootStep]);

  return (
    <section id="hero" className="relative pt-12 md:pt-16 pb-12">
      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Boot + ASCII */}
        <div className="lg:col-span-7 space-y-5">
          <TerminalWindow title="root@chanvitha:~ — boot.sh" showScan>
            <div className="p-5 md:p-6 font-mono text-sm md:text-[15px] min-h-[260px]">
              {bootLines.slice(0, bootStep).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ color: line.color }}
                  className="leading-7"
                >
                  {line.text}
                </motion.div>
              ))}
              {bootDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <pre className="ascii-art mt-4 mb-2 leading-[1.05]">{ASCII}</pre>
                  <div className="text-[var(--text-secondary)] mt-3 text-xs md:text-sm">
                    <span className="text-[var(--neon-cyan)]">$</span>{' '}
                    <Typewriter
                      text={[
                        'whoami --verbose',
                        'cat ./about.txt',
                        'sudo run --hack-the-planet',
                        'connect --to=opportunities',
                      ]}
                      speed={55}
                      loop
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </TerminalWindow>

          {bootDone && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/terminal"
                className="btn-cyber"
                style={{
                  fontWeight: 'bold',
                  animation: 'pulse-glow 2.4s ease-in-out infinite',
                }}
              >
                <span>&gt;_</span> launch live terminal
              </Link>
              <a href="#projects" className="btn-cyber btn-cyber-cyan">
                <span>$</span> view projects
              </a>
              <a
                href="/Resume of Chanvitha Praveen.pdf"
                download
                className="btn-cyber"
                style={{ color: 'var(--neon-amber)', borderColor: 'var(--neon-amber)' }}
              >
                <DownloadIcon style={{ fontSize: 16 }} /> resume.pdf
              </a>
            </motion.div>
          )}
        </div>

        {/* Right: Identity card */}
        <div className="lg:col-span-5">
          <TerminalWindow title="./identity --decode" className="h-full">
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 rounded-sm overflow-hidden border border-[var(--neon-green)] flicker"
                    style={{
                      boxShadow: '0 0 14px rgba(0, 255, 65, 0.5), inset 0 0 14px rgba(0, 255, 65, 0.2)',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/my-photo.png"
                      alt="Chanvitha Praveen"
                      className="w-full h-full object-cover"
                      style={{ filter: 'contrast(1.05) saturate(0.9) hue-rotate(-8deg)' }}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[var(--text-muted)]">{`// operator`}</div>
                  <GlitchText
                    text="CHANVITHA PRAVEEN"
                    className="text-xl md:text-2xl font-bold block leading-tight"
                  />
                  <div className="text-[var(--neon-cyan)] text-sm mt-1">
                    <Typewriter
                      text={[
                        'Computer Engineer',
                        'Full-Stack Developer',
                        'ML / AI Enthusiast',
                        'Security Researcher',
                      ]}
                      loop
                    />
                  </div>
                </div>
              </div>

              <div className="font-mono text-[13px] space-y-1.5 border-t border-[var(--border-color)] pt-4">
                <div>
                  <span className="text-[var(--text-muted)]">role&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="text-[var(--neon-amber)]">::</span>{' '}
                  <span className="text-[var(--text-primary)]">BSc. Eng (Hons) Computer Engineering</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)]">status&nbsp;&nbsp;</span>
                  <span className="text-[var(--neon-amber)]">::</span>{' '}
                  <span className="text-[var(--neon-green)]">[ ONLINE ]</span>{' '}
                  <span className="cursor-blink" style={{ height: '0.7em', width: 6 }} />
                </div>
                <div>
                  <span className="text-[var(--text-muted)]">location</span>
                  <span className="text-[var(--neon-amber)]"> ::</span>{' '}
                  <span>Sri Lanka / 06.9°N · 79.8°E</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)]">email&nbsp;&nbsp;&nbsp;</span>
                  <span className="text-[var(--neon-amber)]">::</span>{' '}
                  <a href="mailto:chanvithapraween@gmail.com">chanvithapraween@gmail.com</a>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border-color)]">
                <SocialIcon href="https://github.com/ChanvithaPraveen" Icon={GitHubIcon} />
                <SocialIcon href="https://www.linkedin.com/in/chanvithapraveen/" Icon={LinkedInIcon} />
                <SocialIcon href="mailto:chanvithapraween@gmail.com" Icon={EmailIcon} />
                <SocialIcon href="https://x.com/ChanvithaP" Icon={TwitterIcon} />
                <SocialIcon
                  href="https://facebook.com/chanvitha.edirisinghedewayalage"
                  Icon={FacebookIcon}
                />
                <SocialIcon
                  href="https://www.shutterstock.com/g/chanvitha+praveen"
                  Icon={ImageSearchIcon}
                />
              </div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
};

const SocialIcon: React.FC<{ href: string; Icon: any }> = ({ href, Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 grid place-items-center border border-[var(--border-color)] text-[var(--neon-green)] hover:bg-[rgba(0,255,65,0.1)] hover:border-[var(--neon-green)] transition"
    style={{ textDecoration: 'none' }}
  >
    <Icon style={{ fontSize: 18 }} />
  </a>
);

export default Hero;
