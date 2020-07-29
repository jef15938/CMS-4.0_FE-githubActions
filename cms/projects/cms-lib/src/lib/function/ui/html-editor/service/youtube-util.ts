export const YOUTUBE_EMBED_VIDEO_URL = 'https://www.youtube.com/embed/';

export class YoutubeUtil {

  static findVideoIdFromVideoUrl(videoUrl: string) {
    if (videoUrl.indexOf(YOUTUBE_EMBED_VIDEO_URL) > -1) {
      return videoUrl.replace(YOUTUBE_EMBED_VIDEO_URL, '');
    }
    return '';
  }

  static convertVideoUrlToImageUrl(videoUrl: string): string {
    const videoId = YoutubeUtil.findVideoIdFromVideoUrl(videoUrl);
    return YoutubeUtil.getImageUrlFromVideoId(videoId);
  }

  static getImageUrlFromVideoId(videoId: string) {
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '';
  }
}
