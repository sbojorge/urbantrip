import styles from "./App.module.css";
import NavBar from './components/NavBar';
import './api/axiosDefaults';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
    </div>
  );
}

export default App;