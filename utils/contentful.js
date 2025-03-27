import { createClient } from 'contentful';

const client = createClient({
    accessToken: "yQgohBCOllUj5aOwkvYphsU472D_JGIx-usTKaNBOHk",
    space: "qs73wmg7kure"
});

export const getImages = async() => {
    try {
        const res = await client.getEntries({
            content_type: "images"
        });
        
        if (!res.items || res.items.length === 0) {
            console.error('No images found in Contentful');
            return [];
        }

        const images = res.items[0].fields.image.map((img) => {
            // Get the full URL from Contentful
            const url = img.fields.file.url;
            // Ensure the URL has https:// protocol
            return url.startsWith('//') ? `https:${url}` : url;
        });
        
        console.log('Contentful images:', images); // Debug log
        return images;
    } catch (error) {
        console.error('Error fetching images from Contentful:', error);
        return [];
    }
}
