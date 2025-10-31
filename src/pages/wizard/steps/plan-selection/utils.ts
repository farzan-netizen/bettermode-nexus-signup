import type { SignupState } from '@/store/signup'
import type { BrandState } from '@/store/brand'

export const getRecommendedPlan = (formData: SignupState['form']): string => {
  // Check if user selected any enterprise features
  const hasEnterpriseFeatures =
    formData &&
    formData.enterpriseFeatures &&
    formData.enterpriseFeatures?.length > 0

  // If enterprise features are selected, recommend enterprise plan
  if (hasEnterpriseFeatures) {
    return 'enterprise'
  }

  // Define basic/starter tools (no enterprise label)
  const basicTools = [
    'google-analytics',
    'cookie-consent',
    'zapier',
    'make',
    'slack',
    'discord',
    'mailchimp',
  ]

  // Define advanced tools (beyond starter capabilities)
  const advancedTools = [
    'google-tag-manager',
    'custom-code',
    'usercentric',
    'onetrust',
    'fullstory',
    'hotjar',
    'amplitude',
    'mixpanel',
    'hubspot',
    'zendesk',
    'intercom',
    'jira',
    'salesforce',
  ]

  // Check if user selected any advanced integrations
  const hasAdvancedIntegrations = formData.enterpriseFeatures?.some(tool =>
    advancedTools.includes(tool),
  )

  // Check if user only selected basic tools
  const hasOnlyBasicTools =
    formData &&
    formData.enterpriseFeatures &&
    formData.enterpriseFeatures.length > 0 &&
    formData.enterpriseFeatures.every(tool => basicTools.includes(tool))

  // Decision logic based on integrations
  if (hasAdvancedIntegrations) {
    return 'growth'
  } else if (
    hasOnlyBasicTools ||
    (formData?.enterpriseFeatures?.length || 0) === 0
  ) {
    return 'starter'
  } else {
    return 'starter' // fallback
  }
}

export const generatePlanRecommendationText = (
  formData: SignupState['form'],
  recommendedPlan: string,
  brandData?: BrandState | null,
) => {
  const name = formData.firstName

  // Use brand data if available, otherwise fall back to form data
  const company = brandData?.name || formData.companyName || 'your company'

  // Get industry using simplified Step 4 terms
  let industry = 'Technology and Services'

  if (formData.industry) {
    // Use the exact terms from Step 4
    const industryMap: Record<string, string> = {
      'B2B SaaS': 'B2B SaaS',
      'Computer Software': 'Computer Software',
      'Technology and Services': 'Technology and Services',
      AI: 'AI',
      'Medical SaaS': 'Medical SaaS',
      MarTech: 'MarTech',
      AdTech: 'AdTech',
      'Online Marketplace': 'Online Marketplace',
      EdTech: 'EdTech',
      'Dev Tools': 'Dev Tools',
    }

    industry = industryMap[formData.industry] || 'Technology and Services'
  } else if (brandData?.company?.industries?.[0]?.name) {
    // Map brand data industry back to our simplified terms
    const brandIndustryName = brandData.company.industries[0].name.toLowerCase()

    if (
      brandIndustryName.includes('programming') ||
      brandIndustryName.includes('developer') ||
      brandIndustryName.includes('software')
    ) {
      industry = 'Computer Software'
    } else if (
      brandIndustryName.includes('artificial intelligence') ||
      brandIndustryName.includes('machine learning')
    ) {
      industry = 'AI'
    } else if (
      brandIndustryName.includes('health') ||
      brandIndustryName.includes('medical') ||
      brandIndustryName.includes('medicine')
    ) {
      industry = 'Medical SaaS'
    } else if (
      brandIndustryName.includes('marketing') ||
      brandIndustryName.includes('advertising')
    ) {
      industry = 'MarTech'
    } else if (
      brandIndustryName.includes('education') ||
      brandIndustryName.includes('learning')
    ) {
      industry = 'EdTech'
    } else if (
      brandIndustryName.includes('marketplace') ||
      brandIndustryName.includes('e-commerce') ||
      brandIndustryName.includes('shopping')
    ) {
      industry = 'Online Marketplace'
    } else if (
      brandIndustryName.includes('computer') ||
      brandIndustryName.includes('technology') ||
      brandIndustryName.includes('electronics')
    ) {
      industry = 'Technology and Services'
    } else {
      industry = 'B2B SaaS'
    }
  }

  // Estimate company size based on brand data
  const companySize = brandData?.company?.employees
    ? brandData.company.employees.toString()
    : '50'

  // Generate integration icons text based on current tools - using exact SAAS_TOOLS data
  let integrationIconsText = ''
  if (formData.enterpriseFeatures && formData.enterpriseFeatures.length > 0) {
    // Use exact data from SAAS_TOOLS constants
    const saasTools: Record<string, { name: string; logo: string }> = {
      'google-analytics': {
        name: 'Google Analytics',
        logo: '/logos/s/google-analytics-3.svg',
      },
      'cookie-consent': {
        name: 'Cookie Consent Manager',
        logo: '/logos/s/cookie-svgrepo-com.svg',
      },
      zapier: { name: 'Zapier', logo: '/logos/s/zapier.svg' },
      make: { name: 'Make.com', logo: '/logos/s/make.svg' },
      slack: { name: 'Slack', logo: '/logos/s/slack-new-logo.svg' },
      discord: { name: 'Discord', logo: '/logos/s/discord.svg' },
      mailchimp: { name: 'Mailchimp', logo: '/logos/s/mailchimp%20logo.svg' },
      'google-tag-manager': {
        name: 'Google Tag Manager',
        logo: '/logos/s/google-tag-manager%20logo.svg',
      },
      'custom-code': {
        name: 'Custom Code Snippet',
        logo: '/logos/s/Custom-Code-Snippet.svg',
      },
      usercentric: {
        name: 'Usercentrics',
        logo: '/logos/s/Usercentrics_idibjbvDVZ_0.svg',
      },
      onetrust: { name: 'OneTrust', logo: '/logos/s/OneTrust.svg' },
      fullstory: { name: 'Fullstory', logo: '/logos/s/fullstory-logo.svg' },
      hotjar: { name: 'Hotjar', logo: '/logos/s/hotjar-icon%20logo.svg' },
      amplitude: {
        name: 'Amplitude',
        logo: '/logos/s/amplitude-icon%20logo.svg',
      },
      mixpanel: { name: 'Mixpanel', logo: '/logos/s/Mixpanel_Symbol_0.svg' },
      hubspot: { name: 'Hubspot', logo: '/logos/s/hubspot-1.svg' },
      zendesk: { name: 'Zendesk', logo: '/logos/s/zendesk-3.svg' },
      intercom: { name: 'Intercom', logo: '/logos/s/intercom-2.svg' },
      jira: { name: 'Jira', logo: '/logos/s/Jira%20logo.svg' },
      salesforce: { name: 'Salesforce', logo: '/logos/s/salesforce.svg' },
    }

    if (formData.enterpriseFeatures.length === 1) {
      // 1 app: show icon + name
      const toolId = formData.enterpriseFeatures[0]
      const tool = saasTools[toolId]
      if (tool) {
        integrationIconsText = `[avatar:${tool.logo}:${tool.name}] ${tool.name}`
      } else {
        integrationIconsText = toolId
      }
    } else if (formData.enterpriseFeatures.length <= 5) {
      // 2-5 apps: show only icons
      const toolAvatars = formData.enterpriseFeatures
        .map(toolId => {
          const tool = saasTools[toolId]
          return tool ? `[avatar:${tool.logo}:${tool.name}]` : ''
        })
        .filter(Boolean)
        .join('')
      integrationIconsText = toolAvatars
    } else {
      // More than 5 apps: show 5 icons + "and more"
      const toolAvatars = formData.enterpriseFeatures
        .slice(0, 5)
        .map(toolId => {
          const tool = saasTools[toolId]
          return tool ? `[avatar:${tool.logo}:${tool.name}]` : ''
        })
        .filter(Boolean)
        .join('')
      integrationIconsText = `${toolAvatars} and more`
    }
  } else {
    integrationIconsText = 'your current tools'
  }

  // Plan-specific templates with original UI formatting and 2x larger first line
  const templates = {
    starter: `##**Ready to transform customer connections, ${name}?**\n\nYour **${industry.toLowerCase()}** company is perfectly positioned for community success. With **${company}**'s **${companySize}-person** team and ${integrationIconsText} already in place, the {{Starter}} plan accelerates your community launch.\n\nTurn customer interactions into lasting relationships while your organization builds momentum for bigger wins ahead.\n\n[[Mo Malayeri]]\n((CEO at Bettermode))`,

    growth: `##**Time to amplify your ${industry.toLowerCase()} leadership, ${name}.**\n\n**${company}** is ready to unlock serious community ROI. Your **${companySize}-person** team, combined with ${integrationIconsText}, positions you perfectly for the {{Growth}} plan's advanced capabilities.\n\nTransform scattered touchpoints into systematic advocacy that drives measurable revenue growth and competitive advantage.\n\n[[Mo Malayeri]]\n((CEO at Bettermode))`,

    enterprise: `##**Scale with enterprise confidence, ${name}.**\n\n**${company}** deserves community infrastructure that matches your ambitions. With your **${companySize}-person** organization using ${integrationIconsText}, the {{Enterprise}} plan delivers the security and scale you need.\n\nLead your **${industry.toLowerCase()}** with community strategies that enterprise customers trust and competitors can't match.\n\n[[Mo Malayeri]]\n((CEO at Bettermode))`,
  }

  return (
    templates[recommendedPlan.toLowerCase() as keyof typeof templates] ||
    templates.starter
  )
}
