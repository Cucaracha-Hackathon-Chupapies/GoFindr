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
    const [inputFile, setInputFile] = useState<File | null>()
    const [url, setUrl] = useState<string>()

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        if (!formData.displayName || formData.displayName.length > 30 || !formData.createTheme) return;
        navigator.geolocation.getCurrentPosition((data) => {

                
            axios.post('/api/create', {...formData, lat: data.coords.latitude, lng: data.coords.longitude, createTheme: formData.createTheme === 'new' ? true : false,
            ...(formData.createTheme === 'new' ? {theme: {
                backgroundImage: url || "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                font: formData.font || "Poppins",
                componentColor: formData.componentColor || "#1a9f1a"
            }} : {}),
            ...(formData.themeId ? {themeId: formData.themeId || 1} : {})
            })
            
        })
    }, [url, formData])


    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input type="text" id="displayName" name="displayName" placeholder="Name" className="h-[55px] w-[330px] border border-black rounded italic pl-4 mt-8"/>
            <input type="text" id="displayName" name="displayName" placeholder="Description" className="h-[55px] w-[330px] border border-black rounded italic pl-4 mt-8"/>
            <input type="text" id="displayName" name="displayName" placeholder="Theme ID" className="h-[55px] w-[330px] border border-black rounded italic pl-4 mt-8"/>

            <button className="h-[55px] w-[330px] bg-[#F1AAD4] text-white rounded mt-8" type="submit">Submit</button>
        
        </form>
    )
}

export default ExistingTheme;