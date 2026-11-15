import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const Home = React.lazy(() => import("./pages/Home"));
const Exam = React.lazy(() => import("./pages/Exam"));
const Results = React.lazy(() => import("./pages/Result"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/exam/:subjectId" element={<Exam />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
