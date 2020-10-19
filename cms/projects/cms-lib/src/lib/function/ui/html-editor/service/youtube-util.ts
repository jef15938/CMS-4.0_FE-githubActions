export class YoutubeUtil {

  static findVideoIdFromVideoUrl(videoUrl: string) {
    if (videoUrl.indexOf('www.youtube.com/embed/') !== -1) {
      const res = videoUrl.split('/embed/')[1];
      return res;
    } else if (videoUrl.indexOf('www.youtube.com/') !== -1) {
      const res = videoUrl.split('=')[1];
      return res;
    } else if (videoUrl.indexOf('youtu.be/') !== -1) {
      const hrefIndex = videoUrl.indexOf('youtu.be/');
      const res = videoUrl.slice(hrefIndex + 9);
      return res;
    }
    return '';
  }

  static getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  static convertVideoUrlToEmbedUrl(videoUrl: string) {
    return YoutubeUtil.getEmbedUrl(YoutubeUtil.findVideoIdFromVideoUrl(videoUrl));
  }

  static convertVideoUrlToImageUrl(videoUrl: string): string {
    const videoId = YoutubeUtil.findVideoIdFromVideoUrl(videoUrl);
    return YoutubeUtil.getImageUrlFromVideoId(videoId);
  }

  static getImageUrlFromVideoId(videoId: string) {
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '';
  }
}
