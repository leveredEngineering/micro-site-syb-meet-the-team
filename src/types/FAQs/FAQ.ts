import { RichTextV2Description } from "../entities";

export type FeaturedFAQs = {
    data: FAQv2[];
}

export type FAQv2 = {
    question: string;
    answerV2: RichTextV2Description
}