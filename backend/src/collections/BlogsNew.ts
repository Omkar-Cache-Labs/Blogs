import type { CollectionConfig } from 'payload'

export const BlogsNew: CollectionConfig = {
    slug: 'blogsnew',
    admin: {
      useAsTitle: 'title',
    },
    access: {
      read: () => true, // Allow public read access
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        label: 'Blogs Card Heading',
      },
      {
        name: 'thumbnail',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: 'Blogs Card Thumbnail',
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true, // Ensure unique URLs for each blog post
      },
      {
        name: 'content',
        type: 'richText', // Rich text editor for blog content
        required: true,
        label: 'Blog Page Content',
      },
      {
        name: 'createdAt',
        type: 'date',
        admin: {
          position: 'sidebar',
        },
      },
    ],
  };