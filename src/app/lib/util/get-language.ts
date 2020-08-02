export const getNavigatorLanguage = () => {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    } else {
      return (navigator as any).userLanguage || navigator.language || (navigator as any).browserLanguage || 'en';
    }
}