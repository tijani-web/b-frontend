import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { Header } from './Dashboard/layout/Header';
import { BottomNav } from './Dashboard/layout/BottomNav';

// ─── Full asset list (200+) ────────────────────────────────────────────────
const ALL_MARKET_ASSETS: {
  symbol: string; name: string; color: string; icon: string; type: 'Crypto' | 'Stocks' | 'Fiat' | 'Commodities';
  cgId?: string; // CoinGecko ID for live price
}[] = [
  // ── Crypto
  { symbol: 'BTC',   name: 'Bitcoin',                           color: '#F7931A', icon: '₿', type: 'Crypto', cgId: 'bitcoin' },
  { symbol: 'ETH',   name: 'Ethereum',                          color: '#627EEA', icon: 'Ξ', type: 'Crypto', cgId: 'ethereum' },
  { symbol: 'BNB',   name: 'BNB',                               color: '#F3BA2F', icon: 'B', type: 'Crypto', cgId: 'binancecoin' },
  { symbol: 'SOL',   name: 'Solana',                            color: '#9945FF', icon: '◎', type: 'Crypto', cgId: 'solana' },
  { symbol: 'XRP',   name: 'Ripple',                            color: '#00AAE4', icon: 'X', type: 'Crypto', cgId: 'ripple' },
  { symbol: 'ADA',   name: 'Cardano',                           color: '#0033AD', icon: 'A', type: 'Crypto', cgId: 'cardano' },
  { symbol: 'AVAX',  name: 'Avalanche',                         color: '#E84142', icon: 'A', type: 'Crypto', cgId: 'avalanche-2' },
  { symbol: 'DOGE',  name: 'Dogecoin',                          color: '#C2A633', icon: 'D', type: 'Crypto', cgId: 'dogecoin' },
  { symbol: 'DOT',   name: 'Polkadot',                          color: '#E6007A', icon: 'D', type: 'Crypto', cgId: 'polkadot' },
  { symbol: 'MATIC', name: 'Polygon',                           color: '#8247E5', icon: 'M', type: 'Crypto', cgId: 'matic-network' },
  { symbol: 'SHIB',  name: 'Shiba Inu',                         color: '#FF9900', icon: 'S', type: 'Crypto', cgId: 'shiba-inu' },
  { symbol: 'LTC',   name: 'Litecoin',                          color: '#345D9D', icon: 'L', type: 'Crypto', cgId: 'litecoin' },
  { symbol: 'LINK',  name: 'ChainLink',                         color: '#375BD2', icon: 'L', type: 'Crypto', cgId: 'chainlink' },
  { symbol: 'UNI',   name: 'Uniswap',                           color: '#FF007A', icon: 'U', type: 'Crypto', cgId: 'uniswap' },
  { symbol: 'ATOM',  name: 'Cosmos',                            color: '#2E3148', icon: 'A', type: 'Crypto', cgId: 'cosmos' },
  { symbol: 'XLM',   name: 'Stellar',                           color: '#00B4D8', icon: 'X', type: 'Crypto', cgId: 'stellar' },
  { symbol: 'ALGO',  name: 'Algorand',                          color: '#000000', icon: 'A', type: 'Crypto', cgId: 'algorand' },
  { symbol: 'AAVE',  name: 'Aave',                              color: '#B6509E', icon: 'A', type: 'Crypto', cgId: 'aave' },
  { symbol: 'USDT',  name: 'Tether',                            color: '#26A17B', icon: '₮', type: 'Crypto', cgId: 'tether' },
  { symbol: 'USDC',  name: 'USD Coin',                          color: '#2775CA', icon: '$', type: 'Crypto', cgId: 'usd-coin' },
  { symbol: 'DAI',   name: 'Dai',                               color: '#F5AC37', icon: 'D', type: 'Crypto', cgId: 'dai' },
  { symbol: 'BCH',   name: 'Bitcoin Cash',                      color: '#8DC351', icon: 'B', type: 'Crypto', cgId: 'bitcoin-cash' },
  { symbol: 'ETC',   name: 'Ethereum Classic',                  color: '#328332', icon: 'E', type: 'Crypto', cgId: 'ethereum-classic' },
  { symbol: 'FIL',   name: 'Filecoin',                          color: '#0090FF', icon: 'F', type: 'Crypto', cgId: 'filecoin' },
  { symbol: 'ICP',   name: 'Internet Computer',                 color: '#29ABE2', icon: 'I', type: 'Crypto', cgId: 'internet-computer' },
  { symbol: 'VET',   name: 'VeChain',                           color: '#15BDFF', icon: 'V', type: 'Crypto', cgId: 'vechain' },
  { symbol: 'HBAR',  name: 'Hedera',                            color: '#00B388', icon: 'H', type: 'Crypto', cgId: 'hedera-hashgraph' },
  { symbol: 'EOS',   name: 'EOS',                               color: '#000000', icon: 'E', type: 'Crypto', cgId: 'eos' },
  { symbol: 'XMR',   name: 'Monero',                            color: '#FF6600', icon: 'X', type: 'Crypto', cgId: 'monero' },
  { symbol: 'NEAR',  name: 'NEAR Protocol',                     color: '#00C1DE', icon: 'N', type: 'Crypto', cgId: 'near' },
  { symbol: 'SAND',  name: 'The Sandbox',                       color: '#04ADEF', icon: 'S', type: 'Crypto', cgId: 'the-sandbox' },
  { symbol: 'MANA',  name: 'Decentraland',                      color: '#FF2D55', icon: 'M', type: 'Crypto', cgId: 'decentraland' },
  { symbol: 'AXS',   name: 'Axie Infinity',                     color: '#0055D4', icon: 'A', type: 'Crypto', cgId: 'axie-infinity' },
  { symbol: 'CRO',   name: 'Cronos',                            color: '#002D74', icon: 'C', type: 'Crypto', cgId: 'crypto-com-chain' },
  { symbol: 'FTM',   name: 'Fantom',                            color: '#1969FF', icon: 'F', type: 'Crypto', cgId: 'fantom' },
  { symbol: 'EGLD',  name: 'MultiversX',                        color: '#1B46C2', icon: 'E', type: 'Crypto', cgId: 'elrond-erd-2' },
  { symbol: 'GRT',   name: 'The Graph',                         color: '#6F4CFF', icon: 'G', type: 'Crypto', cgId: 'the-graph' },
  { symbol: 'FLOW',  name: 'Flow',                              color: '#00EF8B', icon: 'F', type: 'Crypto', cgId: 'flow' },
  { symbol: 'THETA', name: 'Theta Network',                     color: '#2AB8E6', icon: 'T', type: 'Crypto', cgId: 'theta-token' },
  { symbol: 'KSM',   name: 'Kusama',                            color: '#E8026D', icon: 'K', type: 'Crypto', cgId: 'kusama' },
  { symbol: 'ONE',   name: 'Harmony',                           color: '#00AEE9', icon: 'O', type: 'Crypto', cgId: 'harmony' },
  { symbol: 'ZEC',   name: 'Zcash',                             color: '#ECB244', icon: 'Z', type: 'Crypto', cgId: 'zcash' },
  { symbol: 'DASH',  name: 'Dash',                              color: '#008CE7', icon: 'D', type: 'Crypto', cgId: 'dash' },
  { symbol: 'XTZ',   name: 'Tezos',                             color: '#2C7DF7', icon: 'X', type: 'Crypto', cgId: 'tezos' },
  { symbol: 'QNT',   name: 'Quant',                             color: '#1A1A2E', icon: 'Q', type: 'Crypto', cgId: 'quant-network' },
  { symbol: 'CAKE',  name: 'PancakeSwap',                       color: '#1FC7D4', icon: 'C', type: 'Crypto', cgId: 'pancakeswap-token' },
  { symbol: 'SUSHI', name: 'SushiSwap',                         color: '#FA52A0', icon: 'S', type: 'Crypto', cgId: 'sushi' },
  { symbol: 'COMP',  name: 'Compound',                          color: '#00D395', icon: 'C', type: 'Crypto', cgId: 'compound-governance-token' },
  { symbol: 'MKR',   name: 'Maker',                             color: '#1AAB9B', icon: 'M', type: 'Crypto', cgId: 'maker' },
  { symbol: 'SNX',   name: 'Synthetix',                         color: '#00D1FF', icon: 'S', type: 'Crypto', cgId: 'havven' },
  { symbol: 'CRV',   name: 'Curve DAO',                         color: '#D9535F', icon: 'C', type: 'Crypto', cgId: 'curve-dao-token' },
  { symbol: 'LDO',   name: 'Lido DAO',                          color: '#00A3FF', icon: 'L', type: 'Crypto', cgId: 'lido-dao' },
  { symbol: 'OP',    name: 'Optimism',                          color: '#FF0420', icon: 'O', type: 'Crypto', cgId: 'optimism' },
  { symbol: 'ARB',   name: 'Arbitrum',                          color: '#28A0F0', icon: 'A', type: 'Crypto', cgId: 'arbitrum' },
  { symbol: 'SUI',   name: 'SUI',                               color: '#6FBCF0', icon: 'S', type: 'Crypto', cgId: 'sui' },
  { symbol: 'APT',   name: 'Aptos',                             color: '#00C2CB', icon: 'A', type: 'Crypto', cgId: 'aptos' },
  { symbol: 'INJ',   name: 'Injective',                         color: '#00F2FE', icon: 'I', type: 'Crypto', cgId: 'injective-protocol' },
  { symbol: 'TRX',   name: 'Tron',                              color: '#FF0013', icon: 'T', type: 'Crypto', cgId: 'tron' },
  { symbol: 'TON',   name: 'Toncoin',                           color: '#0098EA', icon: 'T', type: 'Crypto', cgId: 'the-open-network' },
  { symbol: 'PEPE',  name: 'Pepe',                              color: '#479F45', icon: 'P', type: 'Crypto', cgId: 'pepe' },
  { symbol: 'BONK',  name: 'Bonk',                              color: '#FC7900', icon: 'B', type: 'Crypto', cgId: 'bonk' },
  { symbol: 'WIF',   name: 'dogwifhat',                         color: '#9945FF', icon: 'W', type: 'Crypto', cgId: 'dogwifcoin' },
  { symbol: 'RNDR',  name: 'Render',                            color: '#DD4337', icon: 'R', type: 'Crypto', cgId: 'render-token' },
  { symbol: 'FET',   name: 'Fetch.ai',                          color: '#1C2E4A', icon: 'F', type: 'Crypto', cgId: 'fetch-ai' },
  { symbol: 'WLD',   name: 'Worldcoin',                         color: '#000000', icon: 'W', type: 'Crypto', cgId: 'worldcoin-wld' },
  { symbol: 'PYTH',  name: 'Pyth Network',                      color: '#E6DAFE', icon: 'P', type: 'Crypto', cgId: 'pyth-network' },
  { symbol: 'JTO',   name: 'Jito',                              color: '#38BDF8', icon: 'J', type: 'Crypto', cgId: 'jito-governance-token' },
  { symbol: 'STX',   name: 'Stacks',                            color: '#5546FF', icon: 'S', type: 'Crypto', cgId: 'blockstack' },
  { symbol: 'IMX',   name: 'Immutable X',                       color: '#00BBFF', icon: 'I', type: 'Crypto', cgId: 'immutable-x' },
  { symbol: 'GNO',   name: 'Gnosis',                            color: '#008C73', icon: 'G', type: 'Crypto', cgId: 'gnosis' },
  { symbol: 'RPL',   name: 'Rocket Pool',                       color: '#FF6B35', icon: 'R', type: 'Crypto', cgId: 'rocket-pool' },
  { symbol: 'DYDX',  name: 'dYdX',                              color: '#6966FF', icon: 'D', type: 'Crypto', cgId: 'dydx' },
  { symbol: 'GMX',   name: 'GMX',                               color: '#03D1CF', icon: 'G', type: 'Crypto', cgId: 'gmx' },
  { symbol: 'BAL',   name: 'Balancer',                          color: '#1E1E1E', icon: 'B', type: 'Crypto', cgId: 'balancer' },
  { symbol: 'YFI',   name: 'yearn.finance',                     color: '#006AE3', icon: 'Y', type: 'Crypto', cgId: 'yearn-finance' },
  { symbol: '1INCH', name: '1inch',                             color: '#1B314F', icon: '1', type: 'Crypto', cgId: '1inch' },
  { symbol: 'CHZ',   name: 'Chiliz',                            color: '#CD0124', icon: 'C', type: 'Crypto', cgId: 'chiliz' },
  { symbol: 'HOT',   name: 'Holo',                              color: '#00838D', icon: 'H', type: 'Crypto', cgId: 'holotoken' },
  { symbol: 'ZIL',   name: 'Zilliqa',                           color: '#49C1BF', icon: 'Z', type: 'Crypto', cgId: 'zilliqa' },
  { symbol: 'ENJ',   name: 'Enjin Coin',                        color: '#7866D5', icon: 'E', type: 'Crypto', cgId: 'enjincoin' },
  { symbol: 'BAT',   name: 'Basic Attention Token',             color: '#FF5000', icon: 'B', type: 'Crypto', cgId: 'basic-attention-token' },

  // ── Stocks
  { symbol: 'AAPL',  name: 'Apple',                             color: '#555', icon: '', type: 'Stocks' },
  { symbol: 'MSFT',  name: 'Microsoft',                         color: '#00A4EF', icon: 'M', type: 'Stocks' },
  { symbol: 'GOOGL', name: 'Alphabet (Google)',                  color: '#4285F4', icon: 'G', type: 'Stocks' },
  { symbol: 'AMZN',  name: 'Amazon',                            color: '#FF9900', icon: 'A', type: 'Stocks' },
  { symbol: 'TSLA',  name: 'Tesla',                             color: '#CC0000', icon: 'T', type: 'Stocks' },
  { symbol: 'NVDA',  name: 'NVIDIA',                            color: '#76B900', icon: 'N', type: 'Stocks' },
  { symbol: 'META',  name: 'Meta Platforms',                    color: '#0082FB', icon: 'M', type: 'Stocks' },
  { symbol: 'NFLX',  name: 'Netflix',                           color: '#E50914', icon: 'N', type: 'Stocks' },
  { symbol: 'AMD',   name: 'AMD',                               color: '#ED1C24', icon: 'A', type: 'Stocks' },
  { symbol: 'INTC',  name: 'Intel',                             color: '#0071C5', icon: 'I', type: 'Stocks' },
  { symbol: 'CRM',   name: 'Salesforce',                        color: '#00A1E0', icon: 'C', type: 'Stocks' },
  { symbol: 'ORCL',  name: 'Oracle',                            color: '#F80000', icon: 'O', type: 'Stocks' },
  { symbol: 'IBM',   name: 'IBM',                               color: '#054ADA', icon: 'I', type: 'Stocks' },
  { symbol: 'CSCO',  name: 'Cisco',                             color: '#049FD9', icon: 'C', type: 'Stocks' },
  { symbol: 'ADBE',  name: 'Adobe',                             color: '#FF0000', icon: 'A', type: 'Stocks' },
  { symbol: 'PYPL',  name: 'PayPal',                            color: '#003087', icon: 'P', type: 'Stocks' },
  { symbol: 'SQ',    name: 'Block (Square)',                     color: '#00B140', icon: 'S', type: 'Stocks' },
  { symbol: 'COIN',  name: 'Coinbase',                          color: '#0052FF', icon: 'C', type: 'Stocks' },
  { symbol: 'HOOD',  name: 'Robinhood',                         color: '#00C805', icon: 'R', type: 'Stocks' },
  { symbol: 'JPM',   name: 'JP Morgan',                         color: '#003E7E', icon: 'J', type: 'Stocks' },
  { symbol: 'GS',    name: 'Goldman Sachs',                     color: '#7399C6', icon: 'G', type: 'Stocks' },
  { symbol: 'BAC',   name: 'Bank of America',                   color: '#E31837', icon: 'B', type: 'Stocks' },
  { symbol: 'V',     name: 'Visa',                              color: '#1A1F71', icon: 'V', type: 'Stocks' },
  { symbol: 'MA',    name: 'Mastercard',                        color: '#EB001B', icon: 'M', type: 'Stocks' },
  { symbol: 'DIS',   name: 'Disney',                            color: '#113CCF', icon: 'D', type: 'Stocks' },
  { symbol: 'SPOT',  name: 'Spotify',                           color: '#1DB954', icon: 'S', type: 'Stocks' },
  { symbol: 'SNAP',  name: 'Snap Inc.',                         color: '#FFFC00', icon: 'S', type: 'Stocks' },
  { symbol: 'TWTR',  name: 'Twitter/X',                         color: '#1DA1F2', icon: 'T', type: 'Stocks' },
  { symbol: 'UBER',  name: 'Uber',                              color: '#000000', icon: 'U', type: 'Stocks' },
  { symbol: 'LYFT',  name: 'Lyft',                              color: '#FF00BF', icon: 'L', type: 'Stocks' },
  { symbol: 'ABNB',  name: 'Airbnb',                            color: '#FF5A5F', icon: 'A', type: 'Stocks' },
  { symbol: 'SHOP',  name: 'Shopify',                           color: '#96BF48', icon: 'S', type: 'Stocks' },
  { symbol: 'ZM',    name: 'Zoom',                              color: '#2D8CFF', icon: 'Z', type: 'Stocks' },
  { symbol: 'PLTR',  name: 'Palantir',                          color: '#000000', icon: 'P', type: 'Stocks' },
  { symbol: 'NKE',   name: 'Nike',                              color: '#000000', icon: 'N', type: 'Stocks' },
  { symbol: 'SBUX',  name: 'Starbucks',                         color: '#00704A', icon: 'S', type: 'Stocks' },
  { symbol: 'MCD',   name: "McDonald's",                        color: '#DA291C', icon: 'M', type: 'Stocks' },
  { symbol: 'KO',    name: 'Coca-Cola',                         color: '#F40009', icon: 'K', type: 'Stocks' },
  { symbol: 'PEP',   name: 'PepsiCo',                           color: '#004B93', icon: 'P', type: 'Stocks' },
  { symbol: 'WMT',   name: 'Walmart',                           color: '#0071CE', icon: 'W', type: 'Stocks' },
  { symbol: 'TGT',   name: 'Target',                            color: '#CC0000', icon: 'T', type: 'Stocks' },
  { symbol: 'AMGN',  name: 'Amgen',                             color: '#2557A7', icon: 'A', type: 'Stocks' },
  { symbol: 'JNJ',   name: 'Johnson & Johnson',                 color: '#CC0000', icon: 'J', type: 'Stocks' },
  { symbol: 'PFE',   name: 'Pfizer',                            color: '#003399', icon: 'P', type: 'Stocks' },
  { symbol: 'MRNA',  name: 'Moderna',                           color: '#2E74B5', icon: 'M', type: 'Stocks' },
  { symbol: 'BABA',  name: 'Alibaba',                           color: '#FF6A00', icon: 'A', type: 'Stocks' },
  { symbol: 'TSM',   name: 'TSMC',                              color: '#0033A0', icon: 'T', type: 'Stocks' },
  { symbol: 'F',     name: 'Ford Motor',                        color: '#003478', icon: 'F', type: 'Stocks' },
  { symbol: 'GM',    name: 'General Motors',                    color: '#0071CE', icon: 'G', type: 'Stocks' },
  { symbol: 'BA',    name: 'Boeing',                            color: '#00539B', icon: 'B', type: 'Stocks' },
  { symbol: 'XOM',   name: 'Exxon Mobil',                       color: '#E3001B', icon: 'X', type: 'Stocks' },
  { symbol: 'CVX',   name: 'Chevron',                           color: '#009BDE', icon: 'C', type: 'Stocks' },

  // ── Fiat
  { symbol: 'EUR',   name: 'Euro',                              color: '#003399', icon: '€', type: 'Fiat' },
  { symbol: 'GBP',   name: 'British Pound',                     color: '#00247D', icon: '£', type: 'Fiat' },
  { symbol: 'JPY',   name: 'Japanese Yen',                      color: '#BC002D', icon: '¥', type: 'Fiat' },
  { symbol: 'CNY',   name: 'Chinese Yuan',                      color: '#DE2910', icon: '¥', type: 'Fiat' },
  { symbol: 'CAD',   name: 'Canadian Dollar',                   color: '#FF0000', icon: 'C', type: 'Fiat' },
  { symbol: 'AUD',   name: 'Australian Dollar',                 color: '#002868', icon: 'A', type: 'Fiat' },
  { symbol: 'CHF',   name: 'Swiss Franc',                       color: '#FF0000', icon: 'F', type: 'Fiat' },
  { symbol: 'SGD',   name: 'Singapore Dollar',                  color: '#EF3340', icon: 'S', type: 'Fiat' },
  { symbol: 'HKD',   name: 'Hong Kong Dollar',                  color: '#BA0020', icon: 'H', type: 'Fiat' },
  { symbol: 'NZD',   name: 'New Zealand Dollar',                color: '#000000', icon: 'N', type: 'Fiat' },
  { symbol: 'INR',   name: 'Indian Rupee',                      color: '#FF9933', icon: '₹', type: 'Fiat' },
  { symbol: 'BRL',   name: 'Brazilian Real',                    color: '#009C3B', icon: 'R', type: 'Fiat' },
  { symbol: 'MXN',   name: 'Mexican Peso',                      color: '#006847', icon: 'M', type: 'Fiat' },
  { symbol: 'NGN',   name: 'Nigerian Naira',                    color: '#008751', icon: '₦', type: 'Fiat' },
  { symbol: 'ZAR',   name: 'South African Rand',                color: '#007A4D', icon: 'R', type: 'Fiat' },
  { symbol: 'AED',   name: 'UAE Dirham',                        color: '#009A44', icon: 'A', type: 'Fiat' },
  { symbol: 'SAR',   name: 'Saudi Riyal',                       color: '#006C35', icon: 'S', type: 'Fiat' },
  { symbol: 'TRY',   name: 'Turkish Lira',                      color: '#E30A17', icon: 'T', type: 'Fiat' },
  { symbol: 'KRW',   name: 'South Korean Won',                  color: '#003478', icon: 'W', type: 'Fiat' },
  { symbol: 'SEK',   name: 'Swedish Krona',                     color: '#006AA7', icon: 'S', type: 'Fiat' },

  // ── Commodities
  { symbol: 'GOLD',  name: 'Gold',                              color: '#FFD700', icon: 'Au', type: 'Commodities' },
  { symbol: 'SILVER',name: 'Silver',                            color: '#C0C0C0', icon: 'Ag', type: 'Commodities' },
  { symbol: 'OIL',   name: 'Crude Oil (WTI)',                   color: '#4a3728', icon: 'O', type: 'Commodities' },
  { symbol: 'BRENT', name: 'Brent Crude Oil',                   color: '#6b4f3a', icon: 'B', type: 'Commodities' },
  { symbol: 'GAS',   name: 'Natural Gas',                       color: '#3b82f6', icon: 'G', type: 'Commodities' },
  { symbol: 'WHEAT', name: 'Wheat',                             color: '#F5DEB3', icon: 'W', type: 'Commodities' },
  { symbol: 'CORN',  name: 'Corn',                              color: '#F9C74F', icon: 'C', type: 'Commodities' },
  { symbol: 'COFFE', name: 'Coffee',                            color: '#6F4E37', icon: 'C', type: 'Commodities' },
  { symbol: 'COCOA', name: 'Cocoa',                             color: '#7B3F00', icon: 'C', type: 'Commodities' },
  { symbol: 'PLAT',  name: 'Platinum',                          color: '#E5E4E2', icon: 'Pt', type: 'Commodities' },
  { symbol: 'PALL',  name: 'Palladium',                         color: '#CED0DD', icon: 'Pd', type: 'Commodities' },
  { symbol: 'COPP',  name: 'Copper',                            color: '#B87333', icon: 'Cu', type: 'Commodities' },
  { symbol: 'ALU',   name: 'Aluminum',                          color: '#848789', icon: 'Al', type: 'Commodities' },
  { symbol: 'NICKEL',name: 'Nickel',                            color: '#727472', icon: 'Ni', type: 'Commodities' },
  { symbol: 'ZINC',  name: 'Zinc',                              color: '#C0B6A8', icon: 'Zn', type: 'Commodities' },
  { symbol: 'SUGAR', name: 'Sugar',                             color: '#F6D6AD', icon: 'S', type: 'Commodities' },
  { symbol: 'COTTON',name: 'Cotton',                            color: '#FFFAF0', icon: 'C', type: 'Commodities' },
  { symbol: 'SOYBN', name: 'Soybeans',                          color: '#C8B400', icon: 'S', type: 'Commodities' },
  { symbol: 'LIVEC', name: 'Live Cattle',                       color: '#8B4513', icon: 'L', type: 'Commodities' },
  { symbol: 'LEAN',  name: 'Lean Hogs',                         color: '#CD853F', icon: 'L', type: 'Commodities' },
];

// ─── Fetch live prices from CoinGecko (free, no key) ─────────────────────
const COINGECKO_IDS = ALL_MARKET_ASSETS.filter(a => a.cgId).map(a => a.cgId!).join(',');

const FILTER_TABS = ['All assets', 'Crypto', 'Stocks', 'Fiat assets', 'Commodities'] as const;
type FilterTab = typeof FILTER_TABS[number];

// Static fallback prices so the page doesn't show $0
const FALLBACK_PRICES: Record<string, { price: number; change24h: number }> = {
  BTC: { price: 85367, change24h: 1.23 }, ETH: { price: 3241, change24h: 0.87 },
  BNB: { price: 412, change24h: -0.54 }, SOL: { price: 148, change24h: 2.14 },
  XRP: { price: 0.52, change24h: -1.02 }, ADA: { price: 0.48, change24h: 0.65 },
  DOGE: { price: 0.13, change24h: 3.12 }, AVAX: { price: 36, change24h: -0.88 },
  MATIC: { price: 0.87, change24h: 1.45 }, DOT: { price: 7.2, change24h: -0.33 },
  SHIB: { price: 0.0000182, change24h: 5.44 }, LINK: { price: 14.3, change24h: 0.92 },
  LTC: { price: 88, change24h: -1.11 }, UNI: { price: 8.7, change24h: 2.05 },
  ATOM: { price: 9.1, change24h: -0.72 }, TRX: { price: 0.13, change24h: 0.44 },
  TON: { price: 5.9, change24h: 1.87 }, PEPE: { price: 0.0000122, change24h: 8.33 },
  USDT: { price: 1.0, change24h: 0 }, USDC: { price: 1.0, change24h: 0 },
  AAPL: { price: 175.3, change24h: 0.45 }, MSFT: { price: 375.2, change24h: 0.72 },
  GOOGL: { price: 138.4, change24h: -0.31 }, AMZN: { price: 185.2, change24h: 1.02 },
  TSLA: { price: 248.5, change24h: -2.14 }, NVDA: { price: 486.3, change24h: 3.44 },
  META: { price: 485.1, change24h: 0.89 }, GOLD: { price: 2024, change24h: 0.32 },
  SILVER: { price: 24.5, change24h: -0.44 }, OIL: { price: 78.3, change24h: -1.22 },
};

export const Markets = () => {
  const navigate = useNavigate();
  const [prices, setPrices] = useState<Record<string, { price: number; change24h: number }>>(FALLBACK_PRICES);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All assets');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [wallets, setWallets] = useState<{ coin: string; balance: string | number }[]>([]);

  const fetchLivePrices = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${COINGECKO_IDS}&vs_currencies=usd&include_24hr_change=true`,
        { cache: 'no-store' }
      );
      if (!res.ok) return;
      const data: Record<string, { usd: number; usd_24h_change: number }> = await res.json();

      setPrices(prev => {
        const next = { ...prev };
        ALL_MARKET_ASSETS.forEach(asset => {
          if (asset.cgId && data[asset.cgId]) {
            next[asset.symbol] = {
              price: data[asset.cgId].usd,
              change24h: data[asset.cgId].usd_24h_change ?? 0,
            };
          }
        });
        return next;
      });
      setLastUpdated(new Date());
    } catch {}
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    // Fetch wallet balances
    fetch('/api/user/wallets', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setWallets(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));

    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 60_000); // refresh every 60s
    return () => clearInterval(interval);
  }, [navigate, fetchLivePrices]);

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(symbol) ? next.delete(symbol) : next.add(symbol);
      return next;
    });
  };

  const getBalance = (symbol: string) => {
    const w = wallets.find(w => w.coin === symbol);
    return w ? Number(w.balance) : 0;
  };

  const filteredAssets = useMemo(() => {
    const typeMap: Record<FilterTab, string | null> = {
      'All assets': null,
      'Crypto': 'Crypto',
      'Stocks': 'Stocks',
      'Fiat assets': 'Fiat',
      'Commodities': 'Commodities',
    };
    const typeFilter = typeMap[activeFilter];
    return ALL_MARKET_ASSETS.filter(a => {
      const matchesType = !typeFilter || a.type === typeFilter;
      const matchesSearch = !search ||
        a.symbol.toLowerCase().includes(search.toLowerCase()) ||
        a.name.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [activeFilter, search]);

  const formatPrice = (p: number) => {
    if (!p) return '—';
    if (p >= 1000) return '$' + p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (p >= 1) return '$' + p.toFixed(4);
    if (p >= 0.0001) return '$' + p.toFixed(6);
    return '$' + p.toExponential(3);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter">
      <Sidebar />

      {/* ══════════ DESKTOP ══════════ */}
      <div className="hidden md:flex flex-1 ml-[260px] flex-col min-h-screen">
        <Header />

        <div className="p-6">
          {/* Page title */}
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <h1 className="text-white font-bold text-base">Markets</h1>
            {lastUpdated && (
              <span className="text-xs text-gray-500 ml-2">
                · Live · {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>

          {/* Table header row: title left, search + filter right */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-xl">Markets</h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex items-center gap-2 bg-[#141414] border border-[#222] rounded-xl px-3 py-2 w-56">
                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search for assets"
                  className="bg-transparent text-white text-sm placeholder-gray-500 flex-1 outline-none"
                />
              </div>
              {/* Filter dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 bg-[#141414] border border-[#222] rounded-xl px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors">
                  {activeFilter}
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 top-full mt-1 bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden z-20 shadow-xl w-44 hidden group-hover:block">
                  {FILTER_TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${activeFilter === tab ? 'text-[#ff6a00] bg-[#ff6a00]/10' : 'text-gray-300 hover:bg-[#222]'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1a1a1a] text-gray-500 text-xs">
                  <th className="w-10 px-4 py-3 text-left font-medium">★</th>
                  <th className="px-4 py-3 text-left font-medium">Asset</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Current price (USD)</th>
                  <th className="px-4 py-3 text-left font-medium">24h Change</th>
                  <th className="px-4 py-3 text-left font-medium">In your wallet</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111]">
                {loading && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-500">Loading markets...</td></tr>
                )}
                {!loading && filteredAssets.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-500">No assets found.</td></tr>
                )}
                {!loading && filteredAssets.map(asset => {
                  const priceData = prices[asset.symbol];
                  const price = priceData?.price ?? 0;
                  const change = priceData?.change24h ?? 0;
                  const balance = getBalance(asset.symbol);
                  const isFav = favorites.has(asset.symbol);
                  const isPos = change >= 0;

                  return (
                    <tr key={asset.symbol} className="hover:bg-[#111] transition-colors group">
                      <td className="px-4 py-3">
                        <button onClick={() => toggleFavorite(asset.symbol)} className="text-gray-600 hover:text-yellow-400 transition-colors">
                          {isFav ? (
                            <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: asset.color }}>
                            {asset.icon}
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">{asset.name}</div>
                            <div className="text-gray-500 text-xs">{asset.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{asset.type}</td>
                      <td className="px-4 py-3">
                        <span className="text-white font-medium text-sm">{formatPrice(price)}/{asset.symbol}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${isPos ? 'text-[#26A17B]' : 'text-red-400'}`}>
                          {isPos ? '+' : ''}{change.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${balance > 0 ? 'text-white font-bold' : 'text-gray-500'}`}>
                          {balance > 0 ? balance.toFixed(4) : '0.00'} {asset.symbol}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => navigate('/trade')}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${balance > 0 ? 'bg-[#ff6a00] text-white' : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#ff6a00] hover:text-white'}`}
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 text-xs mt-3 text-center">
            Showing {filteredAssets.length} of {ALL_MARKET_ASSETS.length} assets · Prices update every 60 seconds via CoinGecko
          </p>
        </div>
      </div>

      {/* ══════════ MOBILE ══════════ */}
      <div className="flex md:hidden flex-col w-full h-screen bg-[#0A0A0A] overflow-y-auto pb-24">
        {/* Mobile header */}
        <div className="flex items-center justify-between px-5 pt-10 pb-4">
          <h1 className="text-white font-bold text-xl">Markets</h1>
          {lastUpdated && <span className="text-[10px] text-gray-500">Live · {lastUpdated.toLocaleTimeString()}</span>}
        </div>

        {/* Search */}
        <div className="px-4 mb-3">
          <div className="flex items-center gap-2 bg-[#141414] border border-[#222] rounded-xl px-3 py-2.5">
            <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for assets"
              className="bg-transparent text-white text-sm placeholder-gray-500 flex-1 outline-none"
            />
          </div>
        </div>

        {/* Filter tabs (horizontal scroll) */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${activeFilter === tab ? 'bg-white text-black' : 'bg-[#1a1a1a] text-gray-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Asset list */}
        <div className="px-4 space-y-1">
          {loading && <p className="text-center text-gray-500 py-12 text-sm">Loading markets...</p>}
          {!loading && filteredAssets.map(asset => {
            const priceData = prices[asset.symbol];
            const price = priceData?.price ?? 0;
            const change = priceData?.change24h ?? 0;
            const balance = getBalance(asset.symbol);
            const isFav = favorites.has(asset.symbol);
            const isPos = change >= 0;

            return (
              <div key={asset.symbol} className="flex items-center justify-between bg-[#141414] border border-[#1a1a1a] rounded-xl px-4 py-3 hover:bg-[#1a1a1a] transition-colors">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleFavorite(asset.symbol)} className="text-gray-600 hover:text-yellow-400 transition-colors shrink-0">
                    {isFav
                      ? <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      : <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    }
                  </button>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: asset.color }}>
                    {asset.icon}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{asset.name}</div>
                    <div className="text-gray-500 text-xs">{asset.symbol} · {asset.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm">{formatPrice(price)}</div>
                  <div className={`text-xs font-medium ${isPos ? 'text-[#26A17B]' : 'text-red-400'}`}>
                    {isPos ? '+' : ''}{change.toFixed(2)}%
                  </div>
                  <button
                    onClick={() => navigate('/trade')}
                    className="mt-1 text-[10px] font-bold text-[#ff6a00] hover:underline"
                  >
                    Trade →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
