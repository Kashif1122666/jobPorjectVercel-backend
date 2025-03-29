import { Application } from "../models/application.model.js";
import { Job } from '../models/job.model.js';
import { User } from "../models/user.model.js"; 


export const applyJob = async (req,res)=>{
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if(!userId){
      return res.status(400).json({message:"jobId is required ",success:false});
    }
    // check if user has already applied for this job
    const exisingApplication = await Application.findOne({job:jobId,applicant:userId});
    if(exisingApplication){
      return res.status(400).json({message:"You have already applied for this job",success:false});
    }
    // check does the job exist
    const job = await Job.findById(jobId);
    if(!job){
      return res.status(404).json({message:"Job not found",success:false});
    }
    // create new applicaton
    const application = await Application.create({
      job:jobId,
      applicant:userId,
    }); 
    job.applications.push(application._id);
    await job.save();
    return res.status(201).json({message:"Application created successfully",application,success:true});
  } catch (error) {
    console.log(error);
  }
};
export const getAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id;
        const applicaton = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        });
        if(!applicaton){
            return res.status(404).json({message:"No applications found",success:false});
        };
        return res.status(200).json({applicaton,success:true});
    } catch (error) {
        console.log(error);
    }
};
// admin can check here how many students have applied for job 
export const getApplicants = async (req,res)=>{
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:'applications',
      options:{sort:{createdAt:-1}},
      populate:{
        path:"applicant"
      }
    });
    if(!job){
          return res.status(404).json({
            message:'job not found',
            success:false
          });
    }
    return res.status(200).json({
      job,
      success:true
    });
  } catch (error) {
    console.log(error);
    
  }
};
export const updateStatus = async (req,res) =>{
    try {
      const {status} = req.body;
      const applicationId = req.params.id;
      if(!status){
            return res.status(400).json({
              message:"status is required",
              success:false
            });
      }
      // find application using applicaionId
      const applicaton = await Application.findOne({_id:applicationId});
          if(!applicaton){
              return res.status(404).json({
                message:"applicaton not found",
                success:false
              });
          }
          // updateStatus
          applicaton.status = status.toLowerCase();
          await applicaton.save();
          return res.status(200).json({
            message :"status updated successfully",
            success :true 
          });
    } catch (error) {
      console.log(error);
    }
}