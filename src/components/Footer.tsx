import { useEffect, useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

const Footer = () => {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const i = window.setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(i);
  }, []);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <footer
      className="mt-12 border-t font-mono"
      style={{ borderColor: 'var(--border-color)', background: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
        <div>
          <div className="text-[var(--neon-green)] text-sm font-bold tracking-widest mb-2">
            CHANVITHA.PRAVEEN
          </div>
          <p className="text-[var(--text-secondary)] text-[12px] leading-5">
            Computer Engineer · Building secure systems and intelligent software, one commit at a time.
          </p>
        </div>

        <div>
          <div className="text-[var(--neon-cyan)] text-[12px] mb-2">{`// quick_links`}</div>
          <ul className="text-[12.5px] space-y-1">
            <li>
              <a href="#about">$ ./about</a>
            </li>
            <li>
              <a href="#projects">$ ls ./projects</a>
            </li>
            <li>
              <a href="#contact">$ mail --to=me</a>
            </li>
            <li>
              <a href="/Resume of Chanvitha Praveen.pdf" download>
                $ wget resume.pdf
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-[var(--neon-cyan)] text-[12px] mb-2">{`// channels`}</div>
          <div className="flex gap-2 flex-wrap">
            <FooterIcon Icon={GitHubIcon} href="https://github.com/ChanvithaPraveen" />
            <FooterIcon Icon={LinkedInIcon} href="https://www.linkedin.com/in/chanvithapraveen/" />
            <FooterIcon Icon={EmailIcon} href="mailto:chanvithapraween@gmail.com" />
            <FooterIcon Icon={TwitterIcon} href="https://x.com/ChanvithaP" />
            <FooterIcon Icon={FacebookIcon} href="https://facebook.com/chanvitha.edirisinghedewayalage" />
            <FooterIcon Icon={ImageSearchIcon} href="https://www.shutterstock.com/g/chanvitha+praveen" />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="text-[11px] px-6 py-2 flex flex-wrap items-center gap-x-6 gap-y-1"
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <span className="text-[var(--neon-green)]">
          <span className="cursor-blink" style={{ height: '0.7em', width: 5 }} /> ● connected
        </span>
        <span className="text-[var(--text-muted)]">
          uptime <span className="text-[var(--neon-cyan)]">{fmt(uptime)}</span>
        </span>
        <span className="text-[var(--text-muted)]">
          build <span className="text-[var(--neon-amber)]">v.0x2026.05</span>
        </span>
        <span className="text-[var(--text-muted)] ml-auto">
          © {new Date().getFullYear()} Chanvitha Praveen — crafted in Next.js · all rights reserved.
        </span>
      </div>
    </footer>
  );
};

const FooterIcon: React.FC<{ Icon: any; href: string }> = ({ Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 grid place-items-center border border-[var(--border-color)] text-[var(--neon-green)] hover:bg-[rgba(0,255,65,0.1)] hover:border-[var(--neon-green)] transition"
    style={{ textDecoration: 'none' }}
  >
    <Icon style={{ fontSize: 15 }} />
  </a>
);

export default Footer;
