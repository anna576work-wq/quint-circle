import type { IntervalId } from './intervals'

export const CHORD_CATEGORIES = [
  'Основные', 'Sus', 'Септаккорды', 'Сексты и add', '9 / 11 / 13', 'Альтерированные',
] as const
export type ChordCategory = (typeof CHORD_CATEGORIES)[number]

export interface ChordType {
  id: string
  symbol: string
  aliases: string[]
  englishName: string
  russianName: string
  intervals: IntervalId[]
  description: string
  category: ChordCategory
}

export const CHORD_TYPES: ChordType[] = [
  { id:'major', symbol:'', aliases:['M','maj'], englishName:'Major', russianName:'Мажорное трезвучие', intervals:['1P','3M','5P'], description:'Устойчивое и ясное звучание: основа множества песен.', category:'Основные' },
  { id:'minor', symbol:'m', aliases:['min','-'], englishName:'Minor', russianName:'Минорное трезвучие', intervals:['1P','3m','5P'], description:'Мягкое, задумчивое звучание с малой терцией.', category:'Основные' },
  { id:'power', symbol:'5', aliases:[], englishName:'Power chord', russianName:'Квинтовый аккорд', intervals:['1P','5P'], description:'Основной тон и квинта без терции: аккорд не задаёт мажорное или минорное настроение.', category:'Основные' },
  { id:'diminished', symbol:'dim', aliases:['°','o'], englishName:'Diminished', russianName:'Уменьшённое трезвучие', intervals:['1P','3m','5d'], description:'Компактное напряжённое звучание, которое обычно стремится к разрешению.', category:'Основные' },
  { id:'augmented', symbol:'aug', aliases:['+'], englishName:'Augmented', russianName:'Увеличенное трезвучие', intervals:['1P','3M','5A'], description:'Открытое, неустойчивое звучание с увеличенной квинтой.', category:'Основные' },
  { id:'sus2', symbol:'sus2', aliases:[], englishName:'Suspended second', russianName:'Аккорд с задержанной секундой', intervals:['1P','2M','5P'], description:'Терция заменена секундой, поэтому звучание остаётся открытым.', category:'Sus' },
  { id:'sus4', symbol:'sus4', aliases:['sus'], englishName:'Suspended fourth', russianName:'Аккорд с задержанной квартой', intervals:['1P','4P','5P'], description:'Терция заменена квартой; она часто разрешается в основную терцию.', category:'Sus' },
  { id:'7sus2', symbol:'7sus2', aliases:[], englishName:'Dominant seventh suspended second', russianName:'Доминантсептаккорд с задержанной секундой', intervals:['1P','2M','5P','7m'], description:'Открытый sus2 с малой септимой и доминантовым оттенком.', category:'Sus' },
  { id:'7sus4', symbol:'7sus4', aliases:[], englishName:'Dominant seventh suspended fourth', russianName:'Доминантсептаккорд с задержанной квартой', intervals:['1P','4P','5P','7m'], description:'Кварта заменяет терцию, а малая септима сохраняет доминантовое тяготение.', category:'Sus' },
  { id:'7', symbol:'7', aliases:['dom7'], englishName:'Dominant seventh', russianName:'Доминантсептаккорд', intervals:['1P','3M','5P','7m'], description:'Септаккорд с характерным тяготением к разрешению, часто перед тоникой.', category:'Септаккорды' },
  { id:'maj7', symbol:'maj7', aliases:['M7','Δ7'], englishName:'Major seventh', russianName:'Большой мажорный септаккорд', intervals:['1P','3M','5P','7M'], description:'Мажорное трезвучие с большой септимой: мягкое и насыщенное звучание.', category:'Септаккорды' },
  { id:'m7', symbol:'m7', aliases:['min7','-7'], englishName:'Minor seventh', russianName:'Малый минорный септаккорд', intervals:['1P','3m','5P','7m'], description:'Минорное трезвучие с малой септимой.', category:'Септаккорды' },
  { id:'mMaj7', symbol:'mMaj7', aliases:['minMaj7','-Δ7'], englishName:'Minor major seventh', russianName:'Минорный аккорд с большой септимой', intervals:['1P','3m','5P','7M'], description:'Минорное трезвучие с большой септимой создаёт выразительный контраст.', category:'Септаккорды' },
  { id:'dim7', symbol:'dim7', aliases:['o7','°7'], englishName:'Diminished seventh', russianName:'Уменьшённый септаккорд', intervals:['1P','3m','5d','7d'], description:'Симметричный аккорд с уменьшённой септимой, записываемой как двойная бемольная седьмая ступень.', category:'Септаккорды' },
  { id:'m7b5', symbol:'m7♭5', aliases:['ø7','half-diminished'], englishName:'Half-diminished seventh', russianName:'Полууменьшённый септаккорд', intervals:['1P','3m','5d','7m'], description:'Уменьшённое трезвучие с малой септимой; часто встречается на II ступени минора.', category:'Септаккорды' },
  { id:'aug7', symbol:'aug7', aliases:['7#5','+7'], englishName:'Augmented seventh', russianName:'Увеличенный аккорд с малой септимой', intervals:['1P','3M','5A','7m'], description:'Увеличенное трезвучие с малой септимой: яркий доминантовый оттенок.', category:'Септаккорды' },
  { id:'augMaj7', symbol:'augMaj7', aliases:['maj7#5','+maj7'], englishName:'Augmented major seventh', russianName:'Увеличенный аккорд с большой септимой', intervals:['1P','3M','5A','7M'], description:'Увеличенное трезвучие с большой септимой и широким, неустойчивым звучанием.', category:'Септаккорды' },
  { id:'6', symbol:'6', aliases:['add6'], englishName:'Major sixth', russianName:'Мажорный аккорд с секстой', intervals:['1P','3M','5P','6M'], description:'Мажорное трезвучие с добавленной секстой.', category:'Сексты и add' },
  { id:'m6', symbol:'m6', aliases:['min6'], englishName:'Minor sixth', russianName:'Минорный аккорд с секстой', intervals:['1P','3m','5P','6M'], description:'Минорное трезвучие с добавленной секстой.', category:'Сексты и add' },
  { id:'6/9', symbol:'6/9', aliases:['69'], englishName:'Sixth add ninth', russianName:'Мажорный аккорд с секстой и ноной', intervals:['1P','3M','5P','6M','9M'], description:'Мажорное трезвучие с секстой и добавленной ноной, без септимы.', category:'Сексты и add' },
  { id:'m6/9', symbol:'m6/9', aliases:[], englishName:'Minor sixth add ninth', russianName:'Минорный аккорд с секстой и ноной', intervals:['1P','3m','5P','6M','9M'], description:'Минорное трезвучие с секстой и добавленной ноной.', category:'Сексты и add' },
  { id:'add9', symbol:'add9', aliases:[], englishName:'Add ninth', russianName:'Мажорный аккорд с добавленной ноной', intervals:['1P','3M','5P','9M'], description:'К мажорному трезвучию добавлена нона без септимы.', category:'Сексты и add' },
  { id:'madd9', symbol:'madd9', aliases:['minadd9'], englishName:'Minor add ninth', russianName:'Минорный аккорд с добавленной ноной', intervals:['1P','3m','5P','9M'], description:'К минорному трезвучию добавлена нона без септимы.', category:'Сексты и add' },
  { id:'add11', symbol:'add11', aliases:[], englishName:'Add eleventh', russianName:'Мажорный аккорд с добавленной ундецимой', intervals:['1P','3M','5P','11P'], description:'К мажорному трезвучию добавлена ундецима без септимы и ноны.', category:'Сексты и add' },
  { id:'madd11', symbol:'madd11', aliases:[], englishName:'Minor add eleventh', russianName:'Минорный аккорд с добавленной ундецимой', intervals:['1P','3m','5P','11P'], description:'К минорному трезвучию добавлена ундецима без септимы и ноны.', category:'Сексты и add' },
  { id:'9', symbol:'9', aliases:['dom9'], englishName:'Dominant ninth', russianName:'Доминантовый нонаккорд', intervals:['1P','3M','5P','7m','9M'], description:'Доминантсептаккорд с добавленной ноной.', category:'9 / 11 / 13' },
  { id:'maj9', symbol:'maj9', aliases:['M9','Δ9'], englishName:'Major ninth', russianName:'Большой мажорный нонаккорд', intervals:['1P','3M','5P','7M','9M'], description:'Мажорный септаккорд с добавленной ноной.', category:'9 / 11 / 13' },
  { id:'m9', symbol:'m9', aliases:['min9'], englishName:'Minor ninth', russianName:'Минорный нонаккорд', intervals:['1P','3m','5P','7m','9M'], description:'Минорный септаккорд с добавленной ноной.', category:'9 / 11 / 13' },
  { id:'mMaj9', symbol:'mMaj9', aliases:['minMaj9'], englishName:'Minor major ninth', russianName:'Минорный аккорд с большой септимой и ноной', intervals:['1P','3m','5P','7M','9M'], description:'Минорный септаккорд с большой септимой и добавленной ноной.', category:'9 / 11 / 13' },
  { id:'11', symbol:'11', aliases:['dom11'], englishName:'Dominant eleventh', russianName:'Доминантовый ундецимаккорд', intervals:['1P','3M','5P','7m','9M','11P'], description:'Полный доминантовый аккорд с ноной и ундецимой.', category:'9 / 11 / 13' },
  { id:'m11', symbol:'m11', aliases:['min11'], englishName:'Minor eleventh', russianName:'Минорный ундецимаккорд', intervals:['1P','3m','5P','7m','9M','11P'], description:'Минорный септаккорд с ноной и ундецимой.', category:'9 / 11 / 13' },
  { id:'maj11', symbol:'maj11', aliases:['M11'], englishName:'Major eleventh', russianName:'Большой мажорный ундецимаккорд', intervals:['1P','3M','5P','7M','9M','11P'], description:'Мажорный септаккорд с ноной и ундецимой.', category:'9 / 11 / 13' },
  { id:'13', symbol:'13', aliases:['dom13'], englishName:'Dominant thirteenth', russianName:'Доминантовый терцдецимаккорд', intervals:['1P','3M','5P','7m','9M','11P','13M'], description:'Полный доминантовый аккорд с ноной, ундецимой и терцдецимой.', category:'9 / 11 / 13' },
  { id:'m13', symbol:'m13', aliases:['min13'], englishName:'Minor thirteenth', russianName:'Минорный терцдецимаккорд', intervals:['1P','3m','5P','7m','9M','11P','13M'], description:'Минорный септаккорд с ноной, ундецимой и большой терцдецимой.', category:'9 / 11 / 13' },
  { id:'maj13', symbol:'maj13', aliases:['M13'], englishName:'Major thirteenth', russianName:'Большой мажорный терцдецимаккорд', intervals:['1P','3M','5P','7M','9M','11P','13M'], description:'Мажорный септаккорд с ноной, ундецимой и терцдецимой.', category:'9 / 11 / 13' },
  { id:'7b5', symbol:'7♭5', aliases:['7-5'], englishName:'Dominant flat fifth', russianName:'Доминантсептаккорд с пониженной квинтой', intervals:['1P','3M','5d','7m'], description:'В доминантсептаккорде квинта понижена на полутон.', category:'Альтерированные' },
  { id:'7#5', symbol:'7♯5', aliases:[], englishName:'Dominant sharp fifth', russianName:'Доминантсептаккорд с повышенной квинтой', intervals:['1P','3M','5A','7m'], description:'В доминантсептаккорде квинта повышена на полутон.', category:'Альтерированные' },
  { id:'7b9', symbol:'7♭9', aliases:[], englishName:'Dominant flat ninth', russianName:'Доминантсептаккорд с пониженной ноной', intervals:['1P','3M','5P','7m','9m'], description:'Доминантовый аккорд с пониженной ноной создаёт дополнительное тяготение.', category:'Альтерированные' },
  { id:'7#9', symbol:'7♯9', aliases:[], englishName:'Dominant sharp ninth', russianName:'Доминантсептаккорд с повышенной ноной', intervals:['1P','3M','5P','7m','9A'], description:'Доминантовый аккорд с повышенной ноной; её звучание энгармонически близко к малой терции.', category:'Альтерированные' },
  { id:'7#11', symbol:'7♯11', aliases:[], englishName:'Dominant sharp eleventh', russianName:'Доминантсептаккорд с повышенной ундецимой', intervals:['1P','3M','5P','7m','11A'], description:'Доминантовый аккорд с лидийским оттенком за счёт повышенной ундецимы.', category:'Альтерированные' },
  { id:'7b13', symbol:'7♭13', aliases:[], englishName:'Dominant flat thirteenth', russianName:'Доминантсептаккорд с пониженной терцдецимой', intervals:['1P','3M','5P','7m','13m'], description:'Доминантовый аккорд с пониженной терцдецимой.', category:'Альтерированные' },
  { id:'7b9#5', symbol:'7♭9♯5', aliases:[], englishName:'Dominant flat ninth sharp fifth', russianName:'Доминантсептаккорд с пониженной ноной и повышенной квинтой', intervals:['1P','3M','5A','7m','9m'], description:'Одновременно повышенная квинта и пониженная нона усиливают доминантовое тяготение.', category:'Альтерированные' },
  { id:'7#9b13', symbol:'7♯9♭13', aliases:[], englishName:'Dominant sharp ninth flat thirteenth', russianName:'Доминантсептаккорд с повышенной ноной и пониженной терцдецимой', intervals:['1P','3M','5P','7m','9A','13m'], description:'Доминантовый аккорд с повышенной ноной и пониженной терцдецимой.', category:'Альтерированные' },
]

export const CHORD_TYPE_BY_ID = new Map(CHORD_TYPES.map((type) => [type.id, type]))
