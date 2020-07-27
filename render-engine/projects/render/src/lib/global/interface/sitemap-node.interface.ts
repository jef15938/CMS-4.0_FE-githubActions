export interface SitemapNode {
  nodeID: string;
  nodeName: string;
  url: string;
  urlTarget: string;
  children: SitemapNode[];
  contentID: string;
}
