import axios from "axios"
import { Dispatch, SetStateAction, useCallback, useState } from "react"

interface Props {
    message: string;
    relate: string;
    setState: Dispatch<SetStateAction<string | undefined>>,
    setUploadError?: Dispatch<SetStateAction<boolean>>
}

const Uploader = ({message, relate, setState, setUploadError}: Props) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | undefined>(undefined);

    const handleUpload = useCallback(async (e: any) => {
        let file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setPreviewImage(URL.createObjectURL(file));

            try {
                let data = new FormData();
                data.append("image", file);

                let upload = await axios.post("/api/uploadimage", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });

                if (upload) {
                    setState(upload.data.url);
                    return;
                }
            } catch (error) {
                if (setUploadError) {
                    setUploadError(true);
                }
            }
        }

        if (setUploadError){
            setUploadError(true)
        }
        
    }, [setState, setUploadError])

    return (
        
        <div className="flex h-[55px] w-[330px] lg:h-[50px] bg-white rounded italic pl-4 mt-8 lg:mt-4 items-center border border-black">
            <label htmlFor={relate} className="flex items-center justify-center w-full h-full cursor-pointer ">
                {fileName ? fileName : message}
                <input type="file" id={relate} accept="image/*" onChange={handleUpload} className="hidden"/>
            </label>

            {previewImage && (
                <div className="fixed w-[330px] -ml-4 mt-[-20%] bg-gray-800 bg-opacity-70 items-center self-center rounded-2xl">
                    <div className="flex flex-col items-center p-8">
                        <img src={previewImage} alt="Preview" className="w-full h-full rounded-2xl" />
                        <button className="text-white italic p-1 text-[18px] mt-[10px]"
                            onClick={() => setPreviewImage(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Uploader