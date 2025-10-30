interface Props {
  currentStep: number
  primaryColor?: string
}
export const CommunityPreviewContent = ({
  currentStep,
  primaryColor,
}: Props) => {
  return (
    <div className="space-y-4">
      {/* Post 1 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        {/* Post Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex-shrink-0"
            style={{
              backgroundColor:
                currentStep >= 2 && primaryColor
                  ? `${primaryColor}15`
                  : '#d1d5db',
            }}
          ></div>
          <div className="flex-1">
            <div
              className="w-28 h-3 rounded mb-1"
              style={{
                backgroundColor:
                  currentStep >= 2 && primaryColor
                    ? `${primaryColor}20`
                    : '#d1d5db',
              }}
            ></div>
            <div className="w-16 h-2 bg-gray-100 rounded"></div>
          </div>
          <div className="w-5 h-5 bg-gray-100 rounded"></div>
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
          <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
        </div>

        {/* Post Image/Media */}
        <div
          className="w-full h-24 rounded-lg mb-3"
          style={{
            backgroundColor:
              currentStep >= 2 && primaryColor
                ? `${primaryColor}20`
                : '#e5e7eb',
          }}
        ></div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <div className="w-6 h-2 bg-gray-100 rounded"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <div className="w-6 h-2 bg-gray-100 rounded"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <div className="w-8 h-2 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div className="w-4 h-4 bg-gray-100 rounded"></div>
        </div>
      </div>

      {/* Post 2 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        {/* Post Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex-shrink-0"
            style={{
              backgroundColor:
                currentStep >= 2 && primaryColor
                  ? `${primaryColor}15`
                  : '#d1d5db',
            }}
          ></div>
          <div className="flex-1">
            <div
              className="w-32 h-3 rounded mb-1"
              style={{
                backgroundColor:
                  currentStep >= 2 && primaryColor
                    ? `${primaryColor}20`
                    : '#d1d5db',
              }}
            ></div>
            <div className="w-20 h-2 bg-gray-100 rounded"></div>
          </div>
          <div className="w-5 h-5 bg-gray-100 rounded"></div>
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
          <div className="w-3/4 h-3 bg-gray-100 rounded mb-2"></div>
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor:
                    currentStep >= 2 && primaryColor
                      ? `${primaryColor}15`
                      : '#e5e7eb',
                }}
              ></div>
              <div className="w-8 h-2 bg-gray-100 rounded"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <div className="w-6 h-2 bg-gray-100 rounded"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <div className="w-10 h-2 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div className="w-4 h-4 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  )
}
