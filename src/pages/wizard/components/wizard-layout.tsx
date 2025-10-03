import { ReactNode } from "react";
import { ArrowLeft } from "@untitledui/icons";
import { WizardFormData } from "../types";
import { STEP_TITLES } from "../constants";
import { CommunityPreview } from "./community-preview";

interface WizardLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  formData: WizardFormData;
  selectedLogoUrl?: string | null;
  onBack?: () => void;
}

export const WizardLayout = ({ 
  children, 
  currentStep, 
  totalSteps, 
  formData,
  selectedLogoUrl,
  onBack 
}: WizardLayoutProps) => {
  return (
    <section className="flex h-screen bg-primary overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex w-full lg:w-1/2 flex-col h-full overflow-hidden flex-shrink-0">
        
        {/* Header with Progress */}
        <header className="flex flex-col gap-1 px-4 py-1 sm:gap-1.5 sm:py-1.5 sm:px-6 md:px-8 lg:px-8 xl:px-8 flex-shrink-0">
          {/* Logo and Step Label */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex h-8 w-max items-center justify-start overflow-visible max-md:hidden px-[68px] py-[32px]">
              <img 
                src="/logo-bettermode.svg" 
                alt="bettermode" 
                className="h-6 w-auto logo-filter"
              />
            </div>
            
            {/* Mobile Logo */}
            <div className="flex items-center justify-center md:hidden">
              <img 
                src="/logo-bettermode.svg" 
                alt="bettermode" 
                className="h-8 w-auto logo-filter"
              />
            </div>
            
            {/* Step Label */}
            <div className="text-sm text-tertiary">
              Step {currentStep} of {totalSteps}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-1">
            <div 
              className="h-full bg-brand-secondary rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="flex justify-start items-start pt-[80px] pb-6 sm:pt-[80px] sm:pb-8 xl:pt-[80px] xl:pb-8">
            <div className="flex w-full flex-col pb-6 sm:pb-8 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-[804px] xl:max-w-[1200px] gap-4 sm:gap-5 md:gap-6 pl-[100px] pr-[68px]">
              
              {/* Form Content */}
              <div className="flex flex-col gap-6">
                {/* Step Content */}
                <div className="flex flex-col gap-2">
                  {/* Back Button */}
                  {currentStep > 1 && onBack && (
                    <div className="mb-1">
                      <button 
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-xl font-semibold text-primary sm:text-2xl">
                        {STEP_TITLES[currentStep as keyof typeof STEP_TITLES]}
                      </h1>
                      <p className="text-md text-tertiary mt-2">
                        {currentStep === 1 && "Create a new community, but if you already have one on another platform, we can help you migrate."}
                        {currentStep === 2 && (() => {
                          // Check if we have detected brand data
                          const savedBrandData = sessionStorage.getItem('signup-brand-data');
                          const hasBrandData = savedBrandData && savedBrandData !== 'null';
                          
                          if (formData.isManualBranding) {
                            return "Upload your logo and choose your primary color.";
                          } else if (hasBrandData) {
                            return "We've detected your brand. Customize or continue with these settings.";
                          } else {
                            return "Enter your website URL to automatically detect your brand, or set it manually.";
                          }
                        })()}
                        {currentStep === 3 && "Pick a few spaces to shape your community. You can add more later."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-5">
                {children}
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Preview */}
      <div className="relative hidden lg:flex w-1/2 flex-col bg-tertiary h-full overflow-hidden flex-shrink-0">
        <div className="flex flex-col justify-start items-center h-full p-6 lg:p-8">
          <CommunityPreview 
            formData={formData}
            currentStep={currentStep}
            selectedLogoUrl={selectedLogoUrl}
          />
        </div>
      </div>
      
    </section>
  );
};
