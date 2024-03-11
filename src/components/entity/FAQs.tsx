import FAQ from "src/components/entity/FAQ";
import { FAQv2, FeaturedFAQs } from "src/types/FAQs/FAQ";

type FAQsProps = {
  faqs: FAQv2[];
  sectionTitle: string;
};

const FAQs = ({ sectionTitle, faqs } : FAQsProps) => {
  return (
    <section className="FAQ py-8 sm:py-16">
      <div className="container">
        <h2 className="Heading Heading--head font-bold mb-8 font-medium text-lato text-brand-primary">
          {sectionTitle}
        </h2>
        <div className="divide-y border-t border-b">
          {faqs.map((faq:FAQv2) => (
            <FAQ {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
