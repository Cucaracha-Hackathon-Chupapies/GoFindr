import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const ExistingTheme = () => {
    const [formData, setFormData] = useReducer(formReducer, {})    

    const handleSubmit = useCallback((e: any) => {        
        e.preventDefault()        
        if (!formData.displayName || formData.displayName.length > 30 || !formData.description || !formData.themeId) return;        
        navigator.geolocation.getCurrentPosition((data) => {

                
            axios.post('/api/create', {...formData, lat: data.coords.latitude, lng: data.coords.longitude, createTheme: false, ownerId: 'e9583445-6ddc-44ab-a453-26e68cbfe98f'})
            
        
            
        })
    }, [formData])


    const handleChange = (event: any) => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input type="text" id="displayName" name="displayName" placeholder="Name" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            <textarea id="description" name="description" placeholder="Description" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            <input type="text" id="themeId" name="themeId" placeholder="Theme ID" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>

            <button className="h-[55px] w-[330px] lg:h-[50px] bg-[#ed7bbe] text-white rounded mt-8" type="submit">Submit</button>
        
        </form>
    )
}

export default ExistingTheme;