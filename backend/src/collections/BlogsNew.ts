import type { CollectionConfig } from 'payload'

export const BlogsNew: CollectionConfig = {
    slug: 'blogsnew',
    admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'thumbnail', 'createdAt'],
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
        name: 'subheading',
        type: 'text',
        required: true,
        label: 'Blogs Content Subheading',
      },
      {
        name: 'thumbnail',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: 'Blogs Card Thumbnail',
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