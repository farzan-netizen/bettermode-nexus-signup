import { cx } from "@/utils/cx";

export const BrandShowcase = () => {
  return (
    <div className="flex flex-col h-full max-w-md mx-auto px-8">
      <div className="flex-1">
        {/* Title */}
        <div className="text-left flex flex-col gap-3 mb-4">
          <h2 className="text-2xl font-base text-primary">
            <span className="font-bold">Transform Customer Connections Into Revenue Growth</span>
          </h2>
          <p className="text-sm text-tertiary">
            Join 500+ growing SaaS companies using Bettermode for advanced community capabilities. Seamless integrations, powerful analytics, and proven frameworks that scale efficiently as you grow.
          </p>
          <p className="text-sm text-tertiary mt-2">
            Built for scaling software & tech companies driving measurable community ROI through smart implementation.
          </p>
        </div>
      </div>
      
      {/* Brand Logos Slider - 3 Horizontal Rows - Moved to bottom */}
      <div className="space-y-4 mt-auto">
          {/* First Row - Moving Left */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FBFBFB] via-transparent to-[#FBFBFB] z-10 pointer-events-none"></div>
            <div className="flex animate-infinite-scroll space-x-3">
              {[
                { src: "/logos/hubspot.svg", alt: "HubSpot" },
                { src: "/logos/l_backup/ibm.svg", alt: "IBM" },
                { src: "/logos/l_backup/xano.svg", alt: "Xano" },
                { src: "/logos/l_backup/CoachHub.svg", alt: "CoachHub" },
                { src: "/logos/l_backup/lenovo.svg", alt: "Lenovo" }
              ].concat([
                { src: "/logos/hubspot.svg", alt: "HubSpot" },
                { src: "/logos/l_backup/ibm.svg", alt: "IBM" },
                { src: "/logos/l_backup/xano.svg", alt: "Xano" },
                { src: "/logos/l_backup/CoachHub.svg", alt: "CoachHub" },
                { src: "/logos/l_backup/lenovo.svg", alt: "Lenovo" }
              ]).map((logo, index) => (
                <div key={index} className="w-24 h-16 flex items-center justify-center px-3 flex-shrink-0 transition-all">
                  <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain logo-filter-dark-only" />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FBFBFB] via-transparent to-[#FBFBFB] z-10 pointer-events-none"></div>
            <div className="flex animate-infinite-scroll-reverse space-x-3">
              {[
                { src: "/logos/intercom-1.svg", alt: "Intercom" },
                { src: "/logos/slack-2.svg", alt: "Slack" },
                { src: "/logos/zendesk-1.svg", alt: "Zendesk" },
                { src: "/logos/l_backup/logitech.svg", alt: "Logitech" },
                { src: "/logos/l_backup/viewsonic.svg", alt: "ViewSonic" }
              ].concat([
                { src: "/logos/intercom-1.svg", alt: "Intercom" },
                { src: "/logos/slack-2.svg", alt: "Slack" },
                { src: "/logos/zendesk-1.svg", alt: "Zendesk" },
                { src: "/logos/l_backup/logitech.svg", alt: "Logitech" },
                { src: "/logos/l_backup/viewsonic.svg", alt: "ViewSonic" }
              ]).map((logo, index) => (
                <div key={index} className={cx(
                  "h-16 flex items-center justify-center px-3 flex-shrink-0 transition-all",
                  logo.alt === "ViewSonic" ? "w-48" : "w-24"
                )}>
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className={cx(
                      "object-contain logo-filter-dark-only",
                      logo.alt === "ViewSonic" ? "h-8 w-16" : "h-8 w-auto"
                    )} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Third Row - Moving Left */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FBFBFB] via-transparent to-[#FBFBFB] z-10 pointer-events-none"></div>
            <div className="flex animate-infinite-scroll space-x-3">
              {[
                { src: "/logos/l_backup/yoto.svg", alt: "Yoto" },
                { src: "/logos/l_backup/Ceros.svg", alt: "Ceros" },
                { src: "/logos/l_backup/Flutterflow.svg", alt: "FlutterFlow" },
                { src: "/logos/l_backup/preply.svg", alt: "Preply" },
                { src: "/logos/s/salesforce.svg", alt: "Salesforce" }
              ].concat([
                { src: "/logos/l_backup/yoto.svg", alt: "Yoto" },
                { src: "/logos/l_backup/Ceros.svg", alt: "Ceros" },
                { src: "/logos/l_backup/Flutterflow.svg", alt: "FlutterFlow" },
                { src: "/logos/l_backup/preply.svg", alt: "Preply" },
                { src: "/logos/s/salesforce.svg", alt: "Salesforce" }
              ]).map((logo, index) => (
                <div key={index} className="w-24 h-16 flex items-center justify-center px-3 flex-shrink-0 transition-all">
                  <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain logo-filter-dark-only" />
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};
