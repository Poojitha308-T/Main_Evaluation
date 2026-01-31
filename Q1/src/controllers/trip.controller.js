import { supabase } from './../config/supabase';

export const createTrip = async(req,res) => {
    const {customer_id, vehicle_id, distance_km, passengers, location} = req.body;

    const {data:vehicle} = await supabase
    .from("vehicles")
    .select("*")
    .eq("id",vehicle_id)
    .single();

    if(!vehicle.isavailable)
        return res.status(400).json({message:"Vehicle not available"})
    if(passengers > vehicle.allowed_passengers)
        return res.status(400).json({message:"Passengers exceed limit"})

    const {data, error} = await supabase
    .from("trips")
    .insert([{customer_id, vehicle_id, distance_km, passengers, location}])
    .select();

    if(error) return res.status(400).json({error:error.message});

    await supabase.from("vehicles")
    .update({isavaialbele: false})
    .eq("id", vehicle_id);

    res.json(data[0]);
}


