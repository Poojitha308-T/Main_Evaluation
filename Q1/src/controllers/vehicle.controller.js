import { supabase } from './../config/supabase.js';

export const createVehicle = async(req,res) => {
    const {name, registration_number, allowed_passengers, rate_per_km, owner_id} = req.body;
    const {data: owner} = await supabase
    .from("userrs")
    .select("*")
    .eq("id",owner_id)
    .single();

    if(!owner || owner.role !== "owner"){
        return res.status(403).json({message:"Only owners can create vehicles"})
    }
    const {data, error} = await supabase
    .from("vehicles")
    .insert([{name, registration_number, allowed_passengers, rate_per_km, owner_id}])
    .select();
    if(error)
        return res.status(400).json({error:error.message});
    res.json(data[0]);
}

export const assignDriver = async (req,res) => {
    const {vehicleId} = req.params;
    const {driver_id} = req.body;
    await supabase.from("vehicles")
    .update({driver_id})
    .eq("id",vehicleId);
    res.json({message:"Driver assigned"});
};

export const getVehicle = async(req, res) => {
    const {data} = await supabase
    .from("vehicles")
    .select("*")
    .eq("id",req.params.vehicleId)
    .single();

    res.json(data);
}