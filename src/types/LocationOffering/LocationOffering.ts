import { Link, RichTextV2Description } from "../entities";

export interface LocationOffering {
    detailCard:      DetailCard[];
    mainDescription: RichTextV2Description;
    mainTitle:       string;
}

export interface DetailCard {
    description: RichTextV2Description;
    link?:       Link;
    title:       string;
}
