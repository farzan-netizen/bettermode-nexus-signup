import { GROUPED_SPACES_ITEMS } from '../../constants'

interface Props {
  currentStep: number
  primaryColor?: string
  selectedSpaces: string[]
}
export const CommunityPreviewSidebar = ({
  currentStep,
  primaryColor,
  selectedSpaces,
}: Props) => {
  return (
    <div className="w-48 sm:w-56 lg:w-64 bg-gray-50 border-r border-gray-200 p-2 sm:p-3 lg:p-4 flex flex-col">
      {/* Navigation/Spaces */}
      <div className="space-y-1 flex-1 overflow-y-auto">
        {/* Default Feed space - Selected */}
        <div
          className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm rounded-md cursor-pointer transition-colors"
          style={{
            backgroundColor:
              currentStep >= 2 && primaryColor
                ? `${primaryColor}15`
                : '#f3f4f6',
            borderColor:
              currentStep >= 2 && primaryColor
                ? `${primaryColor}30`
                : '#e5e7eb',
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{
              color:
                currentStep >= 2 && primaryColor ? primaryColor : '#6b7280',
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span className="truncate font-medium text-gray-700">Feed</span>
        </div>

        {/* Selected spaces grouped by category */}
        {currentStep >= 3 &&
          (() => {
            const groupedSelectedSpaces = Object.values(
              GROUPED_SPACES_ITEMS,
            ).filter(group => {
              return group.items.some(item => selectedSpaces.includes(item.id))
            })

            return groupedSelectedSpaces.map(({ title, items }, index) => (
              <div key={index} className="mt-3">
                <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1">
                  {title}
                </div>
                {items.map(space => {
                  const IconComponent = space.icon

                  return (
                    <div
                      key={space.id}
                      className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm rounded-md transition-colors cursor-pointer hover:bg-gray-50"
                    >
                      <IconComponent
                        className="w-4 h-4"
                        style={{
                          color:
                            currentStep >= 2 && primaryColor
                              ? primaryColor
                              : '#6b7280',
                        }}
                      />
                      <span className="truncate font-medium text-gray-700">
                        {space.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            ))
          })()}

        {/* Placeholder spaces if none selected */}
        {(currentStep < 3 || selectedSpaces.length === 0) && (
          <>
            <div className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm text-gray-400 rounded-md">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <div className="w-16 h-3 bg-gray-100 rounded"></div>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm text-gray-400 rounded-md">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <div className="w-20 h-3 bg-gray-100 rounded"></div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
