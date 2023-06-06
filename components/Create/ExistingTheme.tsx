import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";
import Uploader from "../ImageUpload/Uploader";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const ExistingTheme = () => {
    const [formData, setFormData] = useReducer(formReducer, {})    
    const [iconUrl, setIconUrl] = useState<string>()
    const [uploadError, setUploadError] = useState<boolean>(false)
    const router = useRouter()
    const toast = useToast()

    const handleSubmit = useCallback((e: any) => {        
        e.preventDefault()        
        if (!formData.displayName || formData.displayName.length > 30 || !formData.description || !formData.themeId) return;        
        navigator.geolocation.getCurrentPosition((data) => {

                
            axios.post('/api/create/shop', {...formData, lat: data.coords.latitude, lng: data.coords.longitude, createTheme: false, ...(iconUrl ? {icon: iconUrl} : {}), ownerId: localStorage.getItem('id')})
            .then(() => router.push('/create' + formData.displayName.toLowerCase().replace(' ', '-')))
            .catch(() => toast({title: 'Error Creating Shop!', description: 'Something went wrong creating ' + formData.displayName + '.', status: 'error', duration: 3000, isClosable: true}))
        })
    }, [formData, iconUrl, router, toast])


    const handleChange = (event: any) => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }




    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input type="text" id="displayName" name="displayName" placeholder="Name" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            <input id="description" name="description" placeholder="Description" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            <input type="text" id="themeId" name="themeId" placeholder="Theme ID" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>

            
            <Uploader message="Upload store icon" relate="iconUpload" setState={setIconUrl} setUploadError={setUploadError}/>
            {uploadError && <h1 className="text-red-600 italic"> Error uploading image! </h1>}

            <button className="h-[55px] w-[330px] lg:h-[50px] bg-[#ed7bbe] text-white rounded mt-8 lg:mt-4" type="submit">Submit</button>
        
        </form>
    )
}

export default ExistingTheme;