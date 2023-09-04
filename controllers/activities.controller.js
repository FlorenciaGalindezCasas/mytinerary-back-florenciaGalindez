import Activities from "../models/Activities";

const controller = {
    getActivities: async(req,res)=>{
        let queries = {}
        try {
            const activities = await Activities.find(queries)
            return res.status(200).json({
                success:true,
                activities,
            })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message: "Activities not found"
            })
            
        }
    }
}

export default controller