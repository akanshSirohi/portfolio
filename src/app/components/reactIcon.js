import dynamic from 'next/dynamic';

const iconComponents = {
  Ai: () => import('react-icons/ai'),
  Bs: () => import('react-icons/bs'),
  Bi: () => import('react-icons/bi'),
  Ci: () => import('react-icons/ci'),
  Di: () => import('react-icons/di'),
  Fi: () => import('react-icons/fi'),
  Fc: () => import('react-icons/fc'),
  Fa: () => import('react-icons/fa6'),
  Gi: () => import('react-icons/gi'),
  Go: () => import('react-icons/go'),
  Gr: () => import('react-icons/gr'),
  Hi: () => import('react-icons/hi2'),
  Im: () => import('react-icons/im'),
  Lia: () => import('react-icons/lia'),
  Io: () => import('react-icons/io5'),
  Lu: () => import('react-icons/lu'),
  Md: () => import('react-icons/md'),
  Pi: () => import('react-icons/pi'),
  Rx: () => import('react-icons/rx'),
  Ri: () => import('react-icons/ri'),
  Si: () => import('react-icons/si'),
  Sl: () => import('react-icons/sl'),
  Tb: () => import('react-icons/tb'),
  Tfi: () => import('react-icons/tfi'),
  Ti: () => import('react-icons/ti'),
  Vsc: () => import('react-icons/vsc'),
  Wi: () => import('react-icons/wi'),
  Cg: () => import('react-icons/cg'),
};

export default function ReactIcon(props) {
  const { icon, size } = props;

  const className = props.className ?? '';
  const color = props.color ?? '';

  for(let i = 3; i >= 2; i--) {
    const iconComponentImport = iconComponents[icon.substring(0, i)];
    if (iconComponentImport) {
      const DynamicIcon = dynamic(() =>
        iconComponentImport().then((icons) => icons[icon])
      );
      // don't add color attribute if its empty
      if (color === '') {
        return <DynamicIcon size={size} className={className} />;
      }
      return <DynamicIcon size={size} color={color} className={className} />;
    }
  }

  return <></>;
}