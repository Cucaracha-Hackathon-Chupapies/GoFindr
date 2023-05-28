import axios from "axios";
import Head from "next/head"
import { useCallback, useEffect, useReducer, useState } from "react";

const formReducer = (state: any, event: any) => {
    return {
      ...state,
      [event.name]: event.value
    }
}

const create = () => {
    const [formData, setFormData] = useReducer(formReducer, {})
    const [inputFile, setInputFile] = useState<File | null>()
    const [url, setUrl] = useState<string>()

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        if (!formData.displayName || formData.displayName.length > 30 || !formData.createTheme) return;
        navigator.geolocation.getCurrentPosition((data) => {

                
            axios.post('/api/createshop', {...formData, lat: data.coords.latitude, lng: data.coords.longitude, name: formData.displayName.toLowerCase().replaceAll(' ', '-'), createTheme: formData.createTheme === 'new' ? true : false,
            ...(formData.createTheme === 'new' ? {theme: {
                backgroundImage: url || "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                font: formData.font || "Poppins",
                componentColor: formData.componentColor || "#1a9f1a"
            }} : {}),
            ...(formData.themeId ? {themeId: formData.themeId || 1} : {})
            })
            
        })
    }, [url, formData])

    const handleChange = (event: any) => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const upload = () => {
        let data = new FormData()
        if (!inputFile) return
       
        data.append('image', inputFile)

        axios.post('/api/uploadimage', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => setUrl(res.data.url))
    }

    useEffect(() => {
        if (inputFile){
            upload()

        }
    }, [inputFile])

    return (
        <>
            <Head>
                <title>create store</title>
                <meta name="description" content="Makin' a store :)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Display Name</label>
                    <input type="text" id="displayName" name="displayName" onChange={handleChange}/>

                    <label>Description</label>
                    <textarea id="description" name="description" onChange={handleChange}/>

                    <label>Create New Theme</label>
                    <input type="radio" id="createTheme" name="createTheme" value={"new"} onChange={handleChange}/>

                    <fieldset disabled={formData.createTheme === 'new' ? false : true}>

                        <label>Font</label>
                        <input type="text" id="font" name="font" onChange={handleChange}/>

                        <label>Component Color</label>
                        <input type="text" id="componentColor" name="componentColor" onChange={handleChange}/>

                        <label>Background Image</label>
                        {url && <img src={url} alt="ignore"/>}
                        <input type="file" accept="image/*" onChange={(e) => setInputFile(e.target.files ? e.target.files[0] : null)}/>
                
                    </fieldset>


                    <label>Use Existing Theme</label>
                    <input type="radio" id="createTheme" name="createTheme" value={"existing"} onChange={handleChange}/>

                    <fieldset disabled={formData.createTheme === 'existing' ? false : true}>  
                        <label>Theme ID</label>
                        <input type="number" id="themeId" name="themeId" onChange={handleChange}/>

                    </fieldset>

                    <button type="submit">Submit</button>
                
                </form>
                <h3>INFO: Store's Stored Geolocation Will Be Your Current Location</h3>
            </div>
        </>
    )
}

export default create;