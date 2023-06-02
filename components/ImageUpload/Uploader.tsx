import axios from "axios"
import { Dispatch, SetStateAction, useCallback } from "react"

interface Props {
    setState: Dispatch<SetStateAction<string | undefined>>,
    setUploadError?: Dispatch<SetStateAction<boolean>>
}

const Uploader = ({setState, setUploadError}: Props) => {
    const handleUpload = useCallback(async (e: any) => {
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

        if (setUploadError){
            setUploadError(true)
        }
        
    }, [setState, setUploadError])

    return (

        <div className="flex h-[55px] w-[330px] lg:h-[50px] bg-white rounded italic pl-4 mt-8 lg:mt-4 items-center bg-gray-200">
            <label htmlFor="uploadInput" className="flex items-center justify-center w-full h-full cursor-pointer ">
                Upload image of store
                <input type="file" id="uploadInput" accept="image/*" onChange={(e) => handleUpload(e)} className="hidden"/>
            </label>          
        </div>

    )
}

export default Uploader