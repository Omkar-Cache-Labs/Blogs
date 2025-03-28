import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',  // URL endpoint will be /blogs
  labels: {
    singular: 'Blog',
    plural: 'Blogs'
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
    }
  ]
};

