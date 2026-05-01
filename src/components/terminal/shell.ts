import { filesystem, FsDir, FsNode, HOME_PATH } from '../../data/filesystem';

export type LineKind = 'in' | 'out' | 'err' | 'sys' | 'ascii';
export interface Line {
  kind: LineKind;
  text: string;
}

export interface ShellState {
  cwd: string;
  history: string[];
}

const ROOT_DIR: FsDir = filesystem;

const splitPath = (p: string) => p.split('/').filter(Boolean);

export const normalize = (cwd: string, target: string): string => {
  if (!target) return cwd;
  if (target === '~') return HOME_PATH;
  if (target.startsWith('~/')) target = HOME_PATH + target.slice(1);
  const segs = target.startsWith('/') ? splitPath(target) : [...splitPath(cwd), ...splitPath(target)];
  const out: string[] = [];
  for (const s of segs) {
    if (s === '.' || s === '') continue;
    if (s === '..') out.pop();
    else out.push(s);
  }
  return '/' + out.join('/');
};

export const resolve = (path: string): FsNode | null => {
  const segs = splitPath(path);
  let node: FsNode = ROOT_DIR;
  for (const s of segs) {
    if (node.type !== 'dir') return null;
    const child: FsNode | undefined = node.children[s];
    if (!child) return null;
    node = child;
  }
  return node;
};

export const lsDir = (path: string): FsNode[] | null => {
  const node = resolve(path);
  if (!node || node.type !== 'dir') return null;
  return Object.values(node.children).sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
};

const formatBytes = (n: number) =>
  n.toString().padStart(5, ' ');

export const NEOFETCH_ASCII = `\
            .-/+oossssoo+/-.               operator    : chanvitha
        \`:+ssssssssssssssssss+:\`           os          : ChanvithaOS 0x2026.05
      -+ssssssssssssssssssyyssss+-         host        : portfolio.terminal
    .ossssssssssssssssssdMMMNysssso.       kernel      : neongrid 6.6.6-cyber
   /ssssssssssshdmmNNmmyNMMMMhssssss/      shell       : nash (chanvitha-shell)
  +ssssssssshmydMMMMMMMNddddyssssssss+     resolution  : 1920x1080
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    de          : ./hacker-grid
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   wm          : matrix-rain
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   theme       : neon-green-on-black
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   icons       : ascii-only
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   terminal    : nash 1.0
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   cpu         : human-brain @ 4.2 GHz
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   memory      : ∞ MiB / coffee MiB
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    storage     : github.com/ChanvithaPraveen
  +sssssssssdmydMMMMMMMMddddyssssssss+     status      : [ online ]
   /ssssssssssshdmNNNNmyNMMMMhssssss/      contact     : chanvithapraween@gmail.com
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-                  ███████  ███████  ███████
        \`:+ssssssssssssssssss+:\`                    ░░░░░░░  ░░░░░░░  ░░░░░░░
            .-/+oossssoo+/-.
`;

export const BANNER = `\
 ██████╗██╗  ██╗ █████╗ ███╗   ██╗██╗   ██╗██╗████████╗██╗  ██╗ █████╗ 
██╔════╝██║  ██║██╔══██╗████╗  ██║██║   ██║██║╚══██╔══╝██║  ██║██╔══██╗
██║     ███████║███████║██╔██╗ ██║██║   ██║██║   ██║   ███████║███████║
██║     ██╔══██║██╔══██║██║╚██╗██║╚██╗ ██╔╝██║   ██║   ██╔══██║██╔══██║
╚██████╗██║  ██║██║  ██║██║ ╚████║ ╚████╔╝ ██║   ██║   ██║  ██║██║  ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
                >>>  N E O N _ G R I D   T E R M I N A L  <<<
`;

export const HELP = `\
Available commands:

  Navigation
    pwd                 print current directory
    ls [path] [-l|-a]   list directory contents
    cd <path>           change directory   ('cd ~' goes home, 'cd ..' up)
    tree [path]         print recursive directory tree

  Files
    cat <file...>       print file contents
    head [-n N] <file>  print first N lines (default 10)
    tail [-n N] <file>  print last N lines  (default 10)
    file <name>         classify a file
    wc <file>           word/line/char count
    grep <ptn> <file>   search for text within file

  System
    whoami              print current user
    uname [-a]          print system info
    date                print current date/time
    neofetch            decorative system info
    banner              print ASCII banner
    history             list previous commands
    echo <text>         print text
    clear  /  cls       clear the terminal
    help                show this help
    sudo <cmd>          [denied — public read shell]
    exit                close terminal

  Tip: try     cat README.md       or       tree
`;

const colorize = (line: string): string => line; // colorization handled by renderer

export interface RunResult {
  lines: Line[];
  newCwd?: string;
  clear?: boolean;
  exit?: boolean;
}

const padRight = (s: string, n: number) => (s.length >= n ? s : s + ' '.repeat(n - s.length));

const lsLong = (nodes: FsNode[]) =>
  nodes
    .map((n) => {
      const mode = n.mode || (n.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--');
      const size = n.type === 'file' ? formatBytes(n.size || 0) : formatBytes(4096);
      const date = n.mtime || '2026-04-29';
      const name =
        n.type === 'dir' ? `\u001b[bold]${n.name}/\u001b[/bold]` : n.name;
      return `${mode}  1 chanvitha staff ${size}  ${date}  ${name}`;
    })
    .join('\n');

const lsShort = (nodes: FsNode[]) =>
  nodes
    .map((n) => (n.type === 'dir' ? `\u001b[dir]${n.name}/\u001b[/dir]` : n.name))
    .join('  ');

const buildTree = (node: FsNode, prefix = '', isLast = true): string => {
  if (node.type !== 'dir') return prefix + node.name + '\n';
  const entries = Object.values(node.children).sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  let out = prefix === '' ? `${node.name}/\n` : '';
  entries.forEach((c, i) => {
    const last = i === entries.length - 1;
    const branch = last ? '└── ' : '├── ';
    const childPrefix = prefix + (last ? '    ' : '│   ');
    if (c.type === 'dir') {
      out += prefix + branch + c.name + '/\n';
      out += buildTree(c, childPrefix, last);
    } else {
      out += prefix + branch + c.name + '\n';
    }
  });
  return out;
};

const runSingle = (raw: string, state: ShellState): RunResult => {
  const cmdRaw = raw.trim();
  if (!cmdRaw) return { lines: [] };

  const parts = cmdRaw.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  const out = (text: string): Line[] => [{ kind: 'out', text }];
  const err = (text: string): Line[] => [{ kind: 'err', text }];

  switch (cmd) {
    case 'help':
    case '?':
    case 'man':
      return { lines: out(HELP) };

    case 'clear':
    case 'cls':
      return { lines: [], clear: true };

    case 'exit':
    case 'logout':
    case 'quit':
      return { lines: out('Connection closed by remote host.'), exit: true };

    case 'banner':
      return { lines: [{ kind: 'ascii', text: BANNER }] };

    case 'neofetch':
      return { lines: [{ kind: 'ascii', text: NEOFETCH_ASCII }] };

    case 'pwd':
      return { lines: out(state.cwd) };

    case 'whoami':
      return { lines: out('chanvitha') };

    case 'uname': {
      if (args.includes('-a')) {
        return {
          lines: out(
            'ChanvithaOS portfolio.terminal 6.6.6-cyber #1 SMP Tue Apr 29 2026 x86_64 GNU/Linux'
          ),
        };
      }
      return { lines: out('ChanvithaOS') };
    }

    case 'date':
      return { lines: out(new Date().toString()) };

    case 'echo':
      return { lines: out(args.join(' ')) };

    case 'history':
      return {
        lines: out(
          state.history.map((h, i) => `  ${(i + 1).toString().padStart(4)}  ${h}`).join('\n')
        ),
      };

    case 'sudo':
    case 'su':
    case 'rm':
    case 'mv':
    case 'cp':
    case 'mkdir':
    case 'touch':
    case 'chmod':
    case 'chown':
      return {
        lines: err(
          `${cmd}: permission denied. This is a public read-only shell. (nice try.)`
        ),
      };

    case 'ls': {
      const flags = args.filter((a) => a.startsWith('-')).join('');
      const long = flags.includes('l');
      const all = flags.includes('a');
      const targets = args.filter((a) => !a.startsWith('-'));
      const path = normalize(state.cwd, targets[0] || '.');
      const node = resolve(path);
      if (!node) return { lines: err(`ls: cannot access '${targets[0]}': No such file or directory`) };
      if (node.type === 'file') return { lines: out(node.name) };
      let nodes = Object.values(node.children);
      if (!all) nodes = nodes.filter((n) => !n.name.startsWith('.'));
      nodes.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      const text = long ? lsLong(nodes) : lsShort(nodes);
      return { lines: [{ kind: 'out', text }] };
    }

    case 'cd': {
      const target = args[0] || '~';
      const path = normalize(state.cwd, target);
      const node = resolve(path);
      if (!node) return { lines: err(`cd: no such file or directory: ${target}`) };
      if (node.type !== 'dir') return { lines: err(`cd: not a directory: ${target}`) };
      return { lines: [], newCwd: path };
    }

    case 'tree': {
      const path = normalize(state.cwd, args[0] || '.');
      const node = resolve(path);
      if (!node) return { lines: err(`tree: '${args[0]}' [error opening dir]`) };
      if (node.type !== 'dir') return { lines: err(`tree: '${args[0]}' is a file`) };
      return { lines: [{ kind: 'ascii', text: buildTree(node) }] };
    }

    case 'cat': {
      if (args.length === 0) return { lines: err('cat: missing operand') };
      const lines: Line[] = [];
      for (const a of args) {
        const path = normalize(state.cwd, a);
        const node = resolve(path);
        if (!node) lines.push({ kind: 'err', text: `cat: ${a}: No such file or directory` });
        else if (node.type === 'dir') lines.push({ kind: 'err', text: `cat: ${a}: Is a directory` });
        else lines.push({ kind: 'out', text: node.content.trimEnd() });
      }
      return { lines };
    }

    case 'head':
    case 'tail': {
      let n = 10;
      const filtered = [...args];
      const ni = filtered.indexOf('-n');
      if (ni >= 0) {
        n = parseInt(filtered[ni + 1] || '10', 10);
        filtered.splice(ni, 2);
      }
      const target = filtered[0];
      if (!target) return { lines: err(`${cmd}: missing operand`) };
      const node = resolve(normalize(state.cwd, target));
      if (!node) return { lines: err(`${cmd}: cannot open '${target}': No such file`) };
      if (node.type === 'dir') return { lines: err(`${cmd}: ${target}: Is a directory`) };
      const all = node.content.split('\n');
      const sliced = cmd === 'head' ? all.slice(0, n) : all.slice(-n);
      return { lines: out(sliced.join('\n')) };
    }

    case 'wc': {
      const target = args[0];
      if (!target) return { lines: err('wc: missing operand') };
      const node = resolve(normalize(state.cwd, target));
      if (!node || node.type !== 'file') return { lines: err(`wc: ${target}: No such file`) };
      const lines = node.content.split('\n').length;
      const words = node.content.split(/\s+/).filter(Boolean).length;
      const chars = node.content.length;
      return {
        lines: out(`  ${lines}  ${words}  ${chars}  ${target}`),
      };
    }

    case 'file': {
      const target = args[0];
      if (!target) return { lines: err('file: missing operand') };
      const node = resolve(normalize(state.cwd, target));
      if (!node) return { lines: err(`file: ${target}: No such file`) };
      if (node.type === 'dir') return { lines: out(`${target}: directory`) };
      const ext = node.name.split('.').pop();
      const map: Record<string, string> = {
        md: 'Markdown document, UTF-8 text',
        txt: 'ASCII text',
        json: 'JSON data',
      };
      return { lines: out(`${target}: ${map[ext || ''] || 'data'}`) };
    }

    case 'grep': {
      const ptn = args[0];
      const target = args[1];
      if (!ptn || !target) return { lines: err('usage: grep <pattern> <file>') };
      const node = resolve(normalize(state.cwd, target));
      if (!node || node.type !== 'file') return { lines: err(`grep: ${target}: No such file`) };
      const matches = node.content
        .split('\n')
        .filter((l) => l.toLowerCase().includes(ptn.toLowerCase()));
      if (matches.length === 0) return { lines: [] };
      return { lines: out(matches.join('\n')) };
    }

    default:
      return {
        lines: err(`${cmd}: command not found. Try 'help'.`),
      };
  }
};

export const runCommand = (raw: string, state: ShellState): RunResult => {
  const segments = raw.split('&&').map((s) => s.trim()).filter(Boolean);
  if (segments.length <= 1) return runSingle(raw, state);

  let cwd = state.cwd;
  const lines: Line[] = [];
  let clear = false;
  let exit = false;
  for (const seg of segments) {
    const r = runSingle(seg, { cwd, history: state.history });
    if (r.lines) lines.push(...r.lines);
    if (r.newCwd) cwd = r.newCwd;
    if (r.clear) {
      lines.length = 0;
      clear = true;
    }
    if (r.exit) {
      exit = true;
      break;
    }
    if (r.lines.some((l) => l.kind === 'err')) break;
  }
  return {
    lines,
    newCwd: cwd !== state.cwd ? cwd : undefined,
    clear,
    exit,
  };
};

export const COMMANDS = [
  'help',
  'ls',
  'cd',
  'pwd',
  'cat',
  'tree',
  'whoami',
  'uname',
  'date',
  'echo',
  'history',
  'clear',
  'cls',
  'banner',
  'neofetch',
  'head',
  'tail',
  'wc',
  'file',
  'grep',
  'exit',
];
