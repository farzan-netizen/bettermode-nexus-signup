interface Props {
  currentStep: number
  primaryColor?: string
  communityName?: string
}
export const CommunityPreviewHeroBanner = ({
  currentStep,
  primaryColor,
  communityName,
}: Props) => {
  return (
    <div
      className="mb-4 sm:mb-6 rounded-lg p-4 sm:p-5 relative overflow-hidden"
      style={{
        background:
          currentStep >= 2 && primaryColor
            ? `linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}08 100%)`
            : 'linear-gradient(135deg, #6b728015 0%, #6b728008 100%)',
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, ${currentStep >= 2 && primaryColor ? primaryColor : '#6b7280'} 2px, transparent 0), radial-gradient(circle at 75px 75px, ${currentStep >= 2 && primaryColor ? primaryColor : '#6b7280'} 2px, transparent 0)`,
          backgroundSize: '100px 100px',
        }}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                currentStep >= 2 && primaryColor ? primaryColor : '#6b7280',
            }}
          ></div>
          <div
            className="w-16 h-2 rounded"
            style={{
              backgroundColor:
                currentStep >= 2 && primaryColor
                  ? `${primaryColor}15`
                  : '#f3f4f6',
            }}
          ></div>
        </div>

        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          {currentStep >= 1 && communityName ? (
            <>
              Welcome to{' '}
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent font-extrabold"
                style={{
                  backgroundImage:
                    currentStep >= 2 && primaryColor
                      ? `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}CC 100%)`
                      : 'linear-gradient(135deg, #6b7280 0%, #6b7280CC 100%)',
                }}
              >
                {communityName}
              </span>
            </>
          ) : (
            'Build Something Amazing Together'
          )}
        </h1>

        <div className="space-y-2 max-w-xl">
          <div
            className="w-full h-3 rounded"
            style={{
              backgroundColor:
                currentStep >= 2 && primaryColor
                  ? `${primaryColor}15`
                  : '#f3f4f6',
            }}
          ></div>
          <div
            className="w-4/5 h-3 rounded"
            style={{
              backgroundColor:
                currentStep >= 2 && primaryColor
                  ? `${primaryColor}15`
                  : '#f3f4f6',
            }}
          ></div>
          <div
            className="w-3/5 h-3 rounded"
            style={{
              backgroundColor:
                currentStep >= 2 && primaryColor
                  ? `${primaryColor}15`
                  : '#f3f4f6',
            }}
          ></div>
        </div>

        {/* CTA Button */}
        <div className="mt-4">
          <div
            className="w-20 h-7 rounded-md shadow-sm"
            style={{
              backgroundColor:
                currentStep >= 2 && primaryColor ? primaryColor : '#6b7280',
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
