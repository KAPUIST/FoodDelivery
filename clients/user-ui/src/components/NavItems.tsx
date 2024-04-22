import Link from 'next/link';

const navItems = [
  { title: '홈', url: '/' },
  { title: '식당', url: 'restaurants' },
  { title: '인기메뉴', url: 'foods' },
];
const NavItems = ({ activeItem = 0 }: { activeItem?: number }) => {
  return (
    <div>
      {navItems.map((item, index) => (
        <Link
          key={item.url}
          href={item.url}
          className={`px-5 text-[18px] font-Naum font-[500] ${
            activeItem === index && 'text-[#2d83d8]'
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
