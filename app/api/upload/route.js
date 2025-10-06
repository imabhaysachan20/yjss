import multer from "multer";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

// setup storage in /public/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
const uploadMiddleware = upload.single("image");

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export async function POST(req, res) {
  const reqAny = req;
  const resAny = res;

  await runMiddleware(reqAny, resAny, uploadMiddleware);

  const filename = reqAny.file.filename;
  const imageUrl = `https://www.yjss.org/uploads/${filename}`;

  return new Response(JSON.stringify({ imageUrl }), { status: 200 });
}
