import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "스토어", href: "/", active: true },
  { label: "AI OMR WORK", href: "#", active: false },
  { label: "챌린지", href: "#", active: false },
  { label: "히든카이스 소개", href: "#", active: false },
];

const UTIL_ITEMS = [
  { label: "장바구니", icon: "/icons/shopping-cart.svg", badge: 1, badgeOffset: 14 },
  { label: "알림", icon: "/icons/bell.svg", badge: 1, badgeOffset: 11 },
  { label: "마이페이지", icon: "/icons/user.svg", badge: 0, badgeOffset: 0 },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h1 className={styles.logo}>
            <Link href="/public" aria-label="HIDDEN KICE 홈">
              <Image src="/icons/logo-primary.svg" alt="HIDDEN KICE" width={142.851} height={17.472} preload />
            </Link>
          </h1>
          <nav aria-label="주요 메뉴">
            <ul className={styles.nav}>
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={item.active ? `${styles.navItem} ${styles.active}` : styles.navItem}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <ul className={styles.utils}>
          {UTIL_ITEMS.map((item) => (
            <li key={item.label} className={item.badge ? styles.utilWithBadge : styles.util}>
              <button type="button" className={styles.utilButton} aria-label={item.label}>
                <Image src={item.icon} alt="" width={24} height={24} />
              </button>
              {item.badge > 0 && (
                <span className={styles.badge} style={{ left: item.badgeOffset }} aria-label={`${item.badge}개`}>
                  {item.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
