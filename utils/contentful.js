import { createClient } from 'contentful';

const client = createClient({
    accessToken: "pAOMso-Xvy6h43yKioAA8aGh9Si7pLJJyysEOTCCK0c",
    space: "mo655ch1gd2r"
});

const formatUrl = (url) => {
       if (!url) return '';
       return url.startsWith('//') ? `https:${url}` : url;
   };

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
        
        return images;
    } catch (error) {
        console.error('Error fetching images from Contentful:', error);
        return [];
    }
}



export const getVideos = async () => {
    try {
        const res = await client.getEntries({ content_type: "videos" });
        if (!res.items) return [];

        return res.items.map((item) => ({
            title: item.fields.title,
            videoUrl: formatUrl(item.fields.video.fields.file.url)
        }));
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
};
export const getNews = async () => {
    try {
        const res = await client.getEntries({ content_type: "news" });
        

        if (!res.items || res.items.length === 0) {
            console.warn('No news items found in Contentful');
            return [];
        }

        const newsItems = res.items.map((item) => {
            // console.log('Processing news item:', item.fields.title);
            
            // Check for media in different field names (media, image, or video)
            const mediaField = item.fields.media || item.fields.image || item.fields.video;
            
            if (!mediaField?.fields?.file) {
                console.warn('No media found for news item:', item.fields.title);
                return null;
            }

            const mediaUrl = mediaField.fields.file.url;
            const contentType = mediaField.fields.file.contentType;
            
 
            
            // Determine if media is video based on content type
            const isVideo = contentType?.startsWith('video/');

            return {
                title: item.fields.title,
                summary: item.fields.summary,
                mediaUrl: formatUrl(mediaUrl),
                mediaType: isVideo ? 'video' : 'image',
                thumbnailUrl: formatUrl(item.fields.thumbnail?.fields?.file.url),
                link: item.fields.link
            };
        }).filter(Boolean);
        
        return newsItems;
        
    } catch (error) {
        console.error('Error fetching news:', error);
        console.error('Error details:', error.message);
        return [];
    }
};