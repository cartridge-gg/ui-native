import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    // Inter font family
    'Inter-Regular': 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
    'Inter-Medium': 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2',
    'Inter-SemiBold': 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
    'Inter-Bold': 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2',
    
    // IBM Plex Mono font family
    'IBMPlexMono-Regular': 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3kwq0n1hj-sNFQ.woff2',
    'IBMPlexMono-Medium': 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3oAr0n1hj-sNFQ.woff2',
    'IBMPlexMono-SemiBold': 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3vAo0n1hj-sNFQ.woff2',
  });
};

export const getFontFamily = (family: 'sans' | 'mono', weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular') => {
  if (family === 'mono') {
    switch (weight) {
      case 'medium':
        return 'IBMPlexMono-Medium';
      case 'semibold':
        return 'IBMPlexMono-SemiBold';
      default:
        return 'IBMPlexMono-Regular';
    }
  }
  
  // Sans family (Inter)
  switch (weight) {
    case 'medium':
      return 'Inter-Medium';
    case 'semibold':
      return 'Inter-SemiBold';
    case 'bold':
      return 'Inter-Bold';
    default:
      return 'Inter-Regular';
  }
}; 