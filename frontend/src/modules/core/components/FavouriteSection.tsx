import { Star } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@ui/accordion"

export function FavouriteSection() {
  return (
    <Accordion type="single" collapsible defaultValue="favourites" asChild>
      <AccordionItem value="favourites">
        <div className="flex items-center gap-x-3 py-2" aria-label="Favourites">
          <Star size={26} />
          <p className="flex-1">Favourites</p>
          <AccordionTrigger></AccordionTrigger>
        </div>
        <AccordionContent asChild>{/* TODO: Add favourite lists here*/}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
