import React, { useEffect, useState } from 'react'
import axios from 'axios'


const JobListing = () => {

  const [jobs, setJobs] = useState([])

    useEffect(() => {
      const fetchJobs = async () =>{
        try{
          const token = localStorage.getItem('token');

          const response = await axios.get('http://localhost:8000/job/view-jobs/',{
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Bearer ${token}`
            }
          })
          setJobs(response.data)
          console.log(response.data);

        }
        catch(error){
          console.error("Error fetching jobs: ",jobs);
        }
      }

      fetchJobs();

    }, [])
    
  return (
    <div>
        <h2>Job Listings</h2>
        <ul>
          {jobs.map(job=>(
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>Description: {job.description}</p>
              <p>Skills Required: {job.skills_required}</p>
              <p>Created at: {job.created_at}</p>
              <p>Posted By: {job.posted_by}</p>
              <p>Posted By: {job.posted_by_username}</p>
            </li>
          ))}
        </ul>
        
    </div>
  )
}

export default JobListing