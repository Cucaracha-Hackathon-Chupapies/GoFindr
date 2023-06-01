import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const NewTheme = () => {
    const [formData, setFormData] = useReducer(formReducer, {})
    const [inputFile, setInputFile] = useState<File | null>()
    const [url, setUrl] = useState<string | null>()
    const [iconUrl, setIconUrl] = useState<string | null>()
    const [uploadError, setUploadError] = useState<boolean>(false)

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
            ownerId: 'e9583445-6ddc-44ab-a453-26e68cbfe98f'   
            })
            
        })
    }, [url, formData])


    const handleChange = (event: any) => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const handleUpload = useCallback(async (e: any, setState: any) => {
        let file = e.target.files[0]

        if (file){

            let data = new FormData()

            data.append('image', file)

            let upload = await axios.post('/api/uploadimage', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
            }
            
            })

            if (upload){
                setState(upload.data.url)
                return
            }


        }

        setUploadError(true)

        throw 'upload error'
    }, [])



    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input type="text" id="displayName" name="displayName" placeholder="Name" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            <input type="text" id="description" name="description" placeholder="Description" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>

            <div className="flex h-[55px] w-[330px] lg:h-[50px] bg-white border border-black rounded italic pl-4 mt-8 lg:mt-4 items-center">
                {iconUrl && <img src={iconUrl} alt="user image"/>}
                {uploadError && <h1>Error uploading image!</h1>}
                <label>Icon</label>
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e, setIconUrl)}/>
            </div>

            <div className="flex flex-row items-center">
                <input type="text" id="font" name="font" placeholder="Font" onChange={handleChange} className="h-[55px] w-[155px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 mr-[20px] lg:mt-4"/>
                <input type="text" id="componentColor" name="componentColor" placeholder="Accent Color" onChange={handleChange} className="h-[55px] w-[155px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            </div>

            <div className="flex h-[55px] w-[330px] lg:h-[50px] bg-white border border-black rounded italic pl-4 mt-8 lg:mt-4 items-center">
                {url && <img src={url} alt="user image"/>}
                {uploadError && <h1>Error uploading image!</h1>}
                <label>Theme Background</label>
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e, setUrl)}/>
            </div>
            
            <button className="h-[55px] w-[330px] lg:h-[50px] bg-[#ed7bbe] text-white rounded mt-8 lg:mt-4" type="submit">Submit</button>
        
        </form>
    )
}

export default NewTheme;