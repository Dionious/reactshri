import styles from './styles/Header.module.css';
import { useState } from 'react';
import Modal from '../modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectAuth } from '../../slices/authSlice';
import classNames from 'classnames';

function Header() {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(selectAuth);
	const [showModal, setShowModal] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(login({ username, password }));
		handleCloseModal();
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header className={styles.header}>
			<h1 className={styles.header__title}>Фильмопоиск</h1>
			{isAuthenticated ? (
				<div className={styles.userMenu}>
					<span className={styles.userIcon}></span>
					<button className={classNames(styles.header__login, styles.logoutButton)} onClick={handleLogout}>
						Выйти
					</button>
				</div>
			) : (
				<button className={styles.header__login} onClick={handleLoginClick}>
					Войти
				</button>
			)}
			{showModal && (
				<Modal onClose={handleCloseModal}>
					<div className={styles.closeButton} onClick={handleCloseModal}>×</div>
					<h2 style={{ marginBottom: '24px' }}>Авторизация</h2>
					<form className={styles.form} onSubmit={handleSubmit}>
						<label>Логин:</label>
						<input
							className={styles['custom-input']}
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
						<label>Пароль:</label>
						<input
							className={styles['custom-input']}
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<div style={{ marginTop: '24px' }} className={styles.modalActions}>
							<button className={styles['header__form-login']} type="submit">
								Войти
							</button>
							<button
								className={styles['header__form-login-cancel']}
								type="button"
								onClick={handleCloseModal}
							>
								Отменить
							</button>
						</div>
					</form>
				</Modal>
			)}
		</header>
	);
}

export default Header;
