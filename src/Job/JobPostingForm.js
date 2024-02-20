import react,{useState} from 'react';
import axios from 'axios';


const JobPostingForm=()=>{
    const[job,setJob] = useState({title:'',description:'',skills_required:''});
    const handleChange = (e) =>{
        setJob({ ...job,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8000/job/api/",job,{
                headers:{
                    'Content-Type':'application/json'
                },
            });

            console.log(response.data);
        } catch(error){
            console.error("Error posting job:",error)
        }

    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type = "text" name='title' value = {job.title} onChange={handleChange} />
            </label>
            <br/>
            <br/>
            <label>
                Description:
                <textarea name = "description" value = {job.description} onChange={handleChange} />
            </label>

            <br/>
            <br/>
            <label>
                Skill Required:
                <textarea name = "skills_required" value = {job.skills_required} onChange={handleChange} />
            </label>

            <br/>
            <button type="submit">Post Job</button>
        </form>
    );
};


export default JobPostingForm;