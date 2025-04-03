import type { CollectionConfig } from 'payload'

export const Banner: CollectionConfig = {
    slug: 'banner',
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
        label: 'Banner title',
      },
      {
        name: 'bannerImage',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: 'Banner Image',
      },
      {
        name: 'link',
        type: 'text',
        required: true,
        label: 'Redirect Link',
      },
    ],
  };