import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import Job from "../Job/Job";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../../features/jobSlice";

const Home = () => {
  const jobs = useSelector((state) => state.jobs).jobs;
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [myJobs, setMyjobs] = useState([]);
  const { text } = useParams() || {};

  const filterdJobs = ["Internship", "Remote", "Full Time"].includes(text)
    ? jobs?.filter((job) => job.type === text)
    : jobs;

  useEffect(() => {
    setMyjobs(filterdJobs);
  }, [jobs]);

  useEffect(() => {
    const finalJobs = search
      ? filterdJobs?.filter((job) =>
          job.title.toLowerCase().includes(search.toLowerCase())
        )
      : filterdJobs;
    setMyjobs(finalJobs);
  }, [search, text]);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleSort = (e) => {
    if (e.target.value === "Salary (Low to High)") {
      setMyjobs(
        [...myJobs].sort((a, b) => parseInt(a.salary) - parseInt(b.salary))
      );
    }

    if (e.target.value === "Salary (High to Low)") {
      setMyjobs(
        [...myJobs].sort((a, b) => parseInt(b.salary) - parseInt(a.salary))
      );
    }
  };
  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
      <Sidebar />
      <div className="lg:pl-[14rem]  mt-[5.8125rem]">
        <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
          <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
            <h1 className="lws-section-title">
              {text ? text : "All Available Jobs"}
            </h1>
            <div className="flex gap-4">
              <div className="search-field group flex-1">
                <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                <input
                  type="text"
                  placeholder="Search Job"
                  className="search-input"
                  id="lws-searchJob"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                id="lws-sort"
                name="sort"
                autoComplete="sort"
                className="flex-1"
                onChange={handleSort}
              >
                <option>Default</option>
                <option>Salary (Low to High)</option>
                <option>Salary (High to Low)</option>
              </select>
            </div>
          </div>

          <div className="jobs-list">
            {myJobs?.length ? (
              myJobs.map((job, i) => <Job key={i} job={job} />)
            ) : (
              <div style={{ color: "white" }}>No jobs found</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
