import styles from './styles/Header.module.css';

function Header() {
	return (
		<header className={styles['header']}>
			<h1 className={styles['header__title']}>Фильмопоиск</h1>
			<button className={styles['header__login']}>Войти</button>
		</header>
	);
}

export default Header;
