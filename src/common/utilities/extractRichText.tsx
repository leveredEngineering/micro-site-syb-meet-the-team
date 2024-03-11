import { FAQv2 } from "src/types/FAQs/FAQ";
import { RichTextNode, SchemaFAQ } from "src/types/entities";

// recursively loop through the AST and extract the text
function extractTextFromAst(node: RichTextNode): string {
    if (node.type === 'text') {
        return node.text || '';
    } else if (node.type === 'root' || node.type === 'paragraph') {
        return (node.children || []).map(child => extractTextFromAst(child)).join('');
    } else if (node.type === 'link') {
        // Include link text in the extracted content
        const linkText = (node.children || []).map(child => extractTextFromAst(child)).join('');
        return `${linkText}`;
    }

    return '';
}

function parseFAQPayload(faqPayload: FAQv2[]): SchemaFAQ[] {
    return faqPayload.map(item => {
        const { json } = item.answerV2;
        const rawText = extractTextFromAst(json.root);

        return {
            question: item.question,
            acceptedAnswer: {
                text: rawText
            }
        };
    });
}

export default parseFAQPayload;
