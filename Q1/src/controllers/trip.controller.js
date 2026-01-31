import { supabase } from './../config/supabase.js';

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

export const getTrip = async(req,res) =>{
    const {data} = await supabase
    .from("trips")
    .select("*")
    .eq("id",req.params.tripId)
    .single();

    res.json(data);
}

export const updateTrip = async(req,res) => {
    await supabase.from("trips")
    .update(req.body)
    .eq("id",req.params.tripId);
    res.json({message:"Trip updated"});
}

export const deleteTrip = async(req,res) => {
    await supabase.from("trips")
    .delete()
    .eq("id", req.params.tripId);
    res.json({message:"Trip deleted"})
}

export const endTrip = async(req,res) => {
    const {data:trip} = await supabase
    .from("trips")
    .select("*")
    .eq("id",req.params.tripId)
    .single();

    const {data: vehicle} = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", trip.vehicle_id)
    .single();

    const tripCost = trip.distance_km * vehicle.rate_per_km;

    await supabase
    .from("trips")
    .update({iscomplete: true, tripcost: tripCost, end_date: new Date()})
    .eq("id",trip.id);

    await supabase
    .from("vehicles")
    .update({isavailable:true})
    .eq("id",vehicle.id);

    res.json({message:"Trip ended", tripCost});
}