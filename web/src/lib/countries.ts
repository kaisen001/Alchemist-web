export type CountryOption = {
  code: string;
  name: string;
  dial: string;
};

/** Common trading markets first, then alphabetical. */
export const COUNTRIES: CountryOption[] = [
  { code: "CI", name: "Côte d’Ivoire", dial: "+225" },
  { code: "SN", name: "Senegal", dial: "+221" },
  { code: "BF", name: "Burkina Faso", dial: "+226" },
  { code: "ML", name: "Mali", dial: "+223" },
  { code: "GN", name: "Guinea", dial: "+224" },
  { code: "CM", name: "Cameroon", dial: "+237" },
  { code: "CG", name: "Congo", dial: "+242" },
  { code: "CD", name: "DR Congo", dial: "+243" },
  { code: "GA", name: "Gabon", dial: "+241" },
  { code: "TG", name: "Togo", dial: "+228" },
  { code: "BJ", name: "Benin", dial: "+229" },
  { code: "NE", name: "Niger", dial: "+227" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "GH", name: "Ghana", dial: "+233" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "MA", name: "Morocco", dial: "+212" },
  { code: "TN", name: "Tunisia", dial: "+216" },
  { code: "DZ", name: "Algeria", dial: "+213" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "AU", name: "Australia", dial: "+61" },
];

export function findCountry(code: string) {
  return COUNTRIES.find((c) => c.code === code);
}

export function countryFlagSrc(code: string) {
  return `/flags/${code.toLowerCase()}.svg`;
}
