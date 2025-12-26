import React from 'react'
import Navbar from './Components/NavBar/Navbar'
import Home from './Components/Pages/Home/Home'
import Tutorials from './Components/Pages/Tutorials/Tutorials'
import Problems from './Components/Pages/Problems/Problems';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProblemList from './Components/Pages/ProblemList/ProblemList'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from './Components/Editor/Editor'
import Markdown from './Components/Editor/Markdown'
import Solution from './Components/Pages/AllTutorials/Solution'
import CodeDetails from './Components/Pages/AllTutorials/CodeDetails'
import Leaderboard from './Components/Leaderboard/Leaderboard'
import AllTutorials from './Components/Pages/AllTutorials/AllTutorials'
import TutorProblems from './Components/Leaderboard/TutorProblems'
import RatingPage from './Components/Leaderboard/RatingPage'
import ProtectedRoute from './ProtectedRoute'



const App = () => {
  return (
    <>
      <Navbar/>
       
      <Routes>
        <Route path="/" element={
          <Home/>
          }/>
        <Route path='home' element={
          <Home/>
          }/>
        <Route path="/tutorial" element={  
          <ProtectedRoute>
          <Tutorials/>
          </ProtectedRoute>
        }/>
        <Route path="/problems" element={
          <ProtectedRoute>
          <Problems/>
          </ProtectedRoute>
          }/>
        <Route path='/problems/:topicName' element={
          <ProtectedRoute>
          <ProblemList/>
          </ProtectedRoute>
          }/>
        <Route path='/tutorials' element={
          <ProtectedRoute>
          <Tutorials/>
          </ProtectedRoute>
          }/>
        <Route path='/register' element={
          <Register/>
          }/>
        <Route path='login'element={
          <Login/>
          }/>
        <Route path='/notes/:publicId' element={
          <ProtectedRoute>
          <Editor/>
          </ProtectedRoute>     
          }/>
        <Route path='/tutorial/:problemId' element={
          <ProtectedRoute>
          <Markdown/>
          </ProtectedRoute>     
          }/>
        <Route path='/leaderboard'element={
          <Leaderboard/>
          }/>
        <Route path='/allTutorials' element={
          <AllTutorials/>
          }/>
        <Route path='/solution/:problemId' element = {
          <Solution/>
          }/>
        <Route path='/code/:problemId'element={
          <CodeDetails/>
          }/>
        <Route path="/tutor/:username/problems" element={
          <TutorProblems />
          } />
        <Route path="/rating/:problemId" element={
          <ProtectedRoute>
          <RatingPage />
          </ProtectedRoute>     
          } />

       </Routes>
        <ToastContainer position="top-right" autoClose={3000} />

    </> 
  )
}

export default App;