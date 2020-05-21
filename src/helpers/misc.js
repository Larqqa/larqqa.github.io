/**
 * Miscellianous helper functions
 */

/**
 * Get the locale string from the browser
 * 
 * @return {string} Locale string 
 */
export function getLanguage() {
  if (navigator.languages !== undefined) {
    return navigator.languages[0];
  } else if (navigator.language) {
    return navigator.language;
  } else {
    return 'fi-FI';
  }
}
