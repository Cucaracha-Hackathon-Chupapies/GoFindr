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
    const [uploadError, setUploadError] = useState<boolean>(false)

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        if (!formData.displayName || formData.displayName.length > 30 || !formData.description) return;
        navigator.geolocation.getCurrentPosition((data) => {

                
            axios.post('/api/create', {...formData, lat: data.coords.latitude, lng: data.coords.longitude, createTheme: true,
            theme: {
                backgroundImage: url || "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                font: formData.font || "Poppins",
                componentColor: formData.componentColor || "#1a9f1a"
            }, ownerId: 'e9583445-6ddc-44ab-a453-26e68cbfe98f'   
            })
            
        })
    }, [url, formData])


    const handleChange = (event: any) => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const upload = useCallback(() => {
        let data = new FormData()
        if (!inputFile) return

        data.append('image', inputFile)

        axios.post('/api/uploadimage', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => setUrl(res.data.url))
        .catch((err) => {setUrl(null); setUploadError(true); console.log(err)})
        
    }, [inputFile])

    useEffect(() => {
        if (inputFile){
            upload()

        }
    }, [inputFile, upload])

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input type="text" id="displayName" name="displayName" placeholder="Name" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            <input type="text" id="description" name="description" placeholder="Description" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>

            <div className="flex flex-row items-center">
                <input type="text" id="font" name="font" placeholder="Font" onChange={handleChange} className="h-[55px] w-[155px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 mr-[20px] lg:mt-4"/>
                <input type="text" id="componentColor" name="componentColor" placeholder="Accent Color" onChange={handleChange} className="h-[55px] w-[155px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            </div>

            <div className="flex h-[55px] w-[330px] lg:h-[50px] bg-white border border-black rounded italic pl-4 mt-8 lg:mt-4 items-center">
                {url && <img src={url} alt="user image"/>}
                {uploadError && <h1>Error uploading image!</h1>}
                <input type="file" accept="image/*" onChange={(e) => setInputFile(e.target.files ? e.target.files[0] : null)}/>
            </div>
            
            <button className="h-[55px] w-[330px] lg:h-[50px] bg-[#ed7bbe] text-white rounded mt-8 lg:mt-4" type="submit">Submit</button>
        
        </form>
    )
}

export default NewTheme;