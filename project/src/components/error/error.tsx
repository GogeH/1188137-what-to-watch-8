import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './error.module.css';

function Error(): JSX.Element {
  return (
    <Fragment>
      <div className={styles.wrapper_header}>
        <h1 className={styles.title}>Error 404!
          <br/>
          no found
        </h1>
        <div className={styles.text}>Sorry, the page not found</div>
      </div>
      <div className={styles.wrapper_link}>
        <Link className={styles.link} to="/">Return to the main page</Link>
      </div>
    </Fragment>
  );
}

export default Error;

