interface Props {
  communityName?: string
  currentStep: number
  logo: File | null | undefined
  selectedLogoUrl?: string | null
  primaryColor?: string
}
export const CommunityPreviewHeader = ({
  communityName,
  currentStep,
  selectedLogoUrl,
  logo,
  primaryColor,
}: Props) => {
  return (
    <div>
      {/* Browser Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-2 sm:px-4 py-2 sm:py-3 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-md px-2 sm:px-3 py-1 text-xs text-gray-500 truncate">
          {communityName
            ? `${communityName.toLowerCase().replace(/\s+/g, '')}.community`
            : 'yourcommunity.community'}
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-3 sm:gap-4 flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentStep >= 2 && (logo || selectedLogoUrl) ? (
            <img
              src={logo ? URL.createObjectURL(logo) : selectedLogoUrl!}
              alt="Logo"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded-lg flex-shrink-0"
            />
          ) : (
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0"
              style={{
                backgroundColor:
                  currentStep >= 2 && primaryColor ? primaryColor : '#6b7280',
              }}
            >
              <span>
                {currentStep >= 1 && communityName
                  ? communityName.charAt(0).toUpperCase()
                  : 'C'}
              </span>
            </div>
          )}
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-gray-900 truncate">
              {currentStep >= 1 && communityName ? communityName : 'Community'}
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-md bg-gray-50 text-xs placeholder-gray-400 focus:outline-none"
              placeholder="Search..."
              disabled
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-7 h-7 bg-gray-100 rounded-md"></div>
          <div className="w-7 h-7 bg-gray-100 rounded-md"></div>
          <div className="w-7 h-7 bg-gray-100 rounded-md"></div>
          <div className="w-7 h-7 bg-gray-100 rounded-md"></div>
          <div className="w-7 h-7 bg-gray-300 rounded-full ml-1"></div>
        </div>
      </div>
    </div>
  )
}
