import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQs = () => (
    <div className="max-w-[60rem] m-auto py-6 border-b border-border-soft animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="section-subtitle">FAQS</div>
        <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-2">Questions?</h2>
        <Accordion>
            <AccordionItem>
                <AccordionTrigger>How long is this book preorder open?</AccordionTrigger>
                <AccordionContent>
                    The preorder for guaranteed availability of premium hardcovers (and first dibs on Vols 2 & 3, all bindings) is open May 15–July 3.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>
                    Can I buy books after the preorder is over?
                </AccordionTrigger>
                <AccordionContent>The preorder will stay open until later in July, after which items will be on our web store. Premium hardcover orders can be placed until we reach the end of our order quantities</AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>I don’t want a dust jacket. Can I order without?</AccordionTrigger>
                <AccordionContent>We offer two designs for hardcovers—the text-based design that matches the dust jacket (same across all editions), or our custom filigree pattern under the jackets. We recommend the text-based/typography design for people who won’t want to keep the dust jacket.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>Are these editions original and unabridged?</AccordionTrigger>
                <AccordionContent>Yes, we are using Charlotte Mason’s original books’ text from the early 1900s, and we even have bonus content by Mason herself in each book. Read more here.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>Is there a payment plan option?</AccordionTrigger>
                <AccordionContent>Yes—with Shopify’s Shop Pay or with PayPal’s Buy Now Pay Later, you can have your order completed with us but take your time paying it off per these companies’ terms.</AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>What are the risks with this preorder?</AccordionTrigger>
                <AccordionContent>There could be timeline setbacks for these books if there are any issues caught during production. This could push our timeline back by up to a few weeks, but overall the cover designs are complete; book text files are nearly finished (May 2026); and we’re working with an experienced warehousing and fulfillment company, so overall our ducks are in a row.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>Can I get a refund?</AccordionTrigger>
                <AccordionContent>You may request a full refund while the preorder</AccordionContent>
            </AccordionItem>


        </Accordion></div>

)