export const SignupEnterpriseStepSuccess = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-8 z-50 animate-in fade-in slide-in-from-bottom-8 duration-1000"
      style={{
        background: `linear-gradient(120deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)`,
      }}
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Perfect! Let's build your community.
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
          We'll guide you through setting up your community with the enterprise
          features you selected.
        </p>

        <div className="text-lg text-gray-500">
          <span>Redirecting to community setup...</span>
        </div>
      </div>
    </div>
  )
}
