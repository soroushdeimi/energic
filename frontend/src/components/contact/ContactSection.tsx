import { ContactMap } from "./ContactMap";
import { ContactRow } from "./ContactRow";

const ADDRESS = "ولیعصر، دانشگاه صنعتی امیرکبیر، دانشکده مهندسی نفت، طبقه اول، مرکز نوآوری انرژیک";
const PHONE = "021-66460043";
const EMAIL = "energyinnovationcenter1@gmail.com";

function LocationRow() {
  return (
    <ContactRow
      icon="/icons/contact/location.svg"
      iconWidth={30}
      iconHeight={30}
      label="آدرس حضوری"
    >
      {ADDRESS}
    </ContactRow>
  );
}

function PhoneRow() {
  return (
    <ContactRow icon="/icons/contact/phone.svg" iconWidth={32} iconHeight={32} label="تلفن تماس">
      <a href="tel:02166460043" className="transition-colors hover:text-green">
        {PHONE}
      </a>
    </ContactRow>
  );
}

function EmailRow() {
  return (
    <ContactRow
      icon="/icons/contact/email.svg"
      iconWidth={30}
      iconHeight={30}
      label="پست الکترونیک"
    >
      <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-green">
        {EMAIL}
      </a>
    </ContactRow>
  );
}

/**
 * The archived contact section (design-archive/pages/contact/index.html).
 *
 * Mobile: a 348px column with three absolutely-positioned contact rows
 * (top 0 / 110 / 191) and a 144px map area at top 282.
 * Desktop (md+): a 650px map on the left and a 460px column of the three
 * rows on the right, separated by a 47px gap.
 */
export function ContactSection() {
  return (
    <section aria-labelledby="contact-heading" className="bg-bg-soft pb-0 md:pb-[120px]">
      <div className="mx-auto max-w-[390px] px-5 pt-[69px] text-center md:max-w-[1440px] md:px-[161px] md:pt-[161px]">
        <h1
          id="contact-heading"
          dir="rtl"
          className="whitespace-nowrap text-[18px] font-bold leading-[40px] text-ink md:text-[36px]"
        >
          با ما در ارتباط باشید
        </h1>
      </div>
      <div className="mx-auto mt-10 max-w-[390px] px-5 md:mt-20 md:max-w-[1157px] md:px-0">
        {/* Mobile */}
        <div className="relative mx-auto h-[426px] w-[348px] md:hidden" dir="rtl">
          <div className="absolute inset-x-0 top-0">
            <LocationRow />
          </div>
          <div className="absolute inset-x-0 top-[110px]">
            <PhoneRow />
          </div>
          <div className="absolute inset-x-0 top-[191px]">
            <EmailRow />
          </div>
          <ContactMap className="absolute left-0 top-[282px] h-[144px] w-[348px] rounded-[30px]" />
        </div>
        {/* Desktop */}
        <div
          dir="ltr"
          className="hidden md:flex md:flex-row md:items-start md:justify-between md:gap-[47px]"
        >
          <ContactMap className="h-[250px] w-[650px] shrink-0 rounded-[40px]" />
          <div dir="rtl" className="flex w-[460px] flex-col gap-[20px]">
            <LocationRow />
            <PhoneRow />
            <EmailRow />
          </div>
        </div>
      </div>
    </section>
  );
}
