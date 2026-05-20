// ============================================================================
//  Product catalog. Add/remove/edit items here — pages update automatically.
//
//  TIP: To use Unsplash photos instead of local images, replace the `image`
//  field with an Unsplash URL, for example:
//    image: "https://images.unsplash.com/photo-1530021852476-a3b50d70e7b9?w=800&q=80&auto=format&fit=crop"
//  All bundled local images live in /public/images/.
// ============================================================================
const menuData = [
  {
    id: 1,
    name: { en: "Marlboro Red", ru: "Marlboro Red", az: "Marlboro Red" },
    description: {
      en: "The world's most iconic cigarette. Bold, full-bodied flavor with a smooth finish. A classic choice for true tobacco lovers.",
      ru: "Самая культовая сигарета в мире. Насыщенный, полнотелый вкус с мягким послевкусием. Классический выбор настоящих ценителей.",
      az: "Dünyanın ən ikonik siqareti. Zəngin, dolğun dad və yumşaq son notla. Əsl tütün sevərlərin klassik seçimi.",
    },
    price: "$8.50",
    image: "images/marlboro.jpg",
  },
  {
    id: 2,
    name: { en: "Winston Blue", ru: "Winston Blue", az: "Winston Blue" },
    description: {
      en: "A refined blend with a lighter, smoother taste. Winston Blue offers a balanced smoking experience with consistent quality in every pack.",
      ru: "Изысканный купаж с более лёгким, мягким вкусом. Winston Blue предлагает сбалансированный опыт курения и неизменно высокое качество.",
      az: "Daha yüngül və yumşaq dadlı zərif qarışıq. Winston Blue ardıcıl keyfiyyətlə balanslaşdırılmış siqaret təcrübəsi təqdim edir.",
    },
    price: "$7.90",
    image: "images/winston.jpg",
  },
  {
    id: 3,
    name: { en: "Cohiba Siglo VI", ru: "Cohiba Siglo VI", az: "Cohiba Siglo VI" },
    description: {
      en: "Cuba's finest premium cigar. Rich and complex flavors of cedar, cream, and earth. A masterpiece for the discerning connoisseur.",
      ru: "Лучшая кубинская премиальная сигара. Богатые ноты кедра, сливок и земли. Шедевр для взыскательного ценителя.",
      az: "Kubanın ən yaxşı premium siqarı. Sidr, krem və torpaq zəngin dadları. Tələbkar həvəskarlar üçün şah əsər.",
    },
    price: "$38.00",
    image: "images/cohiba.jpg",
  },
  {
    id: 4,
    name: {
      en: "Al Fakher Hookah Tobacco",
      ru: "Кальянный табак Al Fakher",
      az: "Al Fakher Kəlyan Tütünü",
    },
    description: {
      en: "Premium hookah tobacco with rich, long-lasting flavor. Available in Double Apple, Mint, Watermelon, and Grape. A worldwide bestseller.",
      ru: "Премиальный кальянный табак с насыщенным, долгим вкусом. Доступен в ароматах Двойного Яблока, Мяты, Арбуза и Винограда.",
      az: "Zəngin, uzunmüddətli dadlı premium kəlyan tütünü. İkiqat alma, nərvə, qarpız və üzüm ətirli növləri mövcuddur.",
    },
    price: "$15.00",
    image: "images/hookah.jpg",
  },
  {
    id: 5,
    name: {
      en: "Zippo Classic Lighter",
      ru: "Зажигалка Zippo Classic",
      az: "Zippo Classic Alışqan",
    },
    description: {
      en: "The legendary windproof lighter. Built to last a lifetime with its iconic flip-top design. Fully refillable and repairable. A timeless accessory.",
      ru: "Легендарная ветрозащитная зажигалка. Создана на всю жизнь с культовым откидным дизайном. Заправляемая и полностью ремонтируемая.",
      az: "Əfsanəvi küləkdən qorunan alışqan. İkonik açılan qapaq dizaynı ilə ömür boyu davam etmək üçün hazırlanıb. Doldurula bilən.",
    },
    price: "$29.00",
    image: "images/zippo.jpg",
  },
  {
    id: 6,
    name: {
      en: "Captain Black Pipe Tobacco",
      ru: "Трубочный табак Captain Black",
      az: "Captain Black Çubuq Tütünü",
    },
    description: {
      en: "A beloved American blend with a smooth, naturally sweet vanilla-cream aroma. Perfect for beginners and experienced pipe smokers alike.",
      ru: "Любимый американский купаж с мягким, натурально сладким ароматом ванили и сливок. Идеален как для начинающих, так и для опытных.",
      az: "Yumşaq, təbii şirin vanil-krem aromalı sevimli Amerika qarışığı. Həm yeni başlayanlar, həm də təcrübəli çubuq sevənlər üçün idealdır.",
    },
    price: "$19.50",
    image: "images/pipe.jpg",
  },
  {
    id: 7,
    name: { en: "Montecristo No. 4", ru: "Montecristo No. 4", az: "Montecristo No. 4" },
    description: {
      en: "Cuba's most sold cigar worldwide. Medium-bodied with notes of coffee, roasted nuts, and a hint of spice. An elegant smoke for any occasion.",
      ru: "Самая продаваемая кубинская сигара в мире. Среднетелая, с нотами кофе, орехов и лёгкой пряности. Элегантный дым для любого случая.",
      az: "Dünyanın ən çox satılan Kuba siqarı. Kofe, qoz-fındıq notları ilə orta gövdəli. İstənilən mərasim üçün zərif seçim.",
    },
    price: "$24.00",
    image: "images/montecristo.jpg",
  },
  {
    id: 8,
    name: {
      en: "Fumari Hookah Tobacco",
      ru: "Кальянный табак Fumari",
      az: "Fumari Kəlyan Tütünü",
    },
    description: {
      en: "Premium American hookah tobacco known for its intense flavors and exceptional cloud production. Available in Ambrosia, White Gummy Bear, and Citrus Mint.",
      ru: "Премиальный американский кальянный табак, известный насыщенными ароматами и густым паром. Доступен в Ambrosia, White Gummy Bear и Citrus Mint.",
      az: "Intensiv dadları və əla bulud istehsalı ilə tanınan premium Amerika kəlyan tütünü. Ambrosia, White Gummy Bear və Citrus Mint növlərində mövcuddur.",
    },
    price: "$17.50",
    image: "images/fumari.jpg",
  },
];

export default menuData;
