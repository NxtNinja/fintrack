export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "GBP", label: "£ Pound", locale: "en-GB" },
  { value: "INR", label: "₹ Rupee", locale: "en-IN" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
  { value: "AUD", label: "$ Australian Dollar", locale: "en-AU" },
  { value: "CAD", label: "$ Canadian Dollar", locale: "en-CA" },
  { value: "CNY", label: "¥ Yuan", locale: "zh-CN" },
  { value: "CHF", label: "₣ Swiss Franc", locale: "de-CH" },
  { value: "NZD", label: "$ New Zealand Dollar", locale: "en-NZ" },
  { value: "SGD", label: "$ Singapore Dollar", locale: "en-SG" },
  { value: "HKD", label: "$ Hong Kong Dollar", locale: "en-HK" },
  { value: "KRW", label: "₩ Won", locale: "ko-KR" },
  { value: "ZAR", label: "R Rand", locale: "en-ZA" },
  { value: "BRL", label: "R$ Real", locale: "pt-BR" },
  { value: "MXN", label: "$ Peso", locale: "es-MX" },
];

export type Currency = (typeof Currencies)[0];
