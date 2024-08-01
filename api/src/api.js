const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Allowed file extensions
const allowedExtensions = [
  // Common image formats
  '.png', '.jpg', '.jpeg', '.webp', '.gif',
  // RAW formats
  '.arw',  // Sony
  '.cr2', '.cr3',  // Canon
  '.nef',  // Nikon
  '.orf',  // Olympus
  '.raf',  // Fujifilm
  '.rw2',  // Panasonic
  '.dng',  // Adobe Digital Negative (used by various manufacturers)
  '.raw'   // Generic RAW
];

// File filter for Multer
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed formats are: ' + allowedExtensions.join(', ')), false);
  }
};

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

// Helper function to check if a path is a directory
async function isDirectory(path) {
  try {
    return (await fs.stat(path)).isDirectory();
  } catch (error) {
    return false;
  }
}

// Helper function to get photos from a directory
async function getPhotosFromDirectory(dir, author) {
  const files = await fs.readdir(dir);
  return files.map(file => ({
    path: `/uploads/${author}/${file}`,
    author: author.replace(/-/g, ' ')
  }));
}

// Upload photos
app.post('/api/upload', upload.array('photos'), async (req, res) => {
  try {
    if (!req.body.author) {
      return res.status(400).json({ error: 'Author name is required' });
    }

    const author = req.body.author.replace(/\s+/g, '-').toLowerCase();
    const authorDir = path.join(__dirname, '..', 'uploads', author);

    // Create author directory
    await fs.mkdir(authorDir, { recursive: true });

    // Move uploaded files to author's directory
    const uploadedPhotos = await Promise.all(req.files.map(async (file) => {
      const oldPath = file.path;
      const newPath = path.join(authorDir, file.filename);
      await fs.rename(oldPath, newPath);
      return {
        path: `/uploads/${author}/${file.filename}`
      };
    }));

    res.status(200).json({ message: 'Photos uploaded successfully', photos: uploadedPhotos });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'An error occurred while uploading photos' });
  }
});

// Get all photos
app.get('/api/photos', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const items = await fs.readdir(uploadsDir);
    
    let allPhotos = [];
    for (const item of items) {
      const itemPath = path.join(uploadsDir, item);
      if (await isDirectory(itemPath)) {
        const photos = await getPhotosFromDirectory(itemPath, item);
        allPhotos = allPhotos.concat(photos);
      } else {
        // Handle files directly in the uploads folder
        const ext = path.extname(item).toLowerCase();
        if (allowedExtensions.includes(ext)) {
          allPhotos.push({
            path: `/uploads/${item}`,
            author: 'Unknown'
          });
        }
      }
    }
    
    res.json(allPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'An error occurred while fetching photos' });
  }
});

// Get recent photos (for carousel)
app.get('/api/photos/recent', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const items = await fs.readdir(uploadsDir);
    
    let allPhotos = [];
    for (const item of items) {
      const itemPath = path.join(uploadsDir, item);
      if (await isDirectory(itemPath)) {
        const photos = await getPhotosFromDirectory(itemPath, item);
        allPhotos = allPhotos.concat(photos);
      } else {
        // Handle files directly in the uploads folder
        const ext = path.extname(item).toLowerCase();
        if (allowedExtensions.includes(ext)) {
          allPhotos.push({
            path: `/uploads/${item}`,
            author: 'Unknown'
          });
        }
      }
    }
    
    // Sort by creation time (most recent first) and take the first 10
    const recentPhotos = await Promise.all(allPhotos.map(async photo => {
      const stat = await fs.stat(path.join(__dirname, '..', photo.path));
      return { ...photo, mtime: stat.mtime.getTime() };
    }));
    
    recentPhotos.sort((a, b) => b.mtime - a.mtime);
    res.json(recentPhotos.slice(0, 10));
  } catch (error) {
    console.error('Error fetching recent photos:', error);
    res.status(500).json({ error: 'An error occurred while fetching recent photos' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});