import styles from './styles/Loader.module.css';

function Loader() {
	return (
		<div className={styles['loader-container']}>
			<div className={styles['loader-icon']}></div>
		</div>
	);
}

export default Loader;