


const adminControl={
dashboard:async(req,res)=>{
    try {
        console.log('logined to dashboard');
        res.json({success:true})
    } catch (error) {
        console.log(error);
    }
}
}

export default adminControl