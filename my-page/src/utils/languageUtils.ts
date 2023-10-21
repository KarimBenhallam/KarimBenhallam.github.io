export function getTextFromJSON(selectedLanguage: string, path: string): string | undefined {
    // Load content from the appropriate JSON file based on the selected language
    const content = selectedLanguage === 'en' ? require('../en.json') : require('../fr.json');

    // Split the path into nested keys
    const keys = path.split('.');

    // Traverse the content object to get the desired value
    let value = content;
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return undefined; // if not found
        }
    }

    return value;
}
