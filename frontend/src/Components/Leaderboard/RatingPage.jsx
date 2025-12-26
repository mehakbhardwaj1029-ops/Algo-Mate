import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const RatingPage = ({ problemId: propProblemId }) => {
  const { problemId: paramProblemId } = useParams();
  const problemId = propProblemId || paramProblemId;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [userAlreadyRated, setUserAlreadyRated] = useState(false);
  const [userRatingValue, setUserRatingValue] = useState(null);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!problemId || !username) return;

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/v1/rating/${problemId}/user/${username}`
      )
      .then((res) => {
        if (res.data && res.data.ratingValue) {
          setUserAlreadyRated(true);
          setUserRatingValue(res.data.ratingValue);
          setRating(res.data.ratingValue);
        }
      })
      .catch((err) => {
        console.log("No existing rating for user:", err);
      });
  }, [problemId, username]);

 const handleRating = async (value) => {
  if (userAlreadyRated) {
    toast.info(`You already rated this problem with ${userRatingValue} star(s)!`);
    return;
  }

  try {
    const payload = {
      problemId,
      ratingValue: value,
      raterUsername: username,
    };

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/rating/add`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setRating(value);
    setUserAlreadyRated(true);
    setUserRatingValue(value);
    toast.success(`You rated ${value} star${value > 1 ? "s" : ""}!`);
  } catch (err) {
    console.error("Error submitting rating:", err);

    if (err.response && err.response.status === 409) {
      toast.info("You already rated this problem!");
      setUserAlreadyRated(true);
    } else {
      toast.error("Failed to submit rating. Try again.");
    }
  }
};


  return (
    <div className="flex flex-col justify-center items-center text-[#EAD7C3]">
      <h2 className="text-2xl font-semibold mb-4 text-center text-[#D1B38B]">
        Rate this Problem
      </h2>

      <div className="flex space-x-3 mb-4">
        {[...Array(5)].map((_, index) => {
          const value = index + 1;
          return (
            <FaStar
              key={value}
              size={40}
              className="cursor-pointer transition-transform duration-200"
              color={
                value <= (hover || rating) ? "#FACC15" : "#475569"
              }
              onClick={() => handleRating(value)}
              onMouseEnter={() => !userAlreadyRated && setHover(value)}
              onMouseLeave={() => !userAlreadyRated && setHover(null)}
            />
          );
        })}
      </div>

      {userAlreadyRated ? (
        <p className="text-gray-300 text-lg">
          You already rated this problem <span className="text-[#FACC15]">{userRatingValue}</span> star{userRatingValue > 1 ? "s" : ""}.
        </p>
      ) : (
        <p className="text-gray-400 text-sm">Click a star to rate this problem.</p>
      )}
    </div>
  );
};

export default RatingPage;
