export const handleShare = (data) => {
  const blogUrl = `${window.location.origin}/singleblog?id=${data.id}`;
  const shareText = `${data?.title}\n\n${data?.subTitle}\n\n${data?.desc.slice(
    0,
    100
  )}...`;

  if (navigator.share) {
    navigator
      .share({
        title: data.title,
        text: shareText,
        url: blogUrl,
      })
      .catch((error) => console.error("Sharing failed", error));
  } else {
    const encodedTitle = encodeURIComponent(data?.title);
    const encodedDescription = encodeURIComponent(data?.desc.slice(0, 150));
    const encodedUrl = encodeURIComponent(blogUrl);
    const encodedImage = encodeURIComponent(data?.img);

    // Social Media Share URLs
    const shareOptions = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} - ${encodedUrl}`,
    };

    // Open the default share option (LinkedIn as fallback)
    window.open(shareOptions.linkedin, "_blank");
  }
};
