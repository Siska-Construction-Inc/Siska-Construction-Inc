const CONTACT_EMAIL = "contact@siskaconstructioninc.com";
const MAIL_SUBJECT = encodeURIComponent("Poptávka rekonstrukce – Siska Construction Inc.");
const MAIL_BODY = encodeURIComponent(
  "Dobrý den,\n\nrád(a) bych poptal(a) rekonstrukci. Prosím o zpětnou vazbu s návrhem termínu pro konzultaci.\n\nDěkuji a přeji hezký den,\n",
);

export const contactMailtoHref = `mailto:${CONTACT_EMAIL}?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`;

export const contactPhoneHref = "tel:+420737340795";

export const contactPerson = "Robert Šiška";

export const contactEmail = CONTACT_EMAIL;
