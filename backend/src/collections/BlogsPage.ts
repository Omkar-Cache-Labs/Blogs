import type { CollectionConfig } from 'payload'

export const BlogsPage: CollectionConfig = {
  slug: 'BlogsPage',  // URL endpoint will be /blogs
  labels: {
    singular: 'BlogsPage',
    plural: 'BlogsPages'
  },
  admin: {
    useAsTitle: 'title', // Displays the title in the admin panel
  },
  access: {
    read: () => true, // Allow public access to read blogs
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Blog Heading',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media', // Link to media collection for storing images
      required: true,
      label: 'Thumbnail Image',
    },
    {
        name: 'content',
        type: 'richText',
        required: true,
        label: 'Blog Content',
    },
    {
        name: 'Blog-Image',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: 'Blog Image',
    },
  ]
};

