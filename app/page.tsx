import Link from 'next/link';
import styles from './page.module.css';
import color from './colors/colors.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/colors">
        <button className={color.button}>Colors</button>
      </Link>
      <Link href="/buttons">
        <button className={color.button}>Buttons</button>
      </Link>
    </main>
  );
}
