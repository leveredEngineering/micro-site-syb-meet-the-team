import { type ReactNode } from "react";
import type { TemplateRenderProps, BaseProfile } from "src/types/entities";
import { AnalyticsProvider } from "@yext/pages-components";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import { ConfigurationProvider } from "@yext/sites-react-components";
import { TemplateDataProvider } from "src/common/useTemplateData";
// import { Header } from "src/components/common/Header";
// import { Footer } from "src/components/common/Footer";
import { useExposeEnableYAFunction } from "src/common/useExposeEnableYAFunction";
import config from "src/config";
import Footer from "src/components/Footer";
import { Header } from "src/components/common/Header";
import { SimpleHeader } from "src/components/common/SimpleHeader";
import PlatformDebugModal from "src/components/leverageui/PlatformDebugModal";
import { SimpleFooter } from "src/components/common/SimpleFooter";

interface MainProps {
  data: TemplateRenderProps<BaseProfile>;
  children?: ReactNode;
}

const Main = (props: MainProps) => {
  return (
    <ConfigurationProvider value={config}>
      <AnalyticsProvider templateData={props.data} requireOptIn={false} enableDebugging={true}>
        <MainInternal {...props} />
      </AnalyticsProvider>
    </ConfigurationProvider>
  );
};

const MainInternal = (props: MainProps) => {
  const { c_header } = props.data.document;
  const { children } = props;

  // Create the global window.enableYextAnalytics function for clients that need to get user consent
  // If consent is not required, set requireOptIn on AnalyticsProvider above to false.
  useExposeEnableYAFunction();

  return (
    <TemplateDataProvider value={props.data}>
      <div className="levered_container">
        {c_header && (
          <ErrorBoundaryWithAnalytics name="header">
            <SimpleHeader {...c_header}/>
          </ErrorBoundaryWithAnalytics>
        )}
          {children}
        {c_header && (
          <ErrorBoundaryWithAnalytics name="footer">
            <SimpleFooter footerLinks={c_header.ctas} copyrightMessage="© 2024 Levered. All rights reserved."/>
          </ErrorBoundaryWithAnalytics>
        )}
      </div>
    </TemplateDataProvider>
  );
};

export { Main };
