import { Plan } from '@/lib/types';

export const plansByZip: Record<string, Plan[]> = {
  '75001': [
    {
      provider: 'TXU Energy',
      planName: 'TXU Energy Secure 12',
      rateCentsPerKwh: 11.5,
      termMonths: 12,
    },
    {
      provider: 'Reliant',
      planName: 'Reliant Basic Power 24',
      rateCentsPerKwh: 10.2,
      termMonths: 24,
    },
    {
      provider: 'Direct Energy',
      planName: 'Live Brighter 12',
      rateCentsPerKwh: 12.8,
      termMonths: 12,
    },
    {
      provider: 'Green Mountain Energy',
      planName: 'Pollution Free e-Plus 12',
      rateCentsPerKwh: 9.8,
      termMonths: 12,
    },
    {
      provider: 'Gexa Energy',
      planName: 'Gexa Saver Supreme 24',
      rateCentsPerKwh: 10.5,
      termMonths: 24,
    },
    {
      provider: 'TXU Energy',
      planName: 'TXU Flex 36',
      rateCentsPerKwh: 13.2,
      termMonths: 36,
    },
    {
      provider: 'Reliant',
      planName: 'Reliant Clear Flex 6',
      rateCentsPerKwh: 14.5,
      termMonths: 6,
    },
    {
      provider: 'Direct Energy',
      planName: 'Direct Saver 24',
      rateCentsPerKwh: 11.0,
      termMonths: 24,
    },
  ],
  '75002': [
    {
      provider: 'TXU Energy',
      planName: 'TXU Energy Secure 24',
      rateCentsPerKwh: 10.8,
      termMonths: 24,
    },
    {
      provider: 'Reliant',
      planName: 'Reliant Conserve 12',
      rateCentsPerKwh: 11.9,
      termMonths: 12,
    },
    {
      provider: 'Direct Energy',
      planName: 'Live Brighter Plus 36',
      rateCentsPerKwh: 9.5,
      termMonths: 36,
    },
    {
      provider: 'Green Mountain Energy',
      planName: 'Eco Saver 24',
      rateCentsPerKwh: 10.3,
      termMonths: 24,
    },
    {
      provider: 'Gexa Energy',
      planName: 'Gexa Budget Saver 12',
      rateCentsPerKwh: 12.4,
      termMonths: 12,
    },
    {
      provider: 'Champion Energy',
      planName: 'Champion Saver 12',
      rateCentsPerKwh: 11.1,
      termMonths: 12,
    },
    {
      provider: 'Reliant',
      planName: 'Reliant True Simple 6',
      rateCentsPerKwh: 13.7,
      termMonths: 6,
    },
  ],
  '77001': [
    {
      provider: 'TXU Energy',
      planName: 'TXU Houston Fixed 12',
      rateCentsPerKwh: 10.9,
      termMonths: 12,
    },
    {
      provider: 'Reliant',
      planName: 'Reliant Houston Power 24',
      rateCentsPerKwh: 9.7,
      termMonths: 24,
    },
    {
      provider: 'Direct Energy',
      planName: 'Direct Houston 12',
      rateCentsPerKwh: 11.6,
      termMonths: 12,
    },
    {
      provider: 'Green Mountain Energy',
      planName: 'Green Choice 24',
      rateCentsPerKwh: 10.1,
      termMonths: 24,
    },
    {
      provider: 'Gexa Energy',
      planName: 'Gexa Houston Value 36',
      rateCentsPerKwh: 8.9,
      termMonths: 36,
    },
    {
      provider: 'Champion Energy',
      planName: 'Champion Select 24',
      rateCentsPerKwh: 10.4,
      termMonths: 24,
    },
    {
      provider: 'Frontier Utilities',
      planName: 'Frontier Saver 12',
      rateCentsPerKwh: 12.2,
      termMonths: 12,
    },
    {
      provider: 'TXU Energy',
      planName: 'TXU Premium 6',
      rateCentsPerKwh: 14.1,
      termMonths: 6,
    },
  ],
};

export const DEFAULT_USAGE_KWH = 1000;
export const SUGGESTED_ZIP = '75001';
