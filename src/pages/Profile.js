import Navigation from "./Navigation";
import classes from "./Profile.module.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <Navigation />
      <h1 className={classes.header}>HERE TO TEST YOUR ABILITIES</h1>
      <p className={classes.text}>
        Quizrizz is more than gamified quizzes. We are assessment, instruction,
        and practice that motivate every student to mastery. Today, we’re used
        by teachers in 86% of U.S. schools who have created and shared 30+
        million activities.
      </p>

      <p className={classes.text}>
        For more information, please contact us at{" "}
        <Link to={"/aboutus"}> info@info.org</Link>
      </p>
    </>
  );
};

export default Profile;
