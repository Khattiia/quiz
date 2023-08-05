import React from "react";
import { Link } from "react-router-dom";
import classes from "./TopicList.module.css";

const TopicList = (props) => {
  return (
    <>
      <div className={classes.div}>
        <h1 className={classes.slideInLeft}>WRITE YOUR QUIZ</h1>
        <h2 className={classes.slideInLeftH2}> SUBJECTS: </h2>
      </div>
      <ul className={classes.ul}>
        {props.topics.map((topic, index) => (
          <li className={classes.li} key={index}>
            <Link className={classes.link} to={`/topics/quiz/${topic}`}>
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TopicList;
