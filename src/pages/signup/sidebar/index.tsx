import { useAppSelector } from '@/hooks/store'
import { SIGNUP_TOTAL_STEPS } from '../constants'
import { SidebarContent } from './sidebar-content'
import { signupSelectCurrentStep } from '@/store/signup'

export const SignupSideBar = () => {
  const currentStep = useAppSelector(signupSelectCurrentStep)

  return (
    currentStep !== SIGNUP_TOTAL_STEPS && (
      <div className="relative hidden w-full bg-tertiary lg:flex lg:flex-col lg:h-screen lg:overflow-hidden max-w-[30%]">
        <div className="flex flex-col justify-start mt-24 items-center h-full p-6 lg:p-8">
          <SidebarContent currentStep={currentStep} />
        </div>

        {/* Fixed Company Logos at Bottom - Only show for testimonial steps */}
        {currentStep >= 2 && currentStep <= 6 && (
          <div className="absolute bottom-8 left-6 right-6">
            <div className="grid grid-cols-4 gap-1 px-2">
              {[
                { src: '/logos/l_backup/CoachHub.svg', alt: 'CoachHub' },
                { src: '/logos/l_backup/Ceros.svg', alt: 'Ceros' },
                {
                  src: '/logos/l_backup/Flutterflow.svg',
                  alt: 'FlutterFlow',
                },
                { src: '/logos/l_backup/ibm.svg', alt: 'IBM' },
                { src: '/logos/intercom-1.svg', alt: 'Intercom' },
                { src: '/logos/l_backup/lenovo.svg', alt: 'Lenovo' },
                { src: '/logos/l_backup/logitech.svg', alt: 'Logitech' },
                { src: '/logos/l_backup/preply.svg', alt: 'Preply' },
                {
                  src: '/logos/l_backup/Property 1=SuperOps, color=color.svg',
                  alt: 'SuperOps',
                },
                {
                  src: '/logos/l_backup/Property 1=Variant10, color=color.svg',
                  alt: 'Variant10',
                },
                { src: '/logos/l_backup/xano.svg', alt: 'Xano' },
                { src: '/logos/l_backup/yoto.svg', alt: 'Yoto' },
              ].map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  )
}
