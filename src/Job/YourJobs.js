import axios from 'axios'
import React, { useEffect, useState } from 'react'

const YourJobs = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        
        const fetchJobs = async() =>{
            try{
                const token = localStorage.getItem('token');

                const response = await axios.get('http://localhost:8000/job/your-jobs/',{
                    headers:{
                        'Content-type':'application/json',
                        'Authorization':`Bearer ${token}`
                    }
                })
                console.log(response.data);
                setJobs(response.data)
            }
            catch(e){
                console.log(e);
            }
        }

        fetchJobs();
    
      
    }, [])
    
  return (
    <div className='list-container'>
        <h2>Job Listings</h2>
        <ul className='job-container'>
          {jobs.map(job=>(
            <li key={job.id}>
              <h2>{job.title}</h2>
              
                <p>Description: {job.description}</p>
                <p>Skills Required: {job.skills_required}</p>

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

export default YourJobs