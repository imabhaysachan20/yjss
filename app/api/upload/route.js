import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = new IncomingForm({
    multiples: false,
    keepExtensions: true,
    uploadDir: path.join(process.cwd(), "public/uploads"),
  });

  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return new Promise((resolve) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Upload error:", err);
        return resolve(
          new Response(JSON.stringify({ error: "Image upload failed" }), { status: 500 })
        );
      }

      const file = files.image;
      if (!file) {
        return resolve(
          new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 })
        );
      }

      // Rename the file to ensure uniqueness
      const ext = path.extname(file.originalFilename);
      const fileName = `${Date.now()}-${file.originalFilename.replace(/\s+/g, "_")}`;
      const newPath = path.join(uploadDir, fileName);

      fs.renameSync(file.filepath, newPath);

      // Return the image URL
      const imageUrl = `/uploads/${fileName}`;
      resolve(
        new Response(JSON.stringify({ imageUrl }), { status: 200 })
      );
    });
  });
}
