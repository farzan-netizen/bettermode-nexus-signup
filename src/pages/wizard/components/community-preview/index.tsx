import { useAppSelector } from '@/hooks/store'
import {
  wizardSelectCommunityName,
  wizardSelectCurrentStep,
  wizardSelectLogo,
  wizardSelectPrimaryColor,
  wizardSelectSpaces,
} from '@/store/wizard'
import { CommunityPreviewHeader } from './header'
import { CommunityPreviewSidebar } from './sidebar'
import { CommunityPreviewHeroBanner } from './hero-banner'
import { CommunityPreviewContent } from './content'

interface CommunityPreviewProps {
  selectedLogoUrl?: string | null
}

export const CommunityPreview = ({
  selectedLogoUrl,
}: CommunityPreviewProps) => {
  const currentStep = useAppSelector(wizardSelectCurrentStep)
  const communityName = useAppSelector(wizardSelectCommunityName)
  const logo = useAppSelector(wizardSelectLogo)
  const primaryColor = useAppSelector(wizardSelectPrimaryColor)
  const selectedSpaces = useAppSelector(wizardSelectSpaces)

  return (
    <div className="w-full h-full flex items-stretch justify-center p-2 sm:p-4 lg:p-6">
      <div className="bg-white border border-secondary rounded-xl shadow-lg overflow-hidden w-full h-full min-h-[400px] flex flex-col">
        <CommunityPreviewHeader
          currentStep={currentStep}
          communityName={communityName}
          selectedLogoUrl={selectedLogoUrl}
          logo={logo}
          primaryColor={primaryColor}
        />

        <div className="flex flex-1 bg-white min-h-0">
          <CommunityPreviewSidebar
            currentStep={currentStep}
            primaryColor={primaryColor}
            selectedSpaces={selectedSpaces}
          />

          <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto min-w-0">
            <CommunityPreviewHeroBanner
              currentStep={currentStep}
              primaryColor={primaryColor}
              communityName={communityName}
            />

            <CommunityPreviewContent
              currentStep={currentStep}
              primaryColor={primaryColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
