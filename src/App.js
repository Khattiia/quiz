import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import QuizPage from "./pages/QuizPage";
import TopicList from "./pages/TopicList";
import PrivateRoute from "./container/privateRoute";
import Navigation from "./pages/Navigation";

import History from "./components/History";
import Geography from "./components/Geography";
import Mathmatics from "./components/Mathmatics";
import Art from "./components/Art";
import Science from "./components/Science";
import Games from "./components/Games";
import Books from "./components/Books";
import Profile from "./pages/Profile";

const App = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopicsHandler();
  }, []);

  function fetchTopicsHandler() {
    fetch("https://quiz-46ee0-default-rtdb.firebaseio.com/topiclist.json")
      .then((response) => response.json())
      .then((data) => {
        const topicsArray = Object.values(data);
        setTopics(topicsArray);
      });
  }

  const router = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    {
      path: "/topics",
      element: (
        <PrivateRoute>
          <Navigation />
          <TopicList topics={topics} /> {}
        </PrivateRoute>
      ),
    },

    { path: "/aboutus", element: <Profile /> },

    { path: "/topics/quiz", element: <QuizPage /> },
    { path: "/topics/quiz/history", element: <History /> },
    { path: "/topics/quiz/geography", element: <Geography /> },
    { path: "/topics/quiz/mathmatics", element: <Mathmatics /> },
    { path: "/topics/quiz/art", element: <Art /> },
    { path: "topics/quiz/science", element: <Science /> },
    { path: `/topics/quiz/video games`, element: <Games /> },
    { path: `/topics/quiz/books`, element: <Books /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
