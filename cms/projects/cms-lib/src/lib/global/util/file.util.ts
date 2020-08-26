export class FileUtil {
  static readableFileSize(size: number, unitDepth = 99) {
    const units = ['byte', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
    let i = 0;
    while (size >= 1024 && i < unitDepth) {
      size /= 1024;
      ++i;
    }
    return size.toFixed(1) + ' ' + units[i];
  }
}
