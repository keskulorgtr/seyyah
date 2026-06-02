"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I book a tour with Seyyah?",
    answer: "Because our tours are highly personalized, we don't offer instant online booking. Please use the 'Request This Tour' button to send us your preferred dates and group size. Our curators will get in touch with you within 24 hours to design your bespoke itinerary."
  },
  {
    question: "Are flights included in the price?",
    answer: "Domestic flights within the destination country are usually included (as specified in the 'What's Included' section). However, international flights to and from your home country are not included, allowing you the flexibility to choose your preferred airline and routing."
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer: "Absolutely. When crafting your itinerary, we gather all your dietary preferences and restrictions. We work closely with our local partners and selected restaurants to ensure your culinary experience is safe and exceptional."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We offer a flexible cancellation policy. Deposits are fully refundable up to 60 days before departure. Cancellations within 60 days may incur charges depending on the specific accommodations and domestic transport booked. Full details will be provided in your personalized proposal."
  },
  {
    question: "Do I need a visa?",
    answer: "Visa requirements vary significantly depending on your nationality and the destination. Our team will provide you with the latest visa information and guidance during the planning phase."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-brand-turquoise/50"
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-sans text-base font-medium text-slate-800 pr-8">{faq.question}</span>
            <span className="flex-shrink-0 text-brand-turquoise bg-brand-turquoise/10 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300" style={{ transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </span>
          </button>
          
          <div 
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ 
              maxHeight: openIndex === index ? "500px" : "0",
              opacity: openIndex === index ? 1 : 0
            }}
          >
            <div className="px-6 pb-6 pt-0 font-sans text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2 pt-4">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
