import { useState, useMemo, useCallback, useSyncExternalStore, useEffect } from 'react';
import type { Currency, BillingCycle } from '../types';
import { calculatePrice, formatPrice } from '../constants/pricing';

// Global pricing state with subscription pattern for isolated updates
type Listener = () => void;

class PricingState {
  private currency: Currency = 'USD';
  private billingCycle: BillingCycle = 'monthly';
  private listeners: Set<Listener> = new Set();

  getCurrency(): Currency {
    return this.currency;
  }

  getBillingCycle(): BillingCycle {
    return this.billingCycle;
  }

  setCurrency(currency: Currency): void {
    this.currency = currency;
    this.notify();
  }

  setBillingCycle(cycle: BillingCycle): void {
    this.billingCycle = cycle;
    this.notify();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener());
  }

  getFormattedPrice(basePriceUSD: number): string {
    const price = calculatePrice(basePriceUSD, this.currency, this.billingCycle);
    return formatPrice(price, this.currency);
  }

  getCurrencySymbol(): string {
    const symbols: Record<Currency, string> = {
      USD: '$',
      EUR: '€',
      INR: '₹',
    };
    return symbols[this.currency];
  }
}

// Singleton instance
const pricingState = new PricingState();

// Hook for controls - returns state and setters
export function usePricingControl() {
  const currency = useSyncExternalStore(
    (callback) => pricingState.subscribe(callback),
    () => pricingState.getCurrency(),
  );

  const billingCycle = useSyncExternalStore(
    (callback) => pricingState.subscribe(callback),
    () => pricingState.getBillingCycle(),
  );

  const setCurrency = useCallback((currency: Currency) => {
    pricingState.setCurrency(currency);
  }, []);

  const setBillingCycle = useCallback((cycle: BillingCycle) => {
    pricingState.setBillingCycle(cycle);
  }, []);

  const annualSavings = useMemo(() => 20, []);

  return {
    currency,
    billingCycle,
    setCurrency,
    setBillingCycle,
    annualSavings,
  };
}

// Isolated price component hook - only subscribes to price updates
// This prevents parent re-renders
export function useIsolatedPrice(basePriceUSD: number) {
  const [formattedPrice, setFormattedPrice] = useState(() =>
    pricingState.getFormattedPrice(basePriceUSD)
  );

  const [currencySymbol, setCurrencySymbol] = useState(() =>
    pricingState.getCurrencySymbol()
  );

  const [billingCycle, setBillingCycle] = useState(() =>
    pricingState.getBillingCycle()
  );

  useEffect(() => {
    const unsubscribe = pricingState.subscribe(() => {
      const newPrice = pricingState.getFormattedPrice(basePriceUSD);
      const newSymbol = pricingState.getCurrencySymbol();
      const newCycle = pricingState.getBillingCycle();

      setFormattedPrice(newPrice);
      setCurrencySymbol(newSymbol);
      setBillingCycle(newCycle);
    });
    return unsubscribe;
  }, [basePriceUSD]);

  return {
    formattedPrice,
    currencySymbol,
    billingCycle,
  };
}

// Legacy hook for compatibility
interface UsePricingReturn {
  currency: Currency;
  billingCycle: BillingCycle;
  setCurrency: (currency: Currency) => void;
  setBillingCycle: (cycle: BillingCycle) => void;
  getPrice: (basePriceUSD: number) => number;
  getFormattedPrice: (basePriceUSD: number) => string;
  annualSavings: number;
}

export function usePricing(): UsePricingReturn {
  const currency = useSyncExternalStore(
    (callback) => pricingState.subscribe(callback),
    () => pricingState.getCurrency(),
  );

  const billingCycle = useSyncExternalStore(
    (callback) => pricingState.subscribe(callback),
    () => pricingState.getBillingCycle(),
  );

  const setCurrency = useCallback((newCurrency: Currency) => {
    pricingState.setCurrency(newCurrency);
  }, []);

  const setBillingCycle = useCallback((cycle: BillingCycle) => {
    pricingState.setBillingCycle(cycle);
  }, []);

  const getPrice = useCallback((basePriceUSD: number): number => {
    return calculatePrice(basePriceUSD, currency, billingCycle);
  }, [currency, billingCycle]);

  const getFormattedPrice = useCallback((basePriceUSD: number): string => {
    const price = calculatePrice(basePriceUSD, currency, billingCycle);
    return formatPrice(price, currency);
  }, [currency, billingCycle]);

  const annualSavings = useMemo(() => 20, []);

  return {
    currency,
    billingCycle,
    setCurrency,
    setBillingCycle,
    getPrice,
    getFormattedPrice,
    annualSavings,
  };
}
