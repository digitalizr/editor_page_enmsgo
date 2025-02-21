export const getKeyFromUrl = (url) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1];
};

export const extractImageUrls = (htmlContent) => {
    if (!htmlContent) return [];
    const regex = /<img[^>]+src="([^">]+)"/g;
    let urls = [];
    let match;
    while ((match = regex.exec(htmlContent)) !== null) {
      urls.push(match[1]); 
    }
    return urls;
  };
  