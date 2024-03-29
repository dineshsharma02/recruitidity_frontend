import React, { useEffect, useState } from 'react'
import axios from 'axios'


const JobListing = () => {

  const [jobs, setJobs] = useState([])
  const [isCandidate, setIsCandidate] = useState(false)

    useEffect(() => {
      const fetchJobs = async () =>{
        try{
          const token = localStorage.getItem('token');
          const role = localStorage.getItem('role');

          setIsCandidate(!(role==="employer"));

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

    const handleApply = (jobId) =>{
      console.log(`Applied to job with ID ${jobId}`);
    }
    
  return (
    <div className='list-container'>
        <h2>Job Listings</h2>
        <ul className='job-container'>
          {jobs.map(job=>(
            <li key={job.id}>
              <h2>{job.title}</h2>
                <div className='job-box-apply'>
                  <div>
                  <p>Description: {job.description}</p>
                  <p>Skills Required: {job.skills_required}</p>

                  </div>
                  {isCandidate? <button onClick={()=> handleApply(job.id)}>Apply Now</button>:(<></>)}
                </div>
                
                
                <hr/>
              
              <div className='time'>
                <p>Created at: {job.created_at}</p>
                <p className='user'>Posted By: {job.posted_by_username}</p>
              </div>
            </li>
          ))}
        </ul>
        
    </div>
  )
}

export default JobListing