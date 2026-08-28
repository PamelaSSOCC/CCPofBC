/* ============================================================
   PARTICIPATING CENTRES  —  one consistent record per program
   ------------------------------------------------------------
   The Locations page lets families filter by care type, approach,
   and event day, and lists matching programs alphabetically.

   FIELDS (leave any "" to hide that line on the card):

     name, photo, days,
     care        // one or more of: "Preschool" · "Infant/Toddler" · "30 months – school age" · "School-aged care"
     philosophy, address, hours,
     closures    // non-operational days (winter break, etc.)
     languages,
     funding     // kept for reference; NOT shown on the card
     fees        // parent fees / tuition (not collected on the intake form — fill in as you go)
     included    // extras included in the fee
     extras      // fee-for-service extras available to purchase
     details     // other important info about the program
     register, phone, website,
     instagram, facebook, youtube   // optional
   ============================================================ */

const CENTRES = [
  {
    name: "SSOCC Heron \u2013 Toddlers and Junior Kindergarten", photo: "heron.jpg", days: "Both days",
    care: "Infant/Toddler, 30 months \u2013 school age", philosophy: "Reggio-inspired",
    address: "12091 Cambie Road, Richmond, BC (Richmond Adult Education Centre, beside Mitchell Elementary)",
    hours: "8:00 am \u2013 4:30 pm (extended to 5:30 pm)",
    closures: "2 weeks winter break, 2 weeks spring break",
    languages: "English, Korean, Ukrainian, Mandarin, Tagalog",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "Toddlers: $1,124/mo. Junior Kindergarten: $117/mo (morning) or $1,000/mo (full day). All include the CCFRI discount.",
    included: "", extras: "Meals; extended hours (4:30\u20135:30 pm)", details: "",
    register: "Email registration@ssocc.ca or join the waitlist online",
    phone: "604-377-8385", website: "https://www.ssocc.ca",
    instagram: "ssoccchildcare", facebook: "https://www.facebook.com/Stevestonsocietyofchildrenscentres/", youtube: "StevestonSocietyofCC"
  },
  {
    name: "Crystal Star Daycare", photo: "", days: "Thu Oct 1 (eve)",
    care: "Infant/Toddler", philosophy: "Play-based",
    address: "10631 Gilmore Crescent, Richmond, BC",
    hours: "7:30 am \u2013 4:30 pm, Mon\u2013Fri",
    closures: "Winter and summer, about 2 weeks each",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "",
    details: "Only 4 children per day, all under 3. Serving the community 20+ years. Staff hold ECE + Infant/Toddler certification; big back garden.",
    register: "Email crystalstardaycare@shaw.ca or call 604-276-9816",
    phone: "604-276-9816", website: "",
    facebook: "https://www.facebook.com/p/Crystal-Star-Daycare-an-InfantToddler-Child-Care-100054590433583/"
  },
  {
    name: "Kiddo House Montessori", photo: "kiddo.png", days: "Sat Oct 3 (AM)",
    care: "30 months \u2013 school age, School-aged care", philosophy: "Montessori",
    address: "6640 Blundell Road, Richmond, BC",
    hours: "Full day", closures: "Winter break",
    languages: "English, Mandarin, Cantonese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "Mandarin club", extras: "Meals (two snacks + hot lunch)",
    details: "Experienced staff, most on the team over a year.",
    register: "Register online or email kiddohousechildcare@gmail.com",
    phone: "778-886-0626", website: "https://kiddohousechildcare.ca"
  },
  {
    name: "Hello Kids Learn \u2013 Afterschool Care and Daycamps", photo: "", days: "Both days",
    care: "School-aged care", philosophy: "Academic / traditional",
    address: "Unit 201, 6640 Blundell Rd, Richmond, BC V7C 1H8",
    hours: "8:30 am \u2013 6:30 pm; after-school 2:45 \u2013 7:00 pm",
    closures: "Weekends and public holidays",
    languages: "English, Mandarin, Cantonese", funding: "ACCB, Wage Enhancement",
    fees: "Late pickup after 7 pm: $1/min",
    included: "Snacks & fresh fruit; age-appropriate courses; summer field trips",
    extras: "Transportation; enhancement programs (yoga, language)",
    details: "Open until 7:00 pm.",
    register: "Email celaafterschool@gmail.com",
    phone: "778-951-3438", website: "https://www.hellokidslearn.com"
  },
  {
    name: "Thompson Early Learning \u2013 Rompers Preschool", photo: "", days: "Both days",
    care: "Preschool", philosophy: "Blended (play-based, Reggio-inspired)",
    address: "Thompson Community Centre, 5151 Granville Ave, Richmond, BC V7C 1E6",
    hours: "9:00 am \u2013 1:00 pm", closures: "Winter, spring & summer breaks",
    languages: "English, Japanese, Tagalog, Greek",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "",
    details: "A 2-hour program right after preschool is in development (details TBA).",
    register: "Contact Anna Thymis, Preschool Coordinator, by email, phone, or the website form",
    phone: "604-238-8497", website: "https://www.thompsonearlylearning.com"
  },
  {
    name: "Little Koala Montessori Academy (Clarke Place)", photo: "", days: "Both days",
    care: "Infant/Toddler, 30 months \u2013 school age", philosophy: "Montessori (AMI/AMS)",
    address: "110\u201312855 Clarke Place, Richmond, BC",
    hours: "8:00 am \u2013 5:30 pm, Mon\u2013Fri",
    closures: "One week spring break (March), one week winter break (December)",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    fees: "$75 registration + one month's deposit",
    included: "", extras: "",
    details: "Certified AMS/AMI Montessori teachers. 3 infant/toddler rooms (capacity 34), 1 junior kindergarten room (capacity 25).",
    register: "Contact Little Koala to register or join the waitlist",
    phone: "778-999-9229", website: "https://www.littlekoalamontessori.com"
  },
  {
    name: "Little Koala Montessori Academy (Blundell Road)", photo: "", days: "Both days",
    care: "30 months \u2013 school age", philosophy: "Montessori (AMS)",
    address: "10011 Blundell Road, Richmond, BC",
    hours: "8:00 am \u2013 5:30 pm, Mon\u2013Fri",
    closures: "One week spring break (March), one week winter break (December)",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    fees: "$75 registration + one month's deposit",
    included: "", extras: "Optional hot lunch ($7\u20139/meal, third-party caterer; opt in/out anytime)",
    details: "Certified AMS Montessori teachers. 2 junior kindergarten rooms (capacity 41).",
    register: "Contact Little Koala to register or join the waitlist",
    phone: "778-999-9229", website: "https://www.littlekoalamontessori.com"
  },
  {
    name: "Blue Whale Children's Learning Centre", photo: "bluewhale.png", days: "Sat Oct 3 (AM)",
    care: "30 months \u2013 school age", philosophy: "Blended (Montessori, purposeful play)",
    address: "8060 No. 1 Road, Richmond, BC",
    hours: "8:00 am \u2013 5:00 pm", closures: "Spring break, winter break",
    languages: "English, Mandarin, Cantonese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "Enhancement programs (yoga, Mandarin, dance, art)", details: "",
    register: "Book a tour by phone or through the website, then register",
    phone: "604-754-7666", website: "https://www.bluewhaleedu.com"
  },
  {
    name: "Cedar Studio Outdoor Learning", photo: "cedar.png", days: "Both days",
    care: "30 months \u2013 school age", philosophy: "Blended (Reggio-inspired, outdoor / land-based)",
    address: "Units 135 & 140, 6231 London Road, Richmond, BC",
    hours: "8:00 am \u2013 5:00 pm", closures: "One week spring, two weeks winter",
    languages: "English, Mandarin, Cantonese, Hindi, Urdu",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "Meals (third-party); enhancement programs (yoga, language)",
    details: "Hands-on outdoor experiences intentionally designed to build early skills.",
    register: "Register through the Brightwheel link on the website",
    phone: "604-783-1014", website: "https://www.cedarstudio.co"
  },
  {
    name: "Kid Nest Infant and Toddler Daycare", photo: "kidsnest.png", days: "Sat Oct 3 (AM)",
    care: "Infant/Toddler", philosophy: "Blended (Montessori, play-based)",
    address: "8531 Leslie Road, Richmond, BC V6X 1E6",
    hours: "8:30 am \u2013 6:00 pm, Mon\u2013Fri", closures: "Winter break",
    languages: "English, Chinese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "Daily themes, Chinese & English phonics, Montessori works, science, cooking, arts",
    extras: "Meals; enhancement programs (yoga, Mandarin)",
    details: "Small groups, experienced educators, daily themes and photo updates.",
    register: "Register online or email wenxuan20120329@gmail.com",
    phone: "778-995-0583", website: "https://www.kidnestdaycare.com"
  },
  {
    name: "Little Earthlings Childcare", photo: "earthling.jpg", days: "Both days",
    care: "30 months \u2013 school age", philosophy: "Blended (Reggio-inspired, play-based)",
    address: "3871 Moncton St, Richmond, BC V7E 3A7 (Steveston Village)",
    hours: "7:30 am \u2013 5:30 pm, Mon\u2013Fri",
    closures: "BC statutory holidays, two-week winter break, one-week summer break",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "Daily morning and afternoon snacks, program activities, learning experiences, and special events are all included in tuition.",
    extras: "",
    details: "A Reggio Emilia–inspired, play-based program where every child is seen as capable, curious, and unique. We follow children's interests, encourage exploration and creativity, and provide a warm, respectful environment where they feel safe, valued, and supported.",
    register: "Contact via the website or email; book a tour, then register",
    phone: "604-370-6228", website: "https://www.littleearthlings.ca"
  },
  {
    name: "Connections Kids Club", photo: "", days: "Both days",
    care: "30 months \u2013 school age, School-aged care", philosophy: "Reggio-inspired",
    address: "5999 Blanshard Drive, Richmond, BC V7C 5V4",
    hours: "7:00 am \u2013 5:30/6:00 pm", closures: "Open year-round",
    languages: "English, Mandarin, Cantonese", funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "Meals; enhancement programs (yoga, language); extended hours", details: "",
    register: "Register at ccssociety.ca",
    phone: "778-798-8861", website: "https://www.ccssociety.ca"
  },
  {
    name: "Terra Nova Nature School", photo: "terranova.png", days: "Both days",
    care: "Preschool", philosophy: "Blended (nature-based, emergent)",
    address: "2680 River Road, Richmond, BC",
    hours: "9:00 am \u2013 1:00 pm; some afternoons 1:30 \u2013 3:30 pm",
    closures: "Winter break, spring break, stat holidays (summer camps run separately)",
    languages: "English (educators also speak German, Japanese, French)",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "",
    details: "An outdoor school in its 13th year, operated by the Thompson Community Association.",
    register: "Complete the online registration, then email the Director",
    phone: "604-238-8437", website: "https://www.terranovanatureschool.com"
  },
  {
    name: "Willow Children's Centre", photo: "", days: "Sat Oct 3 (AM)",
    care: "Infant/Toddler, 30 months \u2013 school age", philosophy: "Reggio-inspired",
    address: "650\u20135688 Hollybridge Way, Richmond, BC",
    hours: "7:30 am \u2013 6:00 pm", closures: "Christmas to New Year",
    languages: "English, Mandarin, Cantonese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "", details: "",
    register: "Join the Willow waitlist on the website",
    phone: "604-307-3490", website: "https://www.richmondchildcare.org"
  },
  {
    name: "Rothewood Academy \u2013 Richmond City Centre", photo: "", days: "Sat Oct 3 (AM)",
    care: "Infant/Toddler, 30 months \u2013 school age", philosophy: "Blended (Reggio, play-based, Montessori)",
    address: "7931 Alderbridge Way, Richmond, BC",
    hours: "7:00 am \u2013 6:00 pm", closures: "2 weeks winter break, 1 week summer break",
    languages: "English, Mandarin, Cantonese, Korean, Japanese",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "Extended hours; meals; enhancement programs (yoga, language); web-cam access", details: "",
    register: "Contact richmond@rothewood.com",
    phone: "604-279-1818", website: "https://www.rothewood.com"
  },
  {
    name: "Lesco Montessori Daycare", photo: "", days: "Both days",
    care: "30 months \u2013 school age", philosophy: "Montessori",
    address: "12720 Cameron Drive, Richmond, BC",
    hours: "8:30 am \u2013 5:30 pm", closures: "Winter and spring breaks",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "Enhancement programs (yoga, language)", details: "",
    register: "Register in person",
    phone: "778-926-0640", website: "https://lescomontessori.ca",
    instagram: "Lesco_Montessori", facebook: "https://www.facebook.com/p/Lesco-Montessori-School-100039731937048/"
  },
  {
    name: "Dino-Mites Preschool", photo: "dinomites.png", days: "Sat Oct 3 (AM)",
    care: "Preschool", philosophy: "Play-based",
    address: "4071 Francis Road, Richmond, BC V7C 1J8",
    hours: "9:00 am \u2013 1:00 pm", closures: "Winter break, spring break, and summer",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "CCFRI reflected in the posted tuition.",
    included: "Art, music, games, stories, active & quiet play", extras: "",
    details: "An enriched play-based program. Voted Best Preschool in Richmond 2026 — A-List Certified Awesome!",
    register: "Contact by phone, email, or through the website",
    phone: "604-272-2423", website: "https://www.dinomitespreschool.com",
    facebook: "https://www.facebook.com/dinomitespreschool2017"
  },
  {
    name: "Royal Blue Heron Montessori Academy", photo: "", days: "Thu Oct 1 (eve)",
    care: "30 months \u2013 school age", philosophy: "Montessori",
    address: "10111 4th Avenue, Richmond, BC V7E 1V5 (inside Manoah Steves Elementary)",
    hours: "8:30 am \u2013 3:30 pm", closures: "Winter, spring, and summer breaks",
    languages: "English, Mandarin",
    funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "", extras: "Extended hours", details: "",
    register: "Call, or leave a message on the website",
    phone: "778-866-3572", website: "https://royalblueheronmontessoriacademy.ca"
  },
  {
    name: "Renaissance Kids", photo: "renkids.png", days: "Both days",
    care: "Infant/Toddler, 30 months \u2013 school age, School-aged care", philosophy: "Blended (Reggio, Montessori, academic)",
    address: "#1\u201312491 No. 2 Road, Richmond, BC",
    hours: "7:00 am \u2013 5:30 pm", closures: "Winter break",
    languages: "English, French", funding: "ACCB, CCFRI, CCOF, Wage Enhancement", fees: "",
    included: "French language daily",
    extras: "Transportation; meals; extended hours; enhancement programs (music, dance, art, STEM)",
    details: "",
    register: "Sign up for the waiting list",
    phone: "604-723-3117", website: "https://www.renaissancekids.ca"
  },
  {
    name: "Willowbrae Academy Shellbridge", photo: "", days: "Both days",
    care: "Infant/Toddler, 30 months – school age", philosophy: "Emergent / HighScope",
    address: "10651 Shellbridge Way, Richmond, BC V6X 2V8",
    hours: "7:00 am – 6:00 pm", closures: "To be announced",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    fees: "Full-time only. Rate sheet available at tours / open houses.",
    included: "", extras: "Meals; extended hours; live-view camera",
    details: "A new Willowbrae for the Shellbridge area — their largest, with 25+ rooms, serving 8 months to 5 years.",
    register: "Book a tour to learn more",
    phone: "672-971-9010", website: "https://willowbraechildcare.com/childcare-shellbridge-bc"
  },
  {
    name: "Young Columbus Infant/Toddler Center", photo: "", days: "Both days",
    care: "Infant/Toddler", philosophy: "Play-based",
    address: "11160 Seafield Crescent, Richmond, BC",
    hours: "8:00 am – 5:30 pm", closures: "Statutory holidays and 2 Pro-D days",
    languages: "English, Mandarin, Cantonese", funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    fees: "Full-time care: $998/month (CCFRI reflected in the posted tuition).",
    included: "Meals; language instruction", extras: "", details: "",
    register: "Call or email erica@ycchildcare.com",
    phone: "604-370-4989", website: ""
  },
  {
    name: "Hatch Kids Learning Centre – Garden City", photo: "", days: "Both days",
    care: "30 months – school age, School-aged care", philosophy: "Reggio-inspired",
    address: "8311 Garden City Road, Richmond, BC",
    hours: "8:00 am – 6:00 pm", closures: "Winter break, one-week summer break",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    fees: "After CCFRI — PreK daycare: full-time $1,003; part-time M/W/F $698, T/Th $552. Out-of-school care: $425 (Kindergarten), $527.50 (Gr. 1–7).",
    included: "", extras: "",
    details: "Reggio- and emergent-inspired programs for ages 3–12, including seasonal camps. One of three Richmond locations.",
    register: "Registration information is on the website",
    phone: "604-762-8181", website: "https://www.hatchkidslearning.com"
  },
  {
    name: "Hatch Kids Learning Centre – Whiteside", photo: "", days: "Both days",
    care: "30 months – school age, School-aged care", philosophy: "Reggio-inspired",
    address: "9282 Williams Road, Richmond, BC",
    hours: "8:00 am – 6:00 pm", closures: "Winter, spring & summer breaks (seasonal camps available)",
    languages: "English", funding: "ACCB, CCFRI, CCOF, Wage Enhancement",
    fees: "After CCFRI — PreK half-day (9am–1pm): full-time $497.50; part-time M/W/F $386.50, T/Th $291. PreK extended-day (9am–2:30pm): full-time $604; part-time M/W/F $458, T/Th $352. Out-of-school care: $406.50 (Kindergarten), $509 (Gr. 1–7).",
    included: "", extras: "",
    details: "Reggio- and emergent-inspired programs for ages 3–12, including seasonal camps. One of three Richmond locations.",
    register: "Registration information is on the website",
    phone: "604-762-8181", website: "https://www.hatchkidslearning.com"
  },
  {
    name: "Noah's Ark Montessori Reggio Preschool & Kindergarten", photo: "ark.png", days: "Sat Oct 3 (AM)",
    care: "30 months \u2013 school age, School-aged care", philosophy: "Blended (Montessori, Reggio Emilia, outdoor)",
    address: "11371 No. 3 Road, Richmond, BC V7A 1X3",
    hours: "8:30 am \u2013 4:30 pm", closures: "",
    languages: "English, French, Mandarin", funding: "ACCB, CCFRI", fees: "",
    included: "Snacks provided", extras: "",
    details: "An independent, non-denominational early-years school (preschool to elementary, ages 2\u00bd\u201312) using a blended Montessori, Reggio Emilia, project-based, Whole Child approach. Small class sizes, high staff-to-student ratios, and multi-aged settings, with a strong emphasis on outdoor education and parent and grandparent participation \u2014 children even help harvest and cook fresh vegetables grown at the Ark Community Farm and Garden.",
    register: "Email admissions at adinaark@gmail.com, WeChat, or call after 4:00 pm at 778-990-3520.",
    phone: "778-990-3520", website: "https://noahsarkschool.ca"
  }
];
