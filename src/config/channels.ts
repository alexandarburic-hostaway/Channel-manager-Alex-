import type { ChannelConfig } from '@/types/channel'

export const channels: ChannelConfig[] = [
  {
    id: 'airbnb',
    name: 'Airbnb',
    logo: '/channels/airbnb.svg',
    brandColor: '#FF5A5F',
    connectionSteps: ['Sign in to Airbnb', 'Authorize connection', 'Select listings to sync'],
  },
  {
    id: 'booking',
    name: 'Booking.com',
    logo: '/channels/booking.svg',
    brandColor: '#003580',
    connectionSteps: ['Sign in to Booking.com', 'Authorize connection', 'Select listings to sync'],
  },
  {
    id: 'vrbo',
    name: 'Vrbo',
    logo: '/channels/vrbo.svg',
    brandColor: '#00A699',
    connectionSteps: ['Sign in to VRBO', 'Authorize connection', 'Select listings to sync'],
  },
  {
    id: 'expedia',
    name: 'Expedia',
    logo: '/channels/expedia.svg',
    brandColor: '#00355F',
    connectionSteps: ['Sign in to Expedia', 'Authorize connection', 'Select listings to sync'],
  },
  {
    id: 'marriott',
    name: 'Marriott',
    logo: '/channels/marriott.svg',
    brandColor: '#A57A5A',
    connectionSteps: ['Sign in to Marriott', 'Authorize connection', 'Select listings to sync'],
  },
  {
    id: 'google',
    name: 'Google',
    logo: '/channels/google.svg',
    brandColor: '#4285F4',
    connectionSteps: ['Sign in to Google', 'Authorize connection', 'Select listings to sync'],
  },
  {
    id: 'ical',
    name: 'iCal',
    logo: '',
    brandColor: '#22B8CF',
    connectionSteps: ['Share your iCal URL', 'Validate feed', 'Start syncing listings'],
  },
]

export const getChannelById = (id: string): ChannelConfig | undefined =>
  channels.find((c) => c.id === id)
