import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFeedback } from "../../store/action";

const Feedback = () => {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.announcements.feedbacks);

  useEffect(() => {
    dispatch(getAllFeedback());
  }, []);

  return (
    <div>
      <h1>Feedbacks</h1>
      {feedbacks &&
        feedbacks.map((feedback) => {
          return (
            <div>
              <h3>{feedback.feedback}</h3>
              <a href={feedback.link}>link</a>
            </div>
          );
        })}
    </div>
  );
};

export default Feedback;
