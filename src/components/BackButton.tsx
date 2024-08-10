import styles from './BackButton.module.scss';

const BackButton = () => <button onClick={() => window.history.back()} className={styles.backButton}>{'←'}</button>;

export default BackButton;
