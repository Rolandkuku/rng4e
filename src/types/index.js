// @flow

export type Category = {
  id: number,
  slug: string,
  title: string
};

export type ThumbnailImage = {
  url: string,
  height: number,
  width: number
};

export type ThumbnailImages = {
  full: ThumbnailImage,
  large: ThumbnailImage,
  medium: ThumbnailImage,
  medium_large: ThumbnailImage,
  "post-thumbnail": ThumbnailImage,
  "thumb-large": ThumbnailImage,
  "thumb-medium": ThumbnailImage,
  "thumb-small": ThumbnailImage,
  "thumb-standard": ThumbnailImage,
  "thumb-xlarge": ThumbnailImage,
  "thumb-xxlarge": ThumbnailImage,
  thumbnail: ThumbnailImage
};

export type Post = {
  author: {
    name: String
  },
  categories: Array<Category>,
  content: string,
  date: string,
  modified: string,
  id: number,
  thumbnail: string,
  thumbnail_images: ThumbnailImages,
  thumbnail_size: $Keys<ThumbnailImages>,
  title: string,
  title_plain: string,
  type: "breves",
  url: string
};

export type Posts = Array<Post>;
