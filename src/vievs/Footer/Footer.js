import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.wrapper}>
      <a href="http://www.developerweb.pl" target="blanc">
        &copy; developerweb 2021
      </a>
    </div>
  );
}

export default Footer;
