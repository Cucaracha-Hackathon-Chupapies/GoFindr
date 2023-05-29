import multer from 'multer';
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3';
import cuid2 from '@paralleldrive/cuid2';
//called immediately when uploaded and stored on frontend 
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}

let imageDirectory = "gofindr/userfiles/"
let filePath = ""

const s3 = new S3Client({
    endpoint: process.env.BUCKET_ENDPOINT,
    region: "us-west-3",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID || "",
        secretAccessKey: process.env.ACCESS_SECRET_KEY || ""
    }
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME || "",
        acl: 'public-read',
        key: function(req, file, cb) {
            filePath = imageDirectory + cuid2.createId() + '.' + file.originalname.split('.')[1]
            cb(null, filePath)
        }
    })
})

export default function handler(
    req: any,
    res: any ) {
    upload.array('image')(req, res, function(err) {
        if (err){
            console.log(err)
            res.status(400).end()
        } else {
            res.status(200).json({url: 'https://' + process.env.BUCKET_NAME + '.' + process.env.BUCKET_ENDPOINT?.split('://')[1] + '/' + filePath})
        }
    })
}


/*
sample uploading "frontend"

const click = () => {
    let data = new FormData()
    if (!inputFiles) return
    for (let i = 0; i<inputFiles?.length; i++){
        data.append('image', inputFiles[i])
    }
    axios.post('/api/uploadimage', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => console.log(res.data.url))
}

const [inputFiles, setInputFiles] = useState<FileList | null>()

<button onClick={click}>Upload!</button>
<input type="file" accept="image/*" onChange={(e) => setInputFiles(e.target.files)} multiple/>

*/