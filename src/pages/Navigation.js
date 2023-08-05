import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";
const Navigation = () => {
  return (
    <div className={classes.div}>
      <Link to={"/topics"} className={classes.title}>
        QuizRizz
      </Link>
      <ul>
        <li>
          <Link to={"/aboutus"} className={classes.link}>
            About us
          </Link>
        </li>
        <li>
          <Link to={"/"} className={classes.link}>
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
