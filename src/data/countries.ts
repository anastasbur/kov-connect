export interface Business {
  name: string;
  category: string;
  address: string;
  phone?: string;
  photoUrl?: string;
}

export interface Resource {
  title: string;
  description?: string;
  url?: string;
  phone?: string;
  icon: "emergency" | "legal" | "medical" | "housing" | "community";
}

export interface Country {
  slug: string;
  nameRu: string;
  flag: string;
  coordinates: [number, number]; // [lng, lat]
  telegramUrl: string;
  mapDescription: string;
  professionalChats: { label: string; url: string }[];
  businesses: Business[];
  resources: Resource[];
}

export const COUNTRIES: Country[] = [
  {
    slug: "georgia",
    nameRu: "Грузия",
    flag: "🇬🇪",
    coordinates: [44.8, 42.3],
    telegramUrl: "https://t.me/+mJZ_nGbDpdQ3ZmE0",
    mapDescription: "Найдите сообщества, россиян и помощь для русскоязычных в Грузии.",
    professionalChats: [
      { label: "IT", url: "https://t.me/+aRU_kJiTI9o2MWMy" },
      { label: "Бизнес", url: "https://t.me/Ark_financial" },
      { label: "Медики", url: "https://t.me/+CvL1yEfw7_cxMGI6" },
      { label: "Психологи", url: "https://t.me/Psy_Ark/" },
      { label: "Юристы", url: "https://t.me/EmigrantHelpBot" },
    ],
    businesses: [
      { name: "Аудитория", category: "Книжный бар", address: "Тбилиси" },
      { name: "Lutra Bar", category: "Веганский бар", address: "Тбилиси" },
      { name: "Itaka Books", category: "Книжный магазин", address: "Тбилиси" },
    ],
    resources: [
      {
        title: "Чат взаимопомощи Ковчег | Грузия",
        description: "Новости, советы, знакомства, вопросы.",
        url: "https://t.me/+mJZ_nGbDpdQ3ZmE0",
        icon: "community",
      },
      {
        title: "Задержали в Грузии?",
        description: "Юридическая помощь при задержании — бот Ковчега.",
        url: "https://t.me/EmigrantHelpBot",
        icon: "emergency",
      },
      {
        title: "Credo Bank — открыть счёт",
        description: "Самый лояльный банк для граждан РФ. Есть отделения CredoExp для экспатов.",
        icon: "legal",
      },
      {
        title: "Жильё — MyHome.ge",
        description: "Аренда квартир напрямую от собственника.",
        url: "https://www.myhome.ge/ru/",
        icon: "housing",
      },
      {
        title: "Врачи и клиники",
        description: "Таблица с отзывами на врачей и мастеров красоты.",
        url: "https://docs.google.com/spreadsheets/d/1SHbSPXttdHgTXOWYp-YMmj_bu7xFOXdWk-cEJ_UtKGI/",
        icon: "medical",
      },
    ],
  },
  {
    slug: "germany",
    nameRu: "Германия",
    flag: "🇩🇪",
    coordinates: [10.4, 51.2],
    telegramUrl: "https://t.me/+H2DEJTwsDVRjMGFk",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Германии.",
    professionalChats: [
      { label: "IT", url: "https://t.me/+aRU_kJiTI9o2MWMy" },
      { label: "Учёные", url: "https://t.me/+XqPZMa2M80VmZmQ6" },
      { label: "Инженеры", url: "https://t.me/+t4LBbOMxUVNiYjdk" },
      { label: "Психологи", url: "https://t.me/Psy_Ark/" },
    ],
    businesses: [
      { name: "Kozar Nails", category: "Маникюр, Берлин", address: "Берлин" },
    ],
    resources: [
      {
        title: "HandbookGermanyRU — всё о жизни в Германии",
        description: "Полный гид по документам, банкам, медицине.",
        url: "https://t.me/HandbookGermanyRU",
        icon: "legal",
      },
      {
        title: "Doctolib — найти врача",
        description: "Поиск врача по специализации, городу и языку приёма.",
        url: "https://www.doctolib.de/",
        icon: "medical",
      },
      {
        title: "Бесплатная психологическая помощь",
        description: "Для беженцев и мигрантов на русском языке.",
        url: "https://docs.google.com/document/d/16m2bICGwpX6lv_LJFoB81SMJQTkU_K10xwBEBwAtnjE/edit",
        icon: "emergency",
      },
      {
        title: "Домашнее насилие — помощь",
        description: "Список кризисных центров по всей Германии.",
        url: "https://www.frauenhaus-suche.de/",
        icon: "emergency",
      },
    ],
  },
  {
    slug: "serbia",
    nameRu: "Сербия",
    flag: "🇷🇸",
    coordinates: [21.0, 44.0],
    telegramUrl: "https://t.me/+ExC103Kk2oc5YjM0",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Сербии.",
    professionalChats: [
      { label: "IT", url: "https://t.me/it_serbia" },
      { label: "Бизнес", url: "https://t.me/business_breakfast_NS" },
      { label: "Медики", url: "https://t.me/vrachivserbii/1" },
    ],
    businesses: [
      { name: "Среда Обитания", category: "Коворкинг и события", address: "Белград" },
      { name: "Медведь — пельмени", category: "Доставка еды", address: "Белград" },
      { name: "Bela Vrana", category: "Русский книжный магазин", address: "Белград" },
    ],
    resources: [
      {
        title: "Russian.rs — гайды по всем вопросам",
        description: "Полная база знаний русской диаспоры в Сербии.",
        url: "https://russian.rs/guides/",
        icon: "legal",
      },
      {
        title: "Врачи в Сербии",
        description: "Большая таблица русскоязычных врачей.",
        url: "https://docs.google.com/document/d/1Bv2PuU7ioqG8O0Z7qq5RXBfgii6I_Rh__e-5mS4mQx8/edit",
        icon: "medical",
      },
      {
        title: "Жильё — Halooglasi",
        description: "Главный сайт аренды жилья в Сербии.",
        url: "https://www.halooglasi.com",
        icon: "housing",
      },
    ],
  },
  {
    slug: "armenia",
    nameRu: "Армения",
    flag: "🇦🇲",
    coordinates: [44.5, 40.1],
    telegramUrl: "https://t.me/+FeMnGLBndadkZGNi",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Армении.",
    professionalChats: [
      { label: "IT", url: "https://t.me/+aRU_kJiTI9o2MWMy" },
      { label: "Бизнес", url: "https://t.me/Ark_financial" },
    ],
    businesses: [],
    resources: [
      {
        title: "Полный гайд по легализации в Армении",
        description: "ponaehali.am — всё о ВНЖ, регистрации, банках.",
        url: "https://ponaehali.am",
        icon: "legal",
      },
      {
        title: "AraratBank — открыть счёт",
        description: "Только $50 и физическое присутствие.",
        icon: "legal",
      },
    ],
  },
  {
    slug: "turkey",
    nameRu: "Турция",
    flag: "🇹🇷",
    coordinates: [35.2, 38.9],
    telegramUrl: "https://t.me/+KUfjlPfB0TBkNzEy",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Турции.",
    professionalChats: [
      { label: "IT", url: "https://t.me/nnd_istanbul" },
    ],
    businesses: [
      { name: "Dijident Стоматология", category: "Стоматология (русскоязычный персонал)", address: "Стамбул" },
      { name: "Полторы комнаты", category: "Книжный магазин, Стамбул", address: "Бейоглу, Стамбул" },
    ],
    resources: [
      {
        title: "Ikamet — ВНЖ в Турции",
        description: "Чат по ВНЖ и легализации.",
        url: "https://t.me/ikamet_ist",
        icon: "legal",
      },
      {
        title: "Русскоязычная автошкола в Стамбуле",
        description: "Русский преподаватель теории и переводчик для практики.",
        url: "https://www.verasurucukursu.com.tr/",
        icon: "legal",
      },
    ],
  },
  {
    slug: "spain",
    nameRu: "Испания",
    flag: "🇪🇸",
    coordinates: [-3.7, 40.4],
    telegramUrl: "https://t.me/+9oJ50T2M9_g2MTY8",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Испании.",
    professionalChats: [
      { label: "IT", url: "https://t.me/+aRU_kJiTI9o2MWMy" },
    ],
    businesses: [
      { name: "CineRuso.es", category: "Кино на русском по всей Испании", address: "Испания" },
    ],
    resources: [
      {
        title: "esp_citizen — юридическая помощь",
        description: "Любые вопросы по документам и легализации.",
        url: "https://t.me/esp_citizen",
        icon: "legal",
      },
      {
        title: "Idealista — жильё",
        description: "Главный сайт аренды и покупки жилья в Испании.",
        url: "https://www.idealista.com/",
        icon: "housing",
      },
    ],
  },
  {
    slug: "portugal",
    nameRu: "Португалия",
    flag: "🇵🇹",
    coordinates: [-8.2, 39.4],
    telegramUrl: "https://t.me/+I8XJBtwqdoVjMGEy",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Португалии.",
    professionalChats: [],
    businesses: [
      { name: "MedCouple", category: "Русскоязычная клиника", address: "Лиссабон" },
    ],
    resources: [
      {
        title: "Aimasef — легализация в Португалии",
        description: "Канал о внж и легализации.",
        url: "https://t.me/Aimasef",
        icon: "legal",
      },
      {
        title: "AfishaLissabon — события",
        description: "Мероприятия и афиша Лиссабона.",
        url: "https://t.me/AfishaLissabon",
        icon: "community",
      },
    ],
  },
  {
    slug: "usa",
    nameRu: "США",
    flag: "🇺🇸",
    coordinates: [-98.5, 39.5],
    telegramUrl: "https://t.me/+_2N2e_NkQbliOTQ8",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в США.",
    professionalChats: [],
    businesses: [],
    resources: [
      {
        title: "Иммиграционные адвокаты (проверенные)",
        description: "Юлия Бикбова, Григорий Романовский, Алекс Товарян, Дарья Тренина.",
        icon: "legal",
      },
      {
        title: "Country Conditions Expert",
        description: "Страноведческая экспертиза для дел об убежище из России.",
        url: "https://www.countryconditions.expert",
        icon: "legal",
      },
    ],
  },
  {
    slug: "canada",
    nameRu: "Канада",
    flag: "🇨🇦",
    coordinates: [-96.8, 56.1],
    telegramUrl: "https://t.me/ark_canada",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Канаде.",
    professionalChats: [],
    businesses: [
      { name: "Yummy Market", category: "Магазин восточноевропейских продуктов", address: "Торонто" },
    ],
    resources: [
      {
        title: "Официальный сайт иммиграции Канады",
        description: "Большинство вопросов по иммиграции решается самостоятельно.",
        url: "https://www.canada.ca/en/services/immigration-citizenship.html",
        icon: "legal",
      },
    ],
  },
  {
    slug: "czech",
    nameRu: "Чехия",
    flag: "🇨🇿",
    coordinates: [15.5, 49.8],
    telegramUrl: "https://t.me/+LxvlemPYxQI1ODY6",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Чехии.",
    professionalChats: [
      { label: "IT", url: "https://pyladies.cz/" },
    ],
    businesses: [],
    resources: [
      {
        title: "Работа в Чехии",
        description: "Jobs.cz, Prace.cz, StartupJobs",
        url: "https://www.jobs.cz",
        icon: "legal",
      },
      {
        title: "Интеграционные центры для иностранцев",
        description: "В Праге и Брно.",
        url: "https://www.integracnicentra.cz/",
        icon: "community",
      },
    ],
  },
  {
    slug: "poland",
    nameRu: "Польша",
    flag: "🇵🇱",
    coordinates: [19.1, 51.9],
    telegramUrl: "https://t.me/+PbbqLNuWGMxkOGQ0",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Польше.",
    professionalChats: [],
    businesses: [],
    resources: [
      {
        title: "Otodom — жильё в Польше",
        description: "Главный сайт поиска жилья.",
        url: "https://www.otodom.pl/",
        icon: "housing",
      },
      {
        title: "Pracuj.pl — работа в Польше",
        description: "Основной сайт поиска работы.",
        url: "https://www.pracuj.pl/",
        icon: "legal",
      },
    ],
  },
  {
    slug: "hungary",
    nameRu: "Венгрия",
    flag: "🇭🇺",
    coordinates: [19.0, 47.2],
    telegramUrl: "https://t.me/+_wdXf1dvWh0yNzY0",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Венгрии.",
    professionalChats: [
      { label: "IT", url: "http://t.me/budapest_it_hub" },
    ],
    businesses: [],
    resources: [
      { title: "Budapest IT Hub", description: "IT-комьюнити Венгрии.", url: "http://t.me/budapest_it_hub", icon: "community" },
      { title: "ВНЖ в Венгрии", description: "Чат по легализации.", url: "https://t.me/+B3SGEf8U40U3MWQy", icon: "legal" },
    ],
  },
  {
    slug: "montenegro",
    nameRu: "Черногория",
    flag: "🇲🇪",
    coordinates: [19.4, 42.7],
    telegramUrl: "https://t.me/+FfOde5UGHNM5Mjlk",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Черногории.",
    professionalChats: [],
    businesses: [
      { name: "Barbara Bar", category: "Бар с книгами и коктейлями", address: "Будва" },
    ],
    resources: [
      { title: "Налоги в Черногории", description: "Чат по налогам.", url: "https://t.me/montenegro_porez", icon: "legal" },
      { title: "Врачи и клиники", description: "Большой чат с обсуждением медицины.", url: "https://t.me/vraciicliniki", icon: "medical" },
    ],
  },
  {
    slug: "kyrgyzstan",
    nameRu: "Кыргызстан",
    flag: "🇰🇬",
    coordinates: [74.6, 41.2],
    telegramUrl: "https://t.me/+zJfsVK0rAO1mOTli",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Кыргызстане.",
    professionalChats: [],
    businesses: [],
    resources: [
      { title: "Список чатов по всем темам", description: "Полная база ссылок — жильё, банки, медицина.", url: "https://t.me/chats_kg", icon: "community" },
      { title: "Аренда жилья", description: "Подробные инструкции и ссылки.", url: "https://t.me/rent_kg_chat", icon: "housing" },
    ],
  },
  {
    slug: "kazakhstan",
    nameRu: "Казахстан",
    flag: "🇰🇿",
    coordinates: [66.9, 48.0],
    telegramUrl: "https://t.me/+jJoQliPS7lo1ZjMy",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Казахстане.",
    professionalChats: [],
    businesses: [],
    resources: [
      { title: "Krisha.kz — жильё", description: "Лучшее приложение для поиска квартир.", icon: "housing" },
      { title: "HH.ru — работа", description: "Очень популярен в Казахстане.", icon: "legal" },
    ],
  },
  {
    slug: "israel",
    nameRu: "Израиль",
    flag: "🇮🇱",
    coordinates: [34.9, 31.0],
    telegramUrl: "https://t.me/+GBhP31SItwUwYzQ6",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Израиле.",
    professionalChats: [],
    businesses: [],
    resources: [
      { title: "Leumit — медицина", description: "Русскоязычные врачи.", url: "https://www.leumit.co.il/ru/", icon: "medical" },
      { title: "9tv.co.il — русскоязычные новости", url: "https://www.9tv.co.il/", icon: "community" },
    ],
  },
  {
    slug: "cyprus",
    nameRu: "Кипр",
    flag: "🇨🇾",
    coordinates: [33.4, 35.1],
    telegramUrl: "https://t.me/+VXvbdj3qSKc3NDI0",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных на Кипре.",
    professionalChats: [
      { label: "IT", url: "https://t.me/cyprusithr" },
    ],
    businesses: [
      { name: "ChopChop Barber", category: "Русский барбершоп, Лимасол", address: "Лимасол" },
    ],
    resources: [
      { title: "BadCyprus — главный чат", description: "Общий чат по всем темам Кипра.", url: "https://t.me/badcyprus", icon: "community" },
      { title: "Bazaraki.com — жильё и объявления", url: "https://www.bazaraki.com", icon: "housing" },
    ],
  },
  {
    slug: "finland",
    nameRu: "Финляндия",
    flag: "🇫🇮",
    coordinates: [25.7, 61.9],
    telegramUrl: "https://t.me/+1IobfOmUqcdmY2Vk",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Финляндии.",
    professionalChats: [],
    businesses: [],
    resources: [
      { title: "Русский клуб Вантаа", description: "Бесплатные консультации, лекции, помощь приезжим.", url: "https://t.me/vvklubi", icon: "community" },
      { title: "Демократическое сообщество финляндских русских", url: "https://t.me/dem_community_fi", icon: "community" },
    ],
  },
  {
    slug: "netherlands",
    nameRu: "Нидерланды",
    flag: "🇳🇱",
    coordinates: [5.3, 52.1],
    telegramUrl: "https://t.me/+_DeogrfMFTwxNjQ0",
    mapDescription: "Сообщества, помощь и ресурсы для русскоязычных в Нидерландах.",
    professionalChats: [
      { label: "IT", url: "https://t.me/ITBenelux" },
    ],
    businesses: [
      { name: "Blin Queen", category: "Кафе с блинами", address: "Амстердам" },
      { name: "Almond Bakery (Миндаль)", category: "Пекарня", address: "Амстердам" },
    ],
    resources: [
      { title: "Funda.nl — жильё", url: "https://www.funda.nl", icon: "housing" },
      { title: "Free Russia NL", url: "https://t.me/FreeRussiaNL", icon: "community" },
    ],
  },
];

export const getCountryBySlug = (slug: string) =>
  COUNTRIES.find((c) => c.slug === slug);
