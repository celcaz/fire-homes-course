import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type CurrencyOpts = {
  locale?: string;
  currency?: string;
  // se o valor for em centavos, passe cents = true
  cents?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// nice site with all locales and currencies https://simplelocalize.io/data/locales/
export function formatCurrency(
  value: number,
  {
    locale = "pt-BR",
    currency = "BRL",
    cents = true,
    minimumFractionDigits,
    maximumFractionDigits,
  }: CurrencyOpts = {}
) {
  const amount = cents ? value / 100 : value;
  const nf = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: minimumFractionDigits ?? undefined,
    maximumFractionDigits: maximumFractionDigits ?? undefined,
  });
  return nf.format(amount);
}
