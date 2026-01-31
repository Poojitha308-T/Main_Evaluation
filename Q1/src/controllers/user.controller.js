import { supabase } from '../config/supabase.js';

export const signupUser = async(req,res) => {
    const { name, email, password, role} = req.body;
    if(!["customer", "owner", "driver"].includes(role)){
        return res.status(400).json({message:"Invalid role"});
    }

    const { data, error } = await supabase
    .from("userrs")
    .insert([{ name, email, password, role }])
    .select();

    if(error) {
        return res.status(400).json({error:error.message});
    }
    res.json(data[0]);
}


