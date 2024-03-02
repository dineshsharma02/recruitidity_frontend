import react,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const JobPostingForm=()=>{
    const navigate = useNavigate();
    const[job,setJob] = useState({title:'',description:'',skills_required:''});
    const [error, setError] = useState('')
    const handleChange = (e) =>{
        setJob({ ...job,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!job.title || !job.description || !job.skills_required){
            setError("Please fill in all required fields.")
            alert(error)
            return
        }

        try{
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:8000/job/create-job/",job,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                    
                },
            });

            console.log(response.data);

            setJob({title:'',description:'',skills_required:''});
            setError('');
            alert("Successfully posted the job");
        } catch(error){
            
            console.error("Error posting job:",error);
            alert(error);
            if(error.response.status==401){
                navigate('/login');
                localStorage.clear()
            }
            
        }

    };


    return (
        <div className='login-container'>
        <form onSubmit={handleSubmit} className='login-form'>
            <label>
                Title
                <input type = "text" name='title' value = {job.title} onChange={handleChange} />
            </label>
            <br/>
            <br/>
            <label>
                Description
                <textarea name = "description" value = {job.description} onChange={handleChange} />
            </label>

            <br/>
            <br/>
            <label>
                Skill Required
                <textarea name = "skills_required" value = {job.skills_required} onChange={handleChange} />
            </label>

            <br/>
            <button type="submit">Post Job</button>
        </form>
        </div>
    );
};


export default JobPostingForm;