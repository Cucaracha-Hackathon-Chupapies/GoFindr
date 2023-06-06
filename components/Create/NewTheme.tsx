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

const NewTheme = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [inputFile, setInputFile] = useState<File | null>();
    const [url, setUrl] = useState<string>();
    const [iconUrl, setIconUrl] = useState<string>();
    const [firstUploadError, setFirstUploadError] = useState<boolean>(false);
    const [secondUploadError, setSecondUploadError] = useState<boolean>(false);

    const router = useRouter()
    const toast = useToast()

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        if (!formData.displayName || formData.displayName.length > 30 || !formData.description) return;
        navigator.geolocation.getCurrentPosition((data) => {

                
            axios.post('/api/create/shop', {...formData, lat: data.coords.latitude, lng: data.coords.longitude, createTheme: true,
            theme: {
                backgroundImage: url || "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                font: formData.font || "Poppins",
                componentColor: formData.componentColor || "#1a9f1a"
            }, ...(iconUrl ? {icon: iconUrl} : {}),
            ownerId: localStorage.getItem('id')
            })
            .then(() => window.location.href="/create?success=true")
            .catch(() => toast({title: 'Error Creating Shop!', description: 'Something went wrong creating ' + formData.displayName + '.', status: 'error', duration: 3000, isClosable: true}))
            
        })
    }, [url, formData, iconUrl, router, toast])


    const handleChange = (event: any) => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input type="text" id="displayName" name="displayName" placeholder="Name" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            <input type="text" id="description" name="description" placeholder="Description" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            
            <div className="flex flex-row items-center">
                <input type="text" id="font" name="font" placeholder="Font" onChange={handleChange} className="h-[55px] w-[155px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 mr-[20px] lg:mt-4"/>
                <input type="text" id="componentColor" name="componentColor" placeholder="Accent Color" onChange={handleChange} className="h-[55px] w-[155px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            </div>

            <Uploader message="Upload Background Image" relate="themeUpload" setState={setUrl} setUploadError={setFirstUploadError}/>
            {firstUploadError && <h1 className="text-red-600 italic">Error uploading image!</h1>}

            <Uploader message="Upload Store Icon" relate="iconUpload" setState={setIconUrl} setUploadError={setSecondUploadError}/>
            {secondUploadError && <h1 className="text-red-600 italic">Error uploading image!</h1>}

            <button className="h-[55px] w-[330px] lg:h-[50px] bg-[#ed7bbe] text-white rounded mt-8 lg:mt-4" type="submit">Submit</button>
        
        </form>
    )
}

export default NewTheme;