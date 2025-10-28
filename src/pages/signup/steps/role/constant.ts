export const ROLE_OPTIONS_MAP = {
  'COMMUNITY-MANAGER': { name: 'Community Manager' },
  'CUSTOMER-SUCCESS': { name: 'Customer Success' },
  'PRODUCT-MARKETING': { name: 'Product Marketing' },
  'CUSTOMER-MARKETING': {
    name: 'Customer Marketing',
  },
  'GROWTH-MARKETING': { name: 'Growth Marketing' },
  REVOPS: { name: 'RevOps' },
  OTHER: { name: 'Other' },
}

export const ROLE_OPTION_ITEMS = Object.keys(ROLE_OPTIONS_MAP).map(key => ({
  name: ROLE_OPTIONS_MAP[key as keyof typeof ROLE_OPTIONS_MAP].name,
  id: key,
}))
