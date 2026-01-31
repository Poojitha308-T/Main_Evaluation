const store = new Map();
export const rateLimiter = (req,res,next) =>{
    const ip = req.ip;
    const data = store.get(ip) || {count:0};
    data.count += 1;
    store.set(ip,data);
    if(data.count > 3){
        return res.status(429).json({message:"Maximum 3 requests"});
    }
    next();
}